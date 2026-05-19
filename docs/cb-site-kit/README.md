# cb-site-kit

A small, opinionated design system for **Curtis Blanchette's personal site**.
Editorial frame, mostly black on white, one accent colour, three typefaces,
and a recurring **terminal accent** that pulls the engineering side of the
brand into the page.

This kit is the source of truth for the visual system. The CSS files are
production-ready — copy them into your site as-is. The component and
template HTML files are reference implementations: agents (or you) can read
them and translate to whatever framework the site is actually built in.

---

## Files in this folder

```
cb-site-kit/
├── README.md               ← you are here · the human-readable guide
├── AGENTS.md               ← rules for AI agents implementing the system
├── tokens.css              ← all CSS custom properties + utility classes
├── components.css          ← every component's CSS
├── fonts/                  ← Basis Grotesque Pro + PP Eiko (self-hosted)
├── components/             ← one HTML file per component, copy-pasteable
│   ├── atoms.html
│   ├── site-nav.html
│   ├── hero-editorial.html
│   ├── hero-terminal.html
│   ├── hero-manifesto.html
│   ├── section-header.html
│   ├── project-grid.html
│   ├── project-list.html
│   ├── essay-list.html
│   ├── stack.html
│   ├── now.html
│   ├── terminal.html
│   ├── pull-quote.html
│   ├── marquee.html
│   ├── cta.html
│   └── footer.html
└── templates/              ← composed full-page templates
    ├── home.html
    ├── projects.html
    ├── writing.html
    └── now.html
```

A separate `Personal Site Design Kit.html` at the project root is a visual
showcase you can open in a browser to browse the whole system.

---

## What this kit is for

One product: **your personal site.** Not a marketing site, not an app.
The surfaces are five pages — home, work, writing, now, contact — built
from a small set of components.

The system is **descended from the Metalab Case Study Kit** and inherits
its discipline (two modes, three typefaces, one accent, fixed section
rhythm) — adapted from "studio voice" to "an individual engineer's voice".

---

## Content fundamentals

### Voice

