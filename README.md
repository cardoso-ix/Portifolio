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
| Deploy | GitHub Pages (`main` → `/`) |

## Estrutura

```
Portifolio-EDU/
├── index.html                 # Página principal
├── css/style.css              # Estilos (variáveis CSS, BEM-like)
├── js/main.js                 # Menu, tema, animações, partículas
├── assets/
│   ├── cv_eduardo_cardoso.pdf
│   ├── images/                # Fotos e previews de projetos
│   └── favicon-*              # Ícones gerados
├── conversor-unidades/        # Build estático do Conversor (Vite)
├── scripts/
│   ├── generate_cv.py         # Gera o PDF do currículo
│   ├── generate_favicon.py    # Gera favicons PNG/ICO
│   └── requirements.txt
└── .cursor/                   # MCP e regras do Cursor (opcional)
```

## Visualizar localmente

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000`. O conversor embarcado funciona em `http://localhost:8000/conversor-unidades/`.

## Scripts Python

Instale as dependências:

```bash
pip install -r scripts/requirements.txt
```

Gerar currículo PDF:

```bash
python scripts/generate_cv.py
```

Saídas: `assets/cv_eduardo_cardoso.pdf` e cópia na Área de Trabalho.

Gerar favicons:

```bash
python scripts/generate_favicon.py
```

## Publicar

O repositório remoto é [`cardoso-ix/Portifolio`](https://github.com/cardoso-ix/Portifolio). Push na branch `main` atualiza o GitHub Pages automaticamente.

Após alterar CSS, JS ou PDF, incremente o parâmetro `?v=` nos links em `index.html` para evitar cache.

## Seções do site

1. **Início** — hero, terminal, badges, currículo PDF  
2. **Sobre** — trajetória profissional + Pós Tech Agentes de IA  
3. **Formação** — timeline acadêmica  
4. **Skills** — IA, tecnologia, técnicas, soft skills  
5. **Experiência** — histórico profissional  
6. **Projetos** — portfólio, conversor, FitMind, DigiWorld, etc.  
7. **Contato** — e-mail, GitHub, LinkedIn  

## Licença

Uso livre para fins pessoais e educacionais.
