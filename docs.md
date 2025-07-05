# Project Documentation

## Overview

**MyWebsite** is a personal portfolio, blog, and writing site built with [Astro](https://astro.build/) and [Preact](https://preactjs.com/). It serves as the GitHub Pages website for Matthew Oyan, showcasing video post-production, motion design work, and providing a technical blog and speculative fiction content.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Build & Deployment](#build--deployment)
- [Directory Structure](#directory-structure)
- [Key Configuration Files](#key-configuration-files)
- [Adding Content](#adding-content)
  - [Pages](#pages)
  - [Blog Posts](#blog-posts)
  - [Portfolio](#portfolio)
  - [Writing](#writing)
  - [Tags](#tags)
  - [Wiki](#wiki)
- [Styling](#styling)
- [Scripts](#scripts)
- [VSCode Setup](#vscode-setup)
- [License](#license)

## Prerequisites

- **Node.js** >=16.x
- **npm** (comes with Node.js)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/mywebsite.git
   cd mywebsite
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Development Workflow

- Start local dev server with hot reload:
  ```bash
  npm run dev
  ```
- Preview the production build locally:
  ```bash
  npm run build
  npm run preview
  ```
- Run Astro CLI directly:
  ```bash
  npm run astro -- <command>
  ```

## Build & Deployment

The site is built with Astro and can be deployed to various static hosts or Cloudflare Workers via Wrangler.

- Generate a production build:
  ```bash
  npm run build
  ```
- Configuration for Cloudflare Workers (via `wrangler.json`):
  - Output directory: `./dist`
  - Compatibility date specified in `wrangler.json`
- To develop/debug the wiki assets separately:
  ```bash
  npm run dev:wiki
  ```

## Directory Structure

```text
. 
├── .astro/               # Astro build cache
├── .git/                 # Git repository metadata
├── .gitignore            # Files to ignore in Git
├── .vscode/              # VSCode recommended extensions & launch configs
├── astro.config.mjs      # Astro integration/config
├── package.json          # npm scripts & dependencies
├── package-lock.json     # npm lock file
├── tsconfig.json         # TypeScript configuration
├── wrangler.json         # Cloudflare Wrangler config
├── public/               # Static assets (favicon, images, videos, wiki)
│   ├── favicon.svg
│   ├── images/
│   ├── videos/
│   └── wiki/             # Prebuilt wiki site assets
├── src/                  # Source files
│   ├── components/       # Reusable Astro components
│   ├── layouts/          # Page/layout templates
│   ├── pages/            # Routes & Markdown content
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── index.astro    # Portfolio listing
│   │   ├── portfolio/     # Markdown portfolio items
│   │   ├── posts/         # Markdown blog posts
│   │   ├── tags/          # Dynamic tag pages
│   │   ├── writing/       # Markdown writing posts
│   │   └── writings.astro # Writings index
│   ├── scripts/          # Frontend/helper scripts (e.g., mobile nav)
│   └── styles/           # Global CSS
│       └── global.css
└── README.md             # Project overview (brief)
```

## Key Configuration Files

### astro.config.mjs
Defines Astro integrations (e.g., Preact):
```js
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact()]
});
```

### tsconfig.json
Extends Astro's strict TypeScript config and enables JSX for Preact:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

### wrangler.json
Cloudflare Workers config:
```json
{
  "name": "websitev3",
  "compatibility_date": "2025-06-23",
  "assets": {
    "directory": "./dist"
  }
}
```

## Adding Content

### Pages
Create `.astro` files under `src/pages/`. Each file maps to a route.

### Blog Posts
- Place Markdown files in `src/pages/posts/`.
- Frontmatter keys: `layout`, `title`, `pubDate`, `description`, `author`, `image`, `tags`.

### Portfolio
- Markdown items under `src/pages/portfolio/`.
- Similar frontmatter to blog posts but used in portfolio grid on home page.

### Writing
- Markdown under `src/pages/writing/`.
- Displayed on the Writings index (`writings.astro`).

### Tags
- Dynamic tag pages in `src/pages/tags/[tag].astro`.
- `getStaticPaths` collects unique tags from blog & writing posts.

### Wiki
- Prebuilt static wiki assets live under `public/wiki/`.
- Served as standalone client-side app.

## Styling

Global styles defined in `src/styles/global.css`. The stylesheet handles:
- Base typography and layout
- Dark mode support via `html.dark`
- Responsive navigation menu styles with mobile/desktop variants
- Accent rainbow bar at top of page

## Scripts

- `src/scripts/menu.js`: helper for mobile navigation toggle.
- `npm run dev:wiki`: launches BrowserSync for local wiki preview.

## VSCode Setup

Recommended extensions and launch configs under `.vscode/`:
- `astro-build.astro-vscode` for Astro language support.
- Debug profile to launch `astro dev` in integrated terminal.

## License

This repository is published under the terms specified in the project license (if any).
Otherwise, refer to the top-level repository settings.
