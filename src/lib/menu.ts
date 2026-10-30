// Menu do topo e do rodapé: leva às seções da página inicial.
// Em outras páginas, marca o item do assunto (campo pagina).
export const menu = [
  { secao: 'inicio', label: 'Home', pagina: '' },
  { secao: 'empresa', label: 'A empresa', pagina: '/empresa/' },
  { secao: 'produtos', label: 'Produtos', pagina: '/produtos/' },
  { secao: 'servicos', label: 'Serviços', pagina: '/manutencao/' },
  { secao: 'contato', label: 'Contato', pagina: '/contato/' },
];
export const hrefSecao = (secao: string, naHome: boolean) => (naHome ? `#${secao}` : `/#${secao}`);
