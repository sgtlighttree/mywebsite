# Matthew Oyan's Portfolio and Blog

This website is my personal portfolio and blog, built with Jekyll and hosted on GitHub Pages. It showcases my work as a multimedia generalist and writer.

## Website Structure

### Content Sections

*   **Portfolio/Work:** Displays my past projects, organized chronologically. Each project is a Markdown file in the `_posts` directory.
*   **Blog:** Contains blog posts on various topics. Posts are Markdown files in the `_blogs` directory. (Currently not linked in the main navigation).
*   **Skybound Saga:** A dedicated section for my science-fantasy creative writing project. Content is organized in Markdown files within the `_skybound` directory.
*   **About:**  A page with information about me. Content is in `about.markdown`.
*   **Contact:** My contact information. Content is in `contact.markdown`.

### Directory Structure

The website's repository (`mywebsite`) has the following directory structure:

```
.
├── 404.html                    # Custom 404 error page
├── Gemfile                     # Defines Ruby gem dependencies
├── Gemfile.lock                # Records exact gem versions
├── README.md                   # Repository description
├── _archived_posts/            # Archived blog posts (not actively displayed)
├── _blogs/                     # Blog posts (currently not displayed)
├── _config.yml                 # Jekyll configuration file
├── _includes/                  # Reusable HTML snippets (e.g., media player, gallery)
├── _layouts/                   # HTML templates for different page types
├── _notes.txt                  # Personal notes (not part of the website)
├── _posts/                     # Portfolio project posts
├── _site/                      # Generated website files (do not edit directly)
├── _skybound/                  # Creative writing content (lore and short stories)
├── about.markdown              # Content for the "About" page
├── assets/                     # Static assets (images, CSS, JavaScript, videos)
├── blogs.html                  # Lists blog posts
├── contact.markdown            # Content for the "Contact" page
├── index.markdown              # Content for the home page
└── skybound.html               # Lists stories in the "Skybound" section
```

### Key Files and Directories

*   **`_posts/`:** Portfolio project pages (Markdown). Filenames: `YYYY-MM-DD-project-title.markdown`.
*   **`_blogs/`:** Blog posts (Markdown). Filenames: `YYYY-MM-DD-post-title.markdown`. (Currently not linked on the main site.)
*   **`_skybound/`:** Creative writing content (Markdown).
*   **`_layouts/`:** HTML templates for page structure.
*   **`_includes/`:** Reusable HTML components.
*   **`assets/`:** Images, videos, CSS, JavaScript.
*   **`_config.yml`:** Main Jekyll configuration file.
*   **`Gemfile`, `Gemfile.lock`:** Ruby gem dependencies.
*   **`_site/`:** Generated website (do not edit directly).

## Development

**Prerequisites:**

*   Ruby (installed via Homebrew)
*   Bundler

**Local Setup:**

1. Install Ruby (if not already installed): `brew install ruby`
2. Install Bundler: `/opt/homebrew/opt/ruby/bin/gem install bundler -v 2.5.23` (or use the newer version 2.6.2 if confirmed to be working).
3. Navigate to the `mywebsite` directory in your terminal.
4. Install dependencies: `/opt/homebrew/opt/ruby/bin/bundle install`
5. Run Jekyll: `/opt/homebrew/opt/ruby/bin/bundle exec jekyll serve --host 0.0.0.0`
6. Access the site in your browser at `http://localhost:4000`.

**Important Notes:**

*   Ensure your `PATH` is set up to prioritize Homebrew's Ruby, as configured in `~/.zshrc`.
*   If you encounter issues with `bundle` not being found or using the wrong version, refer to the detailed troubleshooting steps in our previous conversation. The symbolic link in `/usr/local/bin` should now correctly point to the Homebrew-installed Bundler.

## Troubleshooting

*   If `which bundle` returns `/usr/bin/bundle` instead of `/usr/local/bin/bundle`, there is an issue with your `PATH` environment variable. Review your `~/.zshrc` and make sure the Homebrew paths are prioritized correctly.

## Future Improvements

*   Add a navigation menu.
*   Activate or remove the blog section.
*   Add more content.
*   Customize the website's design.

