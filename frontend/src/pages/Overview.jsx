import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import MetricCard from "../components/MetricCard";
import {
  yearlyData,
  sourceData,
  COLORS,
} from "../data/mockData";

function Overview() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            IIT KHARAGPUR · CAMPUS SUSTAINABILITY
          </p>

          <h1>
            Building a lower-carbon
            <br />
            campus for the future.
          </h1>

          <p>
            A data-driven view of greenhouse gas emissions,
            environmental performance, and progress toward
            campus sustainability goals.
          </p>

          <div className="hero-actions">
            <a href="/progress" className="button primary">
              View progress
            </a>

            <a href="/inventory" className="button secondary">
              Explore emissions
            </a>
          </div>
        </div>
      </section>

      <main className="content section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CAMPUS AT A GLANCE</p>
            <h2>Our carbon footprint</h2>
          </div>

          <select>
            <option>FY 2025</option>
            <option>FY 2024</option>
            <option>FY 2023</option>
          </select>
        </div>

        <div className="metrics-grid">
          <MetricCard
            label="Total GHG emissions"
            value="18,420"
            detail="tCO₂e · prototype data"
          />

          <MetricCard
            label="Scope 1"
            value="4,120"
            detail="22.4% of total emissions"
          />

          <MetricCard
            label="Scope 2"
            value="7,850"
            detail="42.6% of total emissions"
          />

          <MetricCard
            label="Scope 3"
            value="6,450"
            detail="35.0% of total emissions"
          />
        </div>

        <div className="two-column">
          <div className="panel large">
            <div className="panel-header">
              <div>
                <p className="eyebrow">TREND</p>
                <h3>Campus emissions</h3>
              </div>

              <span className="tag">2021–2025</span>
            </div>

            <div className="chart">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="emissions"
                    stroke="#0f766e"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">BREAKDOWN</p>
                <h3>Emissions by source</h3>
              </div>
            </div>

            <div className="chart">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={105}
                  >
                    {sourceData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="legend">
              {sourceData.map((item, index) => (
                <div key={item.name}>
                  <span
                    className="legend-dot"
                    style={{
                      background:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Overview;