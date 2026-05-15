import type { ReactNode } from "react";

/**
 * Brutalist section header.
 *
 * Renders:  [ NN ] / TITLE ────────────── meta
 */
export function SectionHeader({
  id,
  number,
  title,
  meta,
}: {
  id?: string;
  number: string;
  title: string;
  meta?: string;
}) {
  return (
    <header
      id={id}
      className="flex items-center gap-3 border-y border-line py-3 text-xs uppercase tracking-[0.18em]"
    >
      <span className="text-muted">[ {number} ]</span>
      <span className="text-fg">/ {title}</span>
      <span aria-hidden className="flex-1 border-t border-dashed border-line" />
      {meta ? <span className="text-muted">{meta}</span> : null}
    </header>
  );
}

export function Section({
  id,
  number,
  title,
  meta,
  children,
  className = "",
}: {
  id?: string;
  number: string;
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-6 md:px-10 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <SectionHeader id={id} number={number} title={title} meta={meta} />
        <div className="py-10 md:py-14">{children}</div>
      </div>
    </section>
  );
}

/** ASCII rule — `───────────` */
export function AsciiRule({
  className = "",
  char = "─",
}: {
  className?: string;
  char?: string;
}) {
  return (
    <div
      aria-hidden
      className={`select-none overflow-hidden whitespace-nowrap text-faint text-xs ${className}`}
    >
      {char.repeat(200)}
    </div>
  );
}

/**
 * Field row — `LABEL ──── value`. The classic brutalist info row.
 */
export function FieldRow({
  label,
  value,
  href,
}: {
  label: string;
  value: ReactNode;
  href?: string;
}) {
  const inner = (
    <div className="flex items-baseline gap-3 py-1.5 text-sm">
      <span className="shrink-0 text-muted uppercase tracking-[0.14em] text-[11px] w-28">
        {label}
      </span>
      <span aria-hidden className="flex-1 border-b border-dashed border-line translate-y-[-3px]" />
      <span className="text-fg text-right">{value}</span>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="block hover:text-accent"
      >
        {inner}
      </a>
    );
  }
  return inner;
}
