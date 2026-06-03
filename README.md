# Portfólio de Estudante — Eduardo

Portfólio pessoal em HTML, CSS e JavaScript puro. Site de uma página, responsivo e pronto para personalizar.

## Visualizar localmente

Abra o arquivo `index.html` diretamente no navegador, ou use uma extensão de live server no VS Code.

Alternativa com Python (se instalado):

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000`.

## Estrutura do projeto

```
Portifolio-EDU/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos e layout responsivo
├── js/
│   └── main.js         # Menu mobile, scroll e animações
├── assets/
│   └── images/         # Fotos e imagens dos projetos
└── README.md
```

## Personalização

### 1. Informações pessoais

Edite o arquivo `index.html` e substitua:

- Nome e título na seção **Hero**
- Texto da seção **Sobre**
- Entradas da **Formação** (curso, instituição, período)
- Links de **Contato** (email, GitHub, LinkedIn)

### 2. Foto de perfil

1. Adicione sua foto em `assets/images/` (ex.: `foto.jpg`)
2. No `index.html`, substitua o bloco `.hero__avatar` por:

```html
<div class="hero__image fade-in">
  <img src="assets/images/foto.jpg" alt="Foto de Eduardo" class="hero__photo">
</div>
```

3. Adicione no `css/style.css`:

```css
.hero__photo {
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-accent);
  box-shadow: 0 0 40px var(--color-accent-glow);
}
```

### 3. Projetos

Para cada card em `#projetos`:

- Atualize título, descrição e tags
- Substitua os links `#` por URLs reais do GitHub e demo
- (Opcional) Adicione screenshots em `assets/images/` e troque `.project-card__placeholder` por `<img>`

### 4. Cores e tipografia

As cores principais estão no topo de `css/style.css`, na seção `:root`:

```css
--color-accent: #58a6ff;   /* cor de destaque */
--color-bg: #0f1419;       /* fundo principal */
```

Altere esses valores para personalizar o visual.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `Portifolio-EDU`)
2. Envie os arquivos do projeto:

```bash
git init
git add .
git commit -m "Portfólio de estudante"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/Portifolio-EDU.git
git push -u origin main
```

3. No GitHub: **Settings → Pages**
4. Em **Source**, selecione branch `main` e pasta `/ (root)`
5. Salve — em alguns minutos o site estará em:

```
https://SEU-USUARIO.github.io/Portifolio-EDU/
```

## Outras opções de deploy

- **Netlify Drop**: arraste a pasta do projeto em [app.netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: importe o repositório em [vercel.com](https://vercel.com) (deploy estático, sem configuração extra)

## Licença

Uso livre para fins pessoais e educacionais.
