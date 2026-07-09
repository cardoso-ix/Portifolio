"""Gera PNG de preview do PC Dashboard para o portfólio."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / "assets" / "images" / "pc-dashboard-preview.png"
W, H = 640, 360

img = Image.new("RGB", (W, H), "#121417")
d = ImageDraw.Draw(img)

try:
    fxs = ImageFont.truetype("segoeui.ttf", 9)
    fsm = ImageFont.truetype("segoeui.ttf", 11)
    fmd = ImageFont.truetype("segoeuib.ttf", 14)
    fmono = ImageFont.truetype("consola.ttf", 10)
except OSError:
    fxs = fsm = fmd = fmono = ImageFont.load_default()

# Window
d.rounded_rectangle((16, 16, 624, 344), radius=12, fill="#1a1d21", outline="#2a2e33")
d.rounded_rectangle((16, 16, 624, 44), radius=12, fill="#222529")
d.rectangle((16, 32, 624, 44), fill="#222529")
d.ellipse((31, 25, 41, 35), fill="#e01e5a")
d.ellipse((49, 25, 59, 35), fill="#ecb22e")
d.ellipse((67, 25, 77, 35), fill="#2eb67d")
d.text((96, 26), "PC Dashboard", fill="#9b9b9e", font=fsm)

# Rail
d.rectangle((16, 44, 60, 344), fill="#1a0d1f")
d.ellipse((26, 60, 50, 84), fill="#3f0e40", outline="#1d9bd1")
d.rounded_rectangle((30, 100, 46, 116), radius=4, fill="#1d9bd1")
d.rounded_rectangle((30, 128, 46, 144), radius=4, fill="#4a4a4e")
d.rounded_rectangle((30, 156, 46, 172), radius=4, fill="#3a3a3e")

# Sidebar
d.rectangle((60, 44, 240, 344), fill="#3f0e40")
d.rectangle((60, 44, 240, 84), fill="#350d36")
d.text((76, 58), "PC Dashboard", fill="#ffffff", font=fmd)
d.text((76, 96), "CANAIS", fill="#8a6a8c", font=fxs)
d.rounded_rectangle((72, 112, 228, 138), radius=6, fill="#5a2a5b")
d.text((84, 120), "# modo-dev", fill="#ffffff", font=fmono)
for y, label in [(152, "# git-sync"), (180, "# organizar-downloads"), (208, "# limpar-temp"), (236, "# abrir-projetos")]:
    d.text((84, y), label, fill="#c9a8ca", font=fmono)
d.text((76, 272), "APPS", fill="#8a6a8c", font=fxs)
d.text((84, 292), "# github", fill="#c9a8ca", font=fmono)

# Main
d.rectangle((240, 44, 624, 344), fill="#1a1d21")
d.text((260, 58), "# modo-dev", fill="#ffffff", font=fmd)
d.text((260, 80), "Atividade · status do sistema", fill="#9b9b9e", font=fxs)

d.ellipse((262, 118, 282, 138), fill="#2eb67d")
d.text((292, 116), "PC Dashboard", fill="#d1d2d3", font=fsm)
d.text((292, 134), "Modo Dev ativado com sucesso.", fill="#d1d2d3", font=fsm)

d.ellipse((262, 168, 282, 188), fill="#1d9bd1")
d.text((292, 166), "Sistema", fill="#d1d2d3", font=fsm)
d.text((292, 184), "Disco C: 42% · RAM 61% · CPU 18%", fill="#d1d2d3", font=fsm)

d.ellipse((262, 218, 282, 238), fill="#ecb22e")
d.text((292, 216), "Git Sync", fill="#d1d2d3", font=fsm)
d.text((292, 234), "3 repositorios sincronizados.", fill="#d1d2d3", font=fsm)

# Status
d.rectangle((240, 312, 624, 344), fill="#222529")
d.rounded_rectangle((256, 322, 326, 334), radius=3, fill="#1a3a2a")
d.text((264, 323), "ONLINE", fill="#2eb67d", font=fxs)
d.text((340, 323), "C: 42%  RAM 61%  CPU 18%", fill="#9b9b9e", font=fxs)
d.text((560, 323), "v1.4.0", fill="#1d9bd1", font=fxs)

OUT.parent.mkdir(parents=True, exist_ok=True)
img.save(OUT, "PNG", optimize=True)
print(f"OK: {OUT}")
