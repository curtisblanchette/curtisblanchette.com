import type { ReactNode } from "react";

type ContainerWidth = "reading" | "medium" | "wide" | "bleed";

/**
 * `<section>` wrapper that applies the kit's section padding choice
 * (one of two values only: `cb-section` = 160px, `cb-section-sm` = 96px),
 * optional dark inversion (`cb-invert`), optional hairline rule on top
 * (`cb-hairline`), and an inner container at one of the kit's four
 * canonical widths.
 *
 * Direct rendering of the `<section>` element so semantic structure is
 * preserved (e.g. anchor scrolling via `id`).
 */
export function Section({
  id,
  variant = "default",
  invert = false,
  hairline = false,
  container = "wide",
  className,
  children,
}: {
  id?: string;
  variant?: "default" | "sm";
  invert?: boolean;
  hairline?: boolean;
  container?: ContainerWidth;
  className?: string;
  children: ReactNode;
}) {
  const classes = [
    variant === "sm" ? "cb-section-sm" : "cb-section",
    invert ? "cb-invert" : "",
    hairline ? "cb-hairline" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes}>
      <div className={`cb-container cb-container--${container}`}>
        {children}
      </div>
    </section>
  );
}
