import { useEffect, useState } from "react";

import { getJSON } from "../api";
import { fmt } from "../theme";

function Scope1Trace() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getJSON("/records", { scope: 1 })
      .then((d) => !cancelled && setRows(d.records))
      .catch((e) => !cancelled && setError(e.message));

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <p className="panel-note">Could not load: {error}</p>;
  if (!rows) return <p className="panel-note">Loading…</p>;

  // Lines with a stated emission factor can be shown as fuel x factor.
  const calc = (r) =>
    r.emission_factor && r.activity_value
      ? (r.activity_value * r.emission_factor) / 1000
      : null;

  const sorted = [...rows].sort((a, b) => b.tco2e - a.tco2e);
  const total = rows.reduce((s, r) => s + (calc(r) ?? r.tco2e), 0);
  const published = rows.reduce((s, r) => s + r.published_tco2e, 0);
  const traced = rows.filter((r) => calc(r) !== null).length;

  return (
    <>
      <div className="trace">
        <div className="trace-head">
          <span>Fuel or source</span>
          <span>Fuel burned</span>
          <span>Emission factor</span>
          <span>Result</span>
          <span>Report says</span>
        </div>

        {sorted.map((r) => {
          const c = calc(r);

          return (
            <div className="trace-row" key={r.id}>
              <span className="trace-name">
                {r.label}
                {c === null && <em>factor not stated in the report</em>}
                {c !== null && <em>fuel quantity worked back from the report</em>}
              </span>

              {c !== null ? (
                <>
                  <span className="trace-cell">
                    <span className="trace-val">{fmt(r.activity_value)}</span>
                    <small>{r.activity_unit}</small>
                  </span>

                  <span className="trace-cell">
                    <span className="trace-val">
                      <b>×</b> {r.emission_factor}
                    </span>
                    <small>{r.factor_unit}</small>
                  </span>

                  <span className="trace-cell trace-result">
                    <span className="trace-val">
                      <b>=</b> {fmt(c)}
                    </span>
                    <small>tCO₂e</small>
                  </span>
                </>
              ) : (
                <>
                  <span className="trace-cell trace-none">–</span>
                  <span className="trace-cell trace-none">–</span>
                  <span className="trace-cell trace-none">
                    <small>not recalculated</small>
                  </span>
                </>
              )}

              <span className="trace-cell">
                <span className="trace-val">{fmt(r.published_tco2e)}</span>
                <small>{c !== null ? "matches" : "as published"}</small>
              </span>
            </div>
          );
        })}

        <div className="trace-row trace-total">
          <span className="trace-name">Scope 1 total</span>
          <span />
          <span />
          <span className="trace-cell trace-result">
            <span className="trace-val">
              <b>=</b> {fmt(total)}
            </span>
            <small>tCO₂e</small>
          </span>
          <span className="trace-cell">
            <span className="trace-val">{fmt(published)}</span>
            <small>published</small>
          </span>
        </div>
      </div>

      <p className="panel-note trace-note">
        The report states an emission factor for only {traced} of {rows.length}{" "}
        Scope 1 lines, and not the fuel quantities. We worked the quantities
        back from the published tCO₂e, so these rows match by construction: they
        show the formula, not an independent check. Real KGP fuel data would
        replace them.
      </p>
    </>
  );
}

export default Scope1Trace;
