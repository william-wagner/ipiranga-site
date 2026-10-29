// Links de páginas usados nos rodapés.
export const paginasRodape = [
  { href: '/usados/', label: 'Redutores usados' },
  { href: '/produtos/', label: 'Produtos' },
  { href: '/manutencao/', label: 'Manutenção' },
  { href: '/pecas-e-acoplamentos/', label: 'Peças e acoplamentos' },
  { href: '/empresa/', label: 'A empresa' },
  { href: '/contato/', label: 'Contato' },
  { href: '/aplicacoes/', label: 'Aplicações e tipos de redutor' },
  { href: '/o-que-e-um-redutor-de-velocidade/', label: 'O que é um redutor' },
];

// Duas propostas em avaliação para o fim da página:
//  'a' = seção de contato completa (com mapa) + rodapé enxuto
//  'b' = rodapé que é o próprio bloco de contato
// Para gerar a outra: PUBLIC_RODAPE=b npm run build
export const opcaoRodape: 'a' | 'b' = import.meta.env.PUBLIC_RODAPE === 'b' ? 'b' : 'a';
