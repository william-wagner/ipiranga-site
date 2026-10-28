// Fotos da empresa ficam em public/images/fotos/ com nomes fixos (veja public/images/fotos/LEIA-ME.md).
// Enquanto uma foto não existe, a página usa o desenho ou a foto provisória no lugar.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function foto(nome: string): string | undefined {
  for (const ext of ['webp', 'jpg', 'jpeg', 'png']) {
    if (existsSync(join(process.cwd(), 'public/images/fotos', `${nome}.${ext}`))) return `/images/fotos/${nome}.${ext}`;
  }
  return undefined;
}
