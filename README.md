# Portfólio — Eduardo Cardoso

<p align="left">
  <a href="https://cardoso-ix.github.io/Portifolio/"><img src="https://img.shields.io/badge/Live%20Demo-cardoso--ix.github.io-a8b87a?style=flat-square&logo=github" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20Vanilla-1a1c1a?style=flat-square&logo=javascript" alt="Stack">
  <img src="https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-68b068?style=flat-square" alt="WCAG AA Compliant">
  <img src="https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=flat-square&logo=github-pages" alt="GitHub Pages">
  <img src="https://img.shields.io/badge/License-Uso%20Livre-lightgrey?style=flat-square" alt="License">
</p>

Portfólio pessoal e profissional de **Eduardo Cardoso**, construído com tecnologias web fundamentais (HTML5, CSS3 e JavaScript Vanilla), priorizando performance instantânea, acessibilidade (WCAG 2.1 AA) e design contemporâneo elevado.

- **Posicionamento:** Perfil técnico com atuação na fronteira entre **suporte técnico** (atendimento N1/N2, diagnóstico de incidentes, help desk) e **automações inteligentes com IA** (n8n, OpenAI, APIs REST, webhooks e orquestração).
- **Ambiente de Produção:** [cardoso-ix.github.io/Portifolio](https://cardoso-ix.github.io/Portifolio/)

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias |
|---|---|
| **Página Principal** | HTML5 semântico, CSS3 moderno (Custom Properties / Design Tokens), JavaScript ES6+ Vanilla |
| **Tipografia** | Inter (leitura e UI) + JetBrains Mono (código, terminal e metadados) |
| **Design System** | *Quiet Graphite Olive* — superfícies graphite (`#0e0f0e`), acento oliva suave (`#a8b87a`), glassmorphism e dark/light mode nativo |
| **Integrações & Demos** | Deploy em nuvem (Railway 24/7, Vercel, Hugging Face Spaces) e repositórios oficiais |
| **Scripts de Automação** | Python 3 (Pillow, ReportLab) para geração programática do CV em PDF e favicons |
| **CI / CD** | GitHub Actions (validação HTML com `html-validate` e verificação de links com `lychee`) |
| **Hospedagem** | GitHub Pages com deploy automático a partir da branch `main` |

---

## 🚀 Projetos em Destaque

| Projeto | Descrição & Stack | Demonstração | Código Fonte |
|---|---|---|---|
| **Automação LinkedIn com IA** | Fluxo de publicação e engajamento: envio sob comando via Telegram (Hermes) e respostas automáticas a comentários via LinkedIn API e DeepSeek-V4-Flash. <br>`n8n · Hermes · DeepSeek-V4-Flash · LinkedIn API · Telegram` | [Perfil LinkedIn](https://www.linkedin.com/in/eduardo-cardoso-213a02267) | [GitHub](https://github.com/cardoso-ix/linkedin-automacao-ia) |
| **LP Soluções — Site & Agendamento** | Site institucional para serviços elétricos com agendamento online inteligente direto no Google Calendar (Next.js 16 sem VPS), notificações via WhatsApp/E-mail e contrato digital. <br>`Next.js 16 · React 19 · TypeScript · Google Calendar · Tailwind CSS · Vercel` | [Demo Online](https://lp-solucoes.vercel.app) | — (Cliente) |
| **Replicador de Ofertas — Pokémon TCG** | Plataforma autônoma em nuvem (Railway) para monitoramento 24/7 de grupos, interceptação de links, conversão para Mercado Livre Afiliados (meli.la) e replicação com Baileys. <br>`Node.js 22 LTS · TypeScript · Baileys · Mercado Livre API · Docker · Railway` | [Painel Online](https://promo-replica-bot-production.up.railway.app) | [GitHub](https://github.com/cardoso-ix/promo-pokemon-tcg) |
| **Disparador WhatsApp & Atendimento IA** | Captação de leads de grupos em 1 clique, disparos em massa com motor anti-ban e Spintax, simulador de WhatsApp ao vivo e atendimento privado humanizado com DeepSeek V4. <br>`Node.js · TypeScript · DeepSeek V4 · OpenCode · Spintax Anti-Ban · Fastify` | [Painel Online](https://bot-disparador-ia-production.up.railway.app) | [GitHub](https://github.com/cardoso-ix/promo-pokemon-tcg) |
| **Mentor de Gestão Industrial** | Sistema multi-agente para supervisores de manutenção: parecer executivo estruturado, comunicação SBI e plano 24h. <br>`CrewAI · OpenRouter · RAG · ChromaDB · Streamlit` | [Demo no Spaces](https://duzinxd-mentor-gestao-industrial.hf.space) | [GitHub](https://github.com/cardoso-ix/mentor-gestao-industrial) |

*Para o inventário completo e detalhado de repositórios, consulte [docs/PROJETOS-GITHUB.md](docs/PROJETOS-GITHUB.md).*

---

## 📁 Estrutura do Repositório

```
Portifolio/
├── index.html                  # Estrutura principal do portfólio
├── 404.html                    # Página 404 personalizada para GitHub Pages
├── robots.txt                  # Diretrizes para indexadores
├── sitemap.xml                 # Mapa do site para SEO
├── site.webmanifest            # Manifesto PWA e ícones de atalho
├── css/
│   └── style.css               # Folha de estilos unificada (Design System)
├── js/
│   └── main.js                 # Lógica de interatividade (tema, scroll, clipboard)
├── assets/
│   ├── cv_eduardo_cardoso.pdf  # Currículo canônico em formato PDF
│   ├── favicon-*.png / .svg    # Conjunto de ícones para navegadores e dispositivos
│   └── images/
│       ├── foto.png            # Foto de perfil utilizada no hero e OpenGraph
│       ├── og-image.png        # Imagem de compartilhamento social (1200×630)
│       ├── linkedin-banner.png # Banner personalizado para o LinkedIn
│       └── *-preview.*         # Capturas e ilustrações dos projetos
├── docs/                       # Documentação técnica e de posicionamento
│   ├── ARCHITECTURE.md         # Detalhamento da arquitetura técnica e código
│   ├── PROJETOS-GITHUB.md      # Inventário completo dos repositórios
│   ├── LINKEDIN-PERFIL.md      # Kit de perfil e textos para LinkedIn
│   └── AVALIACAO-PERFIL.md     # Análise de posicionamento profissional
├── scripts/                    # Scripts auxiliares em Python
│   ├── format_html.py          # Formatador e limpador do HTML
│   ├── generate_cv.py          # Gerador do PDF do currículo
│   ├── generate_favicon.py     # Gerador de favicons a partir do SVG
│   ├── generate_og_image.py    # Gerador da imagem OpenGraph
│   └── requirements.txt        # Dependências Python dos scripts
└── .github/workflows/
    └── check-links.yml         # Workflow de validação de links e HTML
```

---

## 💻 Executando Localmente

Como o projeto é construído em HTML/CSS/JS estático, você pode executá-lo com qualquer servidor HTTP local:

```bash
# Com Python 3
python -m http.server 8000

# Ou com Node.js (via npx)
npx --yes serve .
```

Abra seu navegador em `http://localhost:8000` para visualizar o portfólio completo com todas as seções e demos interativas.

---

## ⚙️ Scripts Utilitários (Python)

Para gerar novos artefatos visuais ou atualizar o currículo em PDF:

```bash
# 1. Instale as dependências
pip install -r scripts/requirements.txt

# 2. Execute os scripts conforme necessário
python scripts/generate_cv.py              # Gera assets/cv_eduardo_cardoso.pdf
python scripts/generate_favicon.py         # Gera os ícones e favicons
python scripts/generate_og_image.py        # Gera assets/images/og-image.png
python scripts/generate_linkedin_banner.py # Gera assets/images/linkedin-banner.png
python scripts/format_html.py              # Formata e organiza o index.html
```

---

## 📚 Documentação Adicional

- 📐 **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**: Especificação detalhada da arquitetura, acessibilidade e ciclo de vida do JavaScript.
- 📦 **[docs/PROJETOS-GITHUB.md](docs/PROJETOS-GITHUB.md)**: Inventário completo de repositórios, dependências e status.
- 💼 **[docs/LINKEDIN-PERFIL.md](docs/LINKEDIN-PERFIL.md)**: Textos validados para o perfil no LinkedIn.
- 🎯 **[PRODUCT.md](PRODUCT.md)**: Declaração de propósito, usuário-alvo e princípios do portfólio.
- 🎨 **[DESIGN.md](DESIGN.md)**: Tokens visuais do tema Quiet Graphite Olive.

---

## 🚢 Deploy e Publicação

O deploy é gerenciado automaticamente pelo **GitHub Pages**. Qualquer alteração enviada (`push`) para a branch `main` atualiza o site ao vivo em poucos segundos.

> [!TIP]
> Ao atualizar arquivos CSS, JS, PDF ou fotos, incremente o parâmetro de cache (`?v=XX`) nas tags correspondentes em `index.html` para que os visitantes recebam a versão atualizada imediatamente.

---

## 📄 Licença

Uso pessoal e livre para fins educacionais. Desenvolvido por Eduardo Cardoso.
