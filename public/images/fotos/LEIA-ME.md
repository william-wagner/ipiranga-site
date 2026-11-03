# Fotos do site

Coloque aqui as fotos com estes nomes (jpg, webp ou png). O site usa cada uma sozinho no próximo build;
enquanto a foto não existe, aparece o desenho ou a foto provisória.

Os nomes descrevem a foto de propósito: o Google usa o nome do arquivo para entender a imagem.

| Arquivo | Onde aparece | Formato |
|---|---|---|
| `fachada-ipiranga-redutores-belo-horizonte` | Fundo do topo da página inicial | Horizontal 16:9, mínimo 2400 × 1350 px |
| `fachada-antiga-ipiranga-redutores` | Seção "A empresa" (fachada antiga) | Horizontal 4:3, mínimo 1600 × 1200 px |
| `redutores-de-velocidade-novos` | Card "Equipamentos novos" | Horizontal 4:3, mínimo 1200 × 900 px |
| `motorredutor-usado` | Card "Equipamentos usados" | Horizontal 4:3, mínimo 1200 × 900 px |
| `pecas-de-reposicao-e-acoplamentos` | Card "Peças e acoplamentos" | Horizontal 4:3, mínimo 1200 × 900 px |
| `manutencao-de-redutores-bh` | Seção "Serviços" | Horizontal 4:3, mínimo 1600 × 1200 px |

Ao trocar uma foto, atualize em `src/pages/index.astro` a descrição dela (`alt`, o texto que o Google e os
leitores de tela leem) e a largura e a altura, se mudarem.

A imagem da prévia de link (`public/images/redutores-e-motorredutores-ipiranga.jpg`) é uma arte
com logo e textos, não uma foto. O original em alta fica em `design/compartilhar-original.png`. Para trocar:
1200 × 630 px, JPG com menos de 300 KB (o WhatsApp ignora imagens pesadas), logo e textos perto do centro e
um nome de arquivo novo (o WhatsApp e o Facebook guardam a imagem antiga pelo endereço).

Logos de clientes ficam em `public/images/clientes/` (PNG com fundo transparente ou SVG) e são ligados
a cada cliente em `src/data/empresa.json` (ou pelo painel, em "Serviços, clientes e setores").

Antes de subir, comprima as fotos (por exemplo em squoosh.app) para ficarem com menos de 400 KB cada.
