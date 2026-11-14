import { useState } from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";

import { SCOPE_COLORS, SCOPE_INK, fmt } from "../theme";

function TreemapTip({ active, payload, meta, total }) {
  if (!active || !payload?.length) return null;
  const name = payload[0].payload.name;
  const m = meta[name];
  if (!m) return null;

  return (
    <div className="chart-tip">
      <span className="fp-tip-scope">
        <i style={{ background: SCOPE_COLORS[m.scope] }} />
        Scope {m.scope}, {m.category}
      </span>

      <strong>{name}</strong>

      <span>
        {fmt(m.value)} tCO₂e
        <b>{((m.value / total) * 100).toFixed(1)}% of total</b>
      </span>
    </div>
  );
}

function Leaf({ x, y, width, height, depth, name, meta, hover, setHover }) {
  if (depth < 2 || !meta[name]) return null;

  const m = meta[name];
  const dim = hover && hover !== name;
  const canLabel = width > m.category.length * 7.4 + 24 && height > 44;

  return (
    <g
      onMouseEnter={() => setHover(name)}
      onMouseLeave={() => setHover(null)}
      style={{ cursor: "default" }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={3}
        fill={SCOPE_COLORS[m.scope]}
        fillOpacity={dim ? 0.35 : 1}
        stroke="#ffffff"
        strokeWidth={2}
      />

      {canLabel && (
        <text
          x={x + 12}
          y={y + 22}
          fill={SCOPE_INK[m.scope]}
          fontSize={13}
          fontWeight={600}
          pointerEvents="none"
        >
          {m.category}
        </text>
      )}

      {canLabel && (
        <text
          x={x + 12}
          y={y + 40}
          fill={SCOPE_INK[m.scope]}
          fontSize={13}
          pointerEvents="none"
        >
          {fmt(m.value)}
        </text>
      )}
    </g>
  );
}

function FootprintTreemap({ rows, height = 400 }) {
  const [hover, setHover] = useState(null);

  const meta = {};
  const groups = [1, 2, 3].map((n) => {
    const children = rows
      .filter((r) => r.scope === `Scope ${n}`)
      .sort((a, b) => b.emissions - a.emissions)
      .map((r) => {
        meta[r.source] = { scope: n, category: r.category, value: r.emissions };
        return { name: r.source, size: r.emissions };
      });

    return { name: `Scope ${n}`, children };
  });

  const total = rows.reduce((s, r) => s + r.emissions, 0);

  return (
    <>
      <div className="treemap">
        <ResponsiveContainer width="100%" height={height}>
          <Treemap
            data={groups}
            dataKey="size"
            isAnimationActive={false}
            content={<Leaf meta={meta} hover={hover} setHover={setHover} />}
          >
            <Tooltip content={<TreemapTip meta={meta} total={total} />} />
          </Treemap>
        </ResponsiveContainer>
      </div>

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

export default FootprintTreemap;
