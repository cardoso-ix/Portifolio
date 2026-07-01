---
name: Eduardo Cardoso — Portfólio
description: Superfície de marca tech-industrial com terminal, acento ciano e glass surfaces sobre fundo navy profundo.
colors:
  bg-deep: "#0a1020"
  bg-alt: "#111a2e"
  surface: "#16233b"
  surface-elevated: "#1b2b47"
  border: "#2a3f63"
  text-primary: "#f4f8ff"
  text-muted: "#9eb0cc"
  accent-cyan: "#2ddcff"
  accent-cyan-hover: "#7ee9ff"
  accent-magenta: "#c85cff"
  success: "#3dffb0"
  warning: "#ffaa00"
  light-bg: "#eef3fb"
  light-text: "#0f1a2e"
  light-muted: "#4a5f7a"
  light-accent: "#008eb8"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 9vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(1rem, 2.5vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "0.5rem"
  lg: "0.75rem"
  pill: "999px"
spacing:
  section: "4rem"
  container-padding: "clamp(0.875rem, 1.25vw, 1.5rem)"
  header-height: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-cyan}"
    textColor: "{colors.bg-deep}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.accent-cyan}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  skill-tag:
    backgroundColor: "rgba(45, 220, 255, 0.08)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.75rem"
---

# Design System: Eduardo Cardoso — Portfólio

## 1. Overview

**Creative North Star: "The Calibration Terminal"**

Interface que parece um painel de laboratório de metrologia cruzado com um terminal de desenvolvedor: fundo navy profundo, grade sutil, partículas em rede, janelas estilo macOS com dots vermelho/amarelo/verde, prompts `$` e `>` em JetBrains Mono. A identidade comunica **precisão industrial** e **fluência digital** sem cair no clichê de portfólio dev genérico.

Densidade moderada: seções longas com respiro (`4rem` vertical), cards de projeto com preview visual, timeline vertical para formação/experiência. Profundidade vem de **glass surfaces** (`rgba` + `backdrop-filter`), bordas ciano semitransparentes e glows pontuais — não de sombras pesadas.

Rejeita explicitamente: gradient text decorativo no corpo, hero-metric SaaS, eyebrows numerados em toda seção, paleta cream/sand de landing page AI-default.

**Key Characteristics:**

- Dark mode padrão; light mode espelhado com acento teal (`#008eb8`).
- Dupla tipografia: Inter (UI/prosa) + JetBrains Mono (terminal, prompts, badges técnicos).
- Acento ciano neon (`#2ddcff`) + magenta secundário (`#c85cff`) em gradientes pontuais (hero title).
- Componentes: botões pill, skill-tags, terminal-window, project-card com thumb.
- Motion: typing no hero, fade-in on scroll, partículas (desktop only), `0.25s ease` padrão.

## 2. Colors

Paleta **Committed dark**: superfície navy tintada + um acento ciano saturado que carrega CTAs, links e glow.

### Primary

- **Signal Cyan** (`#2ddcff` dark / `#008eb8` light): CTAs primários, links ativos, bordas bright, partículas, prompt `$`. Raro o suficiente para marcar interação; não pintar blocos inteiros.

### Secondary

- **Lab Magenta** (`#c85cff` dark / `#8b4fc9` light): acento no gradiente do nome no hero; uso pontual, nunca como cor de botão principal.

### Neutral

- **Deep Navy** (`#0a1020`): fundo base dark.
- **Panel Slate** (`#16233b` / `#1b2b47`): surfaces e cards elevados.
- **Ink Frost** (`#f4f8ff`): texto principal dark mode.
- **Muted Steel** (`#9eb0cc`): texto secundário; em light mode usar `#4a5f7a` para manter contraste ≥4.5:1.
- **Rule Blue** (`#2a3f63`): bordas estruturais.

### Named Rules

**The Glow Sparingly Rule.** Glow (`box-shadow` ciano) aparece em hover de botões, header scrolled e terminal windows — nunca em todo card por padrão.

## 3. Typography

**Display Font:** Inter (system-ui fallback)  
**Body Font:** Inter  
**Label/Mono Font:** JetBrains Mono — terminal, `.prompt`, `.hero__profile-key`, badges técnicos

