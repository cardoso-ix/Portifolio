# Portfólio · Eduardo Cardoso

Site pessoal: suporte técnico e automação com IA.

**No ar:** https://cardoso-ix.github.io/Portifolio/

## Decisões

- **Sem bibliotecas.** HTML, um CSS e um JS pequeno. A versão anterior carregava Three.js, GSAP, Lenis e cursor customizado; o carregamento era bom, mas a rolagem e a cena 3D deixavam o site pesado no uso. Tudo isso saiu.
- **Conteúdo primeiro.** Quem visita é recrutador: em 10 segundos precisa ver quem sou, o que faço e projetos com link. Seções: Projetos, Sobre e método, Competências, Trajetória, Contato.
- **Tema escuro por padrão**, com tema claro (segue o sistema e lembra a escolha). Cores iguais às da capa do LinkedIn.
- **CSP restrito** (`script-src 'self'`, `style-src 'self'`): nenhum script ou estilo de terceiros.
- **Acessível:** link para pular ao conteúdo, foco visível, menu com `aria-expanded`, respeita `prefers-reduced-motion`.

## Estrutura

```
index.html            página única
css/site.css          estilos (tema escuro + claro)
js/theme-init.js      aplica o tema antes da primeira pintura
js/site.js            menu, tema, copiar e-mail, link ativo
assets/               fotos, fontes, CV em PDF, ícones
conversor-unidades/   build do projeto Conversor de Unidades
scripts/              geradores (CV em PDF, imagens, favicon)
```

## Rodar local

```bash
python -m http.server 8765
```

## Currículo

```bash
pip install -r scripts/requirements.txt
python scripts/generate_cv.py   # gera assets/cv_eduardo_cardoso.pdf
```

Ao trocar o PDF, aumente o `?v=` dos links do currículo no `index.html`.
