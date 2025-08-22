// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://staging-mattoyan.netlify.app/', // Replace with your actual site URL
  integrations: [preact(), mdx(), sitemap()]
});
