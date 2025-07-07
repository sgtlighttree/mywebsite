# Matthew Oyan's Portfolio Website - Comprehensive Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Technical Stack](#architecture--technical-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Development Workflow](#development-workflow)
6. [Component Documentation](#component-documentation)
7. [Layout System](#layout-system)
8. [Content Management](#content-management)
9. [Styling System](#styling-system)
10. [Routing & Navigation](#routing--navigation)
11. [Assets & Media](#assets--media)
12. [Configuration Files](#configuration-files)
13. [Build & Deployment](#build--deployment)
14. [Troubleshooting](#troubleshooting)
15. [Best Practices](#best-practices)
16. [Future Enhancements](#future-enhancements)

---

## Project Overview

### Purpose
This is Matthew Oyan's personal portfolio website, designed to showcase his professional work in video post-production and motion design, while also serving as a platform for his blog and creative writing projects.

### Target Audience
- **Potential Clients**: Looking for video post-production and motion design services
- **Readers**: Interested in technical blog posts and creative writing
- **Collaborators**: Fellow creatives and professionals in the industry

### Key Features
- 📱 **Responsive Design**: Mobile-first approach with desktop optimization
- 🎨 **Portfolio Showcase**: Grid-based display of professional work
- 📝 **Blog Platform**: Technical and personal blog posts
- ✍️ **Creative Writing**: Dedicated section for creative works including "Skybound Saga"
- 🌓 **Theme Toggle**: Dark/light mode support
- 📬 **Contact Form**: Professional contact with form submission
- 🔗 **Wiki Integration**: External wiki for creative projects
- ⚡ **Performance**: Fast loading with static site generation

### Owner Information
- **Name**: Matthew Oyan
- **Location**: Quezon City, Philippines
- **Specialization**: Video post-production and motion design
- **Education**: Diploma in Media Arts from Eugenio Lopez Jr. Center for Media Arts
- **Current Role**: Marketing Director at MAGNUS PC

---

## Architecture & Technical Stack

### Core Technologies
- **Framework**: [Astro](https://astro.build/) v5.9.0
- **UI Library**: [Preact](https://preactjs.com/) v10.26.9
- **Language**: TypeScript with JSX
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Content**: Markdown files with frontmatter
- **Build Tool**: Astro's built-in build system

### Development Dependencies
- **Browser Sync**: v3.0.4 (for wiki development)
- **TypeScript**: Strict configuration extending Astro's defaults

### Architecture Pattern
The project follows a **Static Site Generation (SSG)** pattern with:
- **File-based routing**: Pages are created from files in `src/pages/`
- **Component-based architecture**: Reusable components in `src/components/`
- **Layout system**: Shared layouts in `src/layouts/`
- **Content-driven**: Markdown files for dynamic content

### Build Process
1. **Development**: Astro dev server with hot reload
2. **Build**: Static site generation to `dist/` directory
3. **Preview**: Local preview of production build
4. **Deploy**: Static files deployed to GitHub Pages or Cloudflare Workers

---

## Project Structure

```
/app/
├── 📁 public/                    # Static assets served directly
│   ├── 🖼️ images/               # Portfolio images and media
│   ├── 🎬 videos/               # Portfolio videos
│   ├── 📚 wiki/                 # Pre-built wiki assets
│   └── 🔖 favicon.svg           # Site favicon
├── 📁 src/                      # Source code
│   ├── 📁 components/           # Reusable Astro components
│   │   ├── 🧩 BlogPost.astro    # Blog post tile component
│   │   ├── 🧩 Footer.astro      # Site footer with contact info
│   │   ├── 🧩 Header.astro      # Site header with branding
│   │   ├── 🧩 Navigation.astro  # Navigation menu
│   │   ├── 🧩 Social.astro      # Social media links
│   │   └── 🧩 ThemeIcon.astro   # Dark/light mode toggle
│   ├── 📁 layouts/              # Page layout templates
│   │   ├── 🏗️ BaseLayout.astro      # Main layout template
│   │   └── 🏗️ MarkdownPostLayout.astro # Layout for blog posts
│   ├── 📁 pages/                # File-based routing
│   │   ├── 🏠 index.astro       # Homepage (portfolio grid)
│   │   ├── 👤 about.astro       # About page
│   │   ├── 📞 contact.astro     # Contact page with form
│   │   ├── ✍️ writings.astro    # Writings index page
│   │   ├── 📁 portfolio/        # Portfolio items (Markdown)
│   │   │   ├── 📄 2024-08-21-magnus-pc.markdown.md
│   │   │   └── 📄 2024-06-20-pdic.markdown.md
│   │   ├── 📁 posts/            # Blog posts (Markdown)
│   │   │   ├── 📄 post-1.md
│   │   │   ├── 📄 post-2.md
│   │   │   ├── 📄 post-3.md
│   │   │   └── 📄 post-4.md
│   │   ├── 📁 writing/          # Creative writing (Markdown)
│   │   │   └── 📄 short-theObserver.md
│   │   └── 📁 tags/             # Dynamic tag pages
│   ├── 📁 scripts/              # JavaScript utilities
│   │   └── 🔧 menu.js           # Mobile menu functionality
│   └── 📁 styles/               # CSS stylesheets
│       └── 🎨 global.css        # Global styles and themes
├── ⚙️ astro.config.mjs          # Astro configuration
├── 📦 package.json              # Dependencies and scripts
├── 🔧 tsconfig.json             # TypeScript configuration
├── 🌐 wrangler.json             # Cloudflare Workers config
├── 📖 README.md                 # Brief project overview
└── 📚 docs.md                   # Original documentation
```

---

## Setup & Installation

### Prerequisites
- **Node.js**: Version 16.x or higher
- **npm**: Comes with Node.js (or yarn as alternative)
- **Git**: For version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/[username]/mywebsite.git
   cd mywebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:4321`

### Verification
After installation, verify the setup by:
- Checking the homepage loads with portfolio grid
- Testing navigation between pages
- Verifying theme toggle functionality
- Ensuring responsive design works on mobile

---

## Development Workflow

### Available Scripts

#### Development
```bash
npm run dev
```
- Starts Astro development server
- Enables hot reload for instant updates
- Available at `http://localhost:4321`

#### Build
```bash
npm run build
```
- Generates static site in `dist/` directory
- Optimizes assets and code
- Prepares for production deployment

#### Preview
```bash
npm run preview
```
- Serves production build locally
- Test the built site before deployment
- Available at `http://localhost:4173`

#### Wiki Development
```bash
npm run dev:wiki
```
- Starts BrowserSync for wiki assets
- Useful for developing wiki content separately
- Watches `public/wiki/` directory

#### Astro CLI
```bash
npm run astro -- <command>
```
- Direct access to Astro CLI commands
- Examples: `npm run astro -- add preact`

### Development Process
1. **Start development server**: `npm run dev`
2. **Make changes**: Edit files in `src/`
3. **Preview changes**: Hot reload shows updates instantly
4. **Test build**: `npm run build && npm run preview`
5. **Deploy**: Push to repository for automatic deployment

### File Watching
The development server watches for changes in:
- **Components**: `src/components/`
- **Layouts**: `src/layouts/`
- **Pages**: `src/pages/`
- **Styles**: `src/styles/`
- **Scripts**: `src/scripts/`

---

## Component Documentation

### BaseLayout.astro
**Purpose**: Main layout template used by all pages

**Props**:
- `pageTitle` (string): The page title displayed in `<h1>` and `<title>`

**Features**:
- HTML document structure
- Meta tags for SEO
- Font loading (Plus Jakarta Sans, Anonymous Pro, Auger Mono)
- Header and footer inclusion
- Theme support
- Script loading for menu functionality

**Usage Example**:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
const pageTitle = "My Page";
---
<BaseLayout pageTitle={pageTitle}>
  <p>Page content goes here</p>
</BaseLayout>
```

### Header.astro
**Purpose**: Site header with branding and navigation

**Components**:
- Site title linking to homepage
- Navigation component inclusion

**Features**:
- Responsive design
- Sticky positioning on desktop
- Z-index management for overlays

### Navigation.astro
**Purpose**: Main navigation menu

**Features**:
- Active page highlighting
- Responsive grid layout (2 columns on mobile)
- Hover effects
- Dark mode support

**Navigation Items**:
- Work (/) - Portfolio showcase
- Resume (/about/) - About page
- Writings (/writings/) - Blog and creative writing
- Contact (/contact/) - Contact information

### Footer.astro
**Purpose**: Site footer with contact info and theme toggle

**Components**:
- Contact call-to-action
- Theme toggle button
- Social media links (currently commented out)

### BlogPost.astro
**Purpose**: Reusable tile component for blog posts

**Props**:
- `title` (string): Post title
- `url` (string): Post URL

**Usage**: Used in tile container layouts for consistent post display

### ThemeIcon.astro
**Purpose**: Dark/light mode toggle button

**Features**:
- SVG icon with sun/moon states
- Local storage persistence
- System preference detection
- Smooth transitions

**JavaScript Logic**:
- Detects user preference or system setting
- Stores theme choice in localStorage
- Toggles `dark` class on document element

---

## Layout System

### BaseLayout.astro
The primary layout template that provides:

**HTML Structure**:
```html
<html lang="en">
  <head>
    <!-- Meta tags, fonts, title -->
  </head>
  <body>
    <Header />
    <h1>{pageTitle}</h1>
    <slot />
    <Footer />
    <script>
      <!-- Menu functionality -->
    </script>
  </body>
</html>
```

**Font Loading**:
- **Plus Jakarta Sans**: Primary font family
- **Anonymous Pro**: Monospace font for code
- **Auger Mono**: Stylistic monospace font
- **Material Symbols**: Icons for contact and UI elements

### MarkdownPostLayout.astro
Layout for blog posts and content pages that extends BaseLayout with:
- Frontmatter handling
- Content rendering
- Metadata display
- SEO optimization

**Frontmatter Schema**:
```yaml
---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Post Title'
pubDate: 2024-01-01
description: 'Post description'
author: 'Author Name'
image:
  url: 'path/to/image.jpg'
  alt: 'Alt text'
tags: ["tag1", "tag2"]
---
```

---

## Content Management

### Content Types

#### Portfolio Items
**Location**: `src/pages/portfolio/`
**Format**: Markdown files with `.md` extension
**Display**: Grid layout on homepage

**Frontmatter Schema**:
```yaml
---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Project Title'
pubDate: 2024-01-01
description: 'Project description'
image:
  url: 'path/to/image.jpg'
  alt: 'Alt text for image'
tags: ["portfolio"]
---
```

**Example**: `2024-08-21-magnus-pc.markdown.md`
```markdown
---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'MAGNUS PC (2024)'
pubDate: 2024-08-21
description: 'Portfolio Post for MAGNUS PC'
image:
    url: '../../../images/MAGNUSPC_MotionLogo-Looping_v01_h264-0001.png'
    alt: 'MAGNUSPC Logo'
tags: ["portfolio"]
---
A tech/retail startup built with my friends, creating quality gaming PCs at an affordable cost to Filipinos. Branding & logo creation. **Currently serving as Marketing Director.**
```

#### Blog Posts
**Location**: `src/pages/posts/`
**Format**: Markdown files with `.md` extension
**Display**: Tile layout on writings page

**Frontmatter Schema**:
```yaml
---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Blog Post Title'
pubDate: 2024-01-01
description: 'Post description'
author: 'Matthew Oyan'
image:
  url: 'image-url'
  alt: 'Alt text'
tags: ["blogging", "tech"]
---
```

#### Creative Writing
**Location**: `src/pages/writing/`
**Format**: Markdown files with `.md` extension
**Display**: Categorized on writings page

**Special Categories**:
- **Skybound Saga**: Science-fantasy project with special treatment
- **Other Writing**: General creative writing pieces

**Frontmatter Schema**:
```yaml
---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Story Title'
pubDate: 2024-01-01
description: 'Story description'
author: 'Matthew Oyan'
tags: ["Short Story", "creative writing", "Skybound Saga"]
---
```

### Content Organization

#### File Naming Convention
- **Portfolio**: `YYYY-MM-DD-project-name.markdown.md`
- **Blog Posts**: `post-{number}.md`
- **Writing**: `{type}-{title}.md`

#### Sorting Logic
- **Portfolio**: Sorted by `pubDate` (newest first)
- **Blog Posts**: Sorted by `pubDate` (newest first)
- **Writing**: Categorized by tags, then sorted by date

### Adding New Content

#### New Portfolio Item
1. Create file in `src/pages/portfolio/`
2. Use naming convention: `YYYY-MM-DD-project-name.markdown.md`
3. Add frontmatter with required fields
4. Include image in `public/images/`
5. Write project description in markdown

#### New Blog Post
1. Create file in `src/pages/posts/`
2. Use naming convention: `post-{number}.md`
3. Add frontmatter with required fields
4. Write content in markdown
5. Add tags for categorization

#### New Writing Piece
1. Create file in `src/pages/writing/`
2. Use descriptive filename
3. Add frontmatter with required fields
4. Use "Skybound Saga" tag for series content
5. Write content in markdown

---

## Styling System

### CSS Architecture
The styling system uses a **mobile-first approach** with custom CSS, organized into logical sections:

#### Global Styles (`src/styles/global.css`)

**Structure**:
```css
/*────────────────────────────────────────────────────────────────────────────
   General Styles
────────────────────────────────────────────────────────────────────────────*/

/*────────────────────────────────────────────────────────────────────────────
   Rainbow Accent Bar
────────────────────────────────────────────────────────────────────────────*/

/*────────────────────────────────────────────────────────────────────────────
   Navigation Styles
────────────────────────────────────────────────────────────────────────────*/

/*────────────────────────────────────────────────────────────────────────────
   Tile Layout Styles
────────────────────────────────────────────────────────────────────────────*/

/*────────────────────────────────────────────────────────────────────────────
   Portfolio Grid Styles
────────────────────────────────────────────────────────────────────────────*/
```

### Theme System

#### Light Mode (Default)
```css
html {
  background-color: hsl(20, 30%, 98%);
  font-family: "auger-mono", sans-serif;
}
```

#### Dark Mode
```css
html.dark {
  background-color: #170b1c;
  color: #ffffff;
}
```

#### Theme Toggle Implementation
The theme system uses:
- **CSS Classes**: `.dark` class on `<html>` element
- **Local Storage**: Persists user preference
- **System Preference**: Respects `prefers-color-scheme`
- **JavaScript**: Handles toggling and initialization

### Responsive Design

#### Breakpoints
- **Mobile**: Default styles (< 769px)
- **Desktop**: `@media screen and (min-width: 769px)`

#### Mobile-First Approach
Base styles target mobile devices, with desktop enhancements added via media queries.

#### Key Responsive Features
- **Navigation**: 2-column grid on mobile, horizontal on desktop
- **Portfolio Grid**: Single column on mobile, multi-column on desktop
- **Typography**: Responsive font sizes
- **Spacing**: Adaptive padding and margins

### Layout Systems

#### CSS Grid
Used for:
- **Portfolio Grid**: `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`
- **Navigation**: `grid-template-columns: repeat(2, 1fr)` on mobile
- **Tile Containers**: `grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))`

#### Flexbox
Used for:
- **Header Layout**: Flexible header with branding and navigation
- **Navigation Items**: Desktop navigation alignment
- **Contact Info**: Icon and text alignment

### Visual Effects

#### Rainbow Accent Bar
```css
body::before {
  content: "";
  position: fixed;
  top: -1em;
  left: 0;
  right: 0;
  height: 1.25em;
  background: linear-gradient(
    to right,
    rgba(255,192,203,1) 0%,
    rgba(255,0,0,1) 10%,
    rgba(255,165,0,1) 22%,
    rgba(255,255,0,1) 36%,
    rgba(0,128,0,1) 53%,
    rgba(0,0,255,1) 68%,
    rgba(75,0,130,1) 82%,
    rgba(238,130,238,1) 100%
  );
  filter: blur(15px);
  opacity: 1;
  z-index: 1;
}
```

#### Hover Effects
- **Portfolio Items**: Scale transform on hover
- **Navigation**: Background color changes
- **Links**: Underline animations

#### Transitions
- **Theme Toggle**: Smooth color transitions
- **Hover States**: 0.3s ease transitions
- **Portfolio Images**: Transform transitions

---

## Routing & Navigation

### File-Based Routing
Astro uses file-based routing where each file in `src/pages/` becomes a route:

#### Static Routes
- `/` → `src/pages/index.astro` (Portfolio homepage)
- `/about/` → `src/pages/about.astro` (About page)
- `/contact/` → `src/pages/contact.astro` (Contact page)
- `/writings/` → `src/pages/writings.astro` (Writings index)

#### Dynamic Routes
- `/portfolio/[slug]` → Generated from markdown files in `src/pages/portfolio/`
- `/posts/[slug]` → Generated from markdown files in `src/pages/posts/`
- `/writing/[slug]` → Generated from markdown files in `src/pages/writing/`
- `/tags/[tag]` → Dynamic tag pages (planned feature)

### Navigation Implementation

#### Main Navigation
The navigation is implemented in `Navigation.astro` with:
- **Active State Detection**: Uses `Astro.url.pathname` to highlight current page
- **Responsive Design**: Grid layout on mobile, flexbox on desktop
- **Accessibility**: Proper link semantics and keyboard navigation

#### Navigation Structure
```astro
<div class="nav-links">
  <a href="/" class={currentPath === '/' ? 'active' : ''}>Work</a>
  <a href="/about/" class={currentPath === '/about/' ? 'active' : ''}>Resume</a>
  <a href="/writings/" class={currentPath === '/writings/' ? 'active' : ''}>Writings</a>
  <a href="/contact/" class={currentPath === '/contact/' ? 'active' : ''}>Contact</a>
</div>
```

### Link Management
- **Internal Links**: Use relative paths
- **External Links**: Target blank with security attributes
- **Portfolio Items**: Link to individual portfolio pages
- **Blog Posts**: Link to individual post pages

---

## Assets & Media

### Asset Organization

#### Public Directory Structure
```
public/
├── images/                    # Portfolio and blog images
│   └── MAGNUSPC_MotionLogo-Looping_v01_h264-0001.png
├── videos/                    # Portfolio videos
├── wiki/                      # Pre-built wiki assets
└── favicon.svg                # Site favicon
```

#### Image Handling
- **Portfolio Images**: Stored in `public/images/`
- **Blog Images**: Can be local or external URLs
- **Responsive Images**: CSS handles responsive behavior
- **Alt Text**: Required in frontmatter for accessibility

#### Video Integration
- **Portfolio Videos**: Stored in `public/videos/`
- **Embedding**: Direct file references in markdown
- **Formats**: Support for common web video formats

### Asset Optimization
- **Build Process**: Astro optimizes assets during build
- **Compression**: Images compressed for web delivery
- **Caching**: Static assets cached for performance
- **CDN Ready**: Assets can be served from CDN

### External Assets
- **Fonts**: Loaded from Google Fonts and Adobe Fonts
- **Icons**: Material Symbols for UI elements
- **Images**: External URLs supported in frontmatter

---

## Configuration Files

### astro.config.mjs
**Purpose**: Main Astro configuration file

```javascript
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact()]
});
```

**Key Features**:
- **Preact Integration**: Enables Preact components
- **Build Settings**: Default Astro build configuration
- **SSG Mode**: Static site generation enabled

### tsconfig.json
**Purpose**: TypeScript configuration

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

**Key Features**:
- **Strict Mode**: Extends Astro's strict TypeScript config
- **JSX Support**: Configured for Preact
- **Type Safety**: Full TypeScript support

### package.json
**Purpose**: Project dependencies and scripts

```json
{
  "name": "mywebsite",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "dev:wiki": "browser-sync 'public/wiki' --files 'public/wiki/**/*' --no-notify"
  },
  "dependencies": {
    "@astrojs/preact": "^4.1.0",
    "astro": "^5.9.0",
    "preact": "^10.26.9"
  },
  "devDependencies": {
    "browser-sync": "^3.0.4"
  }
}
```

### wrangler.json
**Purpose**: Cloudflare Workers configuration

```json
{
  "name": "websitev3",
  "compatibility_date": "2025-06-23",
  "assets": {
    "directory": "./dist"
  }
}
```

**Key Features**:
- **Asset Directory**: Points to build output
- **Compatibility**: Set for 2025 Worker runtime
- **Deployment**: Configured for Cloudflare Workers

---

## Build & Deployment

### Build Process

#### Development Build
```bash
npm run dev
```
- Fast development server
- Hot module replacement
- Source maps enabled
- No optimization

#### Production Build
```bash
npm run build
```
- Static site generation
- Asset optimization
- Code minification
- SEO optimization

#### Build Output
```
dist/
├── index.html              # Homepage
├── about/                  # About page
├── contact/                # Contact page
├── writings/               # Writings index
├── portfolio/              # Portfolio pages
├── posts/                  # Blog posts
├── writing/                # Writing pages
├── _astro/                 # Astro assets
└── [static assets]         # Public directory contents
```

### Deployment Options

#### GitHub Pages
1. **Setup**: Enable GitHub Pages in repository settings
2. **Branch**: Deploy from `main` branch or `gh-pages`
3. **Custom Domain**: Configure in repository settings
4. **Automatic**: Deploys on push to main branch

#### Cloudflare Workers
1. **Install Wrangler**: `npm install -g wrangler`
2. **Login**: `wrangler login`
3. **Deploy**: `wrangler publish`
4. **Configuration**: Uses `wrangler.json` settings

#### Other Platforms
The static build can be deployed to:
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect repository for automatic deployment
- **AWS S3**: Upload `dist/` contents to S3 bucket
- **Azure Static Web Apps**: Connect repository

### Environment Variables
For different environments:
- **Development**: No special configuration needed
- **Production**: Set base URL if using subdirectory
- **CDN**: Configure asset URLs for CDN delivery

### Build Optimization
- **Dead Code Elimination**: Removes unused code
- **Asset Bundling**: Optimizes CSS and JS
- **Image Optimization**: Compresses images
- **HTML Minification**: Removes whitespace

---

## Troubleshooting

### Common Issues

#### Development Server Won't Start
**Symptoms**: `npm run dev` fails or hangs
**Solutions**:
1. Check Node.js version (requires 16+)
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check port availability (default: 4321)
4. Verify package.json scripts

#### Build Failures
**Symptoms**: `npm run build` fails with errors
**Solutions**:
1. Check TypeScript errors in components
2. Verify all imported files exist
3. Check frontmatter syntax in markdown files
4. Ensure all images referenced exist

#### Missing Images
**Symptoms**: Images not displaying in portfolio/blog
**Solutions**:
1. Verify image paths in frontmatter
2. Check image files exist in `public/images/`
3. Ensure correct relative paths from markdown files
4. Check image URLs for external images

#### Theme Toggle Not Working
**Symptoms**: Dark/light mode toggle doesn't work
**Solutions**:
1. Check browser console for JavaScript errors
2. Verify localStorage is available
3. Check CSS classes are properly applied
4. Ensure theme toggle script is loaded

#### Contact Form Issues
**Symptoms**: Contact form not submitting
**Solutions**:
1. Form is currently a basic HTML form
2. Needs backend integration for actual submission
3. Consider using form services like Netlify Forms
4. Check form validation and required fields

### Performance Issues

#### Slow Loading
**Solutions**:
1. Optimize images (use WebP format)
2. Enable compression on server
3. Use CDN for static assets
4. Minimize CSS and JavaScript

#### Large Bundle Size
**Solutions**:
1. Remove unused dependencies
2. Use dynamic imports for large components
3. Optimize images and videos
4. Enable tree shaking

### Development Tips

#### Hot Reload Issues
- Restart development server
- Check file permissions
- Verify file extensions are correct
- Clear browser cache

#### CSS Not Updating
- Check CSS syntax errors
- Verify import paths
- Clear browser cache
- Restart development server

#### Component Errors
- Check component imports
- Verify prop types
- Check Astro syntax
- Review error messages carefully

---

## Best Practices

### Code Organization

#### File Structure
- **Keep components small**: Single responsibility principle
- **Use descriptive names**: Clear component and file names
- **Organize by feature**: Group related components
- **Consistent naming**: Use kebab-case for files

#### Component Design
- **Reusable components**: Design for reuse across pages
- **Props validation**: Use TypeScript for type safety
- **Accessibility**: Include ARIA labels and semantic HTML
- **Performance**: Minimize prop drilling

### Content Management

#### Markdown Best Practices
- **Consistent frontmatter**: Use same fields across content types
- **Descriptive titles**: Clear, SEO-friendly titles
- **Alt text**: Always include for images
- **Date format**: Use ISO format (YYYY-MM-DD)

#### Asset Management
- **Optimize images**: Compress before adding to repository
- **Consistent naming**: Use descriptive, lowercase filenames
- **Organize by type**: Separate images, videos, documents
- **Version control**: Avoid large binary files when possible

### Performance

#### Optimization Strategies
- **Image optimization**: Use appropriate formats and sizes
- **Lazy loading**: For images below the fold
- **Code splitting**: Dynamic imports for large components
- **CSS optimization**: Remove unused styles

#### SEO Best Practices
- **Meta tags**: Include in BaseLayout
- **Structured data**: Add JSON-LD for portfolio items
- **Sitemap**: Generate automatically
- **Alt text**: Required for all images

### Security

#### Basic Security
- **External links**: Use `rel="noopener noreferrer"`
- **Form validation**: Client and server-side validation
- **Content Security Policy**: Implement CSP headers
- **HTTPS**: Always use HTTPS in production

### Accessibility

#### WCAG Compliance
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Color contrast**: Meet WCAG AA standards
- **Screen readers**: Use semantic HTML and ARIA labels
- **Focus indicators**: Visible focus states

#### Testing
- **Automated testing**: Use tools like axe-core
- **Manual testing**: Test with keyboard only
- **Screen reader testing**: Test with actual screen readers
- **Mobile testing**: Test on actual devices

---

## Future Enhancements

### Planned Features

#### Content Management
- **Tag system**: Complete implementation of tag-based filtering
- **Search functionality**: Full-text search across all content
- **RSS feeds**: Automatically generated feeds for blog and writing
- **Comments**: Integration with commenting system

#### User Experience
- **Progressive Web App**: Service worker for offline functionality
- **Performance monitoring**: Real user monitoring
- **Analytics**: Privacy-focused analytics integration
- **Newsletter**: Email subscription for updates

#### Technical Improvements
- **API integration**: Connect contact form to backend service
- **Image optimization**: Automated image processing
- **Internationalization**: Multi-language support
- **Testing**: Automated testing suite

### Potential Integrations

#### Third-Party Services
- **CMS Integration**: Headless CMS for content management
- **Form Handling**: Netlify Forms or similar service
- **Email Service**: Newsletter management
- **Social Media**: Automatic posting to social platforms

#### Development Tools
- **ESLint/Prettier**: Code formatting and linting
- **Husky**: Git hooks for pre-commit checks
- **Storybook**: Component documentation
- **Playwright**: End-to-end testing

### Scalability Considerations

#### Performance
- **CDN Integration**: Global content delivery
- **Edge Computing**: Deploy to edge locations
- **Image CDN**: Optimized image delivery
- **Caching Strategy**: Implement comprehensive caching

#### Maintainability
- **Documentation**: Keep documentation updated
- **Testing**: Comprehensive test coverage
- **Monitoring**: Error tracking and performance monitoring
- **Backup**: Regular content backups

---

## Conclusion

This comprehensive documentation provides a complete guide to understanding, developing, and maintaining Matthew Oyan's portfolio website. The project demonstrates excellent use of modern web technologies and follows best practices for performance, accessibility, and user experience.

The modular architecture makes it easy to extend and customize, while the content management system provides flexibility for ongoing updates. The responsive design ensures the site works well across all devices, and the theme system provides a great user experience.

For questions, issues, or contributions, please refer to the project repository or contact the maintainer directly.

---

*Last updated: March 2025*
*Documentation version: 1.0.0*