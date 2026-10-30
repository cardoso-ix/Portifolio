# Product

## Register

brand

## Users

Recrutadores e gestores de tech/IA interessados em **suporte técnico**, **automação** ou papéis próximos (Automation Support, Help Desk técnico, implementação). Visitam o site em triagem rápida a partir de LinkedIn/GitHub. Precisam ver em segundos: o que Eduardo sabe fazer, o encaixe natural com suporte+IA e como contactar.

## Product Purpose

Portfólio pessoal que **mostra competências práticas** (n8n, OpenAI, APIs, suporte) com tom **universal e profissional** — sem anunciar “busco vaga” no envelope — e direciona para projetos, currículo e contato.

Tom: identidade clara (**suporte técnico + IA/automação**), sem freela/pacotes e sem linguagem de anúncio de emprego. Sucesso = visitante entende o perfil, confia nos projetos e inicia conversa.

## Brand Personality

**Preciso · Técnico · Em evolução**

Tom profissional e direto, sem hype de startup. Estética graphite + oliva com camada HUD/terminal (ciano de acento, grade técnica sutil, cena 3D de fundo) — confiável, escaneável e com cara de tecnologia. O HUD é aceito, mas com contenção: nada que cubra o conteúdo ou o rosto. Emoções desejadas: **confiança** (projetos e stack verificáveis), **curiosidade** (automações, n8n, OpenAI), **clareza** (informação objetiva).

## Anti-references

- Portfólio genérico de dev júnior: gradiente roxo, glassmorphism decorativo, grid idêntica de cards.
- Narrativa exagerada de “migração de carreira”; a experiência operacional aparece na timeline, o posicionamento público é **suporte técnico + automações/IA**.
- Template SaaS com hero-metric (número grande + stats).
- Azul “padrão IA” genérico e efeitos que competem com o texto (varreduras em loop, scramble no nome, tilt exagerado).
- Dados simulados apresentados como reais (telemetria falsa, métricas inventadas, “24/7” sem prova).
- Linguagem de freela, pacotes ou orçamento público.
- Projetos listados sem preview ou link verificável.
- Envelope que soa como anúncio de emprego (“busco vaga”, “CLT”, “aberto a oportunidades” no título).

## Design Principles

1. **Mostrar, não só contar** — projetos com preview e links; currículo PDF a um clique.
2. **Projetos em primeiro plano** — hero e seção Projetos lideram, cada projeto com estudo de caso (problema, solução, decisões, aprendizado) e diagrama de arquitetura; histórico profissional fica na timeline.
3. **Escaneável em 30 segundos** — hero responde perfil, stack, estudo e CTA.
4. **Performance como prova de craft** — site estático, leve, acessível, com métricas medidas e registradas em `docs/PERFORMANCE.md`.
5. **Motion com propósito** — reveal único por GSAP, typing e uma varredura única na foto; respeitar `prefers-reduced-motion`.
6. **Fatos verificáveis** — formação, empresas, datas e números iguais ao CV (`scripts/generate_cv.py`). Sem métrica sem fonte: se não dá para provar, não entra.

## Accessibility & Inclusion

- Alvo **WCAG 2.1 AA** para contraste e componentes interativos (auditoria formal pendente; ver `docs/PERFORMANCE.md`).
- Skip link, labels ARIA, `alt` em imagens, foco visível, paleta de comandos como combobox/listbox com focus trap.
- Typing reduzido quando `prefers-reduced-motion: reduce`.
- Tema claro/escuro com persistência em `localStorage`.

## Source of truth

| Artefato | Fonte |
|----------|--------|
| Site público | `index.html` + `css/` + `js/` (contatos em `js/config.js`) |
| Currículo PDF | `scripts/generate_cv.py` → `assets/cv_eduardo_cardoso.pdf` |
| Repos / demos | `docs/PROJETOS-GITHUB.md` (espelha GitHub público) |
| Textos LinkedIn | `docs/LINKEDIN-PERFIL.md` (espelha CV + repos) |
| Visual | `DESIGN.md` + tokens em `css/style.css` |
| Posicionamento | este arquivo + `docs/AVALIACAO-PERFIL.md` |

**Regra:** descrição de projeto no site deve ser factual e alinhada ao inventário em `docs/PROJETOS-GITHUB.md`. No envelope público, priorizar n8n / OpenAI / APIs — sem destacar Make.com.
