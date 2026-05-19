"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_THEME,
  isThemeId,
  THEMES,
  THEME_STORAGE_KEY,
  type ThemeId,
} from "@/lib/themes";

/**
 * Brutalist theme switcher.
 *
 * Sits in the status bar. Renders `[THEME: BRUTALIST ▾]` and pops a menu on
 * click. Persists to localStorage; the inline pre-hydration script in
 * `app/layout.tsx` reads the same key on the next paint to avoid FOUC.
 */
export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ThemeId>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Read whatever the pre-hydration script already set on <html>.
  useEffect(() => {
    setMounted(true);
    const fromDom = document.documentElement.getAttribute("data-theme");
    if (isThemeId(fromDom)) {
      setCurrent(fromDom);
      return;
    }
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (isThemeId(stored)) setCurrent(stored);
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
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    setCurrent(id);
    setOpen(false);
  }, []);

  const label = THEMES.find((t) => t.id === current)?.label ?? "Brutalist";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="border border-line px-2 py-0.5 hover:text-accent hover:border-accent focus:outline-none focus-visible:border-accent focus-visible:text-accent"
      >
        <span className="text-muted">THEME:</span>{" "}
        <span className="text-fg">
          {/* Render the label only once mounted so SSR + client agree. */}
          {mounted ? label.toUpperCase() : "—"}
        </span>{" "}
        <span aria-hidden className="text-faint">
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Select theme"
          className="absolute right-0 top-[calc(100%+4px)] z-50 min-w-[240px] border border-line bg-[var(--color-bg)] py-1 text-[10px] uppercase tracking-[0.2em]"
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
                  className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] ${
                    selected ? "text-accent" : "text-fg"
                  }`}
                >
                  <span aria-hidden className="w-3 shrink-0">
                    {selected ? "▸" : " "}
                  </span>
                  <span className="flex shrink-0 gap-[2px]" aria-hidden>
                    {t.swatches.map((c, i) => (
                      <span
                        key={i}
                        style={{ background: c }}
                        className="block w-2 h-3 border border-line"
                      />
                    ))}
                  </span>
                  <span className="flex-1 text-left">{t.label}</span>
                  {selected ? (
                    <span className="text-accent" aria-hidden>
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
