import { useEffect, useState } from "react";

import { getJSON } from "../api";

const LABELS = {
  scope1: "Scope 1",
  scope2: "Scope 2",
  scope3: "Scope 3",
  total: "Total",
};

const SEVERITY_CLASS = {
  high: "pending",
  medium: "calculated",
  low: "available",
};

function QualityPanel() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getJSON("/quality")
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="panel">
      <p className="eyebrow">Data quality</p>
      <h3>Checks on the source inventory</h3>

      {error && <p className="body-text">Could not load checks: {error}</p>}
      {!data && !error && <p className="body-text">Loading checks…</p>}

      {data && (
        <>
          <div className="status-table">
            {data.issues.map((issue) => (
              <div key={issue.id}>
                <div>
                  <strong>{issue.title}</strong>
                  <p className="body-text">{issue.detail}</p>
                </div>

                <span className={`status ${SEVERITY_CLASS[issue.severity]}`}>
                  {issue.severity}
                </span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 24 }}>Stated vs summed (tCO₂e)</h3>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Scope</th>
                  <th>Stated in report</th>
                  <th>Sum of line items</th>
                  <th>Difference</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(data.reconciliation_tco2e).map(([key, r]) => (
                  <tr key={key}>
                    <td>
                      <strong>{LABELS[key]}</strong>
                    </td>
                    <td>{r.stated.toLocaleString()}</td>
                    <td>{r.sum_of_lines.toLocaleString()}</td>
                    <td>{r.difference.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default QualityPanel;
