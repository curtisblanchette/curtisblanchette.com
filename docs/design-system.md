# Design system — Brutalist

The whole point: this site should look like a `man` page that learned about CSS Grid. Mono everywhere, hard borders, one accent color, no decoration that isn't carrying information.

## Tokens

All colors are theme-scoped CSS variables. The defaults live in Tailwind v4's `@theme` block in `src/app/globals.css`; per-theme blocks (`[data-theme="..."]`) override the same variable names. Tailwind utilities (`bg-bg`, `text-fg`, `text-accent`, `border-line`) all emit `var(--color-...)`, so swapping `<html data-theme="...">` cascades through every utility automatically — no class-level rewrites.

| Token | Default (`brutalist`) | Use |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-fg` | `#fafafa` | Primary body text |
| `--color-heading` | `#fafafa` | Heading text (h1–h6). Forced white across **all** themes, independent of `--color-fg`. |
| `--color-muted` | `#737373` | Secondary text, dates, labels |
| `--color-faint` | `#404040` | Disabled / decorative |
| `--color-line` | `#262626` | All 1px borders and rules |
| `--color-accent` | `#30d158` | The one accent (Apple `systemGreen` dark). Reserved. |
| `--color-accent-dim` | `#21a040` | Underlines on accent links, pressed states |
| `--color-code-bg` | `#1a1a1a` | Inline `<code>` background |
| `--color-code-block-bg` | `#050505` | `<pre>` block background |
| `--font-mono` | IBM Plex Mono + system mono fallbacks | The only font (constant across themes) |

## Themes

