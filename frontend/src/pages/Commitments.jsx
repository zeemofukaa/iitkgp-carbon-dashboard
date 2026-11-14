import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import ApiStatus from "../components/ApiStatus";
import GridFactorSelect from "../components/GridFactorSelect";

import { getJSON } from "../api";
import { useCarbon } from "../context/CarbonContext";
import { SCOPE_COLORS, fmt } from "../theme";

function Commitments() {
  const { gridFactor } = useCarbon();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getJSON("/hotspots", { grid_factor: gridFactor })
      .then((d) => !cancelled && (setData(d), setError(null)))
      .catch((e) => !cancelled && setError(e.message));

    return () => {
      cancelled = true;
    };
  }, [gridFactor]);

  if (!data) return <ApiStatus error={error} />;

  const max = Math.max(...data.topics.map((t) => t.tco2e));

  return (
    <>
      <PageHeader
        eyebrow="Where to act"
        title="Campus hotspots"
        description="Emissions grouped by what happens on campus. Bars are to scale, so the biggest areas stand out."
      />

      <main className="content section">
        <div className="hs-controls">
          <GridFactorSelect id="hs-grid" />
          <span className="panel-note">
            Reference data: IIT Delhi 2025 inventory. {data.mapping_note}
          </span>
        </div>

        <div className="hs-grid">
          {data.topics.map((t) => (
            <Hotspot key={t.id} t={t} max={max} />
          ))}
        </div>
      </main>
    </>
  );
}

function Hotspot({ t, max }) {
  const empty = t.status === "No data";

  return (
    <article className={`hs-card ${empty ? "hs-empty" : ""}`}>
      <header>
        <h3>{t.name}</h3>
        <span className={`status ${empty ? "pending" : "available"}`}>{t.status}</span>
      </header>

      {empty ? (
        <p className="hs-note">
          The IIT Delhi inventory has no water figures. A KGP dataset would fill
          this in.
        </p>
      ) : (
        <>
          <p className="hs-value">
            {fmt(t.tco2e)} <small>tCO₂e · {t.share_pct}% of campus</small>
          </p>

          <div className="hs-track" aria-hidden="true">
            <div className="hs-bar" style={{ width: `${Math.max((t.tco2e / max) * 100, 1.5)}%` }}>
              {[1, 2, 3].map((n) =>
                t.by_scope[`scope${n}`] > 0 ? (
                  <span
                    key={n}
                    style={{ flexGrow: t.by_scope[`scope${n}`], background: SCOPE_COLORS[n] }}
                    title={`Scope ${n}: ${fmt(t.by_scope[`scope${n}`])} tCO₂e`}
                  />
                ) : null
              )}
            </div>
          </div>

          {t.largest && (
            <p className="hs-note">
              {t.largest.label} is {t.largest.share_pct}% of this area.
            </p>
          )}

          {t.lever && (
            <p className="hs-lever">
              <strong>±{fmt(t.lever.tco2e)} tCO₂e.</strong> {t.lever.text}
            </p>
          )}

          <details>
            <summary>{t.lines.length} line items</summary>
            <ul className="hs-lines">
              {t.lines.map((l) => (
                <li key={l.label}>
                  <i style={{ background: SCOPE_COLORS[l.scope] }} />
                  <span>{l.label}</span>
                  <b>{fmt(l.tco2e)}</b>
                </li>
              ))}
            </ul>
          </details>
        </>
      )}
    </article>
  );
}

export default Commitments;