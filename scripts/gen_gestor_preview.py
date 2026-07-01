"""Gera PNG de preview do Mentor para o portfólio."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / "assets" / "images" / "gestor-preview.png"
W, H = 640, 360

img = Image.new("RGB", (W, H), "#0a0e17")
d = ImageDraw.Draw(img)

d.rounded_rectangle((24, 24, 616, 336), radius=16, outline="#3d2818", width=1, fill="#12151c")

for y in range(48, 120):
    t = (y - 48) / 72
    r = int(74 + t * 48)
    g = int(47 + t * 22)
    b = int(26 + t * 6)
    d.line([(48, y), (592, y)], fill=(r, g, b))

try:
    fxs = ImageFont.truetype("segoeui.ttf", 10)
    fsm = ImageFont.truetype("segoeui.ttf", 11)
    fmd = ImageFont.truetype("segoeuib.ttf", 20)
except OSError:
    fxs = fsm = fmd = ImageFont.load_default()

d.text((64, 56), "FERRAMENTA DE APOIO - MANUTENCAO INDUSTRIAL", fill="#fff3e8", font=fxs)
d.text((64, 76), "Mentor de Gestao Industrial", fill="#ffffff", font=fmd)

d.rounded_rectangle((48, 136, 592, 284), radius=12, outline="#2a3038", width=1, fill="#161a22")
d.rounded_rectangle((64, 152, 184, 180), radius=8, outline="#e67e22", width=1, fill="#3d2818")
d.text((78, 158), "1 Tipo", fill="#f5e6d8", font=fsm)

for x, label in [(192, "2 Detalhes"), (320, "3 Contexto")]:
    d.rounded_rectangle((x, 152, x + 120, 180), radius=8, outline="#2a3038", width=1, fill="#1a1f28")
    d.text((x + 14, 158), label, fill="#8a9baa", font=fsm)

for x, label in [(64, "Lideranca"), (236, "Comunicacao"), (408, "Seguranca")]:
    d.rounded_rectangle((x, 196, x + 160, 228), radius=8, outline="#2a3038", width=1, fill="#1a1f28")
    d.text((x + 14, 204), label, fill="#94a3b8", font=fsm)

d.rounded_rectangle((64, 248, 244, 276), radius=8, fill="#e67e22")
d.text((154, 256), "Gerar orientacao", fill="#ffffff", font=fsm, anchor="mm")
d.text((48, 308), "CrewAI + Groq + RAG + Streamlit + multi-agente", fill="#64748b", font=fxs)

OUT.parent.mkdir(parents=True, exist_ok=True)
img.save(OUT, "PNG", optimize=True)
print(f"OK: {OUT}")
