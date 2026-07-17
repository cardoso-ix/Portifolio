"""Gera PNG de preview de automações com n8n para o portfólio."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from font_utils import resolve_font

OUT = Path(__file__).resolve().parents[1] / "assets" / "images" / "n8n-automacao-preview.png"
W, H = 640, 360

BG = (17, 18, 17)
PANEL = (31, 32, 30)
PANEL_ALT = (39, 40, 37)
BORDER = (53, 55, 50)
ACCENT = (168, 184, 122)
TEXT = (238, 240, 234)
MUTED = (154, 158, 147)
APP_A = (120, 160, 130)
APP_B = (150, 140, 100)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(resolve_font("bold" if bold else "regular")), size)


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    f_title = font(18, bold=True)
    f_label = font(13, bold=True)
    f_small = font(12)
    f_tiny = font(11)

    rounded(d, (20, 20, 620, 340), 16, PANEL, BORDER, 1)

    d.text((40, 38), "Automações com n8n", fill=TEXT, font=f_title)
    d.text((40, 64), "Triggers → fluxos → apps e alertas", fill=MUTED, font=f_small)

    nodes = [
        (48, 120, 168, 210, "Trigger", "API · form · cron"),
        (236, 120, 356, 210, "n8n", "orquestra"),
        (424, 100, 592, 168, "Apps / Sheets", "integração"),
        (424, 188, 592, 256, "E-mail / WhatsApp", "alerta"),
    ]

    fills = [
        PANEL_ALT,
        (44, 50, 34),
        (32, 40, 34),
        (36, 36, 30),
    ]
    accents = [MUTED, ACCENT, APP_A, APP_B]

    for (x1, y1, x2, y2, title, subtitle), fill, accent in zip(nodes, fills, accents):
        rounded(d, (x1, y1, x2, y2), 12, fill, accent, 2)
        d.text((x1 + 14, y1 + 22), title, fill=TEXT, font=f_label)
        d.text((x1 + 14, y1 + 48), subtitle, fill=MUTED, font=f_tiny)

    arrow = ACCENT
    d.line((168, 165, 236, 165), fill=arrow, width=3)
    d.polygon([(228, 158), (240, 165), (228, 172)], fill=arrow)
    d.line((356, 145, 424, 134), fill=arrow, width=3)
    d.polygon([(414, 128), (426, 133), (416, 142)], fill=arrow)
    d.line((356, 185, 424, 222), fill=arrow, width=3)
    d.polygon([(414, 214), (426, 223), (412, 228)], fill=arrow)

    rounded(d, (40, 290, 110, 318), 8, (44, 50, 34), ACCENT, 1)
    d.text((54, 297), "n8n", fill=ACCENT, font=f_tiny)
    rounded(d, (122, 290, 200, 318), 8, PANEL_ALT, BORDER, 1)
    d.text((136, 297), "APIs", fill=MUTED, font=f_tiny)
    rounded(d, (212, 290, 330, 318), 8, PANEL_ALT, BORDER, 1)
    d.text((226, 297), "Webhooks", fill=MUTED, font=f_tiny)
    rounded(d, (342, 290, 470, 318), 8, PANEL_ALT, BORDER, 1)
    d.text((356, 297), "Integrações", fill=MUTED, font=f_tiny)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"OK: {OUT}")


if __name__ == "__main__":
    main()
