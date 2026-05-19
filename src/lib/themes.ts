/**
 * Accent-theme registry.
 *
 * The cb-site-kit is a single "editorial" palette (paper + ink) with one
 * recolourable accent. Themes here are accent-only — they apply
 * `cb-theme-<id>` as a className on <html>, which the kit's `tokens.css`
 * already responds to.
 *
 * Persistence + pre-hydration paint:
 *   - Stored in localStorage under `THEME_STORAGE_KEY`.
 *   - An inline blocking <script> in `app/layout.tsx` reads the stored
 *     value and applies the className BEFORE React hydrates,
 *     eliminating FOUC and hydration mismatch.
 *   - Legacy values from the brutalist era (brutalist/paper/terminal/
 *     vapor) are migrated in-place to the closest kit accent so we
 *     don't leave existing visitors on a broken state.
 */

export const THEMES = [
  {
    id: "sodium",
    className: "cb-theme-sodium",
    label: "Sodium",
    description: "Terminal green — the default.",
    swatches: ["#FAFAFA", "#0A0A0A", "#A6E22E"],
  },
  {
    id: "amber",
    className: "cb-theme-amber",
    label: "Amber",
    description: "Warm, editorial.",
    swatches: ["#FAFAFA", "#0A0A0A", "#E8B65A"],
  },
  {
    id: "flame",
    className: "cb-theme-flame",
    label: "Flame",
    description: "Hot, kinetic.",
    swatches: ["#FAFAFA", "#0A0A0A", "#FF6B35"],
  },
  {
    id: "index",
    className: "cb-theme-index",
    label: "Index",
    description: "Studio blue.",
    swatches: ["#FAFAFA", "#0A0A0A", "#584DFF"],
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "sodium";
export const THEME_STORAGE_KEY = "cb.theme";

export const ALL_THEME_CLASSNAMES = THEMES.map((t) => t.className);

export function isThemeId(v: unknown): v is ThemeId {
  return typeof v === "string" && THEMES.some((t) => t.id === (v as ThemeId));
}

export function themeClassFor(id: ThemeId): string {
  return `cb-theme-${id}`;
}

/**
 * Inline script that runs before React hydrates. Inlined verbatim into
 * the document <head> via `dangerouslySetInnerHTML`. Keep it tight and
 * dependency-free; this string is parsed and executed at first paint on
 * every request.
 *
 * Behaviour:
 *   1. Read stored theme id.
 *   2. If it matches a legacy brutalist id, migrate to the kit equivalent
 *      and write the new id back to storage.
 *   3. If it doesn't match any known kit id, fall back to DEFAULT_THEME.
 *   4. Add `cb-theme-<id>` to <html>'s classList.
 */
export const PRE_HYDRATION_SCRIPT = `(function(){try{
  var k='${THEME_STORAGE_KEY}';
  var d='${DEFAULT_THEME}';
  var ok=['${THEMES.map((t) => t.id).join("','")}'];
  var legacy={brutalist:'sodium',paper:'amber',terminal:'sodium',vapor:'index'};
  var v=localStorage.getItem(k);
  if(v&&Object.prototype.hasOwnProperty.call(legacy,v)){v=legacy[v];localStorage.setItem(k,v);}
  if(!v||ok.indexOf(v)<0){v=d;}
  document.documentElement.classList.add('cb-theme-'+v);
}catch(e){document.documentElement.classList.add('cb-theme-${DEFAULT_THEME}');}})();`;
