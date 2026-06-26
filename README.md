# Marc Singer

Static personal site for [marcsinger.xyz](https://marcsinger.xyz/).

## Local Preview

```sh
python -m http.server 4173
```

Open `http://localhost:4173`.

## Build

```sh
node scripts/build-pages.mjs
```

This regenerates the minified assets and prepares `dist/` for GitHub Pages. The deployment workflow is manual-only from GitHub Actions.

## Notes

- Source files stay readable in the repo.
- `index.html` loads the generated `.min.css` and `.min.js` files.
- `dist/` and local audit reports are ignored.
