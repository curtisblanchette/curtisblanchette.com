import { Fragment } from "react";
import { MARQUEE_PHRASES, MARQUEE_SEPARATOR } from "@/content/data/marquee";

/**
 * Horizontal marquee ticker. CSS-only animation via the kit. To get a
 * seamless infinite loop, the phrase set is duplicated inside the track
 * so the `translateX(-50%)` keyframe lands on identical content.
 *
 * Direct port of `docs/cb-site-kit/components/marquee.html`. Freezes
 * automatically under `prefers-reduced-motion: reduce`.
 */
export function Marquee() {
  return (
    <section className="cb-marquee" aria-hidden>
      <div className="cb-marquee__track">
        <Set keyPrefix="a" />
        <Set keyPrefix="b" />
      </div>
    </section>
  );
}

function Set({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {MARQUEE_PHRASES.map((phrase, i) => (
        <Fragment key={`${keyPrefix}-${i}`}>
          <span>{phrase}</span>
          <span className="cb-marquee__sep">{MARQUEE_SEPARATOR}</span>
        </Fragment>
      ))}
    </>
  );
}
