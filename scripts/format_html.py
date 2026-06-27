#!/usr/bin/env python3
"""Remove linhas em branco excessivas do index.html."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGET = ROOT / "index.html"

MAJOR_STARTS = ("<!DOCTYPE", "<html", "<head", "</head>", "<body", "</body>", "<main", "</main>", "<header", "</header>", "<footer", "</footer>", "<section", "</section>", "<script", "</script>")


def is_major(line: str) -> bool:
    stripped = line.lstrip()
    return any(stripped.startswith(prefix) for prefix in MAJOR_STARTS)


def format_html(text: str) -> str:
    lines = [ln.rstrip() for ln in text.splitlines()]
    out: list[str] = []
    for ln in lines:
        if not ln.strip():
            continue
        if out and is_major(ln) and out[-1] != "":
            out.append("")
        out.append(ln)
    return "\n".join(out) + "\n"


def main() -> None:
    original = TARGET.read_text(encoding="utf-8")
    formatted = format_html(original)
    TARGET.write_text(formatted, encoding="utf-8")
    print(f"Formatado: {TARGET} ({len(original.splitlines())} -> {len(formatted.splitlines())} linhas)")


if __name__ == "__main__":
    main()