Four themes ship. The active theme is stored in `localStorage` under `cb.theme` and applied to `<html data-theme="...">` by an inline pre-hydration script (see [`architecture.md`](./architecture.md#theming)). The switcher UI lives in the header status bar.

| Theme | bg | body fg | heading | accent | Vibe |
|---|---|---|---|---|---|
| `brutalist` (default) | `#0a0a0a` | `#fafafa` | `#fafafa` | `#30d158` | Near-black, system green. The home palette. |
| `paper` | `#f4f0e8` | `#1a1a1a` | `#fafafa` | `#c2410c` | Cream body with ink prose, white headings sit on the cream cards. Burnt-orange accent. |
| `terminal` | `#000000` | `#00ff66` | `#fafafa` | `#00ff66` | CRT phosphor body, white headings cut through. Scanline overlay applied automatically. |
| `vapor` | `#0d0221` | `#fefefe` | `#fefefe` | `#ff2bd6` | Synthwave. Deep navy + hot magenta. |

**Note on headings.** Headings (h1–h6) use `--color-heading`, **not** `--color-fg`. The brutalist white heading is intentionally carried across every theme — it's a load-bearing visual constant. Body text and accent vary per theme; headings stay white.

Add a new theme:
1. Register it in `src/lib/themes.ts` (`THEMES` array, with `id`, `label`, `description`, three `swatches`).
2. Add a `[data-theme="<id>"] { ... }` block in `src/app/globals.css` overriding every `--color-*` token.
3. Done — it appears in the switcher and is selectable.

### Theme-aware patterns

- **Never hardcode a color** in a component. Use the tokens or Tailwind utilities that resolve to them.
- **SVG assets in `public/`** are static and don't pick up theme changes. The hardcoded brutalist palette in the work-card SVGs is intentional — they read as embedded artwork rather than chrome. If you need theme-following inline graphics, render the SVG as a React component and use `currentColor` + `var(--color-...)`.
- **Code highlighting** is via Shiki with a fixed `github-dark-dimmed` theme. The surrounding `<pre>` / `<code>` chrome follows the active theme via the code-bg tokens; only the *syntax* colors are fixed. This is intentional — swapping syntax themes per UI theme would require a build-time matrix.
- **The blinking caret and marquee** respect `prefers-reduced-motion`.


## Rules

**Do**
- Mono everywhere. IBM Plex Mono is the only typeface on the site.
- 1px borders (`border-line`) to separate everything.
- Use the accent (`text-accent` / `bg-accent` / `border-accent`) sparingly — it's load-bearing because nothing else is colorful.
- Section IDs and numbers (`[ 01 ] / WORK`) — these aren't decoration, they orient the reader.
- ASCII rules (`<AsciiRule />` or `<hr />` in MDX prose) between major content blocks.
- Field-label rows (`<FieldRow label="..." value="..." />`) — the dot-leader / dashed-leader look from spec sheets.
- Crosshair `+` corner markers (`<Crosshair />`) — only on featured cards or hero frames. Don't litter.
- Hover = sharp invert (`.invert-on-hover`) or accent underline (`.link-accent`). No bouncing, no scaling.

**Don't**
- No `rounded-*` anywhere. Sharp corners.
- No `shadow-*`. Use 1px borders to separate planes.
- No gradient backgrounds. Solid colors only.
- No serifs. No sans. No display fonts.
- No icon libraries. Use Unicode glyphs: `▸ + ─ │ ▌ ▒ ▣ ▶ ◉ ✎ ●`.
- No motion that draws attention. The blinking caret and marquee ticker are intentional rate-limits. Anything else needs a reason.
- No second accent color. If you need to differentiate, use `text-fg` vs `text-muted` vs `text-faint`. The accent is reserved.

## Primitives

### `<SectionHeader>` / `<Section>`
The section frame. Renders the brutalist header pattern: `[ NN ] / TITLE ─────── meta`.

```tsx
<Section id="work" number="01" title="Selected Work" meta="2024 → 2025">
  ...
</Section>
```

### `<FieldRow>`
The spec-sheet row. `LABEL ────────── value`.

```tsx
<FieldRow label="Role" value="Lead Software Engineer" />
<FieldRow label="GitHub" value="@curtisblanchette" href="https://github.com/..." />
```

### `<AsciiRule>`
Horizontal rule built from a repeated unicode glyph.

```tsx
<AsciiRule />               // ─────────────
<AsciiRule char="═" />      // ═════════════
```

### `<Crosshair>`
Four `+` markers at the corners of the parent. Parent must be `position: relative`.

```tsx
<div className="relative border border-line p-6">
  <Crosshair />
  ...
</div>
```

### `.invert-on-hover`
Sharp two-tone hover: bg ↔ fg swap on hover, 80ms linear.

### `.link-accent`
Underlined link that turns accent on hover with full-opacity underline.

### `.caret`
Blinking `█` after text. Used at the end of hero copy.

### `.prose-brutalist`
The prose wrapper for rendered markdown bodies. Auto-prepends `## ` and `### ` to h2/h3 in accent color. Inline `<code>` gets a 1px border + dark background. Blockquotes get a 2px left accent border.

## Patterns

### Status bar
The thin band at the top of the header showing `STATUS · LOC · UTC · v`. Surface, not chrome — it sets the "you are reading a terminal artifact" frame.

### Live-feed marquee
The hero's stack ticker — a single CSS `@keyframes` translate, no JS. Used once on the home page. Don't add a second.

### Card with badge
For Work cards: a label badge in the top-left (`PUBLIC` / `NDA` / `INTERNAL`) corresponds to `visibility` in the data. Featured cards add a `FEATURED` badge next to it.

## Accessibility notes

- Color contrast: `#fafafa` on `#0a0a0a` is 18.7:1. Accent on bg is 4.9:1. All AAA except small accent-on-bg text which is AA.
- The blinking caret animates `visibility`, not motion — respects `prefers-reduced-motion` better than translate animations would. (Still consider gating it.)
- The marquee should be gated under `prefers-reduced-motion: reduce` — **TODO**, not done yet.
- All interactive elements have keyboard focus paths via the default Tailwind focus styles. Visible focus rings could be sharper — **TODO**.
