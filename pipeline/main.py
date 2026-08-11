"""Main pipeline: extract → transform → validate → publish."""

import json
import os
import sys
from datetime import datetime, timezone

from extract import extract_repos
from transform import transform
from validate import validate

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "data")
DATASETS_DIR = os.path.join(DATA_DIR, "datasets")


def main():
    started_at = datetime.now(timezone.utc)
    print(f"Pipeline started at {started_at.isoformat()}")

    # Extract
    repos = extract_repos()
    print(f"Extracted {len(repos)} repositories")

    if not repos:
        print("No repos extracted, aborting")
        _write_status("error", started_at, 0, {"checks": [], "passed": 0, "failed": 0, "total": 0})
        sys.exit(1)

    # Transform
    stats = transform(repos, DATASETS_DIR)

    # Validate
    dq = validate(repos)
    print(f"DQ: {dq['passed']}/{dq['total']} passed")

    # Write stats
    os.makedirs(DATA_DIR, exist_ok=True)
    stats_path = os.path.join(DATA_DIR, "stats.json")
    with open(stats_path, "w") as f:
        json.dump(stats, f, indent=2, default=str)
    print(f"Wrote {stats_path}")

    # Determine status
    status = "success" if dq["failed"] == 0 else "failed"

    # Write pipeline status
    _write_status(status, started_at, len(repos), dq)

    if dq["failed"] > 0:
        print(f"Pipeline completed with {dq['failed']} DQ failures")
        sys.exit(1)

    print("Pipeline completed successfully")


def _write_status(status: str, started_at: datetime, records: int, dq: dict):
    completed_at = datetime.now(timezone.utc)
    duration = (completed_at - started_at).total_seconds()

    status_data = {
        "pipeline": "portfolio-data",
        "status": status,
        "started_at": started_at.isoformat(),
        "completed_at": completed_at.isoformat(),
        "duration_seconds": round(duration, 1),
        "records_processed": records,
        "dq": {
            "total": dq["total"],
            "passed": dq["passed"],
            "failed": dq["failed"],
            "checks": {c["name"]: "passed" if c["passed"] else "failed" for c in dq["checks"]},
        },
    }

    status_path = os.path.join(DATA_DIR, "pipeline-status.json")
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(status_path, "w") as f:
        json.dump(status_data, f, indent=2)
    print(f"Wrote {status_path}")


if __name__ == "__main__":
    main()
