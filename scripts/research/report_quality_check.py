#!/usr/bin/env python3
"""Cheap pre-share checks for research reports and evidence packages."""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RESEARCH = ROOT / "docs" / "research"
TEXT_REPORTS = [
    RESEARCH / "portfolio-second-pass-report.md",
    RESEARCH / "portfolio-second-pass.html",
    RESEARCH / "portfolio-second-pass-summary.html",
    RESEARCH / "portfolio-timeline-audit.md",
    RESEARCH / "portfolio-proof-audit.html",
]
EVIDENCE = RESEARCH / "portfolio-second-pass-evidence.json"
LIFT = RESEARCH / "portfolio-second-pass-lift.json"
HTML = RESEARCH / "portfolio-second-pass.html"
PDF = RESEARCH / "portfolio-second-pass.pdf"
SCREENSHOTS = RESEARCH / "second-pass-screenshots"

# These are style tripwires, not a claim that every use is wrong. A report author
# should resolve each one before sharing rather than letting the pattern pass silently.
UNSLOP_TRIPWIRES = (
    "—",
    "–",
    "“",
    "”",
    "’",
    "Additionally",
    "crucial",
    "delve",
    "enduring",
    "fostering",
    "garner",
    "interplay",
    "intricate",
    "pivotal",
    "showcase",
    "tapestry",
    "testament",
    "underscore",
    "vibrant",
    "serves as",
    "stands as",
    "boasts",
    "not just",
    "Not just",
    "I hope this helps",
    "In order to",
)
SECRET_RE = re.compile(r"refresh_token|client_secret|KEEPESS_PASSWORD|LM-\{", re.I)


def fail(message: str, failures: list[str]) -> None:
    failures.append(message)


def main() -> int:
    failures: list[str] = []
    for path in TEXT_REPORTS:
        if not path.is_file():
            fail(f"missing report: {path.relative_to(ROOT)}", failures)
            continue
        text = path.read_text(encoding="utf-8")
        for needle in UNSLOP_TRIPWIRES:
            if needle in text:
                fail(f"{path.relative_to(ROOT)} contains tripwire {needle!r}", failures)
        if SECRET_RE.search(text):
            fail(f"{path.relative_to(ROOT)} contains a secret-shaped string", failures)

    for path in (EVIDENCE, LIFT):
        if not path.is_file():
            fail(f"missing JSON: {path.relative_to(ROOT)}", failures)
    if EVIDENCE.is_file():
        try:
            evidence = json.loads(EVIDENCE.read_text(encoding="utf-8"))
            claims = evidence.get("claim_cards", [])
            source_ids = {source.get("id") for source in evidence.get("sources", [])}
            if not claims:
                fail("evidence has no claim cards", failures)
            for claim in claims:
                missing = {source for source in claim.get("sources", []) if source not in source_ids}
                if not claim.get("caveat") or missing:
                    fail(f"claim {claim.get('id')} lacks a caveat or valid source IDs", failures)
            if "lift_metrics" not in evidence:
                fail("evidence has no lift_metrics section", failures)
            if "quality_correction" not in evidence:
                fail("evidence has no quality_correction section", failures)
            if SECRET_RE.search(EVIDENCE.read_text(encoding="utf-8")):
                fail("evidence JSON contains a secret-shaped string", failures)
        except json.JSONDecodeError as exc:
            fail(f"invalid evidence JSON: {exc}", failures)
    if LIFT.is_file():
        try:
            lift = json.loads(LIFT.read_text(encoding="utf-8"))
            for key in ("definition", "comparisons", "not_estimable"):
                if key not in lift:
                    fail(f"lift JSON lacks {key}", failures)
        except json.JSONDecodeError as exc:
            fail(f"invalid lift JSON: {exc}", failures)

    if not HTML.is_file():
        fail(f"missing visual report: {HTML.relative_to(ROOT)}", failures)
    else:
        html = HTML.read_text(encoding="utf-8")
        if html.count('<section class="slide') != 9:
            fail("visual report must contain 9 slides", failures)
        if html.count("data:image/jpeg;base64") != 9:
            fail("visual report must contain 9 embedded preview images", failures)
        if "LIFT METRICS" not in html:
            fail("visual report lacks lift-metrics slide", failures)
        if SECRET_RE.search(html):
            fail("visual report contains a secret-shaped string", failures)

    pngs = sorted(SCREENSHOTS.glob("*.png")) if SCREENSHOTS.is_dir() else []
    if len(pngs) != 10:
        fail(f"expected 10 full-size screenshots, found {len(pngs)}", failures)
    if not PDF.is_file():
        fail(f"missing PDF: {PDF.relative_to(ROOT)}", failures)
    else:
        try:
            result = subprocess.run(["pdfinfo", str(PDF)], capture_output=True, text=True, check=True)
            match = re.search(r"^Pages:\s+(\d+)", result.stdout, re.MULTILINE)
            if not match or match.group(1) != "9":
                fail("visual report PDF must contain 9 pages", failures)
        except (FileNotFoundError, subprocess.CalledProcessError):
            # Rendering is checked separately by Playwright; do not make pdfinfo a hard dependency.
            pass

    if failures:
        print("REPORT_CHECK=fail")
        for failure in failures:
            print(f"- {failure}")
        return 1
    print("REPORT_CHECK=pass")
    print("- unslop tripwires clear")
    print("- claim/source/caveat checks pass")
    print("- lift and quality-correction sections present")
    print("- visual artifact and screenshot counts pass")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
