# Product

## Register

brand

## Users

Recrutadores e gestores de tech/IA interessados em **suporte técnico**, **automação** ou papéis próximos (Automation Support, Help Desk técnico, implementação). Visitam o site em triagem rápida a partir de LinkedIn/GitHub. Precisam ver em segundos: o que Eduardo sabe fazer, o encaixe natural com suporte+IA e como contactar.

## Product Purpose

Portfólio pessoal que **mostra competências práticas** (Make.com, OpenAI, n8n, APIs, suporte) com tom **universal e profissional** — sem anunciar “busco vaga” no envelope — e direciona para projetos, currículo e contato.

Tom: identidade clara (**suporte técnico + IA/automação**), sem freela/pacotes e sem linguagem de anúncio de emprego. Sucesso = visitante entende o perfil, confia nos projetos e inicia conversa.

## Brand Personality

**Preciso · Técnico · Em evolução**

Tom profissional e direto, sem hype de startup. Estética quieta (graphite + oliva) com toques de terminal — confiável, escaneável. Emoções desejadas: **confiança** (projetos e stack verificáveis), **curiosidade** (automações, n8n, OpenAI), **clareza** (informação objetiva).

## Anti-references

- Portfólio genérico de dev júnior: gradiente roxo, glassmorphism decorativo, grid idêntica de cards.
- Narrativa exagerada de “migração de carreira”; a experiência operacional aparece na timeline, o posicionamento público é **suporte técnico + automações/IA**.
- Template SaaS com hero-metric (número grande + stats).
- Azul “padrão IA”, ciano/magenta neon, partículas e grade decorativa.
- Linguagem de freela, pacotes ou orçamento público.
- Projetos listados sem preview ou link verificável.
- Envelope que soa como anúncio de emprego (“busco vaga”, “CLT”, “aberto a oportunidades” no título).

## Design Principles

1. **Mostrar, não só contar** — projetos com preview e links; currículo PDF a um clique.
2. **Projetos em primeiro plano** — hero e seção Projetos lideram; histórico profissional fica na timeline.
3. **Escaneável em 30 segundos** — hero responde perfil, stack, estudo e CTA.
4. **Performance como prova de craft** — site estático, leve, acessível.
5. **Motion com propósito** — typing e fade-in; respeitar `prefers-reduced-motion`.
6. **Fatos verificáveis** — formação, empresas e datas iguais ao CV (`scripts/generate_cv.py`).

## Accessibility & Inclusion

- Alvo **WCAG 2.1 AA** para contraste e componentes interativos.
- Skip link, labels ARIA, `alt` em imagens, foco visível.
- Typing reduzido quando `prefers-reduced-motion: reduce`.
- Tema claro/escuro com persistência em `localStorage`.

## Source of truth

| Artefato | Fonte |
|----------|--------|
| Site público | `index.html` + `css/style.css` + `js/main.js` |
| Currículo PDF | `scripts/generate_cv.py` → `assets/cv_eduardo_cardoso.pdf` |
| Repos / demos | `docs/PROJETOS-GITHUB.md` (espelha GitHub público) |
| Textos LinkedIn | `docs/LINKEDIN-PERFIL.md` (espelha CV + repos) |
| Visual | `DESIGN.md` + tokens em `css/style.css` |
| Posicionamento | este arquivo + `docs/AVALIACAO-PERFIL.md` |

**Regra:** descrição de projeto no site deve bater com o README do repositório correspondente (ex.: Automação LinkedIn = Make.com, não n8n).
