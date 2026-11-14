import { fmt } from "../theme";

function MethodMix({ methods }) {
  const survey = methods.find((m) => m.method === "survey");

  return (
    <>
      <div className="mix" role="img" aria-label="Scope 3 split by calculation method">
        {methods.map((m) => (
          <span
            key={m.method}
            className={`mix-seg m-${m.method}`}
            style={{ width: `${m.share_pct}%` }}
            title={`${m.label}: ${fmt(m.tco2e)} tCO₂e (${m.share_pct}%)`}
          />
        ))}
      </div>

      <ul className="mix-legend">
        {methods.map((m) => (
          <li key={m.method}>
            <i className={`mix-key m-${m.method}`} />
            <span className="mix-label">{m.label}</span>
            <span className="mix-val">{fmt(m.tco2e)} tCO₂e</span>
            <span className="mix-share">{m.share_pct}%</span>
          </li>
        ))}
      </ul>

      {survey && (
        <p className="panel-note mix-note">
          {Math.round(survey.share_pct)}% of Scope 3 comes from survey answers
          scaled up to the whole campus. That is the least certain part of the
          footprint, so it is shown hatched wherever it appears.
        </p>
      )}
    </>
  );
}

export default MethodMix;
