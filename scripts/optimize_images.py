"""Gera variantes WebP responsivas das imagens do site.

Uso: python scripts/optimize_images.py
Os PNGs originais continuam no repositório (usados por JSON-LD, CV e fallback).
"""
from pathlib import Path

from PIL import Image

IMAGES = Path(__file__).resolve().parents[1] / "assets" / "images"

# nome-base -> larguras geradas (a maior deve ser <= largura do original)
TARGETS = {
    "foto": [400, 800],
    "lp-solucoes-preview": [640, 1280],
}

WEBP_QUALITY = 80


def main() -> None:
    for name, widths in TARGETS.items():
        src = Image.open(IMAGES / f"{name}.png").convert("RGB")
        for width in widths:
            height = round(src.height * width / src.width)
            out = IMAGES / f"{name}-{width}.webp"
            src.resize((width, height), Image.Resampling.LANCZOS).save(
                out, "WEBP", quality=WEBP_QUALITY, method=6
            )
            print(f"{out.name}: {out.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
