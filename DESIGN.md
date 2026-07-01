# DESIGN.md

## Direction

The site is minimal, dark, grid-driven, and slightly technical without becoming a fake terminal. The tone should feel direct, capable, and calm. Avoid marketing decoration, heavy gradients, oversized cards, and generic SaaS polish.

## Core Primitives

- **Canvas:** near-black page background with subtle SVG noise.
- **Grid:** one-pixel borders define sections and cells. Lines should feel structural, not decorative.
- **Type:** Geist for body text. Geist Pixel only for the hero headline and brand-like moments.
- **Color:** off-white text, muted gray body copy, dark green-black surfaces, restrained accent color. Section shaders may add atmosphere, but each section should stay within a narrow related color family.
- **Motion:** subtle reveal/stagger, scroll-tied hero background mask, gentle shader movement. Motion should never make content harder to read.
- **Buttons:** simple filled light buttons on dark surfaces. No elaborate hover effects; use small opacity shifts.

## Layout Patterns

- The main shell is constrained to `72rem`.
- Sections are full-width within the shell and separated by one-pixel borders.
- Most sections use the same internal padding token, `--space-cell-inline`.
- Section headlines use `text-wrap: balance`.
- Body copy uses `text-wrap: pretty` where supported.
- Cards and grid cells should align to the border grid instead of floating as separate panels.
- Avoid nested cards.

## Section Patterns

### Hero

- Full viewport intro with a masked shader background.
- Text remains aligned to the main site container.
- Only the background mask changes during the initial scroll.
- The headline should stay short, cheeky, and human.

### About / Industry

- About copy is concise and business-facing.
- Industry experience is a compact grid attached to the about section.
- Industry hover backgrounds are low-opacity WebP textures, not icons.

### Services

- Six service cells in a simple grid.
- Labels are direct and practical.
- Sublines should be one or two short lines when possible.

### Work With Me

- Two primary options: Projects & Advisory and Retained Technical Partner.
- Cells should feel like pricing cards without heavy visual chrome.
- Pricing details stay secondary.

### FAQ

- Static question-and-answer blocks. No accordions.
- Paragraph spacing is intentionally tight when multiple paragraphs appear in one cell.

### Side Projects

- Full-width project cards stacked vertically.
- Background images are supportive and should fade away from the text side.
- Cards may exist without background imagery when a project image is not available yet.
- Buttons sit at the bottom of cards when present.

## CSS Tokens

Important tokens live in `:root` in `styles.css`.

- `--color-bg`, `--color-text`, `--color-muted`, `--color-line`, `--color-accent`
- `--font-body`, `--font-display`
- `--layout-max`, `--layout-gutter`, `--space-cell-inline`, `--space-section`
- `--font-size-display`, `--font-size-statement`, `--font-size-card-title`
- `--border-subtle`, `--surface-hover`

Prefer extending existing tokens over adding one-off values. Use `rem` units for sizing and spacing.

## Interaction Rules

- Hovers should be subtle: opacity or background-color shifts.
- Buttons must not resize on hover.
- Tooltips should be portal-style fixed elements so they do not get clipped by shader/section layers.
- Reduced-motion users should avoid continuous shader animation cost where possible.

## Asset Rules

- Use WebP for raster UI/background assets.
- Keep social share imagery in the format required by platforms.
- Keep source assets small enough for a static GitHub Pages site.
- Do not add decorative assets unless they clarify the page or strengthen the specific tone.
