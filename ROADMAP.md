# Roadmap: pendências do site

Situação em 28/10/2026: o site novo está no ar em https://ipirangaredutores.com.br, servido pela AWS
(S3 + CloudFront). O endereço de teste https://dpg3ehvdwvrru.cloudfront.net continua funcionando.

## Novo visual (branch `redesign-2026`)

- [x] **Aprovar o novo visual** e juntar a branch na `main`: publicado em 30/10/2026, com os redirecionamentos (pilha `site-ipiranga`) e o formulário de contato.
- [ ] **Fotos**: gerar as fotos pelos prompts do documento "Prompts das fotos do site" e salvar em
  `public/images/fotos/` com os nomes de `public/images/fotos/LEIA-ME.md`. Cada foto entra sozinha no site.
  A da fachada antiga (`fachada-antiga-ipiranga-redutores`) é real. Os nomes dos arquivos mudaram em
  03/11/2026; conferir se o documento de prompts ainda cita os nomes antigos (`hero`, `empresa`, `produto-*`).
- [x] **Site em uma página só** (30/10/2026): as páginas internas (A empresa, Aplicações, Manutenção, Usados,
  Peças e acoplamentos, "O que é um redutor", Produtos e cada produto, Contato) saíram do site. Os endereços
  delas e os do WordPress antigo vão em 301 para a seção correspondente da página inicial
  (função do CloudFront em `infra/`). Parte delas voltou em 03/11/2026 (item abaixo).
- [x] **Textos mais longos de volta como páginas** (03/11/2026), decidido pelo Search Console e pelos sitelinks
  do Google: A empresa, Manutenção, Aplicações, "O que é um redutor", Produtos e as fichas WCR, WCG01, Magma K e
  Conimax (texto recuperado do git). Ficam fora do menu, com links "Saiba mais" na página inicial, botão do
  WhatsApp e link para a página inicial no fim. Usados e Peças continuam só como seções (lista `PUBLICADAS` em
  `src/pages/[pagina].astro`); os textos deles seguem em `src/content/paginas/`.
- [ ] **Atualizar a função do CloudFront** (pilha `site-ipiranga`, `infra/site.yaml`) **depois** de publicar
  o site com as páginas: até lá, `/manutencao/`, `/produtos/` etc. continuam indo para a página inicial.
- [ ] **Search Console** depois da publicação: pedir indexação de `/produtos/conimax/`, `/manutencao/`,
  `/empresa/`, `/aplicacoes/`, `/produtos/` e do artigo; reenviar o sitemap; acompanhar em 4 a 6 semanas a
  busca "conimax" e as páginas antigas (`/redutor-de-velocidade-bh/`, `/2014/11/05/motorredutor-conimax/`).
- [ ] **Decidir sobre Usados e Peças**: a busca "acoplamento" teve 19 impressões; conferir no Search Console
  (as 11 páginas que não estavam no print) se vale publicar `/pecas-e-acoplamentos/` e `/usados/`.
- [ ] **Foto do Conimax** em boa resolução: a atual (`public/images/produtos/foto-conimax.jpg`) é uma miniatura
  do site antigo. Conferir também se o texto da ficha ainda vale (lojas vendem a linha como "Conimax WCG20").
- [ ] **Logo em alta resolução** (vetor ou PNG grande, fundo transparente).
- [ ] **Conferir textos que assumem coisas** sobre os usados: "revisão na nossa oficina" antes da entrega e
  que o estoque de usados muda com frequência (página inicial).
- [ ] **Regras do selo WEG**: conferir com a WEG como o selo de autorizada pode aparecer.

## SEO (auditoria de 03/11/2026)

