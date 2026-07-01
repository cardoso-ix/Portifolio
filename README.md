# Portfólio — Eduardo Cardoso

Portfólio pessoal em HTML, CSS e JavaScript vanilla. Site de uma página, responsivo, com tema claro/escuro, deploy via **GitHub Pages**.

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
Portifolio-EDU/
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

| Projeto | Demo |
|---------|------|
| Mentor de Gestão Industrial | [Demo no Hugging Face](https://huggingface.co/spaces/duzinxd/mentor-gestao-industrial) |
| Conversor de Unidades | [cardoso-ix.github.io/Portifolio/conversor-unidades](https://cardoso-ix.github.io/Portifolio/conversor-unidades/) |
| Portfólio Pessoal | [cardoso-ix.github.io/Portifolio](https://cardoso-ix.github.io/Portifolio/) |

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

1. **Início** — hero, terminal, currículo PDF  
2. **Sobre** — trajetória + Pós Tech Agentes de IA  
3. **Formação** — timeline acadêmica  
4. **Experiência** — histórico profissional (histórico antigo colapsável)  
5. **Skills** — IA, tecnologia, técnicas, soft skills  
6. **Projetos** — Mentor de Gestão Industrial, portfólio, conversor  
7. **Contato** — e-mail, WhatsApp, LinkedIn, GitHub  

## Cursor MCP (opcional)

Copie `.cursor/mcp.json.example` para `.cursor/mcp.json` e substitua o token do GitHub. Reinicie o Cursor e ative em **Settings → Tools & MCP**.

## Licença

Uso livre para fins pessoais e educacionais.
