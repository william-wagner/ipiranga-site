import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Linhas que saíram do site: os endereços antigos levam para a lista de produtos
const linhasRemovidas = ['magmax', 'magma-m', 'conimax', 'alumag', 'helimax-bipartido', 'coaxial', 'helimax-1-estagio', 'vertimax', 'helimax-monobloco'];
const removida = (url) => linhasRemovidas.some((slug) => url.includes(`/produtos/${slug}/`));

export default defineConfig({
  site: 'https://ipirangaredutores.com.br',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Rede de segurança: o 301 de verdade é feito pela função do CloudFront (infra/)
  redirects: Object.fromEntries(linhasRemovidas.map((slug) => [`/produtos/${slug}/`, '/produtos/'])),
  integrations: [
    sitemap({
      // Linhas removidas e atalhos para o cPanel e o webmail da HostGator não entram no sitemap
      filter: (pagina) => !removida(pagina) && !/\/(cpanel|webmail)\/$/.test(pagina),
    }),
  ],
});
