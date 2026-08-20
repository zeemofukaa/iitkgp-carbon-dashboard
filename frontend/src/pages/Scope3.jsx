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
import MetricCard from "../components/MetricCard";

import { scope3Data, scope3HistoricalData } from "../data/mockData";

function Scope3() {
  return (
    <>
      <PageHeader
        eyebrow="INDIRECT EMISSIONS"
        title="Scope 3"
        description="Tracking indirect greenhouse gas emissions associated with activities across the IIT Kharagpur campus value chain."
      />

      <main className="content section">

        <div className="prototype-notice">
          <strong>Prototype data</strong>
          <span>
            The figures shown on this page are placeholders and will be
            replaced with IIT Kharagpur campus data and approved emission
            factors.
          </span>
        </div>

        <div className="metrics-grid">
          <MetricCard
            label="Total Scope 3"
            value="6,450"
            detail="tCO₂e · prototype"
          />

          <MetricCard
            label="Largest category"
            value="2,820"
            detail="Purchased goods"
          />

          <MetricCard
            label="Categories tracked"
            value="5"
            detail="Prototype categories"
          />

          <MetricCard
            label="Data coverage"
            value="48%"
            detail="Prototype estimate"
          />
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">CATEGORY BREAKDOWN</p>
              <h3>Scope 3 emissions by source</h3>
            </div>

            <span className="tag">2025</span>
          </div>

          <div className="chart">
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={scope3Data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  height={80}
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

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">HISTORICAL TREND</p>
              <h3>Scope 3 emissions over time</h3>
            </div>

            <span className="tag">2021–2025</span>
          </div>

          <div className="chart">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={scope3HistoricalData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="section-heading">
          <div>
            <p className="eyebrow">DATA STATUS</p>
            <h2>Scope 3 categories</h2>
          </div>
        </div>

        <div className="scope3-status-grid">

          <Scope3Category
            number="01"
            title="Purchased goods & services"
            status="Estimated"
            description="Emissions associated with goods and services purchased by campus operations."
          />

          <Scope3Category
            number="02"
            title="Business travel"
            status="Pending data"
            description="Travel-related emissions associated with campus faculty, staff, and other institutional activities."
          />

          <Scope3Category
            number="03"
            title="Student & employee commuting"
            status="Pending data"
            description="Emissions associated with journeys to and from campus."
          />

          <Scope3Category
            number="04"
            title="Waste generated"
            status="Estimated"
            description="Emissions associated with treatment and disposal of campus waste."
          />

          <Scope3Category
            number="05"
            title="Capital goods"
            status="Pending data"
            description="Embodied emissions associated with major infrastructure and capital purchases."
          />

        </div>

        <div className="panel methodology-panel">
          <p className="eyebrow">METHODOLOGY</p>

          <h3>How Scope 3 emissions are calculated</h3>

          <div className="calculation-flow">
            <div>
              <strong>Activity data</strong>
              <span>
                Quantity, distance, expenditure, weight, or other activity
                measure
              </span>
            </div>

            <span className="flow-arrow">→</span>

            <div>
              <strong>Emission factor</strong>
              <span>
                Factor appropriate to the activity, unit, geography, and
                accounting method
              </span>
            </div>

            <span className="flow-arrow">→</span>

            <div>
              <strong>CO₂e</strong>
              <span>
                Calculated greenhouse gas emissions
              </span>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}

function Scope3Category({
  number,
  title,
  status,
  description,
}) {
  const statusClass =
    status === "Pending data"
      ? "pending"
      : "estimated";

  return (
    <div className="scope3-category">
      <span className="card-number">{number}</span>

      <div className="scope3-category-header">
        <h3>{title}</h3>

        <span className={`status ${statusClass}`}>
          {status}
        </span>
      </div>

      <p>{description}</p>
    </div>
  );
}

export default Scope3;