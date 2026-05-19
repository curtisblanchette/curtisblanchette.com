/**
 * Pi Extensions cover — terminal mock with one command line.
 */
export function PiExtensionsCover() {
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
      {/* terminal panel */}
      <rect
        x="100"
        y="120"
        width="600"
        height="360"
        fill="var(--invert-bg)"
        rx="12"
      />
      {/* title bar */}
      <rect
        x="100"
        y="120"
        width="600"
        height="36"
        fill="var(--invert-panel)"
        rx="12"
      />
      <rect
        x="100"
        y="148"
        width="600"
        height="8"
        fill="var(--invert-panel)"
      />
      <circle cx="124" cy="138" r="6" fill="var(--invert-ink)" opacity="0.45" />
      <circle cx="146" cy="138" r="6" fill="var(--invert-ink)" opacity="0.45" />
      <circle cx="168" cy="138" r="6" fill="var(--invert-ink)" opacity="0.45" />
      {/* prompt */}
      <text
        x="130"
        y="210"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="18"
        fill="var(--accent)"
      >
        $
      </text>
      <text
        x="156"
        y="210"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="18"
        fill="var(--invert-ink)"
      >
        pi /commit
      </text>
      {/* output lines */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="var(--invert-ink)" opacity="0.7">
        <text x="130" y="250">✓ staged 7 files</text>
        <text x="130" y="276">✓ feat(nav): kit composition</text>
        <text x="130" y="302">✓ pushed → origin/feat/cb-site-kit</text>
        <text x="130" y="328">✓ opened draft PR #42</text>
      </g>
      {/* blinking cursor */}
      <rect
        x="130"
        y="360"
        width="10"
        height="20"
        fill="var(--accent)"
      />
    </svg>
  );
}
