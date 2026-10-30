# Roadmap: pendências do site

Situação em 28/10/2026: o site novo está no ar em https://ipirangaredutores.com.br, servido pela AWS
(S3 + CloudFront). O endereço de teste https://dpg3ehvdwvrru.cloudfront.net continua funcionando.

## Novo visual (branch `redesign-2026`)

- [ ] **Aprovar o novo visual** e juntar a branch na `main` (isso publica o site).
- [ ] **Fotos**: gerar as fotos pelos prompts do documento "Prompts das fotos do site" e salvar em
  `public/images/fotos/` com os nomes de `public/images/fotos/LEIA-ME.md`. Cada foto entra sozinha no site.
  A da fachada (`empresa`) deve ser real.
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
- [ ] **Atendimento fora de BH (pensar)**: avaliar uma frase na seção de manutenção da página inicial
  convidando quem é de fora a enviar o redutor para a oficina, por exemplo: "Fora de BH? Envie seu
  redutor para a nossa oficina. Atendemos todo o Brasil." Decidir se a Ipiranga quer destacar isso
  (frete, prazo, como embalar) antes de pôr no site.
- [x] **Formulário de contato no site** (30/10/2026): nome, telefone e mensagem, enviados em segundo
  plano para `ipirangaredutores@ipirangaredutores.com.br`, com remetente `site@ipirangaredutores.com.br`.
  - Infraestrutura em `infra/contato.yaml` (pilha CloudFormation `ipiranga-contato`, região sa-east-1):
    função Lambda `ipiranga-formulario` (Node 22) com endereço público (Function URL) que só aceita
    chamadas de `ipirangaredutores.com.br` e `www.`; envia pelo Amazon SES. O endereço é a saída
    `EnderecoFormulario` da pilha e fica em `src/data/site.json` → `formulario`.
  - O domínio no SES (identidade com Easy DKIM publicado no Route 53) foi criado pelo console, fora do modelo.
  - Proteção: campo-isca `empresa_site`, limites de tamanho e validação de telefone com DDD.
  - O SES está no modo sandbox (200 envios/dia, só para endereços do domínio), suficiente para o formulário.
  - Só funciona no domínio oficial; na prévia do artefato o envio é simulado.
- [ ] **Configurar o painel de edição** (Pages CMS em https://app.pagescms.org):
  - criar conta no GitHub para a esposa e convidá-la como colaboradora do repositório;
  - entrar no Pages CMS com a conta do GitHub e abrir o repositório `ipiranga-site`.
