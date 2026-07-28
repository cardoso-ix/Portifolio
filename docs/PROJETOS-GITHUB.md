# Projetos GitHub — inventário

Atualizado: jul/2026 (auditoria via API pública `cardoso-ix`).

Perfil: https://github.com/cardoso-ix  
Portfólio: https://cardoso-ix.github.io/Portifolio/

Este documento é a **fonte de verdade** dos repositórios públicos.  
Ao mudar um projeto, atualize também: `index.html` → este arquivo → `README.md` → `LINKEDIN-PERFIL.md`.

---

## Repositórios públicos

| Repo | Papel | Stack (README) | Demo | No site? |
|------|--------|----------------|------|----------|
| [Portifolio](https://github.com/cardoso-ix/Portifolio) | Site pessoal (este repo) | HTML · CSS · JS · GitHub Pages | [Live](https://cardoso-ix.github.io/Portifolio/) | — |
| [linkedin-automacao-ia](https://github.com/cardoso-ix/linkedin-automacao-ia) | Automação diária de posts LinkedIn | OpenAI (GPT-4o / imagem) · LinkedIn | Perfil LinkedIn | Destaque |
| [pc-dashboard](https://github.com/cardoso-ix/pc-dashboard) | Painel desktop Windows v1.4 | Tauri 2 · React · TS · Rust · Tailwind | — (app local) | Sim |
| [mentor-gestao-industrial](https://github.com/cardoso-ix/mentor-gestao-industrial) | Multi-agente para supervisores de manutenção | CrewAI · OpenRouter (Gemma) · RAG · ChromaDB · Streamlit | [Demo](https://duzinxd-mentor-gestao-industrial.hf.space) · [HF Space](https://huggingface.co/spaces/duzinxd/mentor-gestao-industrial) | Sim |
| [conversor-unidades](https://github.com/cardoso-ix/conversor-unidades) | Conversor web (49 categorias) | React · TypeScript · Vite | [Pages](https://cardoso-ix.github.io/Portifolio/conversor-unidades/) | Sim |
| [cardoso-ix](https://github.com/cardoso-ix/cardoso-ix) | README do perfil GitHub | Markdown | — | Não (meta) |

---

## Detalhe por projeto

### 1) linkedin-automacao-ia (destaque)

- **O que é:** schedule diário 08:00 (America/Sao_Paulo); GPT-4o gera texto; router escolhe só texto ou texto + charge (qui/dom).
- **Orquestração (repo):** ver README do projeto — **não exibir Make.com no envelope público**.
- **GitHub description:** vazia (pendência manual — este agente não tem permissão de escrita nesse repo).
- **Topics:** nenhum (pendência manual).
- **Card do site:** OpenAI · GPT-4o · LinkedIn (sem Make.com).

### 2) pc-dashboard

- **O que é:** painel local Windows com ações de um clique, bandeja, logs e remoção de programas (winget + registro).
- **Versão:** 1.4.0.
- **Description GitHub:** ok.
- **Topics:** nenhum (pendência manual sugerida: `tauri`, `react`, `rust`, `windows`, `desktop`).

### 3) mentor-gestao-industrial

- **O que é:** 5 agentes CrewAI + RAG (ChromaDB) + interface Streamlit; LLM via OpenRouter (`gemma-4-26b-a4b-it:free`); parecer executivo e PDF.
- **Visual:** layout industrial moderno (hero grafite + acento cobre) — atualizado jul/2026.
- **Demo:** https://duzinxd-mentor-gestao-industrial.hf.space  
- **Space:** https://huggingface.co/spaces/duzinxd/mentor-gestao-industrial  
- **GitHub:** https://github.com/cardoso-ix/mentor-gestao-industrial
- **Description GitHub:** ainda cita Groq — pendência manual de alinhar à stack OpenRouter.

### 4) conversor-unidades

- **O que é:** app web de conversão (49 categorias), tema claro/escuro.
- **Demo:** embutido no portfólio (`/conversor-unidades/`).
- **Atenção:** README do repo ainda é template Vite genérico — pendência de documentação no repo de origem.
- **Description / topics GitHub:** ok.

### 5) cardoso-ix (perfil)

- README do perfil lista Mentor + Conversor + Portfólio.
- **Desatualizado em relação ao portfólio atual:** falta Automação LinkedIn e PC Dashboard; ainda lidera com “Técnico de Calibração” e “aberto a oportunidades”.
- **Pendência manual:** alinhar README do perfil ao tom universal (suporte + IA) e à lista de projetos do site.

### 6) Portifolio

- Site + docs + scripts + kit LinkedIn.
- Description / topics: ok.

---

## Pendências fora deste repo (ação manual)

| Item | Onde | Ação sugerida |
|------|------|----------------|
| Bio do GitHub | Perfil | Trocar “Buscando oportunidade júnior” por tom universal (ex.: `Suporte técnico e automações com IA \| n8n · OpenAI · Help Desk · Chapecó, SC`) |
| Description vazia | `linkedin-automacao-ia` | Preencher description + homepage do portfólio |
| Topics | `linkedin-automacao-ia`, `pc-dashboard` | Adicionar topics relevantes |
| README perfil | `cardoso-ix` | Incluir LinkedIn automation + PC Dashboard; alinhar tom |
| README | `conversor-unidades` | Substituir template Vite por README do produto |

> Este ambiente Cloud Agent só tem push no repo **Portifolio**. Os outros repositórios retornam 403 para escrita.

---

## Ordem sugerida no LinkedIn Featured

1. Portfólio — https://cardoso-ix.github.io/Portifolio/  
2. Automação LinkedIn — https://github.com/cardoso-ix/linkedin-automacao-ia  
3. Mentor (demo) — https://huggingface.co/spaces/duzinxd/mentor-gestao-industrial  
4. Currículo PDF — https://cardoso-ix.github.io/Portifolio/assets/cv_eduardo_cardoso.pdf  
5. PC Dashboard (opcional) — https://github.com/cardoso-ix/pc-dashboard  
