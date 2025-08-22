# Website Documentation

This document provides an exhaustive overview of the Astro-based personal website, tailored for the solo developer, Matthew Oyan. It covers the project's architecture, components, layouts, and key functionalities.

## 1. Project Overview

This project is a personal website and portfolio built with [Astro](https://astro.build/), a modern static site generator. It's designed to be fast, content-focused, and easy to maintain. The site uses [Preact](https://preactjs.com/) for some interactive components, demonstrating Astro's ability to integrate with UI frameworks.

### Technologies Used

*   **Astro**: The core framework for building the site.
*   **Preact**: Used for small, interactive UI components.
*   **TypeScript**: For type safety in Astro components and scripts.
*   **CSS**: For styling, with global styles and component-scoped styles.

## 2. Project Structure

The project follows a standard Astro project structure:

*   `src/`: Contains all the source code.
    *   `components/`: Reusable UI components (`.astro`, `.jsx`).
    *   `layouts/`: The base templates for pages.
    *   `pages/`: The individual pages of the site. Astro uses file-based routing.
    *   `styles/`: Global CSS styles.
    *   `scripts/`: JavaScript files.
*   `public/`: Static assets like images, fonts, and favicons.

## 3. Layouts

Layouts are Astro components that define the UI structure shared by one or more pages.

### `BaseLayout.astro`

This is the foundational layout for the entire site. It defines the main HTML structure, including the `<html>`, `<head>`, and `<body>` tags.

**Props:**

*   `pageTitle` (string, required): The main title of the page, displayed in the `<h1>` tag.
*   `metaTitle` (string, optional): A different title for the browser tab. If not provided, it defaults to `"Matthew Oyan - {pageTitle}"`.
*   `pageDescription` (string, optional): A short, descriptive summary of the page content for search engines and social media.
*   `showFooterCta` (boolean, optional, default: `true`): A boolean to control the visibility of the call-to-action in the footer.

**SEO Enhancements:**

This layout now includes essential SEO meta tags:
*   **Meta Description**: Dynamically set using `pageDescription`.
*   **Open Graph (Facebook)**: `og:type`, `og:url`, `og:title`, `og:description`, and `og:image` are included for rich social media previews.
*   **Twitter Cards**: `twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, and `twitter:image` are included for rich Twitter previews.

**Usage:**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout pageTitle="About Me">
  <p>This is the about page.</p>
</BaseLayout>
```

### `BlogPostLayout.astro`

This layout is designed for markdown-based blog posts. It extends `BaseLayout` and is responsible for rendering the post's frontmatter and content.

**Frontmatter:**

It expects the following frontmatter fields in the markdown files:

*   `title` (string): The title of the blog post.
*   `description` (string): A short description of the post.
*   `pubDate` (string): The publication date of the post.
*   `author` (string, optional): The author of the post.
*   `tags` (array of strings): A list of tags associated with the post.

**Functionality:**

*   It displays the post's description, publication date, and author.
*   It renders a list of tags, with each tag linking to a tag-specific page (e.g., `/tags/astro`).
*   It includes a condition to *not* display tags on pages under the `/portfolio/` path.
*   **SEO Integration**: This layout now passes `frontmatter.title` to `metaTitle` and `frontmatter.description` to `pageDescription` in `BaseLayout.astro` for improved SEO.

### `PortfolioPostLayout.astro`

This layout is intended for portfolio items.

**SEO Integration**: This layout now passes `frontmatter.title` to `metaTitle` and `frontmatter.description` to `pageDescription` in `BaseLayout.astro` for improved SEO.

**Note:** This layout is currently identical to `BlogPostLayout.astro`. The conditional logic to hide tags on portfolio pages is present in both files, making it redundant here. For better maintainability, consider creating a single, more generic `PostLayout.astro` and passing a prop to control the visibility of tags.

## 4. Components

Components are reusable pieces of UI.

### `Header.astro` & `Navigation.astro`

These two components work together to create the site's header.

*   `Header.astro`: The main header component. It displays the site title and imports the `Navigation` component.
*   `Navigation.astro`: Contains the primary navigation links. It uses `Astro.url.pathname` to apply an `active` class to the current page's link for styling. The "Tags" link is currently commented out.

### `Footer.astro`

The `Footer.astro` component renders the site's footer.

**Functionality:**

*   It conditionally displays a call-to-action section based on the `showCta` prop passed from `BaseLayout.astro`.
*   It includes the `ThemeIcon` component for theme switching and the `ObfuscatedEmail` component.
*   The `Social.astro` component is imported but not currently used.

### `ObfuscatedEmail.astro`

This is a security-focused component that obfuscates your email address to protect it from spam bots.

**How it works:**

1.  The email address is split into a `user` and `domain` and stored in `data-` attributes on an `<a>` tag.
2.  An inline script runs on page load, which reconstructs the `mailto:` link from the `data-` attributes.
3.  For users with JavaScript disabled, a `<noscript>` tag displays the email address in a "munged" format (e.g., `matthew.oyan [at] gmail.com`).
4.  The script is also configured to re-run after Astro's view transitions (`astro:after-swap`), ensuring it works correctly in a single-page application (SPA) context.

### `ThemeIcon.astro`

This component provides a button to toggle between light and dark themes.

**How it works:**

1.  An inline script runs immediately to determine the user's preferred theme. It checks `localStorage` first, then the `prefers-color-scheme` media query.
2.  The `dark` class is added or removed from the `<html>` element to apply the appropriate theme.
3.  A click event listener on the button toggles the `dark` class and updates the theme preference in `localStorage`.
4.  The SVG icon for the sun and moon is styled with CSS to reflect the current theme.

### `VideoPlayer.astro`

This component provides a responsive video player with a custom loading state to prevent layout shift. It displays a "Loading Video..." message and a progress bar that reflects the video's buffer status while it loads.

**Props:**

*   `src` (string, required): The path to the video file.
*   `type` (string, optional, default: `'video/mp4'`): The MIME type of the video.
*   `autoplay` (boolean, optional, default: `true`): Whether the video should start playing automatically.
*   `loop` (boolean, optional, default: `true`): Whether the video should loop.
*   `muted` (boolean, optional, default: `true`): Whether the video audio should be muted.
*   `controls` (boolean, optional, default: `false`): Whether to display the browser's default video controls.

**Usage:**

**Default (autoplay, loop, muted):**
```astro
---
import VideoPlayer from '../components/VideoPlayer.astro';
---
<VideoPlayer src="/videos/my-video.mp4" />
```

**Customized (no autoplay, with controls):**
```astro
---
import VideoPlayer from '../components/VideoPlayer.astro';
---
<VideoPlayer 
  src="/videos/my-video.mp4"
  autoplay={false}
  loop={false}
  muted={false}
  controls={true}
/>
```

## 5. Pages

The `src/pages/` directory contains the site's pages. Astro's file-based routing means that each file in this directory becomes a page on the site.

*   `.astro` files are used for pages with complex layouts or server-side logic.
*   `.md` files are used for content-heavy pages like blog posts and portfolio items. They use a `layout` property in their frontmatter to specify which layout to use.

**SEO Enhancements:**

*   **Structured Data (Schema.org)**: The `src/pages/index.astro` page now includes basic Schema.org markup for `CollectionPage` to provide search engines with more context about the portfolio.

## 6. Styling

Global styles are defined in `src/styles/global.css`. This file is imported into `BaseLayout.astro`, so the styles are applied to every page. Astro components can also have their own scoped styles within a `<style>` tag.

## 7. Build & Deployment

The `package.json` file contains the following scripts for managing the site:

*   `npm run dev`: Starts the Astro development server with hot-reloading.
*   `npm run build`: Builds the site for production.
*   `npm run preview`: Previews the production build locally.
*   `npm run dev:wiki`: Starts a `browser-sync` server for the `public/wiki` directory.

**SEO-related Configurations:**

*   **Sitemap Generation**: The `@astrojs/sitemap` integration is configured in `astro.config.mjs` to automatically generate a sitemap for the website. The `site` property in `astro.config.mjs` must be set to the website's base URL for the sitemap to be generated correctly.
*   **Robots.txt**: A `public/robots.txt` file is present to guide search engine crawlers, specifying which parts of the site they can access and pointing to the generated sitemap.

## 8. Converting Images to AVIF
Use `imagemagick` to convert images to the efficient AVIF format. If the source is Rec.709 (common for video), convert gamma for correct sRGB display.

**For Rec.709 sources:**
  ```bash
  magick input.png -gamma 0.917 -quality 95 output.avif
  ```
**For standard sRGB sources:**
  ```bash
  magick input.png -quality 95 output.avif
  ```
