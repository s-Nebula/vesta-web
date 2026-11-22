#!/usr/bin/env python3
"""
Converts the official Vesta documents (.docx) into structured JSON for the site.

Usage:
    python3 scripts/convert_legal.py

Reads the Spanish .docx files from `legal-source/` and the English courtesy
translations from `legal-source/en/`. Each document is identified by its file
name (see DOCS). The text is NOT rewritten: paragraphs, lists, tables and
headings are kept exactly as in the original document.

Requires: pip install python-docx
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

import docx
from docx.oxml.ns import qn

ROOT = Path(__file__).resolve().parent.parent
# (source folder, output folder, {slug: fragment of the .docx file name})
LANGUAGES = [
    (
        ROOT / "legal-source",
        ROOT / "src" / "content" / "legal",
        {
            "terminos-y-condiciones": "Términos y condiciones",
            "politica-de-privacidad": "Política de tratamiento",
            "guia-de-usuario": "Guía de usuario",
        },
    ),
    (
        ROOT / "legal-source" / "en",
        ROOT / "src" / "content" / "legal" / "en",
        {
            "terms": "Terms and Conditions",
            "privacy": "Privacy Policy",
            "user-guide": "User Guide",
        },
    ),
]


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text[:60]


def para_text(p) -> str:
    return "".join(t.text or "" for t in p.iter(qn("w:t"))).strip()


def numbering_formats(document):
    """numId -> formato del nivel 0 (decimal, bullet...)."""
    formats = {}
    try:
        numbering = document.part.numbering_part.element
    except Exception:  # noqa: BLE001
        return formats
    abstract = {}
    for an in numbering.findall(qn("w:abstractNum")):
        aid = an.get(qn("w:abstractNumId"))
        lvl = an.find(qn("w:lvl"))
        fmt = lvl.find(qn("w:numFmt")).get(qn("w:val")) if lvl is not None and lvl.find(qn("w:numFmt")) is not None else "bullet"
        abstract[aid] = fmt
    for num in numbering.findall(qn("w:num")):
        nid = num.get(qn("w:numId"))
        aid = num.find(qn("w:abstractNumId")).get(qn("w:val"))
        formats[nid] = abstract.get(aid, "bullet")
    return formats


def convert(path: Path):
    document = docx.Document(str(path))
    fmts = numbering_formats(document)
    body = document.element.body

    meta = {}
    title = None
    subtitle = None
    blocks = []
    started = False
    used_ids = set()
    current_list = None

    def flush_list():
        nonlocal current_list
        if current_list:
            blocks.append(current_list)
        current_list = None

    preamble = []
    for el in body:
        tag = el.tag.split("}")[1]
        if tag == "tbl":
            rows = []
            for tr in el.findall(qn("w:tr")):
                cells = [" ".join(para_text(p) for p in tc.iter(qn("w:p"))).strip() for tc in tr.findall(qn("w:tc"))]
                rows.append(cells)
            if not started:
                for r in rows:
                    if len(r) >= 2:
                        meta[r[0]] = r[1]
            else:
                flush_list()
                blocks.append({"type": "table", "rows": rows})
            continue
        if tag != "p":
            continue

        ppr = el.pPr
        style = ppr.pStyle.val if ppr is not None and ppr.pStyle is not None else ""
        num = ppr.numPr if ppr is not None else None
        text = para_text(el)

        if style == "Heading2":
            started = True
        if not started:
            if text:
                preamble.append(text)
            continue
        if not text:
            continue

        if style in ("Heading2", "Heading3"):
            flush_list()
            sid = slugify(text)
            base, i = sid, 2
            while sid in used_ids:
                sid = f"{base}-{i}"
                i += 1
            used_ids.add(sid)
            blocks.append({"type": "h2" if style == "Heading2" else "h3", "id": sid, "text": text})
        elif num is not None:
            nid = num.numId.val if num.numId is not None else None
            kind = "ol" if fmts.get(str(nid)) == "decimal" else "ul"
            if current_list is None or current_list["type"] != kind:
                flush_list()
                current_list = {"type": kind, "items": []}
            current_list["items"].append(text)
        else:
            flush_list()
            # Paragraphs with line breaks (contact blocks) are kept.
            lines = []
            for r in el.iter():
                t = r.tag.split("}")[1]
                if t == "t":
                    lines.append(r.text or "")
                elif t in ("br", "cr"):
                    lines.append("\n")
            raw = "".join(lines).strip()
            blocks.append({"type": "p", "text": raw})
    flush_list()

    if preamble:
        title = preamble[1] if len(preamble) > 1 else preamble[0]
        subtitle = preamble[2] if len(preamble) > 2 else None

    # Split off the final copyright lines as a closing note.
    closing = []
    while blocks and blocks[-1]["type"] == "p" and blocks[-1]["text"].startswith("©"):
        closing.insert(0, blocks.pop()["text"])

    return {
        "title": title,
        "subtitle": subtitle,
        "meta": meta,
        "blocks": blocks,
        "closing": closing,
        "sourceFile": path.name,
    }


def main():
    for src, out, docs in LANGUAGES:
        out.mkdir(parents=True, exist_ok=True)
        files = list(src.glob("*.docx"))
        for slug, needle in docs.items():
            match = next((f for f in files if needle.lower() in f.name.lower()), None)
            if not match:
                print(f"[pending] No document found for '{slug}' in {src}")
                continue
            data = convert(match)
            (out / f"{slug}.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
            h2 = sum(1 for b in data["blocks"] if b["type"] == "h2")
            print(f"[ok] {slug}: {match.name} -> {h2} sections")


if __name__ == "__main__":
    main()
