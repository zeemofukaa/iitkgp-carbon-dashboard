import { useMemo, useState } from "react";

import PageHeader from "../components/PageHeader";
import GridFactorSelect from "../components/GridFactorSelect";
import ApiStatus from "../components/ApiStatus";
import { useCarbon } from "../context/CarbonContext";
import { SCOPE_COLORS } from "../theme";

function DataExplorer() {
  const { explorer: emissionsData, charts, error } = useCarbon();

  const [year, setYear] = useState("All");
  const [scope, setScope] = useState("All");
  const [source, setSource] = useState("All");

  const years = [
    ...new Set(emissionsData.map((item) => item.year)),
  ];

  const sources = [
    ...new Set(emissionsData.map((item) => item.source)),
  ];

  const filteredData = useMemo(() => {
    return emissionsData.filter((item) => {
      const matchesYear =
        year === "All" || item.year === Number(year);

      const matchesScope =
        scope === "All" || item.scope === scope;

      const matchesSource =
        source === "All" || item.source === source;

      return (
        matchesYear &&
        matchesScope &&
        matchesSource
      );
    });
  }, [emissionsData, year, scope, source]);

  if (!charts) return <ApiStatus error={error} />;

  const maxEmissions = Math.max(...emissionsData.map((d) => d.emissions), 1);
  const grandTotal = emissionsData.reduce((s, d) => s + d.emissions, 0) || 1;

  const totalEmissions = filteredData.reduce(
    (total, item) => total + item.emissions,
    0
  );

  return (
    <>
      <PageHeader
        eyebrow="Explore the data"
        title="Data Explorer"
        description="Explore campus greenhouse gas emissions by year, scope, and emission source."
      />

      <main className="content section">

        <div className="prototype-notice">
          <strong>Reference dataset</strong>

          <span>
            Records come from the published IIT Delhi 2025 inventory. The
            same interface will operate on validated IIT Kharagpur campus
            data when it is available.
          </span>
        </div>

        <div className="explorer-filters">
          <div className="filter-group">
            <label>Year</label>

            <select
              value={year}
              onChange={(event) =>
                setYear(event.target.value)
              }
            >
              <option value="All">All years</option>

              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Scope</label>

            <select
              value={scope}
              onChange={(event) =>
                setScope(event.target.value)
              }
            >
              <option value="All">All scopes</option>
              <option value="Scope 1">Scope 1</option>
              <option value="Scope 2">Scope 2</option>
              <option value="Scope 3">Scope 3</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Source</label>

            <select
              value={source}
              onChange={(event) =>
                setSource(event.target.value)
              }
            >
              <option value="All">All sources</option>

              {sources.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Grid factor</label>

            <GridFactorSelect />
          </div>

          <button
            className="reset-button"
            onClick={() => {
              setYear("All");
              setScope("All");
              setSource("All");
            }}
          >
            Reset filters
          </button>
        </div>

        <div className="explorer-summary">
          <div>
            <span>Matching records</span>
            <strong>{filteredData.length}</strong>
          </div>

          <div>
            <span>Total emissions</span>
            <strong>
              {totalEmissions.toLocaleString()} tCO₂e
            </strong>
          </div>
        </div>

        <div className="panel explorer-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Emissions records</p>
              <h3>Campus emissions data</h3>
            </div>

            <span className="tag">
              {filteredData.length} records
            </span>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Source</th>
                  <th>Scope</th>
                  <th>Category</th>
                  <th>Emissions</th>
                  <th>Share of total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={`${item.year}-${item.source}-${index}`}>
                    <td>{item.year}</td>

                    <td>
                      <strong>{item.source}</strong>
                    </td>

                    <td>
                      <span className="scope-badge">
                        <i
                          className="scope-dot"
                          style={{
                            background:
                              SCOPE_COLORS[Number(item.scope.slice(-1))],
                          }}
                        />
                        {item.scope}
                      </span>
                    </td>

                    <td>{item.category}</td>

                    <td>
                      <div className="size-cell">
                        <span className="size-bar">
                          <span
                            style={{
                              width: `${(item.emissions / maxEmissions) * 100}%`,
                              background:
                                SCOPE_COLORS[Number(item.scope.slice(-1))],
                            }}
                          />
                        </span>

                        <span className="size-val">
                          {item.emissions.toLocaleString()} tCO₂e
                        </span>
                      </div>
                    </td>

                    <td>
                      {((item.emissions / grandTotal) * 100).toFixed(1)}%
                    </td>

                    <td>
                      <span
                        className={`status ${
                          item.status === "Available"
                            ? "available"
                            : "calculated"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredData.length === 0 && (
              <div className="empty-state">
                <strong>No matching records</strong>

                <span>
                  Try changing one or more filters.
                </span>
              </div>
            )}
          </div>
        </div>

      </main>
    </>
  );
}

export default DataExplorer;