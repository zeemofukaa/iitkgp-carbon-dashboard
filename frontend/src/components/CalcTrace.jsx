import { useEffect, useState } from "react";

import { getJSON } from "../api";
import { useCarbon } from "../context/CarbonContext";
import { fmt } from "../theme";

const REPORT_FACTOR = 0.495;

function CalcTrace() {
  const { gridFactor } = useCarbon();
  const factor = gridFactor ?? REPORT_FACTOR;

  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getJSON("/records", {
      scope: 2,
      category: "Electricity",
      grid_factor: factor,
    })
      .then((d) => !cancelled && setRows(d.records))
      .catch((e) => !cancelled && setError(e.message));

    return () => {
      cancelled = true;
    };
  }, [factor]);

  if (error) return <p className="panel-note">Could not load: {error}</p>;
  if (!rows) return <p className="panel-note">Loading…</p>;

  const result = rows.reduce((s, r) => s + r.tco2e, 0);
  const published = rows.reduce((s, r) => s + r.published_tco2e, 0);

  return (
    <>
      <div className="trace">
        <div className="trace-head">
          <span>Electricity use</span>
          <span>Activity</span>
          <span>Grid factor</span>
          <span>Result</span>
          <span>Report says</span>
        </div>

        {rows.map((r) => {
          const diff = ((r.published_tco2e - r.tco2e) / r.tco2e) * 100;

          return (
            <div className="trace-row" key={r.id}>
              <span className="trace-name">
                {r.label}
                {r.activity_status === "implied" && (
                  <em>kWh worked back from the report</em>
                )}
              </span>

              <span className="trace-cell">
                <span className="trace-val">{fmt(r.activity_value)}</span>
                <small>kWh</small>
              </span>

              <span className="trace-cell">
                <span className="trace-val">
                  <b>×</b> {factor}
                </span>
                <small>kg CO₂e/kWh</small>
              </span>

              <span className="trace-cell trace-result">
                <span className="trace-val">
                  <b>=</b> {fmt(r.tco2e)}
                </span>
                <small>tCO₂e</small>
              </span>

              <span className="trace-cell">
                <span className="trace-val">{fmt(r.published_tco2e)}</span>
                <small>
                  {Math.abs(diff) < 0.5
                    ? "matches"
                    : `${Math.abs(Math.round(diff))}% ${
                        diff > 0 ? "higher" : "lower"
                      }`}
                </small>
              </span>
            </div>
          );
        })}

        <div className="trace-row trace-total">
          <span className="trace-name">Scope 2 electricity</span>
          <span />
          <span />
          <span className="trace-cell trace-result">
            <span className="trace-val">
              <b>=</b> {fmt(result)}
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
        {gridFactor
          ? `Recalculated with the ${gridFactor} kg CO₂e/kWh factor you picked.`
          : `Recalculated with the report's own factor (${REPORT_FACTOR} kg CO₂e/kWh). It does not reproduce the published figures, which is one of the checks on the Data page.`}
      </p>
    </>
  );
}

export default CalcTrace;
