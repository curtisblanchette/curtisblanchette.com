"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ALL_THEME_CLASSNAMES,
  DEFAULT_THEME,
  THEMES,
  THEME_STORAGE_KEY,
  themeClassFor,
  type ThemeId,
} from "@/lib/themes";

/**
 * Accent theme picker.
 *
 * Reads the current theme from <html>'s classList on mount (set there by
 * the pre-hydration script in `app/layout.tsx`), and applies new themes
 * by swapping the `cb-theme-*` className.
 *
 * Renders as a small ghost button in the nav; opens a kit-styled menu of
 * swatch + label rows.
 */
export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ThemeId>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Read whatever the pre-hydration script already set on <html>.
  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    const found = THEMES.find((t) => html.classList.contains(t.className));
    if (found) {
      setCurrent(found.id);
      return;
    }
    // Fallback: storage. The pre-hydration script normally handles this.
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      const t = THEMES.find((x) => x.id === stored);
      if (t) {
        html.classList.add(t.className);
        setCurrent(t.id);
      }
    } catch {
      /* private mode etc — keep default */
    }
  }, []);

  // Close on outside click + Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const apply = useCallback((id: ThemeId) => {
    const html = document.documentElement;
    ALL_THEME_CLASSNAMES.forEach((cls) => html.classList.remove(cls));
    html.classList.add(themeClassFor(id));
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    setCurrent(id);
    setOpen(false);
  }, []);

  const label = THEMES.find((t) => t.id === current)?.label ?? "Sodium";

  return (
    <div ref={rootRef} className="cb-theme-switcher">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select accent theme"
        onClick={() => setOpen((v) => !v)}
        className="cb-btn cb-btn--ghost cb-btn--sm"
      >
        <span className="cb-theme-switcher__label">
          {mounted ? label : "—"}
        </span>
        <span aria-hidden className="cb-theme-switcher__caret">
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Accent theme"
          className="cb-theme-switcher__menu"
        >
          {THEMES.map((t) => {
            const selected = t.id === current;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => apply(t.id)}
                  className="cb-theme-switcher__row"
                  data-selected={selected || undefined}
                >
                  <span
                    className="cb-theme-switcher__swatches"
                    aria-hidden
                  >
                    {t.swatches.map((c, i) => (
                      <span
                        key={i}
                        style={{ background: c }}
                        className="cb-theme-switcher__swatch"
                      />
                    ))}
                  </span>
                  <span className="cb-theme-switcher__name">{t.label}</span>
                  {selected ? (
                    <span aria-hidden className="cb-theme-switcher__check">
                      ✓
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
