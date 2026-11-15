# bluxxy.com

Site oficial do **BLUXXY** — *Discover your next wave*.

Este repositório contém a página estática do [bluxxy.com](https://bluxxy.com/), com resumo do produto, opções de download dos executáveis e páginas de privacidade, termos, diretrizes de comunidade/segurança e inclusão/saúde.

## Estrutura

- `index.html` — página inicial (resumo do BLUXXY e downloads)
- `privacidade.html` — Política de Privacidade
- `termos.html` — Termos de Uso
- `diretrizes.html` — Diretrizes da Comunidade e Segurança
- `inclusao-saude.html` — Inclusão, Saúde e Bem-estar
- `css/styles.css` — estilos
- `js/main.js` — scripts (menu mobile, ano do rodapé)
- `assets/` — imagens e logotipos
- `downloads/` — arquivos para download (adicione os executáveis aqui)

## Downloads

Coloque os instaladores/executáveis na pasta `downloads/` com os nomes usados na página (ou ajuste os links em `index.html`):

- `downloads/BLUXXY-Setup.exe` — Windows
- `downloads/bluxxy.deb` — Linux (Debian/Ubuntu)
- `downloads/bluxxy.apk` — Android

> Observação: binários grandes podem exigir Git LFS ou publicação dos artefatos em outro local (ex.: GitHub Releases) com atualização dos links.

## Publicar no GitHub

1. Crie um repositório no GitHub (ex.: `bluxxy.com`).
2. No diretório deste projeto, inicialize e envie os arquivos:

```bash
git init
git add .
git commit -m "Site inicial bluxxy.com"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/bluxxy.com.git
git push -u origin main
```

## Deploy no Cloudflare Pages (via GitHub)

1. Acesse o painel da [Cloudflare](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Autorize e selecione o repositório `bluxxy.com`.
3. Configurações de build (site estático):
   - **Framework preset:** None
   - **Build command:** *(deixe em branco)*
   - **Build output directory:** `/` (raiz)
4. Conclua o deploy e, em **Custom domains**, adicione `bluxxy.com` (e `www`, se desejar).

## Observações

- O BLUXXY é destinado a maiores de 18 anos.
- Os documentos legais e informativos (privacidade, termos, diretrizes, inclusão/saúde) são modelos informativos e devem ser revisados/adequados juridicamente e às práticas reais do produto antes da publicação definitiva.
- Revise os e-mails de contato (ex.: `suporte@bluxxy.com`, `privacidade@bluxxy.com`) e os links de download conforme sua infraestrutura.
