# Site da Dra. Letícia Arthuso

Site de uma página para a Dra. Letícia Arthuso, harmonização facial em São João del Rei/MG. É HTML, CSS e JavaScript puros, sem framework e sem etapa de build, e é publicado pelo GitHub Pages direto desta pasta.

- Site: https://guilhermeslvg.github.io/leticia-arthuso/
- Apresentação do projeto: https://guilhermeslvg.github.io/leticia-arthuso/apresentacao.html

## Pastas

```
index.html          a página do site
apresentacao.html   página de apresentação do projeto (independente do site)
css/styles.css      todo o estilo, do celular para as telas maiores
js/conteudo.js      textos dos procedimentos e descrições das fotos
js/site.js          comportamento: animações, mapa do rosto, modal, carrossel, formulário
assets/fotos/       fotos em .webp
assets/marca/       logo LA e favicon em .svg
.nojekyll           faz o GitHub Pages servir os arquivos como estão
```

## Onde mexer

| Para mudar | Arquivo |
| --- | --- |
| Texto de um procedimento (título, resumo, lista, observação) | `js/conteudo.js` |
| Textos das seções, depoimento, dúvidas, endereço | `index.html` |
| Número do WhatsApp | `WA` no começo de `js/site.js` e os `href` do `index.html` |
| Cores e fontes | variáveis em `:root`, no começo de `css/styles.css` |
| Foto de um procedimento | troque `assets/fotos/proc-<id>.webp` mantendo o nome |
| Região desenhada no rosto e zoom de cada procedimento | `ZONA`, em `js/site.js` |

`js/conteudo.js` precisa carregar antes de `js/site.js`, e a ordem já está certa no fim do `index.html`.

## Como testar no computador

Na pasta do site, rode `python -m http.server 8765` e abra http://127.0.0.1:8765.

## Antes do lançamento oficial

- Tirar `<meta name="robots" content="noindex">` do `index.html`, para o Google mostrar o site.
- Confirmar o WhatsApp e a autorização das fotos de pacientes.
