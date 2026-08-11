"""Data quality checks for extracted GitHub data."""

import json
from datetime import datetime, timezone


def validate(repos: list[dict]) -> dict:
    """Run DQ checks and return results."""
    checks = []

    def check(name: str, condition: bool):
        checks.append({"name": name, "passed": condition})

    # 1. Source not empty
    check("source_not_empty", len(repos) > 0)

    # 2. All repos have names
    check("repo_name_not_null", all(r.get("name") for r in repos))

    # 3. Star counts non-negative
    check("stars_non_negative", all(r.get("stargazers_count", 0) >= 0 for r in repos))

    # 4. Fork counts non-negative
    check("forks_non_negative", all(r.get("forks_count", 0) >= 0 for r in repos))

    # 5. Updated_at is valid ISO timestamp
    def valid_timestamp(ts):
        if not ts:
            return False
        try:
            datetime.fromisoformat(ts.replace("Z", "+00:00"))
            return True
        except (ValueError, AttributeError):
            return False

    check("updated_at_valid", all(valid_timestamp(r.get("updated_at")) for r in repos))

    # 6. Unique repo names
    names = [r.get("name", "") for r in repos]
    check("unique_repo_names", len(names) == len(set(names)))

    # 7. Freshness — last update within 7 days
    now = datetime.now(timezone.utc)
    freshness_ok = True
    if repos:
        latest = max(
            (r.get("updated_at", "") for r in repos),
            default="",
        )
        if latest:
            try:
                latest_dt = datetime.fromisoformat(latest.replace("Z", "+00:00"))
                freshness_ok = (now - latest_dt).days <= 7
            except ValueError:
                freshness_ok = False
    check("freshness_within_7_days", freshness_ok)

    # 8. Schema check — required fields present
    required_fields = ["name", "html_url", "stargazers_count", "forks_count"]
    schema_ok = all(all(f in r for f in required_fields) for r in repos)
    check("schema_valid", schema_ok)

    passed = sum(1 for c in checks if c["passed"])
    return {
        "total": len(checks),
        "passed": passed,
        "failed": len(checks) - passed,
        "checks": checks,
    }
