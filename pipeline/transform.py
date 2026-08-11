"""Transform extracted GitHub data using DuckDB."""

import json
import os
import tempfile

import duckdb


def transform(repos: list[dict], output_dir: str) -> dict:
    """Transform repo data into stats and write Parquet."""
    os.makedirs(output_dir, exist_ok=True)

    con = duckdb.connect(":memory:")

    # Write repos to temp file, then load via read_json_auto
    tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False)
    try:
        tmp.write(json.dumps(repos))
        tmp.close()
        con.execute(f"CREATE TABLE repos AS SELECT * FROM read_json_auto('{tmp.name.replace(chr(92), '/')}')")
    finally:
        os.unlink(tmp.name)

    # Stats
    stats = con.execute("""
        SELECT
            COUNT(*) AS total_repos,
            COUNT(*) FILTER (WHERE NOT archived) AS active_repos,
            SUM(stargazers_count) AS total_stars,
            SUM(forks_count) AS total_forks,
            SUM(size_kb) AS total_size_kb,
            COUNT(DISTINCT language) AS languages,
            MAX(updated_at) AS last_updated
        FROM repos
    """).fetchone()

    stats_dict = {
        "total_repos": stats[0],
        "active_repos": stats[1],
        "total_stars": stats[2] or 0,
        "total_forks": stats[3] or 0,
        "total_size_kb": stats[4] or 0,
        "languages": stats[5],
        "last_updated": str(stats[6]) if stats[6] else None,
    }

    # Language breakdown
    languages = con.execute("""
        SELECT language, COUNT(*) AS count
        FROM repos
        WHERE language IS NOT NULL AND NOT archived
        GROUP BY language
        ORDER BY count DESC
    """).fetchall()

    stats_dict["language_breakdown"] = [
        {"language": lang, "count": count} for lang, count in languages
    ]

    # Write Parquet
    parquet_path = os.path.join(output_dir, "github.parquet")
    con.execute(f"COPY (SELECT * FROM repos) TO '{parquet_path}' (FORMAT PARQUET)")
    print(f"Wrote {parquet_path}")

    con.close()
    return stats_dict
