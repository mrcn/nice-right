#!/usr/bin/env python
"""Extract selected Aesop fables from the normalized Gutenberg source."""
from __future__ import annotations

import json
import re
from pathlib import Path

SOURCE = Path("data/understand_examples/sources/normalized/aesop-fables-vernon-jones.txt")
OUT = Path("data/understand_examples/selections/aesop-fables.json")
TITLES = [
    "THE FOX AND THE GRAPES",
    "THE DOG AND THE SHADOW",
    "THE NORTH WIND AND THE SUN",
    "THE CROW AND THE PITCHER",
    "THE TOWN MOUSE AND THE COUNTRY MOUSE",
]


def main() -> None:
    text = SOURCE.read_text(encoding="utf-8")
    # Skip prefaces/TOC and start from the body.
    body_start = text.find("ÆSOP'S FABLES")
    if body_start == -1:
        raise SystemExit("Could not locate body marker")
    body = text[body_start:]

    # Split on all-caps fable headings. Preserve heading with content.
    pattern = re.compile(r"\n(?P<title>[A-ZÆ' ,;-]{4,})\n\n")
    matches = list(pattern.finditer(body))
    sections = {}
    for idx, match in enumerate(matches):
        title = match.group("title").strip()
        start = match.end()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(body)
        content = body[start:end].strip()
        if title in TITLES and len(content) > 80:
            sections[title] = {
                "title": title.title().replace("And", "and").replace("The", "The"),
                "source_title": title,
                "original_text": content,
                "word_count": len(re.findall(r"\b\w+\b", content)),
            }

    missing = [t for t in TITLES if t not in sections]
    if missing:
        raise SystemExit(f"Missing selections: {missing}")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(list(sections.values()), indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {OUT} with {len(sections)} fables")
    for item in sections.values():
        print(f"- {item['source_title']}: {item['word_count']} words")


if __name__ == "__main__":
    main()
