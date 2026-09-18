# Arquitetura Técnica — Portfólio Eduardo Cardoso

Documento de especificação técnica e decisões de arquitetura para o portfólio pessoal e institucional de Eduardo Cardoso.

---

## 1. Visão Geral e Princípios

O projeto foi concebido para máxima **performance**, **acessibilidade** e **independência de dependências pesadas**:

- **Stack Base:** HTML5 semântico, CSS3 moderno (Custom Properties / Design Tokens) e JavaScript vanilla (ES6+ modular).
- **Sem Frameworks no Site Principal:** Ausência de React, Vue, jQuery ou Tailwind no envelope principal — garantindo carregamento instantâneo (Time to Interactive < 0.4s) e pontuação de performance próxima a 100 no Lighthouse.
- **Acessibilidade (A11y):** Conformidade estrita com as diretrizes **WCAG 2.1 nível AA**:
  - Contraste de cores testado e validado em ambos os temas (escuro e claro).
  - Ancoragem suave universal com `scroll-margin-top` nas seções para evitar sobreposição do header fixo.
  - Efeito de digitação com texto estático para leitores de tela (`.sr-only` e `aria-hidden="true"`).
  - Suporte completo a navegação por teclado (foco visível, `Escape` para fechar o menu mobile).
  - Respeito total à preferência `prefers-reduced-motion: reduce`.

---

## 2. Sistema de Design (Quiet Graphite Olive)

O design visual segue a diretriz **Quiet Graphite Olive** com inspiração em terminais modernos e ferramentas de desenvolvimento de alto padrão:

### Paleta de Cores & Tokens

| Token | Dark Mode (Padrão) | Light Mode | Propósito |
|---|---|---|---|
| `--color-bg` | `#090a09` (Obsidian) | `#f7f8f4` (Warm Porcelain) | Cor de fundo primária da página com grade matricial |
| `--color-surface` | `#151715` | `#ffffff` | Fundo de cartões e blocos elevados |
| `--color-border` | `#2d302c` | `#d5d9ce` | Bordas e divisores estruturais |
| `--color-accent` | `#b6cb7c` (Cyber Olive) | `#3f5620` (Deep Forest Olive) | Cor de destaque, números de seção, links e CTAs |
| `--color-text` | `#f4f6f0` | `#131611` | Tipografia principal |
| `--color-text-secondary` | `#b2b7ac` | `#464b40` | Subtítulos e prosa longa |
| `--color-success` | `#34d399` | `#1b7a3a` | Badges de status ativo e prompts de comando |

### Tipografia

- **UI & Leitura:** `Inter` (Google Fonts), com fallback para o sistema operacional (`system-ui, -apple-system, sans-serif`).
- **Terminal & Dados Técnicos:** `JetBrains Mono` (Google Fonts), usado em tags, badges, números de seção e variáveis de status (`status.json`).

---

## 3. Estrutura de Arquivos

```
Portifolio/
├── index.html                  # Página principal e ponto de entrada semântico
├── 404.html                    # Página de erro para GitHub Pages
├── robots.txt                  # Instruções para crawlers de busca
├── sitemap.xml                 # Mapeamento do site para indexação
├── site.webmanifest            # Metadados de PWA e ícones móveis
├── css/
│   ├── style.css               # Design system unificado sem dependências (Quiet Olive)
│   └── creative.css            # Camada visual avançada (HUD, scanner, spotlight, command palette)
├── js/
│   ├── main.js                 # Lógica de tema, navegação, scroll e clipboard
│   ├── animations.js           # Orquestração GSAP, spotlight reativo ao cursor e Matrix Decrypt
│   ├── webgl-scene.js          # Cena 3D Three.js com geometrias flutuantes e cyber dust
│   └── command-palette.js      # Central de Comandos HUD (Ctrl+K / ⌘K estilo Raycast)
├── assets/
│   ├── cv_eduardo_cardoso.pdf  # Currículo canônico atualizado
│   ├── favicon-*.png / .svg    # Favicons em múltiplas resoluções
│   └── images/
│       ├── foto.png            # Foto de perfil de alta qualidade
│       ├── og-image.png        # Imagem para compartilhamento social (1200x630)
│       └── *-preview.*         # Capturas e prévias dos projetos
├── docs/                       # Documentação técnica e de posicionamento
│   ├── ARCHITECTURE.md         # Este documento
│   ├── PROJETOS-GITHUB.md      # Inventário dos repositórios e demos
│   ├── LINKEDIN-PERFIL.md      # Textos e kit para o perfil no LinkedIn
│   └── AVALIACAO-PERFIL.md     # Análise estratégica de carreira
├── scripts/                    # Utilitários de automação em Python
│   ├── format_html.py          # Limpeza e formatação do index.html
│   ├── generate_cv.py          # Geração programática do currículo em PDF
│   ├── generate_favicon.py     # Criação de favicons a partir do SVG
│   └── requirements.txt        # Dependências dos scripts auxiliares
└── .github/workflows/
    └── check-links.yml         # CI de validação de links e lint HTML
```

