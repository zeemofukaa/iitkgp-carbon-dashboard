import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import GridFactorSelect from "./GridFactorSelect";
import { useCarbon } from "../context/CarbonContext";
import { SCOPE_COLORS, SCOPE_INK, fmt } from "../theme";

/* Counts a number up (and between values when the grid factor changes). */
function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;

    if (reduce) {
      from.current = target;
      raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }

    const begin = from.current;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = begin + (target - begin) * eased;
      from.current = v;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

/* Sources under 1.5% of the scale are merged so every segment stays hoverable. */
function buildGroups(rows, scaleMax) {
  const threshold = scaleMax * 0.015;

  return [1, 2, 3].map((n) => {
    const scopeRows = rows
      .filter((r) => r.scope === `Scope ${n}`)
      .sort((a, b) => b.emissions - a.emissions);

    const big = scopeRows.filter((r) => r.emissions >= threshold);
    const small = scopeRows.filter((r) => r.emissions < threshold);

    const segs = big.map((r) => ({
      key: `${n}-${r.source}`,
      scope: n,
      label: r.source,
      short: r.category,
      value: r.emissions,
      status: r.status,
    }));

    if (small.length === 1) {
      const r = small[0];
      segs.push({
        key: `${n}-${r.source}`,
        scope: n,
        label: r.source,
        short: r.category,
        value: r.emissions,
        status: r.status,
      });
    } else if (small.length > 1) {
      segs.push({
        key: `${n}-small`,
        scope: n,
        label: `${small.length} smaller sources`,
        short: "",
        value: small.reduce((s, r) => s + r.emissions, 0),
        status: small.every((r) => r.status === "Available")
          ? "Available"
          : "Calculated",
        merged: true,
      });
    }

    return {
      n,
      total: scopeRows.reduce((s, r) => s + r.emissions, 0),
      segs,
    };
  });
}

function FootprintBand() {
  const { charts, explorer } = useCarbon();

  const wrapRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [intro, setIntro] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    const timer = setTimeout(() => setIntro(false), 1600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const total = charts.metrics.total;
  const shown = useCountUp(total);

  // The ruler is fixed to the largest scenario, so changing the grid factor
  // makes the whole band longer or shorter instead of rescaling it.
  const scaleMax =
    Math.max(...charts.scenarioData.map((s) => s.emissions)) * 1.04;

  const groups = buildGroups(explorer, scaleMax);

  const tickStep = scaleMax > 40000 ? 10000 : 5000;
  const ticks = [];
  for (let t = 0; t <= scaleMax; t += tickStep) ticks.push(t);

  let index = 0;

  const show = (seg, el) => {
    const wrap = wrapRef.current.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    const left = box.left + box.width / 2 - wrap.left;
    setActive({ seg, left: Math.min(Math.max(left, 130), wrap.width - 130) });
  };

  return (
    <section className="fp-hero">
      <div className="content">
        <div className="fp-top">
          <div className="fp-copy">
            <p className="fp-chip">Reference data: IIT Delhi 2025 inventory</p>

            <h1>Where does a campus’s carbon come from?</h1>

            <p className="fp-lede">
              Every source on campus, sorted into the three GHG Protocol
              scopes. Pick a grid factor and watch the footprint change.
            </p>

            <div className="fp-actions">
              <Link to="/explorer" className="fp-btn fp-btn-solid">
                Explore the data
              </Link>

              <Link to="/data" className="fp-btn">
                How it’s calculated
              </Link>
            </div>
          </div>

          <div className="fp-total">
            <span className="fp-total-num">{fmt(shown)}</span>
            <span className="fp-total-unit">tCO₂e in total</span>

            <div className="fp-control">
              <label htmlFor="fp-grid">Electricity grid factor</label>
              <GridFactorSelect id="fp-grid" />
            </div>
          </div>
        </div>

        <div className="fp-wrap" ref={wrapRef}>
          {active && (
            <div className="fp-tip" style={{ left: active.left }} role="status">
              <span className="fp-tip-scope">
                <i style={{ background: SCOPE_COLORS[active.seg.scope] }} />
                Scope {active.seg.scope}
                {active.seg.short ? `, ${active.seg.short}` : ""}
              </span>

              <strong>{active.seg.label}</strong>

              <span>
                {fmt(active.seg.value)} tCO₂e,{" "}
                {Math.round((active.seg.value / total) * 100) || "<1"}% of total
              </span>

              <em>
                {active.seg.status === "Available"
                  ? "As published"
                  : "Recalculated with the chosen grid factor"}
              </em>
            </div>
          )}

          <div
            className={`fp-band${active ? " is-hovering" : ""}${
              intro ? " is-intro" : ""
            }`}
            onMouseLeave={() => setActive(null)}
          >
            {groups.flatMap((g) =>
              g.segs.map((seg) => {
                const px = (seg.value / scaleMax) * width;
                const fits = px >= (seg.short.length * 7.6 + 36);
                const i = index++;

                return (
                  <button
                    key={seg.key}
                    type="button"
                    className={`fp-seg${seg.merged ? " is-merged" : ""}${
                      active?.seg.key === seg.key ? " is-active" : ""
                    }`}
                    style={{
                      width: `${mounted ? (seg.value / scaleMax) * 100 : 0}%`,
                      "--c": SCOPE_COLORS[seg.scope],
                      "--on": SCOPE_INK[seg.scope],
                      "--i": i,
                    }}
                    aria-label={`${seg.label}, Scope ${seg.scope}: ${fmt(
                      seg.value
                    )} tonnes CO2e`}
                    onMouseEnter={(e) => show(seg, e.currentTarget)}
                    onFocus={(e) => show(seg, e.currentTarget)}
                    onBlur={() => setActive(null)}
                  >
                    {fits && !seg.merged && (
                      <>
                        <span className="fp-seg-name">{seg.short}</span>
                        <span className="fp-seg-val">{fmt(seg.value)}</span>
                      </>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="fp-ruler" aria-hidden="true">
            {ticks.map((t) => (
              <span
                key={t}
                className="fp-tick"
                style={{ left: `${(t / scaleMax) * 100}%` }}
              >
                {t === 0 ? "0" : `${t / 1000}K`}
              </span>
            ))}
          </div>

          <div className="fp-legend">
            {groups.map((g) => (
              <div key={g.n} className="fp-legend-item">
                <i style={{ background: SCOPE_COLORS[g.n] }} />
                <span className="fp-legend-name">Scope {g.n}</span>
                <span className="fp-legend-val">{fmt(g.total)} tCO₂e</span>
                <span className="fp-legend-share">
                  {Math.round((g.total / total) * 100)}%
                </span>
              </div>
            ))}

            <Link to="/explorer" className="fp-tablelink">
              View as table
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FootprintBand;
