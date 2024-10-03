source "https://rubygems.org"

# Use the github-pages gem which provides the correct dependencies for GitHub Pages
gem "github-pages", group: :jekyll_plugins

# Optional: Explicitly use a theme if you want
# Minima theme should be included by default if it's the current default theme for github-pages.
# Remove any specific Minima version dependency unless specifically needed.
# gem "minima", "~> 2.5"

# Group for Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

# Specific windows/jruby platforms
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", platforms: [:mingw, :x64_mingw, :mswin]

gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]
