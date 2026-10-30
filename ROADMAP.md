# Roadmap: pendências do site

Situação em 28/10/2026: o site novo está no ar em https://ipirangaredutores.com.br, servido pela AWS
(S3 + CloudFront). O endereço de teste https://dpg3ehvdwvrru.cloudfront.net continua funcionando.

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

- [ ] **Hospedagem antiga (HostGator, `108.167.132.137`): NÃO cancelar.** O site saiu de lá, mas o
  e-mail `@ipirangaredutores.com.br` continua hospedado nela. Em 30/10/2026 os registros de e-mail
  (MX, `mail`, `webmail`, `cpanel`, SPF, DKIM, DMARC, autodiscover) foram recriados à mão no Route 53,
  apontando para a HostGator; eles ficam fora do CloudFormation.
  - [ ] Descobrir em nome de quem está a conta da HostGator (provavelmente o antigo gestor do site),
    quando vence e quem paga; pedir a transferência para a Ipiranga.
  - [ ] Trocar a senha do cPanel.
  - [ ] Se um dia quiserem sair da HostGator: migrar o e-mail antes (Google Workspace, Microsoft 365,
    Zoho ou outra hospedagem com cPanel) e só então trocar o MX no Route 53.
- [ ] **Perfil da Empresa no Google (Google Maps)**: é o que mais pesa em buscas locais como "redutores BH".
  - Verificar se o perfil existe e quem administra (pedir acesso, se for de terceiros).
  - Conferir se nome, endereço, telefone/WhatsApp, horário e site (`https://ipirangaredutores.com.br`)
    estão iguais aos do site; adicionar fotos da fachada e da oficina e a categoria certa.
- [ ] **Formulário de contato no site**: caixa para o cliente escrever nome, e-mail/telefone e mensagem
  e enviar direto pela página, sem abrir o aplicativo de e-mail dele. A mensagem chega no
  e-mail da empresa (`ipirangaredutores@ipirangaredutores.com.br`).
  - Caminho previsto, mantendo o site sem servidor: uma função AWS Lambda que recebe o formulário e envia
    o e-mail pelo Amazon SES, criada no mesmo modelo do CloudFormation.
  - Incluir proteção contra spam (campo oculto "isca" e limite de envios) e uma mensagem de confirmação na tela.
- [ ] **Configurar o painel de edição** (Pages CMS em https://app.pagescms.org):
  - criar conta no GitHub para a esposa e convidá-la como colaboradora do repositório;
  - entrar no Pages CMS com a conta do GitHub e abrir o repositório `ipiranga-site`.