**Character:** Sans geométrica legível com mono mecânica para “camada de sistema”; par funcional para narrativa industrial + código.

### Hierarchy

- **Display** (700, `clamp(2.75rem, 9vw, 5rem)`, lh 1.1): nome no hero; gradiente ciano→magenta via `.glitch` (background-clip, uso único).
- **Headline** (700, `clamp(1.75rem, 4vw, 2.25rem)`): títulos de seção `.section__title` com número `01.` em mono accent.
- **Title** (600, ~1.0625rem): títulos de cards e timeline.
- **Body** (400, 1rem, lh 1.6): prosa; máx. ~65–75ch em blocos longos.
- **Label** (400–500, 0.75–0.8125rem, mono onde aplicável): badges, terminal bar titles, chips de contato.

### Named Rules

**The Mono Marks System Rule.** JetBrains Mono reserva-se para metadados de sistema (prompts, keys de perfil, números de seção) — não para parágrafos longos.

## 4. Elevation

Sistema **híbrido tonal + glow**: profundidade principal via camadas de surface (`--color-bg` → `--color-surface` → `--color-surface-elevated`) e glass (`--glass-surface` com blur). Sombras são **reativas** (hover, header scrolled), não estruturais em repouso.

### Shadow Vocabulary

- **Header scrolled** (`0 8px 32px rgba(45, 220, 255, 0.12)`): barra fixa após scroll.
- **Button primary hover** (`0 0 30px rgba(0, 212, 255, 0.5), 0 4px 15px ...`): feedback tátil em CTA.
- **Card soft** (`0 16px 40px var(--shadow-soft)`): hero profile card e project cards em hover.

### Named Rules

**The Flat-At-Rest Rule.** Cards e surfaces em repouso usam borda + tint; sombra só em estado hover ou elementos flutuantes (header, toast).

## 5. Components

### Buttons

- **Shape:** pill (`border-radius: 999px`)
- **Primary:** fundo `--color-accent`, texto escuro no dark mode; glow no hover
- **Outline:** borda accent, fundo transparente; hover com glow leve
- **Padding:** ~`0.75rem 1.5rem`; transição `0.25s ease`

### Chips

- **Contact chips:** pill, borda accent semitransparente, hover com background tint
- **Skill tags:** fundo `rgba(45, 220, 255, 0.08)`; variante `--primary` com borda accent para skills de IA

### Cards / Containers

- **Terminal window:** barra com 3 dots + título; corpo com `--terminal-bg`
- **Project card:** thumb 16:9, body com tags e links; hover eleva borda/glow
- **Hero profile card:** rows key/val estilo config file
- **Corner:** `--radius` (8px) ou `--radius-lg` (12px) em janelas

### Navigation

- Header fixo, blur + glass; logo `<EduCardoso />` em mono
- Links com underline animado; estado `.active` na seção visível
- Mobile: menu full-screen overlay com toggle hamburger

### Signature: Hero Terminal

Barra macOS + linhas `cat cargo-atual.txt` com output; typing effect no subtítulo; anéis orbitais na foto.

## 6. Do's and Don'ts

### Do:

- **Do** manter contraste de texto muted ≥4.5:1; no light mode preferir `#4a5f7a` sobre `#eef3fb`.
- **Do** usar `prefers-reduced-motion` para desligar partículas e encurtar animações.
- **Do** bump `?v=` em CSS/JS/PDF ao publicar mudanças cache-sensitive.
- **Do** preservar par terminal + metrologia como fio condutor visual.

### Don't:

- **Don't** transformar o site em narrativa de “abandono da indústria” — anti-referência estratégica do PRODUCT.md.
- **Don't** adicionar glassmorphism decorativo em todo elemento — só em header, cards-chave e terminal.
- **Don't** usar gradient text fora do hero title; corpo e headings usam cor sólida.
- **Don't** repetir grid idêntica de cards SaaS com ícone genérico sem preview ou demo.
- **Don't** numerar toda seção (01/02/03) como único recurso de hierarquia — números já existem em `.section__number`; não duplicar como eyebrows.
- **Don't** usar `border-left` grosso colorido em callouts ou timeline items.
