# Website Documentation

Personal docs for maintaining Matthew Oyan's Astro-based website. Updated last: October 2025.

## Getting Started

For when I need to set up or remind myself of the basics:

### Quick Setup
```bash
cd /Users/matthewoyan/mywebsite
npm install
# Use Netlify dev so Image CDN transforms (/.netlify/images) work locally
netlify dev
# If the Netlify CLI isn’t installed:
# npx netlify-cli dev
```

### Project Overview
This is my personal portfolio site built with:
- Astro 5 with islands
- Preact islands; React/ReactDOM are aliased to @preact/compat in package.json (React-style imports render via Preact)
- MD and MDX content
- Sitemap auto-generated via @astrojs/sitemap
- Netlify for deploy and local dev (required for Netlify Image CDN)
- Canonical site URL set in astro.config.mjs (update when switching staging → production)

### Dependencies to Watch
- Astro 5.9.x
- Preact integration (@astrojs/preact) and MDX (@astrojs/mdx)
- @preact/compat (React alias) — verify compatibility of new React libraries with Preact
- @fontsource-variable/* for hosted fonts
- @lottiefiles/dotlottie-web (via Vite alias to dist entry)

### Netlify Image CDN (local image transforms)
Home grid (src/pages/index.astro) uses Netlify Image CDN to generate responsive images at runtime.
- Use netlify dev locally; npm run preview will not render /.netlify/images URLs.
- Images are sourced from frontmatter.image and converted to avif/webp/png via CDN.

Helpers from index.astro:
```ts
function createNetlifyImageUrl(imagePath: string, width: number = 400, format: string = 'avif') {
  if (!imagePath) return '';
  const cleanPath = imagePath.replace(/^(\.\.\/)+/, '/');
  return `/.netlify/images/?url=${encodeURIComponent(cleanPath)}&w=${width}&q=85&f=${format}`;
}

function getBestImageFormat(image: any): string | null {
  // Prefer PNG, then WebP, then AVIF (for best conversion quality)
  return image?.png || image?.webp || image?.avif || null;
}
```
Frontmatter example for portfolio entries:
```yaml
image:
  png: "../../../images/example.png"   # or webp/avif; CDN will convert to requested format
  alt: "Descriptive alt text"
```

## Project Structure

```
src/
├── components/    # Reusable UI components (.astro, .jsx)
├── layouts/       # BaseLayout, PostLayout (+ archive/ old layouts)
├── pages/         # File-based routes
│   ├── blog/      # Blog posts (.md)
│   ├── fiction/   # Creative writing (.md)
│   ├── portfolio/ # Portfolio entries (.md/.mdx)
│   ├── tags/      # Tag index and tag detail pages
│   └── ...        # Other pages (contact, resume, privacy-policy, 404)
├── styles/        # Global CSS

public/            # Static assets, images, videos
├── images/
├── videos/
└── wiki/          # Static wiki with live-reload command

netlify/
└── functions/
    └── submission-created.js  # Serverless function for Netlify Forms email delivery
```

## Layouts

Templates for different page types:

### BaseLayout.astro
Foundation for all pages with:
- HTML head (meta tags, SEO, Open Graph)
- Header/Navigation
- Footer with call-to-action
- Social sharing integration

Props:
- `pageTitle` (required): Main page title
- `metaTitle` (optional): Custom browser tab title
- `pageDescription` (optional): SEO description
- `showFooterCta` (optional): Toggle footer CTA

### PostLayout.astro
- Wraps content with BaseLayout; derives metadata from frontmatter
- Auto-detects route by path: blog, fiction, or portfolio
- Shows tags for blog and fiction posts; portfolio hides tags
- Footer CTA shows only for portfolio entries
- Old layouts retained under src/layouts/archive/

## Key Components

### Contact Form (`src/pages/contact.astro`)
A modern, serverless contact form with the following features:
- **Netlify Forms**: Submissions are stored in the Netlify dashboard.
- **Netlify Function**: A `submission-created` function at `netlify/functions/submission-created.js` intercepts submissions to send a custom-formatted email.
- **Custom Email Delivery**: Uses `nodemailer` to send emails via a Maileroo SMTP relay for professional delivery.
- **Subject Line Generation**: Subject is auto-generated client-side from Topic, Name, and optional Organization; sanitized (no CR/LF) and capped (200 chars) before submit.
- **Reply-To Header**: The notification email has the `replyTo` header set to the user's email, allowing for direct replies.
- **Spam Protection**: Uses Netlify's built-in `netlify-honeypot` for efficient, server-side spam filtering.
- **Client UX**: On submit, the form sets `aria-busy` and disables the button with a “Sending…” label to prevent duplicates. Inputs include autocomplete and length limits (firstname/lastname max 100, email max 254, organization max 150, topic 3–100, message 10–5000, phone max 32).
- **Phone Selector A11y**: Country picker is keyboard-accessible with ARIA roles; the submitted `phone` hidden field consolidates dial code + number.

#### Environment Variables (serverless function)
- `MAILEROO_HOST`, `MAILEROO_PORT`, `MAILEROO_USER`, `MAILEROO_PASS`
- `MAIL_TO` (recipient address)

#### Function hardening
- Sanitizes `subject` and `replyTo` headers (strips CR/LF, trims, length-caps)
- Caps message/field lengths (e.g., message ≤ 5000)
- Simple best-effort rate limit: 1 submission per 30 seconds per email (per warm container)

### Navigation (Header + Navigation)
- Responsive nav with smart active highlighting — "Writings" tab stays highlighted across `/writing/`, `/blog/`, and `/fiction/`
- Theme switcher (saves to localStorage)
- Clean, simple structure

### Footer
- Conditional CTA section
- Obfuscated email (anti-spam)
- Lottie animation monogram

### VideoPlayer
Responsive player with loading state:
```astro
<VideoPlayer src="/videos/file.mp4" autoplay muted loop />
```
Props: src (required), type, autoplay, loop, muted, controls

### PhotoGallery
Preact component with lightbox (src/components/PhotoGallery.jsx):
- Uses yet-another-react-lightbox with plugins (fullscreen, slideshow, thumbnails, zoom)
- Lazy-loaded with `client:visible` for better performance
- Supports descriptive alt text for accessibility and SEO
- Responsive grid layout with click-to-open modal

Usage in MDX:
```jsx
<PhotoGallery client:visible images={[
  { src: "../../../images/image1.avif", alt: "Descriptive alt text" },
  { src: "../../../images/image2.webp", alt: "Another description" }
]} />
```

**Important:** Use descriptive alt text for each image (not generic "Image 1", "Image 2")

### ObfuscatedEmail
Anti-spam email protection:
- Data attributes for bot protection
- Reconstructs mailto: via script
- Fallback for no-JS users

## SEO & Schema Markup

The site is fully optimized for search engines and social sharing with comprehensive schema markup:

### Core SEO Features
- **Canonical URLs**: All pages include `<link rel="canonical">` to prevent duplicate content penalties
- **Viewport meta**: Proper mobile scaling with `width=device-width, initial-scale=1`
- **Sitemap**: Auto-generated `sitemap-index.xml` via @astrojs/sitemap
- **Robots.txt**: Configured to guide search engine crawlers
- **Open Graph & Twitter Cards**: Dynamic social preview images with alt text

### Schema Markup (JSON-LD)

#### HomePage (src/pages/index.astro)
- `CollectionPage` schema with portfolio metadata
- Variables properly interpolated for search engine parsing

#### Blog Posts & Fiction (via PostLayout.astro)
- `BlogPosting` schema with:
  - Headline, description
  - `datePublished` (ISO format)
  - Author name
  - URL and main entity reference
- `article:published_time` meta tag
- `article:author` meta tag

#### Portfolio Items (via PostLayout.astro)
- `CreativeWork` schema with:
  - Name, description
  - `dateCreated` (ISO format)
  - Creator (Person type)
  - Featured image

#### Author Profile (src/pages/resume.astro)
- `Person` schema with:
  - Name: Matthew Oyan
  - Title: Multimedia Creative / Motion Designer
  - Image and description
  - Twitter handle (@lighttree_gfx)
  - Work locations: Quezon City, Philippines + Remote
  - Organizations: Business Unusual Media Solutions, Magnus PC, Lighttree Graphics

### Social Sharing
- Default OG image: `/images/MatthewOyan_Monogram3D_Blue1_render01-8bit.png`
- Portfolio entries use their featured image via frontmatter: `image.avif` → `image.webp` → `image.png` (preference order)
- All images include alt text for accessibility
- Twitter handle (@lighttree_gfx) automatically included in all shares

### Adding SEO to New Content

**Blog Post Frontmatter (minimum):**
```yaml
---
layout: ../../layouts/PostLayout.astro
title: "Post Title"
pubDate: 2025-10-27
description: "Brief SEO description (155 chars max)"
tags: [tag1, tag2]
---
```

**Portfolio Item Frontmatter (minimum):**
```yaml
---
layout: ../../layouts/PostLayout.astro
title: "Project Title"
pubDate: 2025-10-27
description: "Project description"
image:
  avif: "../../../images/project.avif"
  webp: "../../../images/project.webp"
  png: "../../../images/project.png"
  alt: "Descriptive alt text for the project"
---
```

**Optional but Recommended:**
- Add `modifiedDate` to frontmatter if you update a post (enables `article:modified_time` tag)
- Add `author` to frontmatter if different from default (Matthew Oyan)

### Troubleshooting SEO Issues

| Issue | Solution |
|-------|----------|
| OG image not showing in social preview | Verify image path in frontmatter; ensure at least one format (avif/webp/png) exists |
| Structured data not validating | Check JSON syntax in schema.org markup; use [schema.org validator](https://validator.schema.org) |
| Pages not indexed | Check robots.txt and sitemap; verify canonicals aren't blocking; check GSC (Google Search Console) |
| Portfolio image alt text missing | Ensure all PhotoGallery images have descriptive `alt` prop; avoid generic "Image 1" text |

## Common Tasks Cheat Sheet

### Adding New Content
1. **Blog Post**: Create `.md` in `src/pages/blog/` with frontmatter (title, pubDate, etc.) - URLs: `/blog/post-slug`
2. **Fiction/Creative Writing**: Create `.md` in `src/pages/fiction/` - URLs: `/fiction/story-slug`
3. **Portfolio Item**: Create `.md` or `.mdx` in `src/pages/portfolio/` - URLs: `/portfolio/project-slug`
4. **Page**: Create `.astro` in `src/pages/` following file-based routing

### Building & Previewing
```bash
netlify dev         # Local dev with Netlify features (required for /.netlify/images)
npm run build       # Production build
npm run preview     # Preview static build (CDN images will NOT render locally)
```

### Image Optimization + Conversion Cheatsheet
Convert to AVIF for size (95% quality):
```bash
# Rec.709 video sources
magick input.png -gamma 0.917 -quality 95 output.avif

# Standard sRGB images
magick input.png -quality 95 output.avif

# Converting animated videos to animated WebP
ffmpeg -i MatthewOyan_MonogramAnimation.mov -vf "fps=60,scale=100:60" -c:v libwebp -lossless 0 -q:v 75 -loop 0 -preset default -an MatthewOyan_MonogramAnimation.webp

```

### Wikitest Development
```bash
npm run dev:wiki     # Develop wiki section with browser-sync
```

## Tags
- Tag index and detail pages aggregate across blog, writing, and fiction
- To tag a post, add a tags array in frontmatter; PostLayout renders tags on blog/fiction
- Tag styles can be adjusted in src/styles/global.css

Example frontmatter:
```yaml
---
layout: ../../layouts/PostLayout.astro
title: Example Post
pubDate: 2025-10-01
tags: [design, process]
---
```

## Build & Deployment

- Static generation via Astro; sitemap via @astrojs/sitemap
- Netlify is the target platform (see README badge and astro.config.mjs site)
- Headers/CSP via `netlify.toml`:
  - Allows Fontsource via jsDelivr in `font-src`; permits inline styles/scripts for now (can tighten later by removing inline CSS/JS)
- For a production-like preview with working images, use a Netlify draft deploy:
  ```bash
  netlify deploy --build --draft --open
  ```
- Update the site field in astro.config.mjs when switching from staging to production to ensure correct canonical URLs

## Troubleshooting

Common issues and fixes:

### Images don’t render locally
- Ensure you are running `netlify dev` (not `npm run preview`)
- Verify frontmatter.image paths are correct (relative paths that resolve to /public via the helper)
- Make sure at least one of png/webp/avif is present in frontmatter.image

### Submission rate-limited (HTTP 429)
- The serverless function throttles repeat submissions (per warm container): wait ~30 seconds and try again.

### Email subject or reply-to malformed
- The function sanitizes CR/LF and caps lengths; ensure Email is valid and Topic is present. The client auto-generates a safe subject.

### Build Errors
- Check frontmatter in `.md` files (YAML valid?)
- Ensure component imports are correct
- Clear node_modules if dependency conflicts

### SEO/OG Image Not Working
- Verify image paths in public/
- Check BaseLayout meta tags
- Run build to generate fresh assets

### Component Not Rendering
- Check Preact imports in .jsx files
- Ensure client:load directive if needed
- Run build + preview to test

### Deployment Issues
- Update site URL in astro.config.mjs
- Check build output for errors
- Verify robots.txt and sitemap

## Personal Notes & TODOs

- [x] Merge BlogPostLayout and PortfolioPostLayout into generic version ✓ (Sep 2025)
- [x] Implement a robust, serverless contact form backend ✓ (Sep 2025)
- [ ] Add more OG images for social sharing
- [ ] Consider migration to view transitions (Astro 3+)
- [ ] Performance: Optimize Lottie animation loading
- [ ] Theme: Consistent design system across all components

**Recent Changes:**
- **Comprehensive SEO Overhaul**: Full schema markup implementation with BlogPosting, CreativeWork, CollectionPage, and Person schemas ✓ (Oct 2025)
  - Fixed homepage schema variable interpolation
  - Added article timestamps and metadata
  - Implemented per-page OG images with portfolio frontmatter support
  - Added Twitter handle attribution
  - Author profile schema on resume page
- **PhotoGallery Optimization**: Switched from `client:load` to `client:visible` for lazy loading; added descriptive alt text ✓ (Oct 2025)
- **Netlify Configuration Fixes**: Fixed CSP header multiline formatting in netlify.toml; converted serverless function to ES modules ✓ (Oct 2025)
- **Layout Consolidation**: Merged separate BlogPost/Portfolio layouts into single auto-detecting PostLayout.astro ✓ (Sep 2025)
- **Archive Old Code**: Moved old layout files to src/layouts/archive/ with timestamp for reference ✓ (Sep 2025)
- **URL Consolidation**: Consolidated writings navigation - `/writing/` index now serves `/blog/` and `/fiction/` subdirectories ✓ (Sep 2025)
- **Smart Navigation**: Enhanced active highlighting ensures "Writings" tab stays highlighted across all content sections ✓ (Sep 2025)

## Performance & Optimization

Current best practices:
- **Images**: WebP/AVIF with PNG fallback; lazy loading via Astro; Netlify Image CDN for runtime optimization
- **JavaScript**: Minimal bundles via Preact islands; PhotoGallery uses `client:visible` for lazy loading
- **SEO**: Canonical URLs, sitemap, robots.txt, comprehensive schema markup for crawlers
- **Caching**: Netlify edge caching with proper headers; CSP policy configured
- **Core Web Vitals**:
  - LCP: Portfolio grid images optimized with srcset and lazy loading
  - FID: No heavy JS bundles; form interactions optimized
  - CLS: Proper spacing reservations in CSS; form error messages sized consistently

Monitor with:
- `npm run build` for bundle size output
- [Google PageSpeed Insights](https://pagespeed.web.dev) for Core Web Vitals
- [Schema.org Validator](https://validator.schema.org) for structured data validation
- [Google Search Console](https://search.google.com/search-console) for indexation and SERP performance

## Version Control

Personal workflow:
- Commit frequently: `git add . && git commit -m "Brief update"`
- Push to staging for testing
- Merge via PR for deployments
- Tag releases for major updates

## Housekeeping
- `.gitignore` ignores editor swap files (`*.swp`, `*.swo`, `*~`) to keep the repo clean

## Useful Links
- [Astro Docs](https://docs.astro.build)
- [Preact Guide](https://preactjs.com/guide/v10/getting-started)
- [MDX Overview](https://mdxjs.com/docs)
- [Netlify Deployment](https://docs.astro.build/en/guides/deploy/netlify/)

---

This doc is for my solo dev workflow - keeping it practical and updated with actual experiences.
