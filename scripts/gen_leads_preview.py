"""Gera PNG de preview da Automação de leads para o portfólio."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from font_utils import resolve_font

OUT = Path(__file__).resolve().parents[1] / "assets" / "images" / "leads-automacao-preview.png"
W, H = 640, 360

BG = (17, 18, 17)
PANEL = (31, 32, 30)
PANEL_ALT = (39, 40, 37)
BORDER = (53, 55, 50)
ACCENT = (168, 184, 122)
TEXT = (238, 240, 234)
MUTED = (154, 158, 147)
WHATSAPP = (37, 211, 102)
SHEETS = (52, 168, 83)


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

    # Outer panel
    rounded(d, (20, 20, 620, 340), 16, PANEL, BORDER, 1)

    d.text((40, 38), "Automação de leads", fill=TEXT, font=f_title)
    d.text((40, 64), "Webhook → n8n → Sheets + alerta", fill=MUTED, font=f_small)

    # Flow nodes
    nodes = [
        (48, 120, 168, 210, "Form / Webhook", "entrada"),
        (236, 120, 356, 210, "n8n", "orquestra"),
        (424, 100, 592, 168, "Google Sheets", "registro"),
        (424, 188, 592, 256, "WhatsApp", "alerta"),
    ]

    fills = [
        PANEL_ALT,
        (44, 50, 34),
        (28, 42, 32),
        (24, 40, 30),
    ]
    accents = [MUTED, ACCENT, SHEETS, WHATSAPP]

    for (x1, y1, x2, y2, title, subtitle), fill, accent in zip(nodes, fills, accents):
        rounded(d, (x1, y1, x2, y2), 12, fill, accent, 2)
        d.text((x1 + 14, y1 + 22), title, fill=TEXT, font=f_label)
        d.text((x1 + 14, y1 + 48), subtitle, fill=MUTED, font=f_tiny)

    # Arrows
    arrow = ACCENT
    # form -> n8n
    d.line((168, 165, 236, 165), fill=arrow, width=3)
    d.polygon([(228, 158), (240, 165), (228, 172)], fill=arrow)
    # n8n -> sheets
    d.line((356, 145, 424, 134), fill=arrow, width=3)
    d.polygon([(414, 128), (426, 133), (416, 142)], fill=arrow)
    # n8n -> whatsapp
    d.line((356, 185, 424, 222), fill=arrow, width=3)
    d.polygon([(414, 214), (426, 223), (412, 228)], fill=arrow)

    # Footer chips
    rounded(d, (40, 290, 110, 318), 8, (44, 50, 34), ACCENT, 1)
    d.text((54, 297), "n8n", fill=ACCENT, font=f_tiny)
    rounded(d, (122, 290, 220, 318), 8, PANEL_ALT, BORDER, 1)
    d.text((136, 297), "Sheets", fill=MUTED, font=f_tiny)
    rounded(d, (232, 290, 350, 318), 8, PANEL_ALT, BORDER, 1)
    d.text((246, 297), "WhatsApp", fill=MUTED, font=f_tiny)
    rounded(d, (362, 290, 470, 318), 8, PANEL_ALT, BORDER, 1)
    d.text((376, 297), "Webhooks", fill=MUTED, font=f_tiny)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"OK: {OUT}")


if __name__ == "__main__":
    main()
