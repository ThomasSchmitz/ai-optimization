"""Generate sitemap.xml for published HTML pages."""
from __future__ import annotations

from datetime import datetime
from pathlib import Path

BASE_URL = "https://thomasschmitz.github.io/ai-optimization"
EXCLUDED_DIRS = {"components", "downloads", "templates", "scripts", "assets"}
ROOT = Path(__file__).resolve().parents[1]


def should_include(path: Path) -> bool:
    if path.suffix != ".html":
        return False
    parts = path.relative_to(ROOT).parts
    if parts[0].startswith('.'):
        return False
    if parts[0] in EXCLUDED_DIRS:
        return False
    return True


def changefreq_for(path: Path) -> str:
    rel = path.relative_to(ROOT)
    if rel.name == "index.html":
        return "weekly"
    if {"platforms", "guides", "industries"}.intersection(rel.parts):
        return "monthly"
    return "monthly"


def priority_for(path: Path) -> str:
    rel = path.relative_to(ROOT)
    if rel.name == "index.html":
        return "1.0"
    if {"guides", "platforms"}.intersection(rel.parts):
        return "0.9"
    if {"tools", "learn"}.intersection(rel.parts):
        return "0.8"
    return "0.7"


def format_url(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    lastmod = datetime.utcfromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d")
    return (
        f"      <loc>{BASE_URL}/{rel}</loc>\n"
        f"      <lastmod>{lastmod}</lastmod>\n"
        f"      <changefreq>{changefreq_for(path)}</changefreq>\n"
        f"      <priority>{priority_for(path)}</priority>"
    )


def main() -> None:
    paths = sorted(p for p in ROOT.rglob("*.html") if should_include(p))
    lines = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"]
    for path in paths:
        lines.append("  <url>")
        lines.append(format_url(path))
        lines.append("  </url>")
    lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n")


if __name__ == "__main__":
    main()
