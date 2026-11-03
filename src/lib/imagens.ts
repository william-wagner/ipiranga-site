// Largura e altura de uma imagem em public/, lidas do cabeçalho do arquivo (PNG, JPEG, WebP e SVG).
// Serve para preencher width/height de imagens trocadas pelo painel, sem medir à mão.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface Dimensoes { largura: number; altura: number }

export function dimensoes(caminho?: string): Dimensoes | undefined {
  if (!caminho) return undefined;
  const arquivo = join(process.cwd(), 'public', caminho);
  if (!existsSync(arquivo)) return undefined;
  const b = readFileSync(arquivo);

  // PNG
  if (b[0] === 0x89 && b.toString('ascii', 1, 4) === 'PNG') return { largura: b.readUInt32BE(16), altura: b.readUInt32BE(20) };

  // WebP
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const tipo = b.toString('ascii', 12, 16);
    if (tipo === 'VP8X') return { largura: 1 + b.readUIntLE(24, 3), altura: 1 + b.readUIntLE(27, 3) };
    if (tipo === 'VP8 ') return { largura: b.readUInt16LE(26) & 0x3fff, altura: b.readUInt16LE(28) & 0x3fff };
    if (tipo === 'VP8L') {
      const v = b.readUInt32LE(21);
      return { largura: (v & 0x3fff) + 1, altura: ((v >> 14) & 0x3fff) + 1 };
    }
  }

  // JPEG: procura o marcador SOF (início do quadro), que traz altura e largura
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const marcador = b[i + 1];
      if (marcador >= 0xc0 && marcador <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marcador)) {
        return { largura: b.readUInt16BE(i + 7), altura: b.readUInt16BE(i + 5) };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }

  // SVG: width/height do <svg> ou, na falta deles, o viewBox
  if (caminho.toLowerCase().endsWith('.svg')) {
    const svg = b.toString('utf8').match(/<svg[^>]*>/i)?.[0] ?? '';
    const atributo = (nome: string) => parseFloat(svg.match(new RegExp(`\\s${nome}="([\\d.]+)`))?.[1] ?? '');
    const [largura, altura] = [atributo('width'), atributo('height')];
    if (largura && altura) return { largura: Math.round(largura), altura: Math.round(altura) };
    const viewBox = svg.match(/viewBox="[\d.\-]+[\s,]+[\d.\-]+[\s,]+([\d.]+)[\s,]+([\d.]+)"/i);
    if (viewBox) return { largura: Math.round(+viewBox[1]), altura: Math.round(+viewBox[2]) };
  }

  return undefined;
}
