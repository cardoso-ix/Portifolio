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
| `--color-bg` | `#0e0f0e` (Obsidian) | `#f6f7f3` (Warm Porcelain) | Cor de fundo primária da página |
| `--color-surface` | `#1a1c1a` | `#ffffff` | Fundo de cartões e blocos elevados |
| `--color-border` | `#323530` | `#d4d8ce` | Bordas e divisores estruturais |
| `--color-accent` | `#a8b87a` (Muted Olive) | `#4e5d32` (Deep Forest Olive) | Cor de destaque, links e CTAs |
| `--color-text` | `#f0f2ec` | `#141613` | Tipografia principal |
| `--color-text-secondary` | `#adb1a6` | `#484d43` | Subtítulos e prosa longa |
| `--color-success` | `#68b068` | `#2e7a33` | Badges de status ativo e pontos online |

### Tipografia

- **UI & Leitura:** `Inter` (Google Fonts), com fallback para o sistema operacional (`system-ui, -apple-system, sans-serif`).
- **Terminal & Dados Técnicos:** `JetBrains Mono` (Google Fonts), usado em tags, badges, números de seção e variáveis de status (`status.json`).

---

## 3. Estrutura de Arquivos

```
Portifolio/
├── index.html                  # Página principal e ponto de entrada
├── 404.html                    # Página de erro para GitHub Pages
├── robots.txt                  # Instruções para crawlers de busca
├── sitemap.xml                 # Mapeamento do site para indexação
├── site.webmanifest            # Metadados de PWA e ícones móveis
├── css/
│   └── style.css               # Design system unificado sem dependências
├── js/
│   └── main.js                 # Lógica de tema, navegação, scroll e clipboard
├── assets/
│   ├── cv_eduardo_cardoso.pdf  # Currículo canônico atualizado
│   ├── favicon-*.png / .svg    # Favicons em múltiplas resoluções
│   └── images/
│       ├── foto.png            # Foto de perfil de alta qualidade
│       ├── og-image.png        # Imagem para compartilhamento social (1200x630)
│       └── *-preview.*         # Capturas e prévias dos projetos
├── conversor-unidades/         # Subaplicação embarcada (build React + Vite)
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

## 4. Ciclo de Vida do JavaScript (`js/main.js`)

O script roda encapsulado em uma IIFE (*Immediately Invoked Function Expression*) em modo estrito (`'use strict'`), composto pelos módulos:

1. **Gestão de Tema:** Detecta preferência salva em `localStorage` ou preferência do sistema (`prefers-color-scheme`), aplicando atributos e sincronizando a meta-tag `theme-color`.
2. **Menu Mobile Acessível:** Gerencia abertura/fechamento, atributos ARIA (`aria-expanded`, `aria-controls`), tecla `Escape` e bloqueio de rolagem do body quando aberto.
3. **Navegação Suave Universal:** Intercepta âncoras internas (`a[href^="#"]`), calcula a compensação da barra de navegação fixa e move o foco para garantir navegação fluida por teclado.
4. **ScrollSpy de Alta Precisão:** Monitora o deslocamento do scroll com `requestAnimationFrame` e destaca dinamicamente o link da seção em visualização, incluindo tratamento especial para a seção de Contato no rodapé.
5. **Efeito de Digitação com Proteção A11y:** Itera pelas frases de especialização com pausas naturais. Não polui leitores de tela devido à camada `.sr-only` paralela.
6. **Cópia de E-mail Interativa:** Copia o endereço institucional para a área de transferência com feedback visual no próprio botão e notificação toast temporária.

---

## 5. Práticas de SEO e Performance

- **Metadados Sociais:** Tags completas Open Graph e Twitter Cards com imagem de 1200×630.
- **Marcação Semântica Estruturada:** Dados em formato JSON-LD do tipo `Person` (schema.org) no cabeçalho do HTML.
- **Cache-Busting:** Inclusão de sufixos de versão (`?v=XX`) nos recursos estáticos (CSS, JS, PDF e imagens) para atualização imediata nos navegadores dos visitantes.
- **Carregamento Otimizado:** Imagens abaixo da dobra com `loading="lazy"` e `decoding="async"`. Foto principal do hero com `fetchpriority="high"`.
