// Menu do topo e do rodapé: leva às seções da página inicial.
export const menu = [
  { secao: 'inicio', label: 'Home' },
  { secao: 'empresa', label: 'A empresa' },
  { secao: 'produtos', label: 'Produtos' },
  { secao: 'servicos', label: 'Serviços' },
  { secao: 'contato', label: 'Contato' },
];
export const hrefSecao = (secao: string, naHome: boolean) => (naHome ? `#${secao}` : `/#${secao}`);
