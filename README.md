# Marc Singer Personal Site

Static personal site for `marcsinger.xyz`.

This branch is prepared for GitHub Pages as a static site. There is no React app, no package manifest, and no deploy build step required.

## Structure

- `CNAME` configures the custom GitHub Pages domain as `marcsinger.xyz`.
- `.nojekyll` tells GitHub Pages to serve the static files directly without Jekyll processing.
- `index.html` contains the page markup, metadata, Open Graph/Twitter tags, and JSON-LD structured data.
- `styles.css` contains the full visual system and responsive layout.
- `styles.min.css` is generated for production loading.
- `site.js` handles reveal timing, dynamic years of experience, hero masking, and shader setup.
- `site.min.js` is generated for production loading.
- `terminal-shader.js` contains the hero terminal shader source.
- `terminal-shader.min.js` is generated for production loading.
- `aurora-shader.js` contains the section aurora shader source.
- `aurora-shader.min.js` is generated for production loading.
- `scripts/minify.ps1` regenerates the minified CSS and JavaScript files without adding a package manifest.
- `scripts/build-pages.mjs` regenerates minified assets and prepares the clean `dist` artifact used by GitHub Actions.
- `.github/workflows/pages.yml` builds and deploys the `redesign` branch to GitHub Pages.
- `llms.txt` summarizes the site for AI assistants and crawlers that consume LLM-facing metadata.
- `robots.txt` and `sitemap.xml` provide crawler guidance.

## GitHub Pages

Use the GitHub Pages repository settings to publish from the `redesign` branch root, or merge this branch into the branch currently powering `marcsinger.xyz` when ready.

The deployment workflow runs on pushes to `redesign` and can also be started manually from the Actions tab. It builds a clean Pages artifact in `dist` before deploying.

Before committing source changes:

```powershell
node .\scripts\build-pages.mjs
```

Commit the generated `.min.css` and `.min.js` files with the source files. The local `dist` folder is ignored; GitHub Actions recreates it during deployment.

## Preview

```sh
python -m http.server 4173
```

The site can also be served by any static file server from the repository root.

## Build

```powershell
.\scripts\minify.ps1
```

The readable source files stay in place. `index.html` loads the generated minified assets.

To test the full GitHub Pages artifact locally:

```powershell
node .\scripts\build-pages.mjs
python -m http.server 4173 -d dist
```

Local Lighthouse reports are ignored by Git and should not be deployed.

## Current Positioning

Marc Singer builds custom software, AI systems, websites, office technology, automation, and practical business systems for small businesses.

Primary services:

- Business AI
- Website Development
- Custom Software
- Technical Advisory
- Design Consulting
- Office Technology Setup
- Projects
- Fractional CTO

BusinessOS is presented as an AI-enabled operating system developed by Marc Singer for businesses that need something on-premises, secure, and remotely accessible. It should not be described as off-the-shelf SaaS.
