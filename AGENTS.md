# AGENTS.md

## Project

This is a static personal site for `marcsinger.xyz`. It is intentionally small: HTML, CSS, JavaScript, local fonts, and image assets. There is no React app and no package manifest.

## Working Rules

- Keep changes surgical.
- Do not add a framework, bundler, package manifest, or dependency tree unless explicitly requested.
- Preserve the single-page static architecture.
- Edit readable source files first, then regenerate minified files when CSS or JavaScript changes.
- Do not commit `dist/`, Lighthouse reports, local temp files, or generated audit artifacts.
- Do not deploy unless explicitly asked.

## Common Commands

Preview from the repository root:

```sh
python -m http.server 4173
```

Regenerate production assets and the GitHub Pages artifact:

```sh
node scripts/build-pages.mjs
```

Regenerate only minified CSS and JavaScript:

```powershell
.\scripts\minify.ps1
```

Validate JavaScript:

```sh
node --check site.js
node --check terminal-shader.js
node --check aurora-shader.js
node --check site.min.js
```

## Deployment

GitHub Pages deployment is configured in `.github/workflows/pages.yml` and is manual-only through `workflow_dispatch`.

The workflow builds `dist/` using `scripts/build-pages.mjs`, uploads it as a Pages artifact, and deploys it. The `CNAME` file sets the custom domain.

## File Notes

- `index.html` owns content, metadata, structured data, and section structure.
- `styles.css` owns the design system and layout.
- `site.js` owns interactions, reveal timing, dynamic years of experience, tooltips, lazy project images, and shader setup.
- `terminal-shader.js` and `aurora-shader.js` contain shader source.
- `.min.*` files are generated production assets and should match their source files.
- `llms.txt`, `robots.txt`, and `sitemap.xml` are public crawler/metadata files.
