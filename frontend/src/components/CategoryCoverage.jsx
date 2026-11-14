import { fmt } from "../theme";

const METHOD_SHORT = {
  survey: "Survey scaled",
  activity: "Activity data",
  spend: "Spend based",
  unspecified: "Method not described",
};

function CategoryCoverage({ categories }) {
  const max = Math.max(...categories.map((c) => c.tco2e), 1);

  return (
    <ol className="cov">
      {categories.map((c) => {
        const reported = c.status === "Reported";

        return (
          <li key={c.number} className={reported ? "is-reported" : "is-pending"}>
            <div className="cov-row">
              <span className="cov-num">{c.number}</span>
              <span className="cov-name">{c.name}</span>

              {reported ? (
                <>
                  <span className="cov-track">
                    <span
                      className="cov-bar"
                      style={{ width: `${(c.tco2e / max) * 100}%` }}
                    />
                  </span>

                  <span className="cov-val">{fmt(c.tco2e)}</span>
                </>
              ) : (
                <span className="cov-pending">Pending data</span>
              )}
            </div>

            {c.lines.length > 0 && (
              <ul className="cov-lines">
                {c.lines.map((l) => (
                  <li key={l.label}>
                    <span>{l.label}</span>
                    <span className={`cov-method m-${l.method}`}>
                      {METHOD_SHORT[l.method]}
                    </span>
                    <span className="cov-line-val">{fmt(l.tco2e)}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default CategoryCoverage;
