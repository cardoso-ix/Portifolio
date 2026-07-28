from io import BytesIO
import platform
from pathlib import Path

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Frame, Paragraph

from font_utils import resolve_font

ROOT = Path(__file__).resolve().parent.parent
PHOTO_PATH = ROOT / "assets" / "images" / "foto-cv.png"


def _desktop_cv_path() -> Path:
    if platform.system() == "Windows":
        for folder in ("OneDrive/Área de Trabalho", "Desktop"):
            target = Path.home() / folder / "Eduardo Cardoso.pdf"
            if target.parent.is_dir():
                return target
    return Path.home() / "Desktop" / "Eduardo Cardoso.pdf"


OUTPUT_PATHS = [
    ROOT / "assets" / "cv_eduardo_cardoso.pdf",
    _desktop_cv_path(),
]

PAGE_W, PAGE_H = A4
MARGIN = 12 * mm
SIDEBAR_W = 68 * mm
SIDEBAR_X = 0
CONTENT_X = MARGIN + SIDEBAR_W + 12 * mm
CONTENT_W = PAGE_W - CONTENT_X - MARGIN
PHOTO_SIZE = 34 * mm

SIDEBAR_COLOR = colors.HexColor("#1E293B")
ACCENT_COLOR = colors.HexColor("#0EA5E9")
TEXT_DARK = colors.HexColor("#0F172A")
TEXT_MUTED = colors.HexColor("#475569")
TEXT_LIGHT = colors.HexColor("#64748B")
SIDEBAR_TEXT = colors.HexColor("#E2E8F0")
SIDEBAR_MUTED = colors.HexColor("#94A3B8")
RULE_COLOR = colors.HexColor("#E2E8F0")

CONTACT = [
    ("Telefone", "(49) 99809-5955"),
    ("E-mail", "eduardoocardosoo@gmail.com"),
    ("Endereço", "Rua Paulo VI, 489 - Casa\nCEP 89804-540"),
    ("Nascimento", "20/10/1995"),
    ("Nacionalidade", "Brasileiro"),
    ("Portfólio", "cardoso-ix.github.io/Portifolio/"),
    ("LinkedIn", "linkedin.com/in/eduardo-cardoso-213a02267"),
]

SKILLS = [
    "Suporte técnico e Help Desk",
    "Implementação de automações (n8n)",
    "OpenAI · Prompt Engineering",
    "APIs, Webhooks e integrações",
    "LLMs · RAG · agentes (em formação)",
]

SUMMARY = (
    "Perfil na interseção de suporte técnico e automações com IA: diagnóstico, "
    "atendimento e implementação de fluxos. Experiência em Help Desk (Crescer "
    "Sistemas), prática com n8n, OpenAI, APIs e webhooks, e Pós Tech em Agentes "
    "de IA (FIAP + Alura, em andamento). Foco em apoiar usuários, integrar "
    "ferramentas e manter soluções estáveis."
)

EXPERIENCE = [
    {
        "title": "Técnico de Laboratório de Calibração",
        "company": "Fluxo Metrologia, Chapecó",
        "period": "Julho 2025 — Atual",
        "description": (
            "Técnico responsável pela calibração de instrumentos de medição, emissão "
            "de certificados, gestão de padrões de referência e conformidade "
            "documental conforme normas de qualidade."
        ),
    },
    {
        "title": "Coordenador de Logística",
        "company": "Sandimas, Chapecó, SC",
        "period": "Maio 2023 — Fevereiro 2025",
        "description": (
            "Responsável por planejar, coordenar e controlar as operações logísticas "
            "da empresa, incluindo gestão de transporte, armazenagem, distribuição e "
            "controle de estoque, garantindo eficiência nos processos, cumprimento de "
            "prazos e redução de custos operacionais."
        ),
    },
    {
        "title": "Suporte Técnico Help Desk",
        "company": "Crescer Sistemas, Chapecó, SC",
        "period": "Fevereiro 2022 — Maio 2023",
        "description": (
            "Atendimento a chamados técnicos (N1/N2): diagnóstico e resolução de "
            "problemas de software e hardware, suporte remoto e presencial aos usuários."
        ),
    },
    {
        "title": "Orçamentista",
        "company": "MR Indústria Gráfica, Concórdia, SC",
        "period": "Outubro 2020 — Junho 2021",
        "description": (
            "Responsável por analisar solicitações de clientes e elaborar orçamentos "
            "de produtos gráficos, considerando custos de materiais, processos de "
            "impressão, acabamentos e prazos de produção."
        ),
    },
    {
        "title": "Metrologista",
        "company": "JBS Foods, Jacarezinho, PR",
        "period": "Dezembro 2014 — Dezembro 2019",
        "description": (
            "Responsável por garantir a confiabilidade dos processos de medição "
            "da empresa, executando calibrações, gerenciando padrões de referência, "
            "mantendo a rastreabilidade metrológica."
        ),
    },
]