Relatório completo no artefato "Auditoria SEO Ipiranga Redutores"
(https://claude.ai/artifact/JZP5NLJh9uYbTgW8FmZLPC).

- [x] **Dados estruturados** (`LocalBusiness` em `src/layouts/Base.astro`): geo, área atendida, mapa, logo,
  bairro e serviços. `geo` e `sameAs` só entram quando preenchidos em `src/data/site.json`.
- [x] **Textos da página inicial** citam BH e a Grande BH, com "todo o Brasil" como complemento.
- [x] **Título da home** com "motorredutores" e "manutenção"; **404** com `noindex` e sem canonical (03/11/2026).
- [x] **Validar no Rich Results Test** o schema publicado (03/11/2026).
- [x] **Voltar com páginas próprias** (03/11/2026; ver "Textos mais longos de volta como páginas" acima):
  campo opcional `tituloSeo`, links "Saiba mais" na página inicial, cada URL antiga em 301 para a página
  equivalente e imagens recuperadas do git. Usados e peças ficaram de fora por enquanto.
- [ ] **Serviços com mais texto**: cada serviço como H3 com descrição (três estão sem detalhe em
  `src/data/empresa.json`).
- [x] **H1 sem BH e sem manutenção** (03/11/2026): decidido manter o H1 como está. O texto logo abaixo dele e o
  título da aba já citam BH e manutenção; repetir no H1 só duplicaria a frase.
- [x] **Foto do topo para celular** (03/11/2026): `srcset` com versões de 640 e 1024 px, geradas no build por
  `src/lib/fotos-celular.ts` (41 KB e 85 KB, contra 224 KB da original).
- [x] **Imagens para o Google** (03/11/2026): foto do topo como `<img>` com alt e prioridade (antes era fundo de
  CSS, invisível para o Google Imagens); nomes de arquivo descritivos; alt da fachada antiga; imagem de
  compartilhamento com `og:image:alt`, largura e altura; `image` do schema com as fotos da fachada atual e da
  antiga; width/height nos logos de clientes; imagens sem uso apagadas.
- [ ] **Fotos reais da empresa**: hoje as fotos de produtos, de manutenção e do topo parecem geradas por IA
  (há textos sem sentido como "TILMARCON" e "STK" ao fundo). Fotografar a fachada atual, a oficina, o estoque
  e a equipe e trocar os arquivos (nomes e passos em `public/images/fotos/LEIA-ME.md`). Depois:
  - rever os alts em `src/pages/index.astro` (o da manutenção cita um "técnico da Ipiranga");
  - incluir as fotos reais da oficina no `image` do schema (`src/layouts/Base.astro`);
  - subir as mesmas fotos no Perfil da Empresa no Google (ver "Depois da virada").
- [x] **Arte da prévia de link** (03/11/2026): `og:image` passou a ser uma arte com logo, "Redutores e
  motorredutores", "Venda e manutenção em Belo Horizonte desde 1980" e selo WEG-CESTARI
  (`public/images/logos-ipiranga-redutores-weg-cestari.jpg`, feita pela Ipiranga; original em alta em
  `design/compartilhar-original.png`). Tirar o selo se a WEG não permitir (ver "Regras do selo WEG").
- [ ] **Validar o compartilhamento** depois de publicar: colar o link no WhatsApp e no
  https://developers.facebook.com/tools/debug/ (o Facebook guarda a imagem antiga em cache; usar "Scrape again").
- [ ] **Desempenho** (medir no PageSpeed Insights): falta cortar os pesos de fonte de seis para 3 ou 4
  (`src/styles/global.css:1-6`).
  - [x] **"Aberto agora" sem deslocar o layout** (03/11/2026): script inline logo após o elemento, que
    preenche o texto antes de a página aparecer (`src/components/StatusAberto.astro`).
  - [x] **Cache** (03/11/2026, `.github/workflows/publicar.yml`): `/_astro/*` com 1 ano (já estava),
    `/images/*` com 1 dia, HTML e o resto com 5 min. Uma foto trocada **com o mesmo nome** leva até 24 h
    para aparecer para quem já visitou o site; para ver na hora, trocar o nome do arquivo.
  - [x] **Lenis**: decidido manter (03/11/2026).
- [ ] **Search Console**: cadastrar o domínio, enviar o sitemap e acompanhar indexação e soft 404.

## Indicadores (Google Analytics 4)

- [x] **GA4 no site** (03/11/2026): propriedade "Site Ipiranga Redutores", ID `G-2GWF60PHEJ`, em
  `src/components/Analytics.astro`. Carrega para todos os visitantes, só no domínio oficial. O aviso de
  cookies foi tirado em 03/11/2026 (decisão: medir todos, com base no legítimo interesse). Eventos: `clique_whatsapp`, `clique_telefone`, `clique_email`,
  `clique_instagram`, `clique_mapa`, `generate_lead` (formulário enviado) e `ver_secao`.
- [ ] No GA4, **Fluxos de dados → Medição otimizada → Visualizações de página → desligar "Mudanças de página
  com base em eventos do histórico do navegador"** (o site troca o `#secao` do endereço ao rolar e isso
  contaria visualizações falsas).
- [ ] **Dimensões personalizadas** (Administrador → Definições personalizadas), escopo evento: `local`,
  `item` e `secao`. Sem isso os parâmetros não aparecem nos relatórios.
- [ ] **Eventos-chave**: marcar `clique_whatsapp`, `clique_telefone` e `generate_lead` depois que aparecerem.
- [ ] Retenção de dados em 14 meses; vincular o Search Console.
- [ ] **Página de política de privacidade** (LGPD), com link no rodapé: quem é a empresa (controladora) e o
  contato para falar de dados pessoais; que o site usa cookies do Google Analytics para medir visitas,
  com base no legítimo interesse, sem uso para anúncios; o que o formulário de contato coleta (nome,
  telefone, mensagem), para que é usado e que segue por e-mail (AWS/Amazon SES); por quanto tempo os
  dados ficam guardados (GA4: 14 meses); os direitos do titular (acesso, correção, exclusão, oposição) e
  como pedir. Pedir revisão de quem cuida de LGPD/jurídico da empresa antes de publicar.
- [ ] Depois: Microsoft Clarity (mapas de calor e gravações).

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
