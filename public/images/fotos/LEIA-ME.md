# Fotos do site

Coloque aqui as fotos com estes nomes (jpg, webp ou png). O site usa cada uma sozinho no próximo build;
enquanto a foto não existe, aparece o desenho ou a foto provisória.

| Arquivo | Onde aparece | Formato |
|---|---|---|
| `hero` | Fundo do topo da página inicial | Horizontal 16:9, mínimo 2400 × 1350 px |
| `empresa` | Seção "A empresa" (fachada) | Horizontal 4:3, mínimo 1600 × 1200 px |
| `produto-novos` | Card "Equipamentos novos" | Horizontal 4:3, mínimo 1200 × 900 px |
| `produto-usados` | Card "Equipamentos usados" | Horizontal 4:3, mínimo 1200 × 900 px |
| `produto-pecas` | Card "Peças e acoplamentos" | Horizontal 4:3, mínimo 1200 × 900 px |
| `manutencao` | Seção "Serviços" | Horizontal 4:3, mínimo 1600 × 1200 px |

Logos de clientes ficam em `public/images/clientes/` (PNG com fundo transparente ou SVG) e são ligados
a cada cliente em `src/data/empresa.json` (ou pelo painel, em "Serviços, clientes e setores").

Antes de subir, comprima as fotos (por exemplo em squoosh.app) para ficarem com menos de 400 KB cada.
