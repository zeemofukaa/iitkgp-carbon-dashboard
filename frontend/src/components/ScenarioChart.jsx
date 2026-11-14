import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  ResponsiveContainer,
} from "recharts";

import { useCarbon } from "../context/CarbonContext";
import { SCOPE_COLORS, fmt } from "../theme";

const KEYS = [
  ["scope1", "Scope 1", 1],
  ["scope2", "Scope 2", 2],
  ["scope3", "Scope 3", 3],
];

function ScenarioTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;

  return (
    <div className="chart-tip">
      <strong>{d.name}</strong>

      {KEYS.map(([key, label, n]) => (
        <span key={key}>
          <i style={{ background: SCOPE_COLORS[n] }} />
          {label}
          <b>{fmt(d[key])}</b>
        </span>
      ))}

      <span className="chart-tip-total">
        Total<b>{fmt(d.emissions)} tCO₂e</b>
      </span>
    </div>
  );
}

function TotalLabel({ x, y, width, height, value }) {
  return (
    <text
      x={x + width + 10}
      y={y + height / 2}
      dy=".35em"
      className="chart-total-label"
    >
      {fmt(value)}
    </text>
  );
}

function ScenarioChart({ data, height = 260 }) {
  const { gridFactor } = useCarbon();

  // The row that matches the grid factor currently picked stays full strength.
  const isSelected = (d) => (d.grid_factor ?? null) === gridFactor;

  return (
    <>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          barSize={24}
          margin={{ top: 4, right: 70, left: 8, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} />

          <XAxis
            type="number"
            tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}K`)}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            type="category"
            dataKey="name"
            width={104}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(20, 33, 30, 0.05)" }}
            content={<ScenarioTooltip />}
          />

          {KEYS.map(([key, label, n], i) => (
            <Bar
              key={key}
              dataKey={key}
              name={label}
              stackId="a"
              fill={SCOPE_COLORS[n]}
              stroke="#ffffff"
              strokeWidth={2}
              radius={i === 2 ? [0, 4, 4, 0] : 0}
              isAnimationActive={false}
            >
              {data.map((d) => (
                <Cell key={d.name} fillOpacity={isSelected(d) ? 1 : 0.5} />
              ))}

              {i === 2 && (
                <LabelList dataKey="emissions" content={<TotalLabel />} />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div className="chart-legend">
        {KEYS.map(([key, label, n]) => (
          <span key={key}>
            <i style={{ background: SCOPE_COLORS[n] }} />
            {label}
          </span>
        ))}
      </div>
    </>
  );
}

export default ScenarioChart;
