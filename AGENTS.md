# Repository Guidelines

## Project Structure & Module Organization
Astro routes live in `src/pages`, with shared UI in `src/components` and reusable shells in `src/layouts`. Global styling is centralized in `src/styles/global.css`; prefer extending tokens there before adding new files. Static assets (favicons, media, wiki exports) belong in `public/`, while deployment helpers live in `netlify/` and configuration in `astro.config.mjs`, `tsconfig.json`, and `netlify.toml`. The `dist/` folder is generated at build time—never edit it manually.

## Build, Test, and Development Commands
Run `npm install` once to pull Astro, Preact compat, and tooling. Use `netlify dev` for local work so the Netlify Image CDN and redirects match production; it proxies the Astro dev server automatically. Ship builds with `npm run build` (`astro build`) and verify the static output via `npm run preview`. For quick wiki-only iteration there is `npm run dev:wiki`, which watches `public/wiki` through BrowserSync.

## Coding Style & Naming Conventions
Follow the existing 2-space indentation and favor single quotes in JavaScript/TypeScript blocks. Component files use PascalCase (e.g., `VideoPlayer.astro`), hooks or utilities should use camelCase, and public assets adopt kebab-case. Keep Astro frontmatter lightweight and prefer extracting complex logic into `.js` or `.ts` helpers. Update `global.css` tokens instead of hardcoding colors or spacing.

## Testing Guidelines
There is no automated test suite yet; rely on `npm run build` to catch Astro compile errors and verify visual changes in `netlify dev`. When adding interactive components, include lightweight runtime guards (e.g., prop validation) and test across desktop/mobile breakpoints before opening a pull request. Capture console output and network calls while running locally if you diagnose regressions.

## Commit & Pull Request Guidelines
Commits are concise, present-tense verbs (`revise metaTitle`, `fix wrong canonical link`). Group related changes, keep subjects under ~72 characters, and add descriptive bodies when behavior shifts. Pull requests should summarize scope, note any content migrations, and link Netlify deploy previews or issues when available. Include before/after screenshots or screen recordings for visual tweaks, and call out any manual follow-up steps for the maintainers.

## Content & Asset Notes
Respect licensing distinctions in `README.md`: code is MIT, but portfolio media is not. Optimize new imagery before committing, and prefer WebP or MP4 stored under `public/images` and `public/videos`. Use the existing Lottie JSON pattern (`public/MatthewOyan_MonogramAnimated.json`) if you add animations.
