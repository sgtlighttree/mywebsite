// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/** @type {import('@astrojs/sitemap').SitemapOptions} */
const sitemapOptions = {
  filter: (page) => {
    const url = page || '';
    return !url.includes('/blog-drafts/') && !url.includes('/portfolio-drafts/');
  },
  filenameBase: 'sitemap',
  entryLimit: 50000
};

// https://astro.build/config
export default defineConfig({
  site: 'https://531102.xyz', // Replace with your actual site URL
  integrations: [preact(), mdx(), sitemap(sitemapOptions)],

  vite: {
    resolve: {
      alias: {
        '@lottiefiles/dotlottie-web': '/node_modules/@lottiefiles/dotlottie-web/dist/index.js'
      }
    }
  }
});
