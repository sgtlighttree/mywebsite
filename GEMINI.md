# Gemini Configuration

This file provides guidance for working with code in this repository.

## Quick Start

To get the local development environment running:

```bash
npm install
netlify dev
```

**Important:** Always use `netlify dev` for local development. This is required for the Netlify Image CDN to render and transform images correctly. Using `npm run dev` or `npm run preview` will result in broken images.

## Common Commands

| Task                                     | Command                                  |
| ---------------------------------------- | ---------------------------------------- |
| **Local development (with images)**      | `netlify dev`                            |
| Production build                         | `npm run build`                          |
| Preview build with live CDN              | `netlify deploy --build --draft --open`  |
| Wiki development (live-reload)           | `npm run dev:wiki`                       |
| Astro diagnostics                        | `npm run astro -- check`                 |

## Tech Stack

- **Framework:** Astro (Static Site Generation)
- **UI Islands:** Preact (with React aliased to `@preact/compat`)
- **Content:** Markdown and MDX
- **Styling:** Plain CSS with CSS variables
- **Deployment:** Netlify (includes serverless functions and image CDN)

## How to Add Content

### Create a Blog Post

1.  Create a new `.md` file in `src/pages/blog/`.
2.  Add the following frontmatter:

```yaml
---
layout: ../../layouts/PostLayout.astro
title: "Your Post Title"
pubDate: YYYY-MM-DD
description: "A brief SEO description for the post."
tags: [tag1, tag2]
---

Your content starts here.
```

### Create a Portfolio Entry

1.  Create a new `.md` or `.mdx` file in `src/pages/portfolio/`.
2.  Add the following frontmatter, ensuring the image path is correct:

```yaml
---
layout: ../../layouts/PostLayout.astro
title: "Your Project Title"
pubDate: YYYY-MM-DD
description: "A brief SEO description for the project."
image:
  png: "../../../images/project-image.png" # Or .webp/.avif
  alt: "A descriptive alt text for the image."
---

Your content starts here. You can use MDX components like `<PhotoGallery />`.
```
