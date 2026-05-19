/**
 * Fallback cover — abstract geometric placeholder. Used when a slug has
 * no dedicated cover registered in `COVERS` and no real screenshot.
 */
export function GenericCover() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden
    >
      <rect width="800" height="600" fill="var(--paper-2)" />
      <circle
        cx="400"
        cy="300"
        r="180"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <circle
        cx="400"
        cy="300"
        r="120"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        opacity="0.5"
      />
      <circle cx="400" cy="300" r="60" fill="var(--accent)" />
    </svg>
  );
}
