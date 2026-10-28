import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Linhas que saíram do site: os endereços antigos levam para a lista de produtos
const linhasRemovidas = ['magmax', 'magma-m', 'conimax', 'alumag', 'helimax-bipartido', 'coaxial', 'helimax-1-estagio', 'vertimax', 'helimax-monobloco'];
const removida = (url) => linhasRemovidas.some((slug) => url.includes(`/produtos/${slug}/`));

export default defineConfig({
  site: 'https://ipirangaredutores.com.br',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: Object.fromEntries(linhasRemovidas.map((slug) => [`/produtos/${slug}/`, '/produtos/'])),
  integrations: [sitemap({ filter: (page) => !removida(page) })],
});
