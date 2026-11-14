import { SCOPE_COLORS, fmt } from "../theme";

function SourcesRanked({ rows, limit = 8 }) {
  const top = [...rows].sort((a, b) => b.emissions - a.emissions).slice(0, limit);
  const max = top[0]?.emissions || 1;

  return (
    <>
      <ol className="rank">
        {top.map((r) => {
          const n = Number(r.scope.replace("Scope ", ""));

          return (
            <li key={r.source}>
              <span className="rank-name">{r.source}</span>

              <span className="rank-track">
                <span
                  className="rank-bar"
                  style={{
                    width: `${(r.emissions / max) * 100}%`,
                    background: SCOPE_COLORS[n],
                  }}
                />
              </span>

              <span className="rank-val">{fmt(r.emissions)}</span>
            </li>
          );
        })}
      </ol>

      <div className="chart-legend">
        {[1, 2, 3].map((n) => (
          <span key={n}>
            <i style={{ background: SCOPE_COLORS[n] }} />
            Scope {n}
          </span>
        ))}
      </div>
    </>
  );
}

export default SourcesRanked;