EDUCATION = [
    {
        "title": "Pós Tech em Agentes de IA",
        "institution": "FIAP + Alura",
        "period": "Jun 2026 — Em andamento",
    },
    {
        "title": "MBA Controladoria e Finanças",
        "institution": "Cruzeiro do Sul",
        "period": "2022",
    },
    {
        "title": "Administração",
        "institution": "Universidade de Franca",
        "period": "2016 — 2020",
    },
    {
        "title": "Indicadores de Pesagem e Normalização",
        "institution": "INMETRO",
        "period": "2014",
    },
    {
        "title": "Automação Industrial",
        "institution": "Senai, Santo Antônio da Platina",
        "period": "2010 — 2012",
    },
]


def register_fonts():
    pdfmetrics.registerFont(TTFont("CV-Regular", str(resolve_font("regular"))))
    pdfmetrics.registerFont(TTFont("CV-Bold", str(resolve_font("bold"))))
    pdfmetrics.registerFontFamily("CV", normal="CV-Regular", bold="CV-Bold")


def escape_xml(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def wrap_sidebar_text(text, font_name, font_size, max_width, c):
    words = text.split()
    lines = []
    current = ""

    for word in words:
        candidate = f"{current} {word}".strip()
        if c.stringWidth(candidate, font_name, font_size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word

    if current:
        lines.append(current)

    return lines


def prepare_profile_photo(path: Path):
    image = Image.open(path).convert("RGB")
    width, height = image.size
    side = min(width, height)
    left = (width - side) // 2
    top = max(0, int((height - side) * 0.12))
    image = image.crop((left, top, left + side, top + side))

    buffer = BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)
    return ImageReader(buffer)


def build_styles():
    return {
        "summary": ParagraphStyle(
            "summary",
            fontName="CV-Regular",
            fontSize=9.5,
            leading=13.5,
            textColor=TEXT_MUTED,
            alignment=TA_JUSTIFY,
            spaceAfter=0,
        ),
        "body": ParagraphStyle(
            "body",
            fontName="CV-Regular",
            fontSize=9,
            leading=12.8,
            textColor=TEXT_MUTED,
            alignment=TA_LEFT,
            spaceAfter=0,
        ),
    }


def draw_flow_text(c, text, x, y, width, height, style):
    frame = Frame(x, y, width, height, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, showBoundary=0)
    story = [Paragraph(escape_xml(text), style)]
    consumed = frame.addFromList(story, c)
    used_height = height - consumed._height if hasattr(consumed, "_height") else 0
    return y + used_height


def measure_paragraph_height(text, width, style):
    paragraph = Paragraph(escape_xml(text), style)
    _, height = paragraph.wrap(width, PAGE_H)
    return height


def draw_profile_photo(c, image_reader):
    sidebar_right = MARGIN + SIDEBAR_W
    photo_x = (sidebar_right - PHOTO_SIZE) / 2
    photo_y = PAGE_H - MARGIN - PHOTO_SIZE
    center_x = photo_x + PHOTO_SIZE / 2
    center_y = photo_y + PHOTO_SIZE / 2
    radius = PHOTO_SIZE / 2

    c.saveState()
    clip = c.beginPath()
    clip.circle(center_x, center_y, radius)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(
        image_reader,
        photo_x,
        photo_y,
        width=PHOTO_SIZE,
        height=PHOTO_SIZE,
        preserveAspectRatio=True,
        anchor="c",
        mask="auto",
    )
    c.restoreState()

    c.setStrokeColor(ACCENT_COLOR)
    c.setLineWidth(1.4)
    c.circle(center_x, center_y, radius, stroke=1, fill=0)


def draw_sidebar(c, image_reader):
    c.setFillColor(SIDEBAR_COLOR)
    c.rect(SIDEBAR_X, 0, MARGIN + SIDEBAR_W, PAGE_H, stroke=0, fill=1)
    draw_profile_photo(c, image_reader)

    x = MARGIN
    text_w = SIDEBAR_W - 6 * mm
    y = PAGE_H - MARGIN - PHOTO_SIZE - 6 * mm

    c.setStrokeColor(ACCENT_COLOR)
    c.setLineWidth(1)
    c.line(x, y, x + text_w, y)
    y -= 8 * mm

    c.setFillColor(SIDEBAR_TEXT)
    c.setFont("CV-Bold", 8.8)
    c.drawString(x, y, "CONTATO")
    y -= 5.5 * mm

    for label, value in CONTACT:
        c.setFillColor(SIDEBAR_MUTED)
        c.setFont("CV-Bold", 7.2)
        c.drawString(x, y, label.upper())
        y -= 3.8 * mm

        c.setFillColor(SIDEBAR_TEXT)
        c.setFont("CV-Regular", 7.8)
        for block in value.split("\n"):
            for line in wrap_sidebar_text(block, "CV-Regular", 7.8, text_w, c):
                c.drawString(x, y, line)
                y -= 3.8 * mm
        y -= 1.8 * mm

    y -= 1 * mm
    c.setFillColor(SIDEBAR_TEXT)
    c.setFont("CV-Bold", 8.8)
    c.drawString(x, y, "HABILIDADES")
    y -= 5.5 * mm

    c.setFont("CV-Regular", 7.8)
    for skill in SKILLS:
        c.setFillColor(ACCENT_COLOR)
        c.circle(x + 1 * mm, y + 1 * mm, 0.7, stroke=0, fill=1)
        c.setFillColor(SIDEBAR_TEXT)

        lines = wrap_sidebar_text(skill, "CV-Regular", 7.8, text_w - 4 * mm, c)
        for index, line in enumerate(lines):
            c.drawString(x + (4 * mm if index == 0 else 0), y, line)
            y -= 3.8 * mm
        y -= 1.4 * mm


def draw_section_title(c, x, y, title):
    c.setFillColor(TEXT_DARK)
    c.setFont("CV-Bold", 10.5)
    c.drawString(x, y, title.upper())
    y -= 3.5 * mm
    c.setStrokeColor(ACCENT_COLOR)
    c.setLineWidth(0.8)
    c.line(x, y, x + 30 * mm, y)
    return y - 6 * mm


def draw_experience_item(c, x, y, item, width, styles):
    period = item["period"]
    title = item["title"]

    c.setFillColor(TEXT_DARK)
    c.setFont("CV-Bold", 9.6)
    c.drawString(x, y, title)

    c.setFillColor(TEXT_LIGHT)
    c.setFont("CV-Regular", 8.2)
    c.drawRightString(x + width, y + 0.2 * mm, period)
    y -= 4.5 * mm

    c.setFillColor(TEXT_MUTED)
    c.setFont("CV-Regular", 8.6)
    c.drawString(x, y, item["company"])
    y -= 5 * mm

    body_height = measure_paragraph_height(item["description"], width, styles["body"])
    draw_flow_text(c, item["description"], x, y - body_height, width, body_height + 2 * mm, styles["body"])
    y -= body_height + 4 * mm

    c.setStrokeColor(RULE_COLOR)
    c.setLineWidth(0.5)
    c.line(x, y, x + width, y)
    return y - 4 * mm


def draw_education_item(c, x, y, item, width):
    c.setFillColor(TEXT_DARK)
    c.setFont("CV-Bold", 9.3)
    c.drawString(x, y, item["title"])

    c.setFillColor(TEXT_LIGHT)
    c.setFont("CV-Regular", 8.2)
    c.drawRightString(x + width, y + 0.2 * mm, item["period"])
    y -= 4.5 * mm

    c.setFillColor(TEXT_MUTED)
    c.setFont("CV-Regular", 8.6)
    c.drawString(x, y, item["institution"])
    return y - 5.5 * mm


def build_pdf(path: Path):
    c = canvas.Canvas(str(path), pagesize=A4)
    c.setTitle("Currículo - Eduardo Cardoso")
    c.setAuthor("Eduardo Cardoso")

    register_fonts()
    styles = build_styles()
    image_reader = prepare_profile_photo(PHOTO_PATH)

    draw_sidebar(c, image_reader)

    x = CONTENT_X
    width = CONTENT_W
    y = PAGE_H - MARGIN

    c.setFillColor(TEXT_DARK)
    c.setFont("CV-Bold", 20)
    c.drawString(x, y - 2 * mm, "Eduardo Cardoso")
    y -= 11 * mm

    c.setStrokeColor(RULE_COLOR)
    c.setLineWidth(0.6)
    c.line(x, y, x + width, y)
    y -= 7 * mm

    summary_height = measure_paragraph_height(SUMMARY, width, styles["summary"])
    draw_flow_text(c, SUMMARY, x, y - summary_height, width, summary_height + 2 * mm, styles["summary"])
    y -= summary_height + 7 * mm

    y = draw_section_title(c, x, y, "Experiência profissional")
    for item in EXPERIENCE:
        y = draw_experience_item(c, x, y, item, width, styles)

    y -= 1 * mm
    y = draw_section_title(c, x, y, "Educação")
    for item in EDUCATION:
        y = draw_education_item(c, x, y, item, width)

    c.showPage()
    c.save()


def main():
    for output in OUTPUT_PATHS:
        output.parent.mkdir(parents=True, exist_ok=True)
        build_pdf(output)
        print(f"Gerado: {output}")


if __name__ == "__main__":
    main()
