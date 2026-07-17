---
name: Eduardo Cardoso — Portfólio
description: Superfície sóbria com terminal, acento oliva e glass surfaces sobre fundo graphite.
colors:
  bg-deep: "#111211"
  bg-alt: "#181918"
  surface: "#1f201e"
  surface-elevated: "#272825"
  border: "#353732"
  text-primary: "#eef0ea"
  text-muted: "#9a9e93"
  accent-olive: "#a8b87a"
  accent-olive-hover: "#bbc994"
  accent-secondary: "#b8b19a"
  success: "#7d9b76"
  warning: "#c4a35a"
  light-bg: "#f3f4f1"
  light-text: "#1a1b18"
  light-muted: "#5f6458"
  light-accent: "#5f6f3f"
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
  section: "3.5rem"
  container-padding: "clamp(1rem, 3vw, 1.5rem)"
  container-width: "88rem"
  header-height: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-olive}"
    textColor: "{colors.bg-deep}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.accent-olive}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  skill-tag:
    backgroundColor: "rgba(168, 184, 122, 0.08)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.75rem"
---

# Design System: Eduardo Cardoso — Portfólio

## 1. Overview

**Creative North Star: "Quiet Graphite Olive"**

Interface sóbria com toques de terminal: fundo graphite, superfícies limpas, janelas estilo macOS com dots vermelho/amarelo/verde, prompts `$` e `>` em JetBrains Mono. A identidade comunica **precisão técnica** sem excesso de efeitos.

Densidade controlada: conteúdo centralizado (`88rem`), cards de projeto com um destaque + grade compacta, timeline vertical. Profundidade via camadas de superfície e bordas discretas — sem partículas, grade ou glows neon.

Rejeita explicitamente: gradient text decorativo no corpo, hero-metric SaaS, azul “padrão IA”, ciano/magenta neon, paleta cream/sand genérica.

**Key Characteristics:**

- Dark mode padrão; light mode espelhado com oliva profunda (`#5f6f3f`).
- Dupla tipografia: Inter (UI/prosa) + JetBrains Mono (terminal, prompts, badges técnicos).
- Acento oliva suave (`#a8b87a`) — uso pontual em CTAs, links e metadados.
- Componentes: botões pill, skill-tags, terminal-window, project-card (featured + compact).
- Motion: typing no hero e fade-in on scroll; sem partículas.

## 2. Colors

Paleta **Quiet Graphite Olive**: graphite neutro + oliva suave que carrega CTAs e links, sem azul de template.

### Primary

- **Muted Olive** (`#a8b87a` dark / `#5f6f3f` light): CTAs primários, links ativos, bordas bright, prompt `$`. Uso pontual — não pintar blocos inteiros.

### Secondary

- **Warm Stone** (`#b8b19a` dark / `#7a7564` light): metadados e acentos secundários; nunca como botão principal.

### Neutral

- **Graphite** (`#111211`): fundo base dark.
- **Panel Stone** (`#1f201e` / `#272825`): surfaces e cards elevados.
- **Ink Mist** (`#eef0ea`): texto principal dark mode.
- **Muted Sage** (`#9a9e93`): texto secundário; em light mode usar `#5f6458` para manter contraste ≥4.5:1.
- **Rule Stone** (`#353732`): bordas estruturais.

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
