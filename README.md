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
| `infra/site.yaml` | Infraestrutura do site (CloudFormation, região us-east-1) |
| `infra/contato.yaml` | Formulário de contato: Lambda + SES (CloudFormation, região sa-east-1) |

## E-mail e cPanel

O e-mail `@ipirangaredutores.com.br` **não** fica na AWS: continua na hospedagem antiga (HostGator, `108.167.132.137`).
O Route 53 só aponta para lá (MX → `mail.ipirangaredutores.com.br`, mais SPF, DKIM e DMARC). Não apague esses registros.

- cPanel: [ipirangaredutores.com.br/cpanel](https://ipirangaredutores.com.br/cpanel/) (atalho para `cpanel.ipirangaredutores.com.br`)
- Webmail: [ipirangaredutores.com.br/webmail](https://ipirangaredutores.com.br/webmail/) (atalho para `webmail.ipirangaredutores.com.br`)
- Outlook / celular: servidor `mail.ipirangaredutores.com.br`

## Formulário de contato

O formulário da seção de contato envia em segundo plano para uma função AWS Lambda, que manda a mensagem
por e-mail (Amazon SES) de `site@ipirangaredutores.com.br` para `ipirangaredutores@ipirangaredutores.com.br`.

- Infraestrutura: `infra/contato.yaml`, pilha `ipiranga-contato` em **sa-east-1** (São Paulo).
  Para alterar: `aws cloudformation deploy --region sa-east-1 --stack-name ipiranga-contato --template-file infra/contato.yaml --capabilities CAPABILITY_NAMED_IAM`.
- O endereço da função (saída `EnderecoFormulario` da pilha) fica em `src/data/site.json` → `formulario`.
- A função só aceita envios vindos de `ipirangaredutores.com.br` e `www.`; em `npm run dev` o envio é bloqueado pelo navegador.
- O domínio está verificado no SES (DKIM no Route 53). Os registros `*._domainkey` criados pelo SES não podem ser apagados.
- A caixa `site@` existe no cPanel só para receber eventuais respostas ou avisos de falha.

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
