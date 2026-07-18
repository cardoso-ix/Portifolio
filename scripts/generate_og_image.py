"""Gera imagem Open Graph 1200x630 para compartilhamento social."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from font_utils import resolve_font

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "assets" / "images" / "og-image.png"
PHOTO = ROOT / "assets" / "images" / "foto.png"
SIZE = (1200, 630)

BG = (17, 18, 17)
PANEL = (31, 32, 30)
CYAN = (168, 184, 122)
TEXT = (238, 240, 234)
MUTED = (154, 158, 147)


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(resolve_font("bold" if bold else "regular")), size)


def draw_round_photo(base: Image.Image, photo_path: Path, center: tuple[int, int], radius: int) -> None:
    photo = Image.open(photo_path).convert("RGBA")
    photo = photo.resize((radius * 2, radius * 2), Image.Resampling.LANCZOS)

    mask = Image.new("L", photo.size, 0)
    ImageDraw.Draw(mask).ellipse((0, 0, photo.width - 1, photo.height - 1), fill=255)
    photo.putalpha(mask)

    x = center[0] - radius
    y = center[1] - radius
    base.paste(photo, (x, y), photo)

    ring = ImageDraw.Draw(base)
    ring.ellipse(
        (x - 6, y - 6, x + radius * 2 + 6, y + radius * 2 + 6),
        outline=CYAN,
        width=4,
    )


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    img = Image.new("RGB", SIZE, BG)
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle((48, 48, SIZE[0] - 48, SIZE[1] - 48), radius=28, fill=PANEL)
    draw.line((72, 140, SIZE[0] - 72, 140), fill=CYAN, width=2)

    title_font = load_font(58, bold=True)
    sub_font = load_font(30)
    tag_font = load_font(24)

    draw.text((72, 72), "<EduCardoso />", font=tag_font, fill=CYAN)
    draw.text((72, 180), "Eduardo Cardoso", font=title_font, fill=TEXT)
    draw.text((72, 268), "Suporte técnico e implementação de IA", font=sub_font, fill=MUTED)
    draw.text((72, 320), "n8n · OpenAI · APIs · Vaga CLT", font=sub_font, fill=MUTED)
    draw.text((72, 390), "cardoso-ix.github.io/Portifolio", font=tag_font, fill=CYAN)

    if PHOTO.is_file():
        draw_round_photo(img, PHOTO, (980, 340), 150)

    img.save(OUTPUT, format="PNG", optimize=True)
    print(f"Gerado: {OUTPUT}")


if __name__ == "__main__":
    main()
