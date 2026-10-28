# Roadmap: pendências do site

Situação em 28/10/2026: o site novo está publicado na AWS e pode ser visto em
https://dpg3ehvdwvrru.cloudfront.net. O domínio `ipirangaredutores.com.br` ainda mostra o site antigo.

## Antes da virada

- [ ] **Revisar o site novo** com a Ipiranga: textos, descrições dos produtos, fotos e contatos, também pelo celular.

## Virada do domínio

- [ ] **Fase 3 do CloudFormation**: atualizar a pilha `site-ipiranga` (us-east-1) com o parâmetro `Fase = 3`.
  Isso aponta `ipirangaredutores.com.br` e `www` para o CloudFront. O DNS está com TTL de 5 minutos;
  para desfazer, basta voltar para `Fase = 2`.
- [ ] Depois da virada, conferir no domínio: HTTPS, redirect do `www` e redirects das URLs antigas do WordPress.

## Domínio (painel do Registro.br)

- [ ] **Renovar o domínio**: vence em **29/11/2026**.
- [ ] Trocar o **contato técnico**, que ainda é a "REALSITE WEBDESIGN" (provável autora do site antigo).

## Depois da virada

- [ ] **Cancelar a hospedagem antiga** (WordPress em `108.167.132.137`, DNS `prodns.com.br`).
  Esperar alguns dias com o site novo no ar antes de cancelar.
- [ ] **Configurar o painel de edição** (Pages CMS em https://app.pagescms.org):
  - criar conta no GitHub para a esposa e convidá-la como colaboradora do repositório;
  - entrar no Pages CMS com a conta do GitHub e abrir o repositório `ipiranga-site`.
