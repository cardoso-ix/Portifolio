"""Gera capa LinkedIn 1584x396 alinhada à identidade do portfólio."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

from font_utils import resolve_font

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "assets" / "images" / "linkedin-banner.png"
BG_CANDIDATES = [
    ROOT / "assets" / "images" / "linkedin-banner-bg.png",
    Path("/tmp/linkedin-banner-bg.png"),
]

# LinkedIn recommended
SIZE = (1584, 396)

BG = (17, 18, 17)
PANEL = (28, 30, 27)
OLIVE = (168, 184, 122)
TEXT = (238, 240, 234)
MUTED = (154, 158, 147)
SOFT = (42, 46, 40)


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(resolve_font("bold" if bold else "regular")), size)


def find_generated_bg() -> Path | None:
    for path in BG_CANDIDATES:
        if path.is_file():
            return path
    # Cursor GenerateImage often writes under /opt/cursor/artifacts or home
    for folder in (
        Path("/opt/cursor/artifacts"),
        Path.home() / ".cursor",
        Path("/tmp"),
    ):
        if not folder.exists():
            continue
        matches = sorted(folder.rglob("*linkedin-banner-bg*.png"), key=lambda p: p.stat().st_mtime, reverse=True)
        if matches:
            return matches[0]
    return None


def make_base() -> Image.Image:
    img = Image.new("RGB", SIZE, BG)
    draw = ImageDraw.Draw(img)

    # Soft olive wash from left
    for x in range(SIZE[0]):
        t = x / SIZE[0]
        r = int(BG[0] + (SOFT[0] - BG[0]) * (1 - t) * 0.55)
        g = int(BG[1] + (SOFT[1] - BG[1]) * (1 - t) * 0.55)
        b = int(BG[2] + (SOFT[2] - BG[2]) * (1 - t) * 0.55)
        draw.line([(x, 0), (x, SIZE[1])], fill=(r, g, b))

    # Right-side abstract nodes (automation / support network)
    nodes = [
        (1180, 90), (1280, 140), (1380, 100), (1460, 170),
        (1220, 230), (1330, 260), (1430, 240), (1500, 300),
        (1260, 320),
    ]
    for i, (x1, y1) in enumerate(nodes):
        for j, (x2, y2) in enumerate(nodes):
            if 0 < abs(i - j) <= 2:
                draw.line([(x1, y1), (x2, y2)], fill=(70, 78, 60), width=1)
    for x, y in nodes:
        draw.ellipse((x - 5, y - 5, x + 5, y + 5), fill=OLIVE)
        draw.ellipse((x - 10, y - 10, x + 10, y + 10), outline=(90, 100, 75), width=1)

    return img


def blend_atmosphere(base: Image.Image, bg_path: Path) -> Image.Image:
    atm = Image.open(bg_path).convert("RGB")
    atm = atm.resize(SIZE, Image.Resampling.LANCZOS)
    # Darken slightly so text stays readable
    overlay = Image.new("RGB", SIZE, BG)
    atm = Image.blend(atm, overlay, 0.42)
    return Image.blend(base, atm, 0.55)


def apply_profile_safe_fade(img: Image.Image) -> Image.Image:
    """Escurece levemente o canto inferior esquerdo (área da foto de perfil)."""
    rgba = img.convert("RGBA")
    fade = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    fade_draw = ImageDraw.Draw(fade)
    for y in range(270, SIZE[1]):
        alpha = int(110 * ((y - 270) / max(1, SIZE[1] - 270)))
        fade_draw.line([(0, y), (440, y)], fill=(17, 18, 17, alpha))
    return Image.alpha_composite(rgba, fade).convert("RGB")


def draw_text(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img)

    # Conteúdo à esquerda, acima da zona da foto de perfil no LinkedIn
    tag_font = load_font(26, bold=True)
    title_font = load_font(46, bold=True)
    sub_font = load_font(28)
    small_font = load_font(22)

    draw.rounded_rectangle((72, 58, 78, 300), radius=3, fill=OLIVE)
    draw.text((104, 62), "<EduCardoso />", font=tag_font, fill=OLIVE)
    draw.text((104, 118), "Suporte técnico · Automações com IA", font=title_font, fill=TEXT)
    draw.text((104, 186), "n8n  ·  OpenAI  ·  APIs  ·  Help Desk", font=sub_font, fill=MUTED)
    draw.text((104, 238), "Chapecó, SC  ·  cardoso-ix.github.io/Portifolio", font=small_font, fill=(120, 126, 112))


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    base = make_base()

    bg_path = find_generated_bg()
    if bg_path is not None:
        base = blend_atmosphere(base, bg_path)
        print(f"Atmosfera: {bg_path}")
    else:
        print("Atmosfera: fallback geométrico (sem BG gerado)")

    base = apply_profile_safe_fade(base)
    draw_text(base)
    base.save(OUTPUT, format="PNG", optimize=True)
    print(f"Gerado: {OUTPUT} ({SIZE[0]}x{SIZE[1]})")


if __name__ == "__main__":
    main()
