// Integração do Astro: depois do build, grava em dist/ as versões menores das fotos de FOTOS_CELULAR,
// para o celular não baixar a foto inteira. A página aponta para elas com o srcset de src/lib/fotos.ts.
import type { AstroIntegration } from 'astro';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { FOTOS_CELULAR, foto, larguras, versao } from './fotos';

export default function fotosCelular(): AstroIntegration {
  return {
    name: 'fotos-celular',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const saida = fileURLToPath(dir);
        for (const nome of FOTOS_CELULAR) {
          const caminho = foto(nome);
          if (!caminho) continue;
          for (const largura of larguras(caminho)) {
            const destino = join(saida, versao(caminho, largura));
            mkdirSync(dirname(destino), { recursive: true });
            const { size } = await sharp(join(process.cwd(), 'public', caminho)).resize({ width: largura }).webp({ quality: 75 }).toFile(destino);
            logger.info(`${versao(caminho, largura)} (${Math.round(size / 1024)} KB)`);
          }
        }
      },
    },
  };
}
