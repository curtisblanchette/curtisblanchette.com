/**
 * Omakase Stack cover — terminal `omakase new` + folder tree silhouette.
 */
export function OmakaseCover() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden
    >
      <rect width="800" height="600" fill="var(--invert-bg)" />
      <g
        fontFamily="IBM Plex Mono, monospace"
        fontSize="15"
        fill="var(--invert-ink)"
      >
        <text x="80" y="120">
          <tspan fill="var(--accent)">$</tspan> omakase new my-app
        </text>
        <text x="80" y="170" opacity="0.85">my-app/</text>
        <text x="110" y="200" opacity="0.7">├── apps/</text>
        <text x="140" y="226" opacity="0.7">│   ├── web/</text>
        <text x="140" y="252" opacity="0.7">│   └── api/</text>
        <text x="110" y="278" opacity="0.7">├── packages/</text>
        <text x="140" y="304" opacity="0.7">│   ├── ui/</text>
        <text x="140" y="330" opacity="0.7">│   ├── config/</text>
        <text x="140" y="356" opacity="0.7">│   └── shared/</text>
        <text x="110" y="382" opacity="0.7">├── infra/</text>
        <text x="110" y="408" opacity="0.7">└── turbo.json</text>
        <text x="80" y="460" fill="var(--accent)">
          ✓ ready in 12s · pnpm dev
        </text>
      </g>
    </svg>
  );
}
