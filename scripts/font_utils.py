"""Resolução de fontes Arial/Liberation por sistema operacional."""
import platform
from pathlib import Path


def _candidates(weight: str) -> list[Path]:
    bold = weight == "bold"
    system = platform.system()

    if system == "Windows":
        fonts = Path(r"C:\Windows\Fonts")
        return [fonts / ("arialbd.ttf" if bold else "arial.ttf")]

    if system == "Darwin":
        return [
            Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf"),
            Path("/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf"),
        ]

    name = "LiberationSans-Bold.ttf" if bold else "LiberationSans-Regular.ttf"
    alt = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    return [
        Path(f"/usr/share/fonts/truetype/liberation/{name}"),
        Path(f"/usr/share/fonts/TTF/{name}"),
        Path(f"/usr/share/fonts/truetype/dejavu/{alt}"),
    ]


def resolve_font(weight: str = "bold") -> Path:
    for path in _candidates(weight):
        if path.is_file():
            return path
    raise FileNotFoundError(
        f"Fonte '{weight}' não encontrada. Instale Arial (Windows/macOS) ou Liberation/DejaVu (Linux)."
    )
