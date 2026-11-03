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
  (função do CloudFront em `infra/`).
- [ ] **Pensar como incluir os textos mais longos** que saíram com as páginas internas, como o artigo
  "O que é um redutor de velocidade?", as páginas de usados, de peças e de aplicações, e as fichas dos
  produtos (WCR, WCG01, Magma K). Os textos continuam guardados em `src/content/paginas/` e
  `src/content/produtos/` (fora do site e do painel de edição). Ideias: uma seção curta na página inicial
  com "saiba mais" que abre o texto, uma área de artigos/blog ou voltar com algumas páginas só para o
  Google. Pesar o ganho no Google contra o site ficar enxuto.
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
- [ ] **Voltar com páginas próprias** para manutenção, usados, peças, aplicações, o artigo e os produtos
  (é a correção que mais pesa; ver o item "Pensar como incluir os textos mais longos" acima). Junto com isso:
  - cada página usa o `titulo` e a `descricao` do frontmatter; criar um campo opcional `tituloSeo` para os
    títulos que não citam BH ("A empresa", "Redutores usados", "Peças e acoplamentos", "Manutenção");
  - links "Saiba mais" na página inicial apontando para as páginas;
  - na função do CloudFront (e na cópia em `infra/site.yaml`), mandar cada URL antiga para a página
    equivalente em vez da página inicial;
  - as imagens do frontmatter dessas páginas e produtos (`/images/empresa/*` e `/images/produtos/*`) foram
    apagadas em 03/11/2026 porque nenhuma página as usava: recuperar do git ou usar as fotos novas.
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
- [ ] **Desempenho** (medir antes no PageSpeed Insights): reservar o espaço do "Aberto agora"; menos pesos de fonte; cache longo para `/_astro/*`
  e `/images/*` no CloudFront; avaliar se o Lenis fica.
- [ ] **Search Console**: cadastrar o domínio, enviar o sitemap e acompanhar indexação e soft 404.

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
