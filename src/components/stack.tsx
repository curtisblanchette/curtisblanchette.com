import { STACK } from "@/content/data/stack";

/**
 * `cb-stack` block — two-column grid of terminal-styled tool groups.
 * The `$` prefix on each heading is injected by the kit's
 * `.cb-stack__heading::before`. Sits inside `<Section invert>` on the
 * home page.
 *
 * Direct port of `docs/cb-site-kit/components/stack.html`.
 */
export function Stack() {
  return (
    <div className="cb-stack">
      {STACK.map((group) => (
        <div key={group.label} className="cb-stack__group">
          <h3 className="cb-stack__heading">{group.label}</h3>
          <ul className="cb-stack__items">
            {group.items.map((it) => (
              <li key={it.name}>
                {it.name} {it.note ? <span>{it.note}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
