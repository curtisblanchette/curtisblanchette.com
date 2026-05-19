import { NOW } from "@/content/data/now";
import { Terminal } from "./terminal";

/**
 * Now block — present-tense status. Two columns ≥ 900px:
 *   left: lede + last-updated + status pill
 *   right: cb-terminal panel
 *
 * Direct port of `docs/cb-site-kit/components/now.html`.
 */
export function NowBlock() {
  const { lede, updated, status, terminal } = NOW;

  return (
    <div className="cb-now">
      <div>
        <p className="cb-now__lede">
          {lede.before}
          {lede.italic ? <em>{lede.italic}</em> : null}
          {lede.after}
        </p>
        <p className="cb-now__updated">
          Last updated · {updated}
          {status ? (
            <>
              {" "}
              —{" "}
              <span style={{ color: "var(--fg-1)" }}>
                <i className="cb-dot" aria-hidden />
                &nbsp;&nbsp;{status}
              </span>
            </>
          ) : null}
        </p>
      </div>

      <Terminal lines={terminal} />
    </div>
  );
}
