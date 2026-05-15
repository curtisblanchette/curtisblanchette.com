# Design system — Brutalist

The whole point: this site should look like a `man` page that learned about CSS Grid. Mono everywhere, hard borders, one accent color, no decoration that isn't carrying information.

## Tokens

Defined once in `src/app/globals.css` via Tailwind v4 `@theme`:

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-fg` | `#fafafa` | Primary text |
| `--color-muted` | `#737373` | Secondary text, dates, labels |
| `--color-faint` | `#404040` | Disabled / decorative |
| `--color-line` | `#262626` | All 1px borders and rules |
| `--color-accent` | `#ff5500` | The one accent. Reserved. |
| `--color-accent-dim` | `#cc4400` | Underlines on accent links |
| `--font-mono` | IBM Plex Mono + system mono fallbacks | The only font |

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
