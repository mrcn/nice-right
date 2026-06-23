#!/usr/bin/env python
"""Fetch and normalize public-domain Project Gutenberg text for Understand example pages.

This is intentionally small and source-specific for the first SEO proof pipeline.
It records attribution and rights notes alongside normalized text so page builders
cannot accidentally publish examples without provenance.
"""
from __future__ import annotations

import argparse
import json
import re
import urllib.request
from dataclasses import asdict, dataclass
from pathlib import Path


@dataclass
class SourceRecord:
    slug: str
    title: str
    author: str | None
    translator: str | None
    source_name: str
    source_url: str
    ebook_id: str
    public_domain_status: str
    rights_note: str
    attribution_text: str
    raw_path: str
    normalized_path: str
    normalized_word_count: int


def strip_gutenberg_boilerplate(text: str) -> str:
    start_patterns = [
        r"\*\*\* START OF THE PROJECT GUTENBERG EBOOK .*?\*\*\*",
        r"\*\*\* START OF THIS PROJECT GUTENBERG EBOOK .*?\*\*\*",
    ]
    end_patterns = [
        r"\*\*\* END OF THE PROJECT GUTENBERG EBOOK .*",
        r"\*\*\* END OF THIS PROJECT GUTENBERG EBOOK .*",
    ]
    for pattern in start_patterns:
        m = re.search(pattern, text, flags=re.I | re.S)
        if m:
            text = text[m.end():]
            break
    for pattern in end_patterns:
        m = re.search(pattern, text, flags=re.I | re.S)
        if m:
            text = text[:m.start()]
            break
    return text.strip()


def normalize_text(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ebook-id", required=True)
    parser.add_argument("--slug", required=True)
    parser.add_argument("--title", required=True)
    parser.add_argument("--author", default=None)
    parser.add_argument("--translator", default=None)
    parser.add_argument("--out-dir", default="data/understand_examples/sources")
    args = parser.parse_args()

    out_dir = Path(args.out_dir)
    raw_dir = out_dir / "raw"
    norm_dir = out_dir / "normalized"
    raw_dir.mkdir(parents=True, exist_ok=True)
    norm_dir.mkdir(parents=True, exist_ok=True)

    url = f"https://www.gutenberg.org/cache/epub/{args.ebook_id}/pg{args.ebook_id}.txt"
    raw = urllib.request.urlopen(url, timeout=30).read().decode("utf-8", "ignore")
    normalized = normalize_text(strip_gutenberg_boilerplate(raw))

    raw_path = raw_dir / f"{args.slug}.txt"
    norm_path = norm_dir / f"{args.slug}.txt"
    raw_path.write_text(raw, encoding="utf-8")
    norm_path.write_text(normalized, encoding="utf-8")

    record = SourceRecord(
        slug=args.slug,
        title=args.title,
        author=args.author,
        translator=args.translator,
        source_name="Project Gutenberg",
        source_url=f"https://www.gutenberg.org/ebooks/{args.ebook_id}",
        ebook_id=args.ebook_id,
        public_domain_status="public-domain-confirmed-us",
        rights_note=(
            "Project Gutenberg states this eBook is for use by anyone in the United States "
            "with almost no restrictions. Rights should be rechecked before standalone production launch, "
            "especially for non-US audiences."
        ),
        attribution_text=f"Source text from Project Gutenberg eBook #{args.ebook_id}: {args.title}.",
        raw_path=str(raw_path).replace('\\', '/'),
        normalized_path=str(norm_path).replace('\\', '/'),
        normalized_word_count=len(re.findall(r"\b\w+\b", normalized)),
    )
    record_path = out_dir / f"{args.slug}.json"
    record_path.write_text(json.dumps(asdict(record), indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(asdict(record), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
