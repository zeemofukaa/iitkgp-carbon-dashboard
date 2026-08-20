import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import PageHeader from "../components/PageHeader";
import ProgressBar from "../components/ProgressBar";
import { scopeData, scope3Data, yearlyData } from "../data/mockData";

function Progress() {
  return (
    <>
      <PageHeader
        eyebrow="METRICS & GOALS"
        title="Progress"
        description="Track campus greenhouse gas emissions and progress toward long-term sustainability goals."
      />

      <main className="content section">
        <div className="target-banner">
          <div>
            <p className="eyebrow">LONG-TERM TARGET</p>

            <h2>Zero direct campus emissions by 2050</h2>

            <p>
              Prototype target framework inspired by the MIT sustainability
              model. IIT Kharagpur targets will be updated after the official
              campus data and goals are established.
            </p>
          </div>

          <div className="target-number">
            <strong>18.4k</strong>
            <span>tCO₂e current</span>
          </div>
        </div>

        <div className="two-column">
          <div className="panel">
            <p className="eyebrow">EMISSIONS</p>
            <h3>Scope breakdown</h3>

            <div className="chart">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scopeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis type="number" />

                  <YAxis
                    dataKey="name"
                    type="category"
                  />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#0f766e"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel">
            <p className="eyebrow">SCOPE 3</p>
            <h3>Indirect emissions</h3>

            <div className="chart">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scope3Data}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="name"
                    angle={-20}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#2563eb"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">HISTORICAL TREND</p>
              <h3>Campus emissions over time</h3>
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
          <p className="eyebrow">ENVIRONMENTAL METRICS</p>
          <h3>Tracking progress across campus</h3>

          <div className="progress-grid">
            <ProgressBar
              label="GHG reduction"
              value={18}
              target={100}
            />

            <ProgressBar
              label="Energy efficiency"
              value={31}
              target={100}
            />

            <ProgressBar
              label="Renewable energy"
              value={24}
              target={100}
            />

            <ProgressBar
              label="Waste diversion"
              value={42}
              target={100}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Progress;