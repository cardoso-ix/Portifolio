# Projetos GitHub — inventário

Atualizado: set/2026 (auditoria de projetos e alinhamento de produção).

Perfil: https://github.com/cardoso-ix  
Portfólio: https://cardoso-ix.github.io/Portifolio/

Este documento é a **fonte de verdade** dos repositórios e projetos exibidos.  
Ao mudar um projeto, atualize também: `index.html` → este arquivo → `README.md` → `LINKEDIN-PERFIL.md`.

---

## Projetos em Destaque no Portfólio

| Projeto / Repo | Papel | Stack principal | Demo / Produção | No site? |
|---|---|---|---|---|
| [linkedin-automacao-ia](https://github.com/cardoso-ix/linkedin-automacao-ia) | Automação LinkedIn, bot Telegram e monitor Premium | Python · Playwright · n8n · Telegram · DeepSeek v4.1 · VPS | [LinkedIn](https://www.linkedin.com/in/eduardo-cardoso-213a02267) | **Sim (Featured)** |
| LP Soluções (`carlos-landingpage`) | Site institucional + agendamento Google Calendar | Next.js 16 · React 19 · TypeScript · Google Calendar · Tailwind CSS · Vercel | [Demo Online](https://lp-solucoes.vercel.app) | **Sim (Grid 2×2)** |
| [promo-pokemon-tcg](https://github.com/cardoso-ix/promo-pokemon-tcg) — Replicador | Automação de ofertas e afiliação 24/7 em nuvem | Node.js 22 · TypeScript · Baileys · Mercado Livre API · Docker · Railway | [Painel Railway](https://promo-replica-bot-production.up.railway.app) | **Sim (Grid 2×2)** |
| [promo-pokemon-tcg](https://github.com/cardoso-ix/promo-pokemon-tcg) — Disparador | Extração de leads, disparos Spintax e IA DeepSeek | Node.js · TypeScript · DeepSeek V4 · OpenCode · Fastify · Railway | [Painel Railway](https://bot-disparador-ia-production.up.railway.app) | **Sim (Grid 2×2)** |
| [mentor-gestao-industrial](https://github.com/cardoso-ix/mentor-gestao-industrial) | Multi-agente para supervisores de manutenção | CrewAI · OpenRouter · RAG · ChromaDB · Streamlit | [Demo Hugging Face](https://duzinxd-mentor-gestao-industrial.hf.space) | **Sim (Grid 2×2)** |
| [Portifolio](https://github.com/cardoso-ix/Portifolio) | Site pessoal e portfólio profissional | HTML5 · CSS3 · JS ES6+ · Three.js · GSAP · GitHub Pages | [Live](https://cardoso-ix.github.io/Portifolio/) | Base |

---

## Repositórios Secundários / Arquivados da Vitrine

| Repo | Papel | Motivo da retirada da vitrine principal |
|---|---|---|
| [pc-dashboard](https://github.com/cardoso-ix/pc-dashboard) | Painel desktop Windows v1.4 (Tauri + Rust) | Substituído por soluções em nuvem e automações de maior relevância comercial. |
| [conversor-unidades](https://github.com/cardoso-ix/conversor-unidades) | Conversor web (React + Vite) | Substituído por aplicações completas com backend, IA e integrações reais de produção. |
| [cardoso-ix](https://github.com/cardoso-ix/cardoso-ix) | README do perfil GitHub | Meta repositório de apresentação do perfil. |

---

## Detalhe por projeto ativo

### 0) Automação LinkedIn — Telegram + n8n + Playwright Bridge
- **O que é:** Ecossistema autônomo operando 24/7 na VPS para autoridade técnica e prospecção de oportunidades no LinkedIn. Inclui bot no Telegram com geração de propostas anti-IA pelo DeepSeek v4.1 e prompts para Meta AI 100% em PT-BR, engajamento sob demanda colando links de posts no chat com curtida e comentário simulando digitação humana, além de workflows no n8n para moderação de comentários e monitoramento ativo de quem visitou o perfil (LinkedIn Premium).
- **Produção:** Operacional em container Docker com sessão persistente Playwright (Xvfb) e bot daemon no Telegram.
- **GitHub:** https://github.com/cardoso-ix/linkedin-automacao-ia
- **Stack:** Python (FastAPI), Playwright, Chromium Persistente, n8n, Telegram Bot API, DeepSeek v4.1, Docker, Xvfb.

### 1) LP Soluções — Site Institucional & Agendamento
- **O que é:** Site profissional para empresa de engenharia e serviços elétricos. Agendamento de visitas com integração direta à API do Google Calendar no Next.js (sem necessidade de VPS ou n8n intermediário), notificações automáticas via WhatsApp (CallMeBot) e e-mail (Resend/Gmail), além de emissão e assinatura digital de contratos em PDF.
- **Produção:** https://lp-solucoes.vercel.app
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Google Calendar API.

### 2) Replicador de Ofertas — Pokémon TCG (Replica)
- **O que é:** Plataforma autônoma operando 24/7 na nuvem (Railway) para monitoramento de grupos de WhatsApp, interceptação de ofertas de concorrentes, conversão dinâmica para links de afiliado Mercado Livre (`meli.la`), preservação de mídia em alta resolução e replicação automatizada nos canais oficiais.
- **Produção:** https://promo-replica-bot-production.up.railway.app
- **GitHub:** https://github.com/cardoso-ix/promo-pokemon-tcg
- **Stack:** Node.js 22 LTS, TypeScript, Baileys (WhatsApp Web), SQLite (WAL), Docker, Railway.

### 3) Bot Disparador WhatsApp & Atendimento IA (Disparador)
- **O que é:** Sistema avançado de prospecção e engajamento. Permite sincronizar grupos do WhatsApp e extrair participantes em 1 clique, disparar campanhas com variações Spintax e parâmetros anti-ban, visualizar preview visual em tempo real em mockup do WhatsApp e realizar atendimento privado humanizado com IA (DeepSeek V4 via OpenCode Gateway).
- **Produção:** https://bot-disparador-ia-production.up.railway.app
- **GitHub:** https://github.com/cardoso-ix/promo-pokemon-tcg
- **Stack:** Node.js, Fastify, TypeScript, DeepSeek V4, OpenCode AI, Spintax Engine, Baileys.

### 4) Mentor de Gestão Industrial
- **O que é:** Sistema multi-agente com 5 agentes CrewAI + RAG vetorial (ChromaDB) + interface Streamlit; LLM via OpenRouter; parecer executivo e plano de ação estruturado em 24h.
- **Demo:** https://duzinxd-mentor-gestao-industrial.hf.space
- **GitHub:** https://github.com/cardoso-ix/mentor-gestao-industrial

---

## Ordem sugerida no LinkedIn Featured

1. **Automação LinkedIn com IA (GitHub)** - https://github.com/cardoso-ix/linkedin-automacao-ia
2. **Portfólio Pessoal** — https://cardoso-ix.github.io/Portifolio/
2. **LP Soluções (Demo)** — https://lp-solucoes.vercel.app
3. **Replicador Pokémon TCG (Painel)** — https://promo-replica-bot-production.up.railway.app
4. **Disparador & Atendimento IA (Painel)** — https://bot-disparador-ia-production.up.railway.app
5. **Mentor de Gestão Industrial (Demo)** — https://duzinxd-mentor-gestao-industrial.hf.space
6. **Currículo PDF** — https://cardoso-ix.github.io/Portifolio/assets/cv_eduardo_cardoso.pdf
