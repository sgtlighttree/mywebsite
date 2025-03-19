# Matthew Oyan Website: Developer Documentation

This document provides a technical overview of the website's structure and instructions for building it using the command line.

## I. Project Structure

The website is built using Jekyll, a static site generator. The project directory contains the following key components:

* **`_config.yml`:**  The Jekyll configuration file. This file specifies the site's title, description, base URL, theme, plugins, and collections.  Key settings to note:

    * `title`:  Sets the website title.
    * `baseurl`:  Specifies the base URL path if the site isn't at the root of a domain.  Currently set to `/mywebsite`.  **Important:**  Change this if your deployment path changes.
    * `collections`: Defines custom collections for blog posts (`blogs`) and Skybound Saga stories (`skybound`), each with specified permalinks.
    * `plugins`: Lists any Jekyll plugins used; currently, only `jekyll-feed` is used for generating an RSS feed.
    * `header_pages`: Lists the pages included in the main navigation.

* **`_data`:** This directory contains YAML data files used to generate dynamic content. Currently, `galleries.yml` defines the images and videos for your galleries.

* **`_includes`:** This directory contains reusable HTML snippets (partials).  Key includes:
    * `horizontal-gallery.html`:  Renders horizontal galleries of images and videos using data from `_data/galleries.yml`.
    * `media.html`: A reusable component for displaying individual media (images or videos) associated with blog posts or Skybound stories.

* **`_layouts`:** This directory contains layout templates for different page types:
    * `default.html`: Base template for all pages.  This includes linking to CSS and Javascript files.
    * `home.html`:  Layout for the homepage, displaying recent blog posts with media.
    * `page.html`: Layout for standard pages (like the about page).
    * `post.html`: Layout for blog posts and Skybound stories, including metadata display and media integration.

* **`_posts`:** This directory contains your blog posts, written in Markdown and following a specific naming convention (`YYYY-MM-DD-title.markdown`). The front matter (YAML section at the top) of each post specifies layout, title, date, categories, and media information.

* **`_skybound`:**  This directory contains Markdown files for the Skybound Saga stories.

* **`assets`:** This directory holds your website's static assets:
    * `custom_styles.css`: Your custom stylesheet.
    * `main.css`: Your primary stylesheet.
    * `gallery.js`: Javascript for handling gallery functionality (likely for image and video scrolling).
    * `images`: Folder containing all images.
    * `videos`: Folder containing all videos.

* **Markdown files:** Several Markdown files, like `about.markdown`, `contact.markdown`, `index.markdown`, and the individual story files in `_skybound`, and `blogs` provide the main website content.

* **HTML files:** Contains several HTML files, including `blogs.html` and `skybound.html` which act as landing pages for their respective content.

* **`_site`:** (Generated directory) This directory contains the compiled HTML output of the website.  **Do not edit these files directly.**

## II. Building the Website

These instructions assume you have Ruby, Bundler, and Jekyll installed.

1. **Navigate to the project directory:**
   ```
   cd /Users/matthewoyan/mywebsite
   ```

2. **Install dependencies:**
    ```
    bundle install
    ```
3. **Build the site:**
    ```
    bundle exec jekyll serve --livereload
    ```
This command starts a local server and builds the website. You can view the website in your browser at `http://127.0.0.1:4000/`.

4. **Build the site, and serve over LAN:**
    ```
    bundle exec jekyll serve --host 0.0.0.0 --livereload
    ```
This command starts a local server and builds the website. You can view the website in your browser at `http://127.0.0.1:4000/`, or `hostip:4000`.

5. **To build the site without running the server:**
    ```
    bundle exec jekyll build
    ```
This will generate the static HTML files in the _site directory. You can then deploy this _site directory to your hosting provider.

6. **To build the site but clean it first:**
    ```
    bundle exec jekyll clean && bundle exec jekyll serve --host 0.0.0.0 --livereload
    ```
This will delete all site builds and then build the site, same as method 4.

## III. Adding New Content

### A. Blog Posts

1. Create a new Markdown file in the `_posts` directory, following the `YYYY-MM-DD-title.markdown` naming convention.
2. Add front matter:
    ```
    ---
    layout: post
    title: "Your Post Title"
    date: 2024-10-27
    categories: [category1, category2] # Optional categories
    media_type: image # Or "video"
    media_path: /assets/images/your-image.jpg # Or path to your video
    ---
    ```
3. Write your post content in Markdown below the front matter.

### B. Skybound Saga Stories

1. Create a new Markdown file in the `_skybound` directory.
2. Add front matter (similar to blog posts, adapt as needed):
    ```
    ---
    layout: page
    title: "Your Story Title"
    category: Chapter 1 # example category
    ---
    ```
3. Write your story content in Markdown.

### C. Adding Media to Galleries

1. Add your images or videos to the `assets/images` or `assets/videos` folder respectively.
2. Update the `_data/galleries.yml` file, adding entries to the relevant gallery with the correct path, dimensions, and optional caption:
    ```yaml
    example_gallery:
      - url: /assets/images/your-image.jpg
        width: 1200
        height: 800
        thumbnail: /assets/images/your-image-thumb.jpg  # Optional, defaults to url
        caption: Your image caption  # Optional
        mobile_height: tall  # Optional, individual mobile height
      - url: /assets/images/your-second-image.jpg
        width: 1200
        height: 1800
        caption: Your second image caption
        mobile_height: extra-tall  # Taller image gets extra height on mobile
    ```
3. Include the gallery in your markdown file using:
    ```liquid
    {% include gallery.html images=site.data.galleries.your_gallery_name %}
    ```
4. You can control the height of gallery images in two ways:

   **A. Gallery-wide height settings:**
   ```liquid
   {% include gallery.html 
      images=site.data.galleries.your_gallery_name 
      height="tall" 
      mobile_height="default" %}
   ```
   
   **B. Individual image height settings:**
   Add `mobile_height` property to specific images in your `galleries.yml` file.
   
   Available height options:
   - Desktop (gallery-wide):
     - Default: 300px (no parameter needed)
     - `short`: 200px
     - `tall`: 400px
     - `extra-tall`: 500px
   
   - Mobile (gallery-wide or per-image):
     - Default: 200px (no parameter needed)
     - `short`: 150px
     - `tall`: 300px
     - `extra-tall`: 400px
   
   Individual image settings will override gallery-wide settings.

5. The gallery will display in a 2-column grid on desktop and adapt to a responsive grid on mobile devices.



## IV. Deployment

This section will need to be customized based on your chosen hosting provider (e.g., GitHub Pages, Netlify, etc.). Generally, you'll need to:

Build the site using `bundle exec jekyll build`.
Upload the contents of the `_site` directory to your hosting provider's server.