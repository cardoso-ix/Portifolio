# Product

## Register

brand

## Users

Recrutadores, tech leads e gestores industriais que avaliam candidatos em **IA aplicada à indústria** ou em **desenvolvimento web com perfil técnico**. Visitam o site em triagem rápida (mobile ou desktop), muitas vezes a partir de LinkedIn, GitHub ou indicação. Precisam entender em poucos segundos quem é Eduardo, o que ele faz hoje, quais projetos comprova e como entrar em contato.

## Product Purpose

Portfólio pessoal de uma página que **comunica credibilidade profissional** — metrologia e calibração como base industrial, Pós Tech em Agentes de IA como direção atual — e **direciona para ação** (ver projetos, baixar currículo, contato). Sucesso = visitante entende o posicionamento híbrido (indústria + IA + dev), confia na trajetória e inicia contato ou segue para demo/GitHub.

## Brand Personality

**Preciso · Industrial · Em evolução**

Tom profissional e direto, sem hype de startup. A estética remete a terminal e laboratório de medição — técnico, confiável, com energia de quem está aprendendo e construindo em IA. Emoções desejadas: **confiança** (experiência real na indústria), **curiosidade** (projetos com CrewAI/RAG), **clareza** (informação escaneável).

Referências implícitas no código atual: interfaces de dev tool escuras com acento ciano (Vercel/Linear-adjacent, mas com identidade própria via terminal e metrologia); hero com “perfil em markdown” e badges de status.

## Anti-references

- Portfólio genérico de dev júnior: gradiente roxo, glassmorphism decorativo, grid idêntica de cards com ícone + título + texto.
- Narrativa exagerada de “migração de carreira” ou abandono da indústria — a experiência industrial permanece ativo, não é passado descartável.
- Template SaaS com hero-metric (número grande + label pequena + stats).
- Eyebrows numerados em toda seção (01 / 02 / 03) como único recurso de hierarquia.
- Texto de corpo acinzentado com contraste insuficiente sobre fundos tintados.
- Projetos listados sem demo ou link verificável.

## Design Principles

1. **Mostrar, não só contar** — projetos com preview, links para demo e repositório; currículo PDF a um clique.
2. **Indústria e IA na mesma frase** — o diferencial é a combinação; nenhum dos dois deve dominar a narrativa sozinho.
3. **Escaneável em 30 segundos** — hero responde cargo, estudo, local e CTA; timeline e skills agrupadas por tema.
4. **Performance como prova de craft** — site estático, leve, acessível; o próprio portfólio demonstra competência front-end.
5. **Motion com propósito** — animações reforçam identidade tech (typing, partículas, fade-in), nunca bloqueiam conteúdo; respeitar `prefers-reduced-motion`.

## Accessibility & Inclusion

- Alvo **WCAG 2.1 AA** para contraste de texto e componentes interativos.
- Skip link, labels ARIA em menu e toggle de tema, `alt` em imagens, foco visível.
- Partículas e typing desativados ou reduzidos quando `prefers-reduced-motion: reduce`.
- Tema claro/escuro com persistência em `localStorage` para conforto visual.
