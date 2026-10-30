import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ipirangaredutores.com.br',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Atalhos para o cPanel e o webmail da HostGator não entram no sitemap
      filter: (pagina) => !/\/(cpanel|webmail)\/$/.test(pagina),
    }),
  ],
});
