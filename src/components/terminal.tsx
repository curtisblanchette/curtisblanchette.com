import { Fragment } from "react";
import type { TerminalLine } from "@/content/data/now";

/**
 * `cb-terminal` panel — dark always, three macOS-style dots, lowercase
 * title bar, and a body of typed lines. Direct port of
 * `docs/cb-site-kit/components/terminal.html`.
 *
 * Lines are a discriminated union (`cmd` | `out` | `cursor`). For `out`
 * lines, an optional `quoted` substring renders highlighted as a warm
 * string literal.
 */
export function Terminal({
  title = "curtis@blanchette ~/.plan",
  lines,
}: {
  title?: string;
  lines: TerminalLine[];
}) {
  return (
    <div className="cb-terminal" role="presentation">
      <div className="cb-terminal__bar">
        <span className="cb-terminal__dot cb-terminal__dot--r" />
        <span className="cb-terminal__dot cb-terminal__dot--y" />
        <span className="cb-terminal__dot cb-terminal__dot--g" />
        <span className="cb-terminal__title">{title}</span>
      </div>
      <div className="cb-terminal__body">
        {lines.map((line, i) => (
          <Fragment key={i}>{renderLine(line)}</Fragment>
        ))}
      </div>
    </div>
  );
}

function renderLine(line: TerminalLine) {
  if (line.kind === "cmd") {
    return (
      <div className="cb-terminal__line">
        <span className="cb-terminal__prompt">$</span>
        <span>{line.text}</span>
      </div>
    );
  }
  if (line.kind === "out") {
    return (
      <div className="cb-terminal__out">
        {line.text}
        {line.quoted ? (
          <span className="cb-terminal__c-string">{line.quoted}</span>
        ) : null}
      </div>
    );
  }
  // cursor
  return (
    <div className="cb-terminal__line" style={{ marginTop: 8 }}>
      <span className="cb-terminal__prompt">$</span>
      <span>
        _<span className="cb-blink" aria-hidden />
      </span>
    </div>
  );
}
