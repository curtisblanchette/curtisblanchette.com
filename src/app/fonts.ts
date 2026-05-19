/**
 * Brand font declarations.
 *
 * Self-hosted via `next/font/local` for the two paid brand families
 * (Basis Grotesque Pro, PP Eiko); IBM Plex Mono is pulled from Google.
 *
 * Each export exposes a CSS variable that is consumed by the
 * `--font-sans`, `--font-accent`, `--font-mono` overrides in
 * `src/app/globals.css`. We bind the next/font variables on `<html>` in
 * `layout.tsx` and let the kit's `tokens.css` read them through the
 * standard `var(--font-*)` indirection.
 *
 * Weight selection is deliberately narrow — only what the kit actually
 * renders. Adding a weight here without a corresponding usage in the
 * design system is a code-review nit.
 */

import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";

/** Basis Grotesque Pro — primary sans (display + body + UI). */
export const basis = localFont({
  src: [
    { path: "../fonts/BasisGrotesquePro-Light.otf",        weight: "300", style: "normal" },
    { path: "../fonts/BasisGrotesquePro-LightItalic.otf",  weight: "300", style: "italic" },
    { path: "../fonts/BasisGrotesquePro.otf",              weight: "400", style: "normal" },
    { path: "../fonts/BasisGrotesquePro-Italic.otf",       weight: "400", style: "italic" },
    { path: "../fonts/BasisGrotesquePro-Medium.otf",       weight: "500", style: "normal" },
    { path: "../fonts/BasisGrotesquePro-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../fonts/BasisGrotesquePro-Bold.otf",         weight: "700", style: "normal" },
    { path: "../fonts/BasisGrotesquePro-BoldItalic.otf",   weight: "700", style: "italic" },
  ],
  variable: "--cb-font-sans",
  display: "swap",
});

/** PP Eiko — accent serif. Italic flourishes and chapter numerals only. */
export const eiko = localFont({
  src: [
    { path: "../fonts/PPEiko-Light.ttf",   weight: "300", style: "normal" },
    { path: "../fonts/PPEiko-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--cb-font-accent",
  display: "swap",
});

/** IBM Plex Mono — micros, captions, terminal innards. */
export const plex = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--cb-font-mono",
  display: "swap",
});
