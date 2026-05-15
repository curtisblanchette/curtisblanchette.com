/**
 * Brutalist crosshair corner markers. Place INSIDE a `relative` container.
 * Renders four `+` marks at the corners, slightly outset, in muted line color.
 */
export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-[7px] -left-[7px] text-[14px] leading-none text-faint select-none ${className}`}
      >
        +
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-[7px] -right-[7px] text-[14px] leading-none text-faint select-none ${className}`}
      >
        +
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-[7px] -left-[7px] text-[14px] leading-none text-faint select-none ${className}`}
      >
        +
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-[7px] -right-[7px] text-[14px] leading-none text-faint select-none ${className}`}
      >
        +
      </span>
    </>
  );
}
