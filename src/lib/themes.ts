/**
 * Theme registry. Each theme overrides the color tokens defined in
 * `src/app/globals.css`. Switching a theme means swapping the `data-theme`
 * attribute on the <html> element — every Tailwind utility that resolves to
 * `var(--color-...)` follows automatically.
 *
 * Persistence + pre-hydration paint:
 *   - Stored in localStorage under `THEME_STORAGE_KEY`.
 *   - An inline blocking <script> in `app/layout.tsx` reads the stored value
 *     and sets `<html data-theme="...">` BEFORE React hydrates, eliminating
 *     FOUC and hydration mismatches.
 */

export const THEMES = [
  {
    id: "brutalist",
    label: "Brutalist",
    description: "Default — near-black, system green.",
    swatches: ["#0a0a0a", "#fafafa", "#30d158"],
  },
  {
    id: "paper",
    label: "Paper",
    description: "Light — cream and ink, burnt-orange accent.",
    swatches: ["#f4f0e8", "#1a1a1a", "#c2410c"],
  },
  {
    id: "terminal",
    label: "Terminal",
    description: "CRT phosphor — jet black, green-on-green, scanlines.",
    swatches: ["#000000", "#00ff66", "#00ff66"],
  },
  {
    id: "vapor",
    label: "Vapor",
    description: "Synthwave — deep navy, hot magenta.",
    swatches: ["#0d0221", "#fefefe", "#ff2bd6"],
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "brutalist";
export const THEME_STORAGE_KEY = "cb.theme";

export function isThemeId(v: unknown): v is ThemeId {
  return (
    typeof v === "string" && THEMES.some((t) => t.id === (v as ThemeId))
  );
}

/**
 * Inline script that runs before React hydrates. Inlined verbatim into the
 * document <head> via `dangerouslySetInnerHTML`. Keep it tight and dependency-
 * free; this string is parsed and executed at first paint on every request.
 */
export const PRE_HYDRATION_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}';var d='${DEFAULT_THEME}';var v=localStorage.getItem(k);var ok=['${THEMES.map((t) => t.id).join("','")}'];if(!v||ok.indexOf(v)<0){v=d;}document.documentElement.setAttribute('data-theme',v);}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');}})();`;
