# Performance e qualidade: medições

Medido com **Lighthouse 13.6.0** (Chrome estável, headless), servindo o site em `localhost` sob o caminho `/Portifolio/`, como no GitHub Pages. Cada caso foi executado **3 vezes**; a tabela mostra a **mediana**.

- **Antes:** commit `2932c55` (início do polimento).
- **Depois:** estado atual da `main` (Fases 0 a 5).
- Mobile usa o perfil padrão do Lighthouse (Moto G Power, 4G lento emulado). Desktop usa `--preset=desktop`.

## Resultados

### Mobile

| Métrica | Antes | Depois |
|---|---|---|
| Performance | 58 | **94** |
| Acessibilidade | 100 | 100 |
| Boas práticas | 96 | **100** |
| SEO | 100 | 100 |
| FCP | 3,5 s | 2,1 s |
| LCP | 7,5 s | 2,7 s |
| TBT | 300 ms | 58 ms |
| CLS | 0 | 0,007 |
| Peso transferido | 1.712 KB | 505 KB |

### Desktop

| Métrica | Antes | Depois |
|---|---|---|
| Performance | 94 | **100** |
| Acessibilidade | 100 | 100 |
| Boas práticas | 96 | **100** |
| SEO | 100 | 100 |
| FCP | 0,76 s | 0,65 s |
| LCP | 1,46 s | 0,66 s |
| TBT | 42 ms | 0 ms |
| CLS | 0,006 | 0,003 |
| Peso transferido | 1.894 KB | 470 KB |

## Como interpretar (limites honestos)

- **O peso menor não vem só de otimização.** Entre as duas versões, a vitrine passou de 5 projetos para 1, então várias imagens deixaram de ser carregadas. O ganho de LCP e de bytes mistura as duas coisas. Os itens abaixo são o que foi otimizado de fato.
- **Lighthouse é laboratório.** Não substitui dados de campo (CrUX). Em mobile real o resultado varia com rede e aparelho.
- **Notas de Acessibilidade 100 não equivalem a conformidade WCAG.** A ferramenta cobre só parte dos critérios. Uma auditoria manual (leitor de tela, teclado, contraste medido) continua pendente.
- **O LCP mobile ainda passa de 2,5 s em alguns runs.** O limite recomendado é 2,5 s; a mediana ficou em 2,7 s.

## O que foi otimizado

| Mudança | Efeito |
|---|---|
| Deformação do WebGL movida para o vertex shader | Remove o laço de ~14 mil vértices e `computeVertexNormals()` por frame |
| Three.js (~600 KB) carregado só após o `load`, em tempo ocioso (`js/webgl-loader.js`) | Tira o JS pesado do caminho do primeiro render; não carrega com `prefers-reduced-motion` ou `saveData` |
| Material sem `transmission`, DPR 1,25 e sem antialias no mobile | Menos GPU e bateria |
| `backdrop-filter` só no card em destaque e no terminal | Menos camadas de blur sobre o canvas |
| Imagens em WebP responsivo (`foto`: 415 KB → 27 KB; preview: 679 KB → 33 KB) e preload do LCP | Menos bytes e LCP mais cedo |
| Fontes self-hosted (woff2 variável, subset latin) e preload | Remove 2 origens externas e CSS de fonte bloqueante |
| Reveal único por GSAP; cursor, tilt, spotlight e ScrollSpy sem trabalho por frame | Menos TBT e menos jank |
| Lenis 1.0.42 (URL com 404) trocado por 1.3.4 | Corrige scroll suave que nunca carregava em produção |

## Pendências conhecidas

- CSS e JS ainda são servidos sem minificação (o Lighthouse aponta `unminified-css` e `unminified-javascript`). O GitHub Pages aplica gzip, então o ganho seria pequeno; ficou de fora para manter o site sem etapa de build.
- Cache: o GitHub Pages fixa `Cache-Control` em 10 minutos e não permite mudar. Migrar para Netlify, Vercel ou Cloudflare Pages permitiria `immutable` com assets versionados.
- Uma auditoria formal de acessibilidade (WCAG 2.1 AA) não foi feita.

## Como reproduzir

```bash
# servir sob /Portifolio/ (como no GitHub Pages)
mkdir srv && cp -r . srv/Portifolio && cd srv && python -m http.server 8082

npx lighthouse http://localhost:8082/Portifolio/ --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new" --output=json
npx lighthouse http://localhost:8082/Portifolio/ --preset=desktop --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new" --output=json
```
