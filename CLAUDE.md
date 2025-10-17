# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

```bash
cd /Users/matthewoyan/mywebsite
npm install
netlify dev         # Required: Netlify Image CDN (/.netlify/images) only works with dev server
```

**Key:** Always use `netlify dev` instead of `npm run preview` for local development. The latter will not render Netlify Image CDN URLs.

## Common Commands

| Task | Command |
|------|---------|
| Local development | `netlify dev` |
| Production build | `npm run build` |
| Preview static build (images won't render) | `npm run preview` |
| Preview with live CDN | `netlify deploy --build --draft --open` |
| Wiki development (with live-reload) | `npm run dev:wiki` |
| Astro diagnostics | `npm run astro -- check` |

## Tech Stack

- **Framework:** Astro 5.9+ with static site generation (SSG)
- **UI Islands:** Preact (React aliased to @preact/compat for smaller bundles)
- **Content:** Markdown and MDX with file-based routing
- **Styling:** Plain CSS with CSS variables (no border-radius by design)
- **Deployment:** Netlify (with serverless functions for form email delivery)
- **Fonts:** Variable fonts from Fontsource/jsDelivr (Atkinson Hyperlegible, Geist Mono)

## Architecture

### Routing & Content

File-based routing under `src/pages/`:

```
src/pages/
├── index.astro                 # Home: portfolio grid
├── blog/                       # /blog/{slug}
├── fiction/                    # /fiction/{slug}
├── portfolio/                  # /portfolio/{slug}
├── tags/                       # /tags and /tags/{tag}
├── writing/                    # /writing (hub)
├── contact.astro               # Contact form (Netlify Forms + serverless)
├── resume.astro
└── privacy-policy.astro
```

**Note on tags:** Tag pages aggregate content from blog and fiction using `import.meta.glob()`. Ensure globs target correct directories.

### Layout System

- **BaseLayout.astro** (`src/layouts/`): HTML document shell with meta tags, SEO, Open Graph, Header, Navigation, and Footer
- **PostLayout.astro**: Generic wrapper for blog/fiction/portfolio content; auto-detects route type from URL path to determine which tags to show and whether to render footer CTA

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| Header | Astro | Logo, theme toggle |
| Navigation | Astro | Smart active state detection (e.g., "Writings" stays active across `/blog/`, `/fiction/`, `/writing/`) |
| Footer | Astro | Conditional CTA, obfuscated email, Lottie monogram |
| VideoPlayer | Astro | Responsive HTML5 video wrapper |
| PhotoGallery | Preact island | Lightbox with yet-another-react-lightbox |
| ObfuscatedEmail | Astro | Anti-spam email with data attributes |

### Home Grid & Image Optimization

`src/pages/index.astro` renders portfolio entries as a responsive grid:
1. Imports portfolio items via `import.meta.glob('portfolio/*.{md,mdx}')`
2. Sorts by `frontmatter.pubDate`
3. Converts frontmatter image paths to Netlify Image CDN URLs with srcset (avif/webp/png)
4. Uses helper functions:
   ```ts
   createNetlifyImageUrl(imagePath, width, format) // Returns /.netlify/images/?url=...&w=...&q=85&f=...
   getBestImageFormat(image)                        // Prefers png > webp > avif
   ```
5. Portfolio frontmatter example:
   ```yaml
   image:
     png: "../../../images/example.png"  # CDN will convert to requested format
     alt: "Descriptive alt text"
   ```

**Important:** Netlify Image CDN only works with `netlify dev`; npm run preview shows broken image URLs.

### Contact Form (Serverless)

Location: `src/pages/contact.astro` with handler at `netlify/functions/submission-created.js`

**Features:**
- Netlify Forms with honeypot spam filtering
- Serverless function sends custom-formatted email via Nodemailer + Maileroo SMTP
- Client-side subject generation (sanitized, max 200 chars)
- Rate limiting: 1 submission per 30 seconds per email (per warm container)
- Reply-To header set to user's email for direct responses
- Input validation: lengths capped, CR/LF stripped

**Environment variables required:**
```
MAILEROO_HOST
MAILEROO_PORT
MAILEROO_USER
MAILEROO_PASS
MAIL_TO
```

**Security:**
- CR/LF sanitization in subject/reply-to headers
- Field length caps (firstname/lastname 100, email 254, organization 150, topic 3–100, message 10–5000, phone 32)
- Honeypot field on form submission

### Styling System

- **File:** `src/styles/global.css` (1000+ lines)
- **Theme:** CSS custom properties for light (warm beige) and dark (purple #170b1c) modes
- **Design preference:** Sharp corners (no border-radius)
- **Color variables:** Updated via theme toggle; stored in localStorage

## Adding Content

### Blog Post
```bash
# Create src/pages/blog/my-post.md
---
layout: ../../layouts/PostLayout.astro
title: "Post Title"
pubDate: 2025-10-17
tags: [tag1, tag2]
---
# Content here
```

Routes to `/blog/my-post`; tags are rendered automatically by PostLayout.

### Fiction/Creative Writing
```bash
# Create src/pages/fiction/my-story.md
---
layout: ../../layouts/PostLayout.astro
title: "Story Title"
pubDate: 2025-10-17
tags: [tag1, tag2]
---
# Content here
```

Routes to `/fiction/my-story`; tags are rendered automatically.

### Portfolio Entry
```bash
# Create src/pages/portfolio/project.md or .mdx
---
layout: ../../layouts/PostLayout.astro
title: "Project Title"
pubDate: 2025-10-17
image:
  png: "../../../images/project.png"  # or webp/avif
  alt: "Description"
---
# Content here
```

Routes to `/portfolio/project`; footer CTA is shown by PostLayout; tags are hidden for portfolio.

### Static Page
```bash
# Create src/pages/my-page.astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
---
<BaseLayout pageTitle="My Page" pageDescription="...">
  <!-- Content -->
</BaseLayout>
```

Routes to `/my-page`.

## Deployment

### Build & Deploy
```bash
npm run build                                    # Creates dist/
netlify deploy --build --draft --open           # Draft preview
netlify deploy --prod                           # Production to main domain
```

### Netlify Configuration
See `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist/`
- Headers: CSP, X-Content-Type-Options, Permissions-Policy
- Fonts allowed from jsDelivr CDN in CSP

### Updating Site URL
When switching from staging to production, update the `site` field in `astro.config.mjs` to ensure correct canonical URLs and sitemap.

## Image Optimization Reference

**Convert to AVIF** (95% quality, for web):
```bash
magick input.png -gamma 0.917 -quality 95 output.avif
```

**Animated WebP** (60fps, from video):
```bash
ffmpeg -i animation.mov -vf "fps=60,scale=100:60" -c:v libwebp -lossless 0 -q:v 75 -loop 0 output.webp
```

## Dependencies to Watch

- **Astro 5.9+**: Monitor for breaking changes, especially with `import.meta.glob` patterns
- **@astrojs/preact** & **@astrojs/mdx**: Verify compatibility when upgrading
- **@preact/compat**: React libraries must be compatible; test before upgrading
- **@lottiefiles/dotlottie-web**: Imported via Vite alias to dist entry (see astro.config.mjs)
- **@fontsource-variable/***: Variable font packages loaded from CDN

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Images don't render locally | Use `netlify dev`, not `npm run preview` |
| Form submissions rate-limited (HTTP 429) | Wait ~30 seconds (per-container limit) |
| Email subject/reply-to malformed | Function sanitizes CR/LF; check Email is valid and Topic present |
| Component not rendering | Verify Preact imports in .jsx files; add `client:load` if needed |
| Build errors | Check YAML frontmatter syntax; verify component imports; clear node_modules if conflicts |
| Broken images after merge | Ensure frontmatter.image paths resolve to /public/images |

## Git Workflow

- **Current branch:** staging (development)
- **Main branch:** production
- **Workflow:** Commit → Push to staging → PR for production merge
- **Version tags:** Use for major releases

## License & Copyright

- **Code:** MIT License
- **Portfolio images/videos:** Property of respective owners (not MIT-licensed)
- **Written content:** All Rights Reserved unless otherwise noted
