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

import {
  scope3Data,
  scope3HistoricalData,
  scope3Categories,
} from "../data/mockData";

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

        {/* =========================
            KEY METRICS
            ========================= */}

        <div className="metrics-grid">

          <MetricCard
            label="Total Scope 3"
            value="6,450"
            detail="tCO₂e · prototype"
          />

          <MetricCard
            label="Largest category"
            value="2,820"
            detail="Purchased goods & services"
          />

          <MetricCard
            label="Scope 3 categories"
            value="15"
            detail="GHG Protocol structure"
          />

          <MetricCard
            label="Data coverage"
            value="Pending"
            detail="Awaiting IIT Kharagpur data"
          />

        </div>


        {/* =========================
            CATEGORY BREAKDOWN
            ========================= */}

        <div className="panel">

          <div className="panel-header">
            <div>
              <p className="eyebrow">CATEGORY BREAKDOWN</p>
              <h3>Scope 3 emissions by source</h3>
            </div>

            <span className="tag">2025 · Prototype</span>
          </div>

          <div className="chart">

            <ResponsiveContainer width="100%" height={420}>
              <BarChart
                data={scope3Data}
                margin={{
                  top: 20,
                  right: 20,
                  left: 10,
                  bottom: 70,
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  angle={-35}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  fontSize={11}
                />

                <YAxis
                  label={{
                    value: "tCO₂e",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>


        {/* =========================
            HISTORICAL TREND
            ========================= */}

        <div className="panel">

          <div className="panel-header">
            <div>
              <p className="eyebrow">HISTORICAL TREND</p>
              <h3>Scope 3 emissions over time</h3>
            </div>

            <span className="tag">2021–2025 · Prototype</span>
          </div>

          <div className="chart">

            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={scope3HistoricalData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 10,
                  bottom: 20,
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis
                  label={{
                    value: "tCO₂e",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />

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


        {/* =========================
            SCOPE 3 CATEGORIES
            ========================= */}

        <div className="section-heading">

          <div>
            <p className="eyebrow">DATA STATUS</p>

            <h2>
              Scope 3 categories
            </h2>
          </div>

        </div>


        <div className="scope3-status-grid">

          {scope3Categories.map((category) => (
            <Scope3Category
              key={category.number}
              number={category.number}
              title={category.title}
              status={category.status}
              description={category.description}
            />
          ))}

        </div>


        {/* =========================
            METHODOLOGY
            ========================= */}

        <div className="panel methodology-panel">

          <p className="eyebrow">METHODOLOGY</p>

          <h3>
            How Scope 3 emissions are calculated
          </h3>

          <div className="calculation-flow">

            <div>
              <strong>Activity data</strong>

              <span>
                Quantity, distance, expenditure, weight, or another
                activity measure associated with the emission source.
              </span>
            </div>

            <span className="flow-arrow">
              →
            </span>

            <div>
              <strong>Emission factor</strong>

              <span>
                A factor appropriate to the activity, unit, geography,
                and accounting method.
              </span>
            </div>

            <span className="flow-arrow">
              →
            </span>

            <div>
              <strong>CO₂e</strong>

              <span>
                Calculated greenhouse gas emissions expressed as
                carbon-dioxide equivalent.
              </span>
            </div>

          </div>

        </div>

      </main>
    </>
  );
}


/* =========================
   SCOPE 3 CATEGORY CARD
   ========================= */

function Scope3Category({
  number,
  title,
  status,
  description,
}) {
  const statusClass =
    status === "Pending data"
      ? "pending"
      : status === "Prototype"
        ? "estimated"
        : "available";

  return (
    <div className="scope3-category">

      <span className="card-number">
        {number}
      </span>

      <div className="scope3-category-header">

        <h3>
          {title}
        </h3>

        <span className={`status ${statusClass}`}>
          {status}
        </span>

      </div>

      <p>
        {description}
      </p>

    </div>
  );
}

export default Scope3;