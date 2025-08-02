# Project Documentation

## Overview

**mywebsite** is a personal portfolio and blog built with [Astro](https://astro.build/) and [Preact](https://preactjs.com/). It showcases video post-production, motion design work, and hosts speculative fiction and blog content.

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

1.  Clone the repository:
    ```bash
    git clone https://github.com/matthewoyan/mywebsite.git
    cd mywebsite
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Development Workflow

- **Start local dev server with hot reload:**
  ```bash
  npm run dev
  ```
  
- **Start local dev server with LAN:**
  ```bash
  npm run dev -- --host
  ```

- **Preview the production build locally:**
  ```bash
  npm run build
  npm run preview
  ```
- **Run Astro CLI commands directly:**
  For example, to see all available Astro commands:
  ```bash
  npm run astro -- --help
  ```

## Build & Deployment

The site is built with Astro and deployed to Cloudflare Workers via Wrangler.

- **Generate a production build:**
  ```bash
  npm run build
  ```
- **Develop/debug the wiki assets separately:**
  The wiki is a pre-built static site. Use this command to preview changes to its assets with live-reloading.
  ```bash
  npm run dev:wiki
  ```

## Directory Structure

```text
.
├── .astro/               # Astro build cache
├── .git/                 # Git repository metadata
├── .vscode/              # VSCode recommended extensions & launch configs
├── astro.config.mjs      # Astro integration/config
├── package.json          # npm scripts & dependencies
├── tsconfig.json         # TypeScript configuration
├── wrangler.json         # Cloudflare Wrangler config
├── public/               # Static assets (favicon, images, videos, wiki)
│   └── wiki/             # Prebuilt wiki site assets
└── src/                  # Source files
    ├── components/       # Reusable Astro components
    ├── layouts/          # Page/layout templates
    ├── pages/            # Routes & Markdown content
    │   ├── portfolio/    # Markdown portfolio items
    │   ├── posts/        # Markdown blog posts
    │   └── writing/      # Markdown writing posts
    ├── scripts/          # Frontend/helper scripts
    └── styles/           # Global CSS
```

## Key Configuration Files

### astro.config.mjs
Defines Astro integrations like Preact.
```js
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact()]
});
```

### tsconfig.json
Extends Astro's strict TypeScript config and enables JSX for Preact.
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

### wrangler.json
Cloudflare Workers configuration for deployment.
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
Create `.astro` files under `src/pages/`. Each file maps to a route (e.g., `src/pages/about.astro` becomes `/about`).

### Blog Posts
- Place Markdown files in `src/pages/posts/`.
- **Example Frontmatter:**
  ```markdown
  ---
  layout: '../../layouts/BlogPostLayout.astro'
  title: 'My Awesome Blog Post'
  pubDate: 2025-07-26
  description: 'A brief summary of my post.'
  author: 'Matthew Oyan'
  image:
      url: '/images/post-image.avif'
      alt: 'Alt text for the image.'
  tags: ["astro", "blogging", "tech"]
  ---
  
  Your post content starts here.
  ```

### Portfolio
- Place Markdown files in `src/pages/portfolio/`.
- **Example Frontmatter:**
  ```markdown
  ---
  layout: '../../layouts/BlogPostLayout.astro'
  title: 'My Amazing Project'
  pubDate: 2025-07-26
  description: 'A short description of the project.'
  image:
    avif: '../../../images/image.avif'
    webp: '../../../images/image.webp'
    png: '../../../images/image.png'
    alt: 'PDIC Logo'
  tags: ["motion design", "video editing"]
  ---

  Details about the project go here.
  ```

#### Converting Images to AVIF
Use `imagemagick` to convert images to the efficient AVIF format. If the source is Rec.709 (common for video), convert gamma for correct sRGB display.

- **For Rec.709 sources:**
  ```bash
  magick input.png -gamma 0.917 -quality 95 output.avif
  ```
- **For standard sRGB sources:**
  ```bash
  magick input.png -quality 95 output.avif
  ```

### Writing
- Place Markdown files in `src/pages/writing/`. These are for creative or fictional pieces.

### Tags
Tag pages are generated automatically based on the `tags` array in the frontmatter of blog posts and portfolio items.

### Wiki
The wiki is a pre-built static site located in `public/wiki/`. To update it, you must modify its source files and rebuild it separately. The assets are then committed to this repository.

## Styling

Global styles are defined in `src/styles/global.css`. This file includes:
- Base typography and layout rules.
- Dark mode support via the `html.dark` class.
- Responsive navigation styles.
- The accent rainbow bar at the top of the page.

## VSCode Setup

The `.vscode/` directory contains recommended extensions and launch configurations.
- **Extension:** `astro-build.astro-vscode` for Astro language support.
- **Launch Config:** A debugger profile to run `astro dev` from the integrated terminal.

## License

This project is licensed under the terms of the MIT license. See the [LICENSE.TXT](LICENSE.TXT) file for details.