- **First-person singular, for the engineer.** "I built…", "I lead…",
  "I'm in Victoria". Never "we" (you are not a studio). Never "you" in
  body copy (don't address the reader directly except in the CTA).
- **Plainspoken, declarative, confident.** Short sentences. No jargon.
  Don't say "passionate", "driven", "rockstar", "ninja", or "10x".
- **Specific, not aspirational.** Real numbers, real systems, real time
  ranges. `8→1 sign-ins`, `2.4B jobs/month`, `4.2k stars`. If the number
  is soft, leave it out.
- **Titles read like case-study headlines, not taglines.** Active voice.
  Sentence case. No colons. No "How I…".
- **Testimonials use a real name + role.** Em dash for attribution.

### Casing

- **Sentence case** for every display heading and page title. Never
  Title Case.
- **ALL CAPS + mono + tracked** for eyebrows, chapter labels, metadata
  labels, captions-as-tags. Use the `.cb-eyebrow` / `.cb-micro-md` /
  `.cb-pill` classes — never hand-style this.
- **lower-case** for the terminal title bar (`curtis@blanchette ~`).

### Punctuation & symbols

- **Em dashes** for pauses and attribution: `— Jamie Park, VP Engineering`.
- **Curly quotes** in pull quotes (`"…"`).
- **Arrow glyphs** as inline characters: `→` (continue), `↗` (external),
  `8→1` (reduction). Wrap them in `<span class="cb-arrow">` inside
  buttons so the baseline aligns.
- **Middle dot** `·` for separators (`2024 — Present · Lead engineer`).
- **No emoji.** No hashtags. No pictographs.

### The terminal accent — when to use it

The terminal panel (`.cb-terminal`) is the kit's signature device. Use it
**sparingly and meaningfully**:

- Once in the hero (variant B), **or** once on the Now page, **never both**.
- The Stack section uses the `$`-prefix idiom from terminals but is not
  itself a terminal — it's a styled list.
- Terminal copy follows the same voice rules: declarative, specific, no
  cleverness. Lines like `$ whoami` → `curtis blanchette — lead software engineer`,
  not jokes.

---

## Visual foundations

### Color

A **two-mode system**: light (`paper` body, `ink` text) is the default;
sections opt into dark by adding `class="cb-invert"`. Pages alternate
modes every 2–3 sections for rhythm.

- **Ink** `#0A0A0A` — text, UI, borders
- **Paper** `#FAFAFA` — page background
- **Paper-2** `#F2F1ED` — warm panel fill (used for the Stack block)
- **Muted** `#6B6B6B` — meta, captions
- **Line** `#E5E5E5` — hairline borders

**Accent** — a single colour, themeable. Default is `#A6E22E` (Monokai
"sodium" green — recognisably terminal-flavoured). Curated alternatives
are pre-themed in `tokens.css`:

| Theme class           | Accent     | Mood                                  |
|-----------------------|-----------|---------------------------------------|
| `cb-theme-sodium` ★   | `#A6E22E` | Terminal green — the default          |
| `cb-theme-amber`      | `#E8B65A` | Warm, editorial, less code-y          |
| `cb-theme-flame`      | `#FF6B35` | Hot, kinetic                          |
| `cb-theme-index`      | `#584DFF` | Studio-style (Metalab Case Study Kit) |

Add the theme class to `:root` or any container — the accent retones
below it.

The accent **never appears as a background fill** for full sections.
Use it only at: eyebrow dots, terminal prompts, chapter numerals,
project-row hover indicator, the marquee separator, button fills
(`.cb-btn--accent`, used at most once per page).

### Typography

Three families. One role each. Don't substitute.

- **Basis Grotesque Pro** — primary sans. Does **all** display and body
  and UI. Display headings are set in Medium (500) at 48–128px.
- **PP Eiko** — accent serif. Used **sparingly** for the one-word italic
  flourish inside a Basis headline, chapter numerals, and pull quotes.
  Never for body, never for UI.
- **IBM Plex Mono** — micro labels only. Eyebrows, captions, metadata,
  copyright, terminal innards.

Scale is intentionally **gapped**: display goes 48 → 72 → 96 → 128;
body sits at 14 / 16 / 18. **Nothing between 18 and 48.** That gap is
the system.

### Spacing

Two section paddings — `--space-section: 160px` (default, for heroes
intros, pull quotes, CTAs) and `--space-section-sm: 96px` (compact,
for chapter labels, grids, the Stack block). **No in-between values.**

Use `class="cb-section"` or `class="cb-section-sm"` on every `<section>`.

Container widths: `--max-reading` 640 · `--max-medium` 880 ·
`--max-wide` 1200 · `--max-bleed` 1680.

### Motion

Three durations (`--dur-fast` 200ms, `--dur-base` 400ms, `--dur-slow`
800ms) and three easings (`--ease-standard`, `--ease-out-expo`,
`--ease-in-out-quint`). The kit ships **no JavaScript** — motion comes
from CSS transitions on hover (cards scale 3%, links fade to 55%
opacity, project rows reveal an accent bar). Honour `prefers-reduced-motion`
— `tokens.css` already does this globally.

### Borders, radii, shadows

- **Hairline borders only.** `1px solid var(--border-1)`. Used between
  sections, on metadata strips, on essay rows.
- **Radii are minimal.** Buttons are pills (`--radius-pill`). Terminal
  panels and stack panels use `--radius-panel` (12px). **Project cards
  have no radius** (`--radius-card: 0`).
- **No shadows on sections.** A subtle shadow sits under the terminal
  panel and is the only legitimate use of `box-shadow`.

### Imagery & illustration

- Project cards take a real screenshot when one exists. As placeholders,
  the kit ships **inline SVG abstractions** — geometric, two-colour,
  using the accent. They communicate "this would be a screenshot here"
  without pretending to be art.
- **No stock photos.** No business handshakes. No abstract gradients.
- Captions live underneath in mono + muted.

---

## Components — cheat sheet

| Component        | Class root                  | When to use                                    |
|------------------|-----------------------------|------------------------------------------------|
| Site nav         | `.cb-nav`                   | Every page. Sticky, opaque, 64px.              |
| Hero editorial   | `.cb-hero--editorial`       | Home page (default).                           |
| Hero terminal    | `.cb-hero--terminal`        | Home page (engineer-forward variant).          |
| Hero manifesto   | `.cb-hero--manifesto`       | Subpage tops (Work, Writing, Now).             |
| Section header   | `.cb-section-header`        | Top of every numbered section.                 |
| Project grid     | `.cb-project-grid`          | Work page or "selected" block on home (rich).  |
| Project list     | `.cb-project-list`          | Home "selected work" (compact).                |
| Essay list       | `.cb-essay-list`            | Writing index, home preview.                   |
| Stack block      | `.cb-stack`                 | The Stack & tools section. Place on `cb-invert`. |
| Now block        | `.cb-now`                   | Now page · home Now teaser.                    |
| Terminal panel   | `.cb-terminal`              | Inside hero-terminal, inside Now. Once per page. |
| Pull quote       | `.cb-pullquote`             | One per page max. The "moment of impact".      |
| Marquee          | `.cb-marquee`               | One per page max. Mid-third, never the hero.   |
| CTA block        | `.cb-cta`                   | Closing section, just before the footer.       |
| Footer           | `.cb-footer`                | Every page.                                    |

### Atoms

| Atom                     | Class                       |
|--------------------------|-----------------------------|
| Primary button (pill)    | `.cb-btn.cb-btn--primary`   |
| Ghost button (pill)      | `.cb-btn.cb-btn--ghost`     |
| Accent button (rare)     | `.cb-btn.cb-btn--accent`    |
| Inline editorial link    | `.cb-link`                  |
| Status pill              | `.cb-pill`                  |
| Live dot                 | `.cb-dot`                   |
| Blinking cursor          | `.cb-blink`                 |
| Inline arrow             | `.cb-arrow`                 |
| Inline mono `code` style | `.cb-mono`                  |

---

## Page-composition rule

Every page reads top-to-bottom like a magazine spread:

1. **`SiteNav`** (sticky)
2. **One hero** — `--editorial` on home, `--manifesto` on subpages.
3. **Numbered sections**, each with a `cb-section-header`. Numbering is
   per-page (`01`, `02`, `03`…), starting fresh.
4. **Alternate light / dark** every 2–3 sections — apply `cb-invert` to
   a `<section>` to flip it.
5. **One pull quote** somewhere in the middle third.
6. **One marquee**, also middle third.
7. **`CTA` block** in `cb-section`.
8. **`SiteFooter`**.

The home template (`templates/home.html`) is the canonical assembly.

---

## Quickstart for humans

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>My page</title>
  <link rel="stylesheet" href="/cb-site-kit/tokens.css" />
  <link rel="stylesheet" href="/cb-site-kit/components.css" />
</head>
<body>
  <!-- Copy any component HTML from /cb-site-kit/components/ verbatim. -->
</body>
</html>
```

If you're an agent implementing this, read `AGENTS.md` next.

---

## Caveats

- Real **screenshots** are placeholders (inline SVG). Swap them in
  before the site ships — captions live underneath, mono + muted.
- **Reckless** (the font used in the parent Metalab kit) is substituted
  by **PP Eiko** here. Don't fall back to Fraunces or Tiempos unless
  the brand team approves.
- **Form components** (input, select, textarea) are intentionally not
  shipped — the personal site only needs a `mailto:` button on the
  contact page.
