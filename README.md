# Portfólio — Eduardo Cardoso

Portfólio pessoal em HTML, CSS e JavaScript vanilla. Site de uma página, responsivo, com tema claro/escuro, deploy via **GitHub Pages**. Posicionamento: **projetos de automações com n8n, Make e IA** (LLMs, APIs, integrações).

**Live:** [cardoso-ix.github.io/Portifolio](https://cardoso-ix.github.io/Portifolio/)

## Stack

| Camada | Tecnologia |
|--------|------------|
| Site principal | HTML5, CSS3, JavaScript (vanilla) |
| Fontes | Inter + JetBrains Mono (Google Fonts) |
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
│   ├── font_utils.py
│   ├── format_html.py
│   └── requirements.txt
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── 404.html
├── .github/workflows/check-links.yml
└── .cursor/                   # MCP e regras do Cursor (opcional)
```

## Projetos em destaque no site

| Projeto | Demo | Código |
|---------|------|--------|
| Automação LinkedIn com IA | [LinkedIn](https://www.linkedin.com/in/eduardo-cardoso-213a02267) | [GitHub](https://github.com/cardoso-ix/linkedin-automacao-ia) |
| PC Dashboard | — (app desktop Windows) | [GitHub](https://github.com/cardoso-ix/pc-dashboard) |
| Conversor de Unidades | [GitHub Pages](https://cardoso-ix.github.io/Portifolio/conversor-unidades/) | [GitHub](https://github.com/cardoso-ix/conversor-unidades) |

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
python scripts/format_html.py
```

## SEO e qualidade

- **Open Graph** — `assets/images/og-image.png` (1200×630, gerado por script)
- **JSON-LD** — schema `Person` em `index.html`
- **robots.txt** + **sitemap.xml** — indexação
- **404.html** — erro personalizado no GitHub Pages
- **site.webmanifest** — metadados PWA básicos
- **CI** — links (Lychee) + validação HTML

## Publicar

Repositório remoto: [`cardoso-ix/Portifolio`](https://github.com/cardoso-ix/Portifolio). Push na branch `main` atualiza o GitHub Pages e dispara a verificação de links.

Após alterar CSS, JS ou PDF, incremente o parâmetro `?v=` nos links em `index.html` para evitar cache.

## Seções do site

1. **Início** — hero com foco em automações/IA, terminal e CTAs (projetos, currículo, contato)  
2. **Projetos** — destaque + grade compacta (LinkedIn, leads, PC Dashboard, conversor)  
3. **Sobre** — trajetória, como trabalha e Pós Tech em Agentes de IA  
4. **Skills** — stack em uso, complementares, estudando, soft skills  
5. **Formação** — timeline acadêmica  
6. **Experiência** — histórico profissional (histórico antigo colapsável)  
7. **Contato** — e-mail, WhatsApp, LinkedIn, GitHub, currículo  


## Cursor MCP (opcional)

Copie `.cursor/mcp.json.example` para `.cursor/mcp.json` e substitua o token do GitHub. Reinicie o Cursor e ative em **Settings → Tools & MCP**.

## Licença

Uso livre para fins pessoais e educacionais.
