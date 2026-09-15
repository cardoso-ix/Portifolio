---
name: Eduardo Cardoso — Portfólio
description: Superfície sofisticada com terminal, acento oliva cibernético, matriz de grade técnica e glass surfaces sobre fundo obsidian.
colors:
  bg-deep: "#090a09"
  bg-alt: "#101210"
  surface: "#151715"
  surface-elevated: "#1d201d"
  border: "#2d302c"
  border-glow: "rgba(182, 203, 124, 0.38)"
  text-primary: "#f4f6f0"
  text-muted: "#82877c"
  accent-olive: "#b6cb7c"
  accent-olive-hover: "#cde28f"
  success: "#34d399"
  warning: "#f59e0b"
  light-bg: "#f7f8f4"
  light-text: "#131611"
  light-muted: "#62685c"
  light-accent: "#3f5620"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 6.5vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.35rem)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(0.875rem, 2vw, 1.15rem)"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "0.375rem"
  md: "0.625rem"
  lg: "0.875rem"
  xl: "1.25rem"
  pill: "9999px"
spacing:
  section: "clamp(3.5rem, 7vw, 5.5rem)"
  container-padding: "clamp(1.25rem, 3.5vw, 2rem)"
  container-width: "84rem"
  header-height: "4.25rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-olive}"
    textColor: "{colors.bg-deep}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  skill-tag:
    backgroundColor: "rgba(182, 203, 124, 0.11)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.85rem"
---

# Design System: Eduardo Cardoso — Portfólio

## 1. Overview

**Creative North Star: "Quiet Graphite Cyber-Olive"**

Interface sóbria e técnica de alto padrão: fundo obsidian profundo (`#090a09`), matriz de grade técnica sutilmente iluminada, janelas estilo macOS com controles verde/amarelo/vermelho, prompts `>` e `~` em JetBrains Mono. A identidade visual transmite **alta competência técnica**, rigor e modernidade sem ruído decorativo.

Posicionamento visual e verbal: **Suporte Técnico + Automações com IA** (n8n, OpenAI, APIs REST, Help Desk). Não utiliza templates genéricos azuis de SaaS nem estética amadora.

**Key Characteristics:**
- Fundo atmosférico obsidian com textura de micro-pontos (matrix grid) e holofotes suaves de iluminação ambiente.
- Modo escuro padrão com oliva cibernética vibrante (`#b6cb7c`) e toques de esmeralda (`#34d399`).
- Modo claro calibrado com alto contraste WCAG AA (`#3f5620` sobre `#f7f8f4`).
- Tipografia dupla: `Inter` para clareza de leitura + `JetBrains Mono` para terminais, tags, badges e números.
- Numeração estrita 1:1: `~ Início`, `01. Projetos`, `02. Sobre`, `03. Skills`, `04. Formação`, `05. Experiência`, `06. Contato`.

---

## 2. Paleta de Cores

| Token | Dark Mode | Light Mode | Aplicação |
|---|---|---|---|
| `bg` | `#090a09` | `#f7f8f4` | Canvas principal |
| `surface` | `#151715` | `#ffffff` | Superfícies elevadas e cards |
| `surface-elevated` | `#1d201d` | `#fcfdfa` | Elementos de destaque |
| `border` | `#2d302c` | `#d5d9ce` | Linhas divisórias estruturais |
| `border-glow` | `rgba(182, 203, 124, 0.38)` | `rgba(63, 86, 32, 0.4)` | Bordas reativas em foco/hover |
| `accent` | `#b6cb7c` | `#3f5620` | CTAs, números de seção, links |
| `accent-hover` | `#cde28f` | `#2e3f17` | Hover em botões e links |
| `success` | `#34d399` | `#1b7a3a` | Status online, pulso e prompts |
| `text` | `#f4f6f0` | `#131611` | Texto principal |
| `text-secondary` | `#b2b7ac` | `#464b40` | Subtítulos e parágrafos |

---

## 3. Tipografia & Hierarquia

- **Display (Hero Title):** 800, `clamp(2.35rem, 6.5vw, 4.25rem)`, lh 1.08.
- **Headline (Section Title):** 700, `clamp(1.75rem, 4vw, 2.35rem)` com número `01.` em JetBrains Mono.
- **Body:** 400, `1rem`, lh 1.6, máx. 65ch para prosa.
- **Code / Mono:** `JetBrains Mono` em números de seção, badges, `status.json` e terminal prompts.

---

## 4. Componentes

- **Botões:** formato pill (`border-radius: 9999px`) com ícones SVG inline e micro-interação ao hover (`transform: translateY(-2px)`).
- **Cards Bento:** estrutura geométrica responsiva com glassmorphism, tags tecnológicas e links diretos para código e demo.
- **Terminal Window:** barra de controle macOS com três dots coloridos, título do arquivo e surface com backdrop blur.
- **Contact Card:** bloco centralizado de alta conversão com botão de cópia de e-mail integrado e feedback visual instantâneo.

---

## 5. Mobile & Viewport Responsiveness

- **Header & Logo:** ícone `< >` com dimensões explícitas (`width="20" height="20"` no SVG + CSS `width: 1.25rem; height: 1.25rem; flex-shrink: 0`) prevenindo colapso para 0x0 em WebKit/iOS Safari.
- **Logo Text:** texto `<EduCardoso />` com `white-space: nowrap` e escala tipográfica dinâmica (`clamp(0.85rem, 3.8vw, 1.05rem)`) para eliminar qualquer risco de truncamento em telas de 320px a 480px.
- **Touch Targets:** botões, chips e toggles calibrados para no mínimo 44px de altura acessível.
- **Grid Stacking:** empilhamento fluido de seções de dados (hero facts, timeline e chips de contato) com padding adaptativo em `@media (max-width: 480px)`.
