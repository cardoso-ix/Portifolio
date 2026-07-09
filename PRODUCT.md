# Product

## Register

brand

## Users

Recrutadores, tech leads e gestores que avaliam candidatos em **agentes de IA**, **automações com LLMs** e **integrações (Make, n8n, CrewAI)**. Visitam o site em triagem rápida (mobile ou desktop), muitas vezes a partir de LinkedIn, GitHub ou indicação. Precisam entender em poucos segundos quem é Eduardo, o que ele estuda e constrói em IA, quais projetos comprova e como entrar em contato.

## Product Purpose

Portfólio pessoal de uma página que **comunica posicionamento em agentes de IA** — Pós Tech (FIAP + Alura), LLMs, RAG, orquestração e automações — e **direciona para ação** (ver projetos, baixar currículo, contato). Sucesso = visitante entende o foco em IA aplicada, confia na prática demonstrada e inicia contato ou segue para demo/GitHub.

## Brand Personality

**Preciso · Técnico · Em evolução**

Tom profissional e direto, sem hype de startup. A estética remete a terminal e painel de sistema — técnico, confiável, com energia de quem está aprendendo e construindo em IA. Emoções desejadas: **confiança** (projetos e stack verificáveis), **curiosidade** (agentes, RAG, Make/n8n), **clareza** (informação escaneável).

Referências implícitas no código atual: interfaces de dev tool escuras com acento ciano (Vercel/Linear-adjacent, mas com identidade própria via terminal); hero com “perfil em markdown” e badges de status.

## Anti-references

- Portfólio genérico de dev júnior: gradiente roxo, glassmorphism decorativo, grid idêntica de cards com ícone + título + texto.
- Narrativa exagerada de “migração de carreira”; a experiência industrial pode aparecer na timeline, mas o posicionamento público é IA.
- Template SaaS com hero-metric (número grande + label pequena + stats).
- Eyebrows numerados em toda seção (01 / 02 / 03) como único recurso de hierarquia.
- Texto de corpo acinzentado com contraste insuficiente sobre fundos tintados.
- Projetos listados sem demo ou link verificável.

## Design Principles

1. **Mostrar, não só contar** — projetos com preview, links para demo e repositório; currículo PDF a um clique.
2. **IA em primeiro plano** — hero, sobre e skills lideram com agentes, LLMs e metodologias; histórico profissional fica na timeline.
3. **Escaneável em 30 segundos** — hero responde foco, estudo, stack e CTA; timeline e skills agrupadas por tema.
4. **Performance como prova de craft** — site estático, leve, acessível; o próprio portfólio demonstra competência front-end.
5. **Motion com propósito** — animações reforçam identidade tech (typing, partículas, fade-in), nunca bloqueiam conteúdo; respeitar `prefers-reduced-motion`.

## Accessibility & Inclusion

- Alvo **WCAG 2.1 AA** para contraste de texto e componentes interativos.
- Skip link, labels ARIA em menu e toggle de tema, `alt` em imagens, foco visível.
- Partículas e typing desativados ou reduzidos quando `prefers-reduced-motion: reduce`.
- Tema claro/escuro com persistência em `localStorage` para conforto visual.
