// Fotos da empresa ficam em public/images/fotos/ com nomes fixos (veja public/images/fotos/LEIA-ME.md).
// Enquanto uma foto não existe, a página usa o desenho ou a foto provisória no lugar.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { dimensoes } from './imagens';

export function foto(nome: string): string | undefined {
  for (const ext of ['webp', 'jpg', 'jpeg', 'png']) {
    if (existsSync(join(process.cwd(), 'public/images/fotos', `${nome}.${ext}`))) return `/images/fotos/${nome}.${ext}`;
  }
  return undefined;
}

// Versões menores para o celular, geradas no build pela integração em src/lib/fotos-celular.ts.
// Só as fotos listadas aqui ganham essas versões.
export const FOTOS_CELULAR = ['fachada-ipiranga-redutores-belo-horizonte'];
const LARGURAS = [640, 1024];

export function versao(caminho: string, largura: number): string {
  return caminho.replace(/\.\w+$/, `-${largura}w.webp`);
}

// Larguras menores que a da foto original (não adianta "aumentar" uma foto pequena)
export function larguras(caminho: string): number[] {
  const original = dimensoes(caminho)?.largura ?? 0;
  return LARGURAS.filter((l) => l < original);
}

// srcset com as versões menores e a original. No `astro dev` as versões não existem, então fica só a original.
export function srcset(caminho?: string): string | undefined {
  if (!caminho || !import.meta.env.PROD) return undefined;
  const original = dimensoes(caminho)?.largura;
  if (!original) return undefined;
  return [...larguras(caminho).map((l) => `${versao(caminho, l)} ${l}w`), `${caminho} ${original}w`].join(', ');
}
