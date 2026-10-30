import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// O site é uma página só, com seções. Os endereços antigos (site em WordPress e as páginas
// internas que existiram até 30/10/2026) são redirecionados em 301 pela função do CloudFront (infra/).

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
