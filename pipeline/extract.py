"""Extract GitHub repository metadata via public REST API."""

import json
import os
from urllib.request import Request, urlopen
from urllib.error import URLError

GITHUB_USER = os.getenv("GITHUB_USER", "minzi03")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

HEADERS = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "portfolio-pipeline",
}

if GITHUB_TOKEN:
    HEADERS["Authorization"] = f"Bearer {GITHUB_TOKEN}"


def extract_repos() -> list[dict]:
    """Fetch all public repos for the configured user."""
    url = f"https://api.github.com/users/{GITHUB_USER}/repos?type=public&per_page=100&sort=updated"
    req = Request(url, headers=HEADERS)

    try:
        with urlopen(req, timeout=30) as resp:
            repos = json.loads(resp.read().decode())
    except URLError as e:
        print(f"Error fetching repos: {e}")
        return []

    results = []
    for repo in repos:
        results.append({
            "name": repo["name"],
            "full_name": repo["full_name"],
            "description": repo.get("description", ""),
            "html_url": repo["html_url"],
            "language": repo.get("language"),
            "stargazers_count": repo.get("stargazers_count", 0),
            "forks_count": repo.get("forks_count", 0),
            "open_issues_count": repo.get("open_issues_count", 0),
            "size_kb": repo.get("size", 0),
            "topics": repo.get("topics", []),
            "created_at": repo.get("created_at"),
            "updated_at": repo.get("updated_at"),
            "pushed_at": repo.get("pushed_at"),
            "archived": repo.get("archived", False),
        })

    return results


if __name__ == "__main__":
    repos = extract_repos()
    print(f"Extracted {len(repos)} repositories")
    print(json.dumps(repos[:3], indent=2))
