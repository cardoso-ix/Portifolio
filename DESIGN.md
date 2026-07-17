---
name: Eduardo Cardoso — Portfólio
description: Superfície de marca tech-industrial com terminal, acento ciano e glass surfaces sobre fundo navy profundo.
colors:
  bg-deep: "#0e1116"
  bg-alt: "#141820"
  surface: "#191e28"
  surface-elevated: "#1f2531"
  border: "#2c3340"
  text-primary: "#eef2f7"
  text-muted: "#8f98a8"
  accent-blue: "#5b8def"
  accent-blue-hover: "#83a9f5"
  accent-secondary: "#7a92c4"
  success: "#3dba8c"
  warning: "#d4a017"
  light-bg: "#f4f6f9"
  light-text: "#12161e"
  light-muted: "#5c6678"
  light-accent: "#3b6fd4"
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

**Creative North Star: "The Agent Terminal"**

Interface sóbria com toques de terminal: fundo charcoal, superfícies limpas, janelas estilo macOS com dots vermelho/amarelo/verde, prompts `$` e `>` em JetBrains Mono. A identidade comunica **precisão técnica** sem excesso de efeitos.

Densidade controlada: seções com respiro (`4rem` vertical), cards de projeto com preview, timeline vertical. Profundidade via camadas de superfície e bordas discretas — sem partículas, grade ou glows neon.

Rejeita explicitamente: gradient text decorativo no corpo, hero-metric SaaS, eyebrows numerados em toda seção, paleta cream/sand de landing page AI-default, ciano/magenta neon.

**Key Characteristics:**

- Dark mode padrão; light mode espelhado com azul profissional (`#3b6fd4`).
- Dupla tipografia: Inter (UI/prosa) + JetBrains Mono (terminal, prompts, badges técnicos).
- Acento azul suave (`#5b8def`) — uso pontual em CTAs, links e metadados.
- Componentes: botões pill, skill-tags, terminal-window, project-card com thumb.
- Motion: typing no hero e fade-in on scroll; sem partículas.

## 2. Colors

Paleta **Quiet Professional**: charcoal neutro + um azul suave que carrega CTAs e links, sem neon.

### Primary

- **Soft Azure** (`#5b8def` dark / `#3b6fd4` light): CTAs primários, links ativos, bordas bright, prompt `$`. Uso pontual — não pintar blocos inteiros.

### Secondary

- **Steel Blue** (`#7a92c4` dark / `#5f74a3` light): metadados e acentos secundários; nunca como botão principal.

### Neutral

- **Charcoal** (`#0e1116`): fundo base dark.
- **Panel Slate** (`#191e28` / `#1f2531`): surfaces e cards elevados.
- **Ink Frost** (`#eef2f7`): texto principal dark mode.
- **Muted Steel** (`#8f98a8`): texto secundário; em light mode usar `#5c6678` para manter contraste ≥4.5:1.
- **Rule Slate** (`#2c3340`): bordas estruturais.

### Named Rules

**The Quiet Surface Rule.** Elevação vem de borda + tint; sombras suaves só em hover — sem glow neon.

## 3. Typography

**Display Font:** Inter (system-ui fallback)  
**Body Font:** Inter  
**Label/Mono Font:** JetBrains Mono — terminal, `.prompt`, `.hero__profile-key`, badges técnicos

**Character:** Sans geométrica legível com mono mecânica para “camada de sistema”; par funcional para narrativa de agentes de IA + código.

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
- **Do** preservar o terminal como fio condutor visual da identidade.

### Don't:

- **Don't** deixar a narrativa pública ser dominada por cargo industrial — o posicionamento é agentes de IA.
- **Don't** adicionar glassmorphism decorativo em todo elemento — só em header, cards-chave e terminal.
- **Don't** usar gradient text fora do hero title; corpo e headings usam cor sólida.
- **Don't** repetir grid idêntica de cards SaaS com ícone genérico sem preview ou demo.
- **Don't** numerar toda seção (01/02/03) como único recurso de hierarquia — números já existem em `.section__number`; não duplicar como eyebrows.
- **Don't** usar `border-left` grosso colorido em callouts ou timeline items.
