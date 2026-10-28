# Site da Ipiranga Redutores

Site institucional de [ipirangaredutores.com.br](https://ipirangaredutores.com.br), feito com [Astro](https://astro.build) e hospedado na AWS (S3 + CloudFront).

## Como editar o conteúdo

Pelo painel **[Pages CMS](https://app.pagescms.org)**: entre com a conta do GitHub, abra o repositório `ipiranga-site` e edite:

- **Produtos**: nome, tipo, foto, ficha técnica e descrição de cada linha.
- **Páginas**: A empresa, Manutenção, Aplicações e O que é um redutor.
- **Contato e horário**: telefone, WhatsApp, e-mail, endereço e horários. Mudou aqui, muda no site inteiro (cabeçalho, rodapé, botões e o aviso de "Aberto agora").

Ao salvar, o site é publicado sozinho em 1 a 2 minutos.

## Onde fica cada coisa

| Pasta | O que tem |
|---|---|
| `src/content/produtos/` | Um arquivo por produto |
| `src/content/paginas/` | Textos das páginas institucionais |
| `src/data/site.json` | Contatos e horário |
| `public/images/` | Logo, fotos e favicon |
| `src/pages/`, `src/layouts/`, `src/components/` | Layout e estrutura do site |
| `.pages.yml` | Configuração do painel de edição |
| `.github/workflows/publicar.yml` | Publicação automática na AWS |
| `infra/cloudfront-function.js` | Redirects do site antigo e do www |

## Rodar no computador

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera o site em dist/
```

## Publicação

Cada push na `main` gera o site e envia para o S3, depois limpa o cache do CloudFront. O login na AWS é por OIDC (sem chaves no GitHub). O workflow precisa destas **variáveis do repositório** (Settings → Secrets and variables → Actions → Variables):

- `AWS_ROLE_ARN`: papel IAM que o GitHub Actions assume
- `S3_BUCKET`: nome do bucket do site
- `CLOUDFRONT_DISTRIBUTION_ID`: ID da distribuição do CloudFront

Enquanto essas variáveis não existem, o workflow só gera o site, para conferir que nada quebrou.