---

## 4. Módulos JavaScript e Ciclo de Vida

Cada script é encapsulado em IIFE com `'use strict'`, mantendo isolamento de escopo e alta performance:

1. **`js/main.js` (Interatividade e A11y Base):**
   - **Gestão de Tema:** Detecta preferência salva em `localStorage` ou preferência do sistema (`prefers-color-scheme`), aplicando atributos e sincronizando a meta-tag `theme-color`.
   - **Menu Mobile Acessível:** Gerencia abertura/fechamento, atributos ARIA (`aria-expanded`, `aria-controls`), tecla `Escape` e bloqueio de rolagem.
   - **Navegação Suave Universal:** Intercepta âncoras internas, calcula compensação de cabeçalho fixo e foca seções.
   - **ScrollSpy:** Monitora o deslocamento do scroll e atualiza a barra de navegação.
   - **Efeito de Digitação Seguro:** Cicla as frases de especialização com suporte para leitores de tela (`.sr-only`).
   - **Cópia de E-mail Interativa:** Copia o endereço institucional com toast notification.

2. **`js/command-palette.js` (Central de Comandos HUD Raycast / Linear):**
   - **Atalho Global:** `Ctrl + K` (Windows/Linux) ou `⌘K` (macOS), além de botão flutuante `#cmd-trigger`.
   - **Busca em Tempo Real:** Filtra ações rápidas, links diretos de projetos e seções por título, descrição e `data-keywords`.
   - **Acessibilidade & Navegação:** Navegação por setas `↑` / `↓`, `Enter` para executar, `ESC` para sair e controle de foco.

3. **`js/animations.js` (Micro-interações e GSAP):**
   - **Spotlight Reativo:** Calcula coordenadas do cursor nos cards via `pointermove` e injeta variáveis CSS `--mouse-x` e `--mouse-y` para gradiente radial suave.
   - **Text Scramble / Matrix Decrypt:** Decodifica caracteres cibernéticos aleatórios nos títulos das seções ao passar o cursor ou acionar via teclado.
   - **Revelações GSAP ScrollTrigger:** Entrada suave dos cards e seções com verificação de `prefers-reduced-motion`.

4. **`js/webgl-scene.js` (Cena 3D Three.js & Cyber Dust):**
   - Canvas 3D renderizado em segundo plano com Torus Knots em wireframe e materiais emissivos.
   - Matriz de 180 partículas de poeira cibernética (*cyber dust*) em rotação orbital suave.
   - Pausa automática do loop de renderização quando a aba perde visibilidade (`visibilitychange`) para economia de GPU/bateria.

---

## 5. Práticas de SEO, A11y e Performance

- **Metadados Sociais:** Tags completas Open Graph e Twitter Cards com imagem de 1200×630.
- **Marcação Semântica Estruturada:** Dados em formato JSON-LD do tipo `Person` (schema.org) no cabeçalho do HTML.
- **Cache-Busting:** Inclusão de sufixos de versão (`?v=XX`) nos recursos estáticos (CSS, JS, PDF e imagens) para atualização imediata nos navegadores dos visitantes.
- **Carregamento Otimizado:** Imagens abaixo da dobra com `loading="lazy"` e `decoding="async"`. Foto principal do hero com `fetchpriority="high"`.
- **Validação Automatizada:** CI com `html-validate` (garantindo 0 erros de conformidade HTML5 e ARIA) e `lychee` para checagem de links ativos.

