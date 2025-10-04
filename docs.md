# Website Documentation

Personal docs for maintaining Matthew Oyan's Astro-based website. Updated last: September 2025.

## Getting Started

For when I need to set up or remind myself of the basics:

### Quick Setup
```bash
cd /Users/matthewoyan/mywebsite
npm install
npm run dev
```

### Project Overview
This is my personal portfolio site built with:
- **Astro**: Static site generator with component support
- **Preact**: For interactive components (PhotoGallery, etc.)
- **MDX**: Blog posts and portfolio items
- **Sitemap**: Auto-generated via @astrojs/sitemap
- **Staging URL**: Currently set to `https://staging-mattoyan.netlify.app/` - update in astro.config.mjs for production

### Dependencies to Watch
- Astro 5.9.0 (latest)
- Preact integration for components
- MDX for content
- FontSource for custom fonts
- DotLottie for animations (footer monogram)

## Project Structure

```
src/
├── components/    # Reusable UI components (.astro, .jsx)
├── layouts/       # Page templates (BaseLayout, PostLayouts)
├── pages/         # Routes (.astro files, .md posts)
│   ├── writing/   # Main writings index page
│   ├── blog/      # Technical blog posts
│   ├── fiction/   # Creative writing pieces
│   ├── portfolio/ # Project work
│   └── ...        # Other pages
├── styles/        # Global CSS
└── scripts/       # JavaScript files

public/            # Static assets, images, videos
├── images/        # Optimized webp/avif images
├── videos/        # MP4 files
└── wiki/         # Separate wiki section
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

### PostLayouts (Blog & Portfolio)
Shared structure for content pages:
- Frontmatter: title, description, pubDate, tags
- SEO integration with BaseLayout
- Tag links (disabled for portfolio)
- Linked from `/posts/` or `/portfolio/`

**Note:** Consider merging BlogPostLayout and PortfolioPostLayout into a generic PostLayout with props to reduce duplication.

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
- Responsive nav with **smart active highlighting** - "Writings" tab stays highlighted across `/writing/`, `/blog/`, and `/fiction/` paths
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
netlify dev           # use Netlify features
npm run dev           # Local dev with hot reload
npm run dev -- --host # Expose to network
npm run build        # Production build
npm run preview      # Preview production build
npm run build && npm run dev -- --host # combined build and then expose
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

## Build & Deployment

Configured for production builds:
- Static generation via Astro
- Sitemap auto-generation
- Optimized assets
- Staging currently set in config

Deploy to Netlify/GitHub Pages by pushing to main branch. Update site URL in astro.config.mjs when deploying.

## Troubleshooting

Common issues and fixes:

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
