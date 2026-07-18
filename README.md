# Portfólio — Eduardo Cardoso

Portfólio pessoal em HTML, CSS e JavaScript vanilla. Site de uma página, responsivo, com tema claro/escuro, deploy via **GitHub Pages**.

**Posicionamento:** vaga **CLT** em **suporte técnico** ou **implementação** de automações/IA (n8n, OpenAI, APIs) — mostra o que sabe fazer; não é portfólio de freela.

**Live:** [cardoso-ix.github.io/Portifolio](https://cardoso-ix.github.io/Portifolio/)

## Stack

| Camada | Tecnologia |
|--------|------------|
| Site principal | HTML5, CSS3, JavaScript (vanilla) |
| Fontes | Inter + JetBrains Mono (Google Fonts) |
| Visual | Graphite + oliva (`#a8b87a`), layout centralizado (`88rem`) |
| Subprojeto embarcado | React + Vite (build em `conversor-unidades/`) |
| Scripts auxiliares | Python 3 — Pillow, ReportLab |
| CI | GitHub Actions — verificação de links (Lychee) |
| Deploy | GitHub Pages (`main` → `/`) |

## Estrutura

```
Portifolio/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── cv_eduardo_cardoso.pdf
│   └── images/
├── conversor-unidades/
├── scripts/
│   ├── generate_cv.py
│   ├── generate_favicon.py
│   ├── generate_og_image.py
│   ├── gen_n8n_preview.py
│   ├── gen_pc_dashboard_preview.py
│   ├── font_utils.py
│   ├── format_html.py
│   └── requirements.txt
├── docs/
│   ├── LINKEDIN-PERFIL.md
│   └── AVALIACAO-PERFIL.md
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── 404.html
├── PRODUCT.md
├── DESIGN.md
├── .github/workflows/check-links.yml
└── .cursor/                   # MCP e regras do Cursor (opcional)
```

## Projetos em destaque no site

| Projeto | Demo | Código |
|---------|------|--------|
| Automação LinkedIn com IA | [LinkedIn](https://www.linkedin.com/in/eduardo-cardoso-213a02267) | [GitHub](https://github.com/cardoso-ix/linkedin-automacao-ia) |
| Automações com n8n | — | (fluxo / arquitetura) |
| PC Dashboard | — (app desktop Windows) | [GitHub](https://github.com/cardoso-ix/pc-dashboard) |
| Conversor de Unidades | [GitHub Pages](https://cardoso-ix.github.io/Portifolio/conversor-unidades/) | [GitHub](https://github.com/cardoso-ix/conversor-unidades) |

## Seções do site

1. **Início** — hero (automações/IA), terminal, CTAs (projetos, currículo, contato)
2. **Projetos** — 1 destaque + grade compacta
3. **Sobre** — trajetória, como trabalha, Pós Tech em Agentes de IA
4. **Skills** — em uso, complementares, estudando, soft skills
5. **Formação** — timeline acadêmica
6. **Experiência** — histórico profissional (antigo colapsável)
7. **Contato** — WhatsApp, e-mail, LinkedIn, GitHub, currículo

## Visualizar localmente

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000`. O conversor embarcado funciona em `http://localhost:8000/conversor-unidades/`.

## Scripts Python

```bash
pip install -r scripts/requirements.txt
python scripts/generate_cv.py
python scripts/generate_favicon.py
python scripts/generate_og_image.py
python scripts/gen_n8n_preview.py
python scripts/gen_pc_dashboard_preview.py
python scripts/format_html.py
```

## SEO e qualidade

- **Open Graph** — `assets/images/og-image.png` (1200×630)
- **JSON-LD** — schema `Person` em `index.html`
- **robots.txt** + **sitemap.xml**
- **404.html** — página de erro no GitHub Pages
- **site.webmanifest** — metadados PWA básicos
- **CI** — links (Lychee) + validação HTML

## Documentação

| Arquivo | Conteúdo |
|---------|----------|
| [PRODUCT.md](PRODUCT.md) | Propósito, público e princípios do produto |
| [DESIGN.md](DESIGN.md) | Sistema visual (cores, tipografia, regras) |
| [docs/AVALIACAO-PERFIL.md](docs/AVALIACAO-PERFIL.md) | Avaliação do posicionamento atual |
| [docs/LINKEDIN-PERFIL.md](docs/LINKEDIN-PERFIL.md) | Textos prontos para o LinkedIn (sincronizados com o currículo) |

## Publicar

Repositório: [`cardoso-ix/Portifolio`](https://github.com/cardoso-ix/Portifolio). Push na `main` atualiza o GitHub Pages.

Após alterar CSS, JS ou PDF, incremente `?v=` nos links em `index.html`.

## Licença

Uso livre para fins pessoais e educacionais.
