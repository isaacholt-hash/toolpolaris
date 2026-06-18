import { defineConfig } from 'astro/config';
import { rehypeAffiliateRel } from './src/lib/affiliateLinks.mjs';

export default defineConfig({
  site: 'https://toolpolaris.com',
  output: 'static',
  markdown: {
    rehypePlugins: [rehypeAffiliateRel],
  },
});
