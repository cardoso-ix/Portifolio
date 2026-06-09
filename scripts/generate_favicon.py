from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
FONT = Path(r"C:\Windows\Fonts\arialbd.ttf")
BG = (5, 8, 16, 255)
BG_INNER = (13, 21, 37, 255)
CYAN = (0, 212, 255, 255)
CYAN_LIGHT = (92, 225, 255, 255)
MAGENTA = (191, 0, 255, 255)


def draw_icon(size: int) -> Image.Image:
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    radius = max(4, size // 5)
    padding = max(1, size // 16)

    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=BG)
    draw.rounded_rectangle(
        (padding, padding, size - padding - 1, size - padding - 1),
        radius=max(3, radius - 2),
        fill=BG_INNER,
        outline=CYAN,
        width=max(1, size // 24),
    )

    glow = max(1, size // 32)
    draw.rounded_rectangle(
        (padding * 2, padding * 2, size - padding * 2 - 1, size - padding * 2 - 1),
        radius=max(2, radius - 4),
        outline=MAGENTA,
        width=glow,
    )

    font_size = int(size * 0.42)
    font = ImageFont.truetype(str(FONT), font_size)
    text = "EC"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (size - text_w) / 2 - bbox[0]
    y = (size - text_h) / 2 - bbox[1] - size * 0.03
    draw.text((x + 1, y + 1), text, font=font, fill=(0, 80, 110, 180))
    draw.text((x, y), text, font=font, fill=CYAN_LIGHT)
    return image


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    sizes = {
        "favicon-16.png": 16,
        "favicon-32.png": 32,
        "favicon-48.png": 48,
        "apple-touch-icon.png": 180,
    }

    icons = []
    for name, size in sizes.items():
        icon = draw_icon(size)
        icon.save(ASSETS / name)
        icons.append(icon)
        print(f"Gerado: {ASSETS / name}")

    ico_path = ROOT / "favicon.ico"
    icons[1].save(
        ico_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[icons[0], icons[2]],
    )
    print(f"Gerado: {ico_path}")

    icons[1].save(ASSETS / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)], append_images=[icons[0], icons[2]])
    print(f"Gerado: {ASSETS / 'favicon.ico'}")


if __name__ == "__main__":
    main()
