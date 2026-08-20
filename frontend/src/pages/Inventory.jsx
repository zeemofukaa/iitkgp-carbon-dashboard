import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import PageHeader from "../components/PageHeader";
import MetricCard from "../components/MetricCard";

import { yearlyData } from "../data/mockData";

function Inventory() {
  return (
    <>
      <PageHeader
        eyebrow="CARBON ACCOUNTING"
        title="Greenhouse Gas Inventory"
        description="A centralized view of campus greenhouse gas emissions, sources, calculation methods, and historical trends."
      />

      <main className="content section">
        <div className="metrics-grid">
          <MetricCard
            label="Inventory year"
            value="2025"
            detail="Prototype dataset"
          />

          <MetricCard
            label="Total emissions"
            value="18,420"
            detail="tCO₂e"
          />

          <MetricCard
            label="Emission sources"
            value="12"
            detail="Currently modelled"
          />

          <MetricCard
            label="Data coverage"
            value="72%"
            detail="Prototype estimate"
          />
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">HISTORICAL INVENTORY</p>
              <h3>Total emissions by year</h3>
            </div>

            <select>
              <option>All scopes</option>
              <option>Scope 1</option>
              <option>Scope 2</option>
              <option>Scope 3</option>
            </select>
          </div>

          <div className="chart">
            <ResponsiveContainer width="100%" height={400}>
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

        <div className="two-column">
          <div className="panel">
            <p className="eyebrow">SCOPE 1</p>
            <h3>Direct emissions</h3>

            <ul className="clean-list">
              <li>Stationary fuel combustion</li>
              <li>Campus-owned vehicles</li>
              <li>Refrigerants and fugitive emissions</li>
            </ul>
          </div>

          <div className="panel">
            <p className="eyebrow">SCOPE 2</p>
            <h3>Purchased energy</h3>

            <ul className="clean-list">
              <li>Purchased electricity</li>
              <li>Purchased heating/cooling</li>
              <li>Grid emission factors</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default Inventory;