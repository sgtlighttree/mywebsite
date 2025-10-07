# Website Documentation

Personal docs for maintaining Matthew Oyan's Astro-based website. Updated last: September 2025.

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
- **Dynamic Subject Line**: A client-side script generates a subject line based on user input (e.g., `[Topic] - Message from John Doe, Company Inc.`).
- **Reply-To Header**: The notification email has the `replyTo` header set to the user's email, allowing for direct replies.
- **Spam Protection**: Uses Netlify's built-in `netlify-honeypot` for efficient, server-side spam filtering.

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
React/Preact component with lightbox:
- Uses yet-another-react-lightbox
- Supports image arrays
- Client-side interactive

### ObfuscatedEmail
Anti-spam email protection:
- Data attributes for bot protection
- Reconstructs mailto: via script
- Fallback for no-JS users

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
- **Layout Consolidation**: Merged separate BlogPost/Portfolio layouts into single auto-detecting PostLayout.astro ✓ (Sep 2025)
- **Archive Old Code**: Moved old layout files to src/layouts/archive/ with timestamp for reference ✓ (Sep 2025)
- **URL Consolidation**: Consolidated writings navigation - `/writing/` index now serves `/blog/` and `/fiction/` subdirectories ✓ (Sep 2025)
- **Smart Navigation**: Enhanced active highlighting ensures "Writings" tab stays highlighted across all content sections ✓ (Sep 2025)

## Performance & Optimization

Current best practices:
- WebP/AVIF images
- Lazy loading via Astro
- Minimal JS bundles
- Sitemap for crawlers
- Robots.txt configuration

Monitor bundle size with `npm run build` output.

## Version Control

Personal workflow:
- Commit frequently: `git add . && git commit -m "Brief update"`
- Push to staging for testing
- Merge via PR for deployments
- Tag releases for major updates

## Useful Links
- [Astro Docs](https://docs.astro.build)
- [Preact Guide](https://preactjs.com/guide/v10/getting-started)
- [MDX Overview](https://mdxjs.com/docs)
- [Netlify Deployment](https://docs.astro.build/en/guides/deploy/netlify/)

---

This doc is for my solo dev workflow - keeping it practical and updated with actual experiences.
