import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import MetricCard from "../components/MetricCard";
import ApiStatus from "../components/ApiStatus";
import CategoryCoverage from "../components/CategoryCoverage";
import MethodMix from "../components/MethodMix";

import { getJSON } from "../api";
import { scope3Categories } from "../data/mockData";

const fmt = (n) => Math.round(n).toLocaleString();

function Scope3() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getJSON("/scope3")
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (!data) return <ApiStatus error={error} />;

  const statusByNumber = Object.fromEntries(
    data.categories.map((c) => [c.number, c.status])
  );

  const reported = data.categories.filter(
    (c) => c.status === "Reported"
  ).length;

  return (
    <>
      <PageHeader
        eyebrow="Indirect emissions"
        title="Scope 3"
        description="Emissions from activities across the campus value chain: travel, commuting, waste and purchases. This is the hardest scope to measure."
      />

      <main className="content section">
        <div className="prototype-notice">
          <strong>Reference dataset</strong>
          <span>
            Figures come from the published IIT Delhi 2025 inventory and
            demonstrate the calculation pipeline until validated IIT
            Kharagpur data is available. {data.mapping_note}
          </span>
        </div>

        <div className="metrics-grid">
          <MetricCard
            label="Total Scope 3"
            value={fmt(data.total_tco2e)}
            detail="tCO₂e, IIT Delhi 2025 inventory"
          />

          <MetricCard
            label="Largest category"
            value={fmt(data.largest.tco2e)}
            detail={`${data.largest.name}, ${data.largest.share_pct}% of Scope 3`}
          />

          <MetricCard
            label="Scope 3 categories"
            value="15"
            detail="GHG Protocol structure"
          />

          <MetricCard
            label="Categories reported"
            value={`${reported} of 15`}
            detail="Mapped from the IIT Delhi inventory"
          />
        </div>

        <div className="panel">
          <h3>Which categories have data</h3>
          <p className="panel-note">
            The 15 GHG Protocol categories, with the line items that fill each
            one and how each was estimated.
          </p>

          <CategoryCoverage categories={data.categories} />
        </div>

        <div className="panel">
          <h3>How these numbers were estimated</h3>
          <p className="panel-note">
            Scope 3 by calculation method. {data.method_note}
          </p>

          <MethodMix methods={data.methods} />
        </div>

        <div className="section-heading">
          <div>
            <p className="eyebrow">What each category means</p>
            <h2>Scope 3 categories</h2>
          </div>
        </div>

        <div className="scope3-status-grid">
          {scope3Categories.map((category) => (
            <Scope3Category
              key={category.number}
              number={category.number}
              title={category.title}
              status={statusByNumber[category.number] ?? category.status}
              description={category.description}
            />
          ))}
        </div>

        <div className="panel methodology-panel">
          <h3>How Scope 3 emissions are calculated</h3>

          <div className="calculation-flow">
            <div>
              <strong>Activity data</strong>

              <span>
                Quantity, distance, expenditure, weight, or another activity
                measure associated with the emission source.
              </span>
            </div>

            <span className="flow-arrow">→</span>

            <div>
              <strong>Emission factor</strong>

              <span>
                A factor appropriate to the activity, unit, geography, and
                accounting method.
              </span>
            </div>

            <span className="flow-arrow">→</span>

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

function Scope3Category({ number, title, status, description }) {
  const statusClass =
    status === "Pending data"
      ? "pending"
      : status === "Prototype"
        ? "estimated"
        : "available";

  return (
    <div className="scope3-category">
      <span className="card-number">{number}</span>

      <div className="scope3-category-header">
        <h3>{title}</h3>

        <span className={`status ${statusClass}`}>{status}</span>
      </div>

      <p>{description}</p>
    </div>
  );
}

export default Scope3;
