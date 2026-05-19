/**
 * Verifiable Credentials cover — credential card with selective-disclosure mark.
 */
export function CredentialCover() {
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
      {/* credential card */}
      <rect
        x="180"
        y="160"
        width="440"
        height="280"
        rx="10"
        fill="var(--invert-panel)"
        stroke="var(--invert-line)"
        strokeWidth="1"
      />
      {/* label strip */}
      <rect
        x="180"
        y="160"
        width="440"
        height="34"
        rx="10"
        fill="var(--accent)"
      />
      <rect
        x="180"
        y="187"
        width="440"
        height="7"
        fill="var(--accent)"
      />
      <text
        x="200"
        y="183"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="12"
        fontWeight="500"
        fill="var(--accent-ink)"
        letterSpacing="2"
      >
        SD-JWT · VERIFIABLE
      </text>
      {/* fields — some disclosed, some redacted */}
      <g
        fontFamily="IBM Plex Mono, monospace"
        fontSize="13"
        fill="var(--invert-ink)"
        opacity="0.85"
      >
        <text x="200" y="240">name: alex hart</text>
        <text x="200" y="266">role: staff engineer</text>
        <text x="200" y="292" opacity="0.35">issued: ████████████</text>
        <text x="200" y="318">org: ████ corp</text>
        <text x="200" y="344" opacity="0.35">salary: ██████</text>
      </g>
      {/* selective disclosure mark — accent checkmark */}
      <g transform="translate(540 360)">
        <circle r="32" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        <path
          d="M -14 0 L -4 12 L 16 -12"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
