# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project commands

- Install dependencies
  - npm install
- Develop locally (required for Netlify Image CDN to work)
  - netlify dev
  - If the Netlify CLI isn’t installed: npx netlify-cli dev
- Build
  - npm run build
- Preview a production build
  - Note: npm run preview serves the static build but Netlify Image CDN URLs (/.netlify/images) won’t render locally
  - To preview with the real CDN, use a draft deploy: netlify deploy --build --draft --open
- Astro CLI (misc utilities)
  - npm run astro -- check
- Static wiki preview (public/wiki)
  - npm run dev:wiki

Notes
- Tests: No test framework is configured in this repository at the moment.
- Linting/formatting: No linter/formatter configs are present (e.g., ESLint/Prettier).

High-level architecture

Framework and integrations
- Astro 5 site with integrations: @astrojs/preact, @astrojs/mdx, and @astrojs/sitemap (see astro.config.mjs).
- Vite alias maps @lottiefiles/dotlottie-web to its dist entry. package.json aliases react and react-dom to @preact/compat so React-style imports render via Preact islands.
- Deployment uses Netlify (README badge and site field set to a Netlify staging URL); local development should use Netlify CLI for image transforms.

Routing and rendering
- File-based routing under src/pages with content-driven routes:
  - Portfolio entries in src/pages/portfolio/*.{md,mdx}
  - Blog content in src/pages/blog/*.md and long-form writing in src/pages/writing/*.md
  - Tag index and tag detail pages in src/pages/tags
  - Additional pages: contact, resume, privacy-policy, 404
- Tag pages aggregate content using import.meta.glob and getStaticPaths. If tags should include blog posts, ensure the glob targets the blog directory (the current code references ../posts/*.md while content lives under blog/).

Layouts and shared shell
- src/layouts/BaseLayout.astro provides the document shell (global CSS, title/meta, OG/Twitter tags) and renders Header/Footer.
- src/layouts/PostLayout.astro wraps MD/MDX content with BaseLayout, derives metadata from frontmatter, conditionally shows a Footer CTA for portfolio pages, and renders tags for blog posts.

Home/portfolio grid and images
- src/pages/index.astro builds a grid from src/pages/portfolio/* using import.meta.glob, sorted by frontmatter.pubDate.
- Images are served via Netlify Image CDN using /.netlify/images with generated srcset for avif/webp/png. Use netlify dev locally to see transformed images.

Components and islands
- src/components mixes .astro components (Header, Footer, Navigation, Social, ObfuscatedEmail, VideoPlayer) with a Preact island (PhotoGallery.jsx) using yet-another-react-lightbox and plugins (Fullscreen, Slideshow, Thumbnails, Zoom).
- TypeScript/JSX is set to Preact via tsconfig.json (jsx: "react-jsx", jsxImportSource: "preact").

Styling
- Global styles live in src/styles/global.css, using CSS variables for light/dark themes and fontface declarations loaded from fontsource CDNs.
- Preference: avoid border-radius in CSS (keep sharp corners across components/elements).

Static assets and wiki
- Public assets (images, videos, icons) are in public/ and referenced directly.
- A static wiki lives at public/wiki with a live-reload preview command (npm run dev:wiki).

Important points from README
- Code is MIT-licensed. Images/videos in the “Work”/“portfolio” sections are owned by their respective owners and are not covered by the MIT license. Written site content is All Rights Reserved unless otherwise noted.
