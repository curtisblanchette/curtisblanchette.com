/**
 * Longevity Risk Platform cover — risk-tier severity bars.
 */
export function LongevityCover() {
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
      {/* axis */}
      <line
        x1="120"
        y1="500"
        x2="680"
        y2="500"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      {/* bars — ascending risk */}
      <g fill="var(--ink)">
        <rect x="140" y="420" width="80" height="80" />
        <rect x="240" y="360" width="80" height="140" opacity="0.78" />
        <rect x="340" y="300" width="80" height="200" opacity="0.6" />
        <rect x="440" y="240" width="80" height="260" opacity="0.42" />
      </g>
      {/* tip — accent — the one to act on */}
      <rect x="540" y="160" width="80" height="340" fill="var(--accent)" />
      {/* tier labels */}
      <g
        fontFamily="IBM Plex Mono, monospace"
        fontSize="11"
        fill="var(--ink)"
        opacity="0.55"
      >
        <text x="180" y="528" textAnchor="middle">T1</text>
        <text x="280" y="528" textAnchor="middle">T2</text>
        <text x="380" y="528" textAnchor="middle">T3</text>
        <text x="480" y="528" textAnchor="middle">T4</text>
        <text x="580" y="528" textAnchor="middle">T5</text>
      </g>
    </svg>
  );
}
