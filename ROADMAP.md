# Roadmap: pendências do site

Situação em 28/10/2026: o site novo está no ar em https://ipirangaredutores.com.br, servido pela AWS
(S3 + CloudFront). O endereço de teste https://dpg3ehvdwvrru.cloudfront.net continua funcionando.

## Novo visual (branch `redesign-2026`)

- [ ] **Aprovar o novo visual** e juntar a branch na `main` (isso publica o site).
- [ ] **Fotos reais**: oficina, técnico na bancada, redutor desmontado, fachada e equipe. Hoje o site usa a foto
  antiga do estoque, fotos de catálogo nos produtos e desenhos técnicos no lugar das fotos da oficina.
- [ ] **Fotos de produto melhores**: a do Magma K é pequena (221 px) e a do WCR é provisória.
- [ ] **Logo em alta resolução** (vetor ou PNG grande, fundo transparente).
- [ ] **Conferir textos que assumem coisas** sobre os usados: "revisão na nossa oficina" antes da entrega e
  que o estoque de usados muda com frequência (`src/content/paginas/usados.md` e página inicial).
- [ ] **Regras do selo WEG**: conferir com a WEG como o selo de autorizada pode aparecer.

## Antes da virada

- [ ] **Revisar o site novo** com a Ipiranga: fotos, contatos e navegação, também pelo celular.
- [ ] **Revisar os textos do site** e ajustar para a linguagem da empresa: A empresa, Manutenção, Aplicações
  e as descrições dos produtos (foram reescritos a partir do site antigo).
  - Atenção especial ao artigo **"O que é um redutor de velocidade?"**: no site antigo ele era uma cópia
    da Wikipédia. No site novo já foi reescrito com outras palavras, mas o ideal é a Ipiranga revisar ou
    trocar por um texto próprio, com a experiência da empresa (o que mais aparece na oficina, dicas de
    manutenção etc.). Arquivo: `src/content/paginas/o-que-e-um-redutor-de-velocidade.md`.

## Virada do domínio

- [x] **Fase 3 do CloudFormation** (feita em 28/10/2026): atualizar a pilha `site-ipiranga` (us-east-1) com o parâmetro `Fase = 3`.
  Isso aponta `ipirangaredutores.com.br` e `www` para o CloudFront. O DNS está com TTL de 5 minutos;
  para desfazer, basta voltar para `Fase = 2`.
- [x] Depois da virada, conferir no domínio: HTTPS, redirect do `www` e redirects das URLs antigas do WordPress.

## Domínio (painel do Registro.br)

- [ ] **Renovar o domínio**: vence em **29/11/2026**.
- [ ] Trocar o **contato técnico**, que ainda é a "REALSITE WEBDESIGN" (provável autora do site antigo).

## Depois da virada

- [ ] **Cancelar a hospedagem antiga** (WordPress em `108.167.132.137`, DNS `prodns.com.br`).
  Esperar alguns dias com o site novo no ar antes de cancelar.
- [ ] **Formulário de contato no site**: caixa para o cliente escrever nome, e-mail/telefone e mensagem
  e enviar direto pela página, sem abrir o aplicativo de e-mail dele. A mensagem chega no
  e-mail da empresa (`redutores.ipiranga@gmail.com`).
  - Caminho previsto, mantendo o site sem servidor: uma função AWS Lambda que recebe o formulário e envia
    o e-mail pelo Amazon SES, criada no mesmo modelo do CloudFormation.
  - Incluir proteção contra spam (campo oculto "isca" e limite de envios) e uma mensagem de confirmação na tela.
- [ ] **Configurar o painel de edição** (Pages CMS em https://app.pagescms.org):
  - criar conta no GitHub para a esposa e convidá-la como colaboradora do repositório;
  - entrar no Pages CMS com a conta do GitHub e abrir o repositório `ipiranga-site`.
