import PageHeader from "../components/PageHeader";
import MetricCard from "../components/MetricCard";
import ScenarioChart from "../components/ScenarioChart";
import GridFactorSelect from "../components/GridFactorSelect";
import FootprintTreemap from "../components/FootprintTreemap";
import CalcTrace from "../components/CalcTrace";
import Scope1Trace from "../components/Scope1Trace";
import ApiStatus from "../components/ApiStatus";

import { useCarbon } from "../context/CarbonContext";
import { fmt } from "../theme";

function Inventory() {
  const { charts, explorer, error } = useCarbon();

  if (!charts) return <ApiStatus error={error} />;

  const { metrics, scenarioData } = charts;

  return (
    <>
      <PageHeader
        eyebrow="Carbon accounting"
        title="Greenhouse gas inventory"
        description="Every source in the inventory, how big it is next to the others, and how its number is calculated."
      />

      <main className="content section">
        <div className="metrics-grid">
          <MetricCard
            label="Inventory year"
            value="2025"
            detail="IIT Delhi reference dataset"
          />

          <MetricCard
            label="Total emissions"
            value={fmt(metrics.total)}
            detail="tCO₂e"
          />

          <MetricCard
            label="Emission sources"
            value={metrics.sources}
            detail="Line items in the inventory"
          />

          <MetricCard
            label="Scope 3 coverage"
            value={`${metrics.scope3_categories_reported} of ${metrics.scope3_categories_total}`}
            detail="GHG Protocol categories reported"
          />
        </div>

        <div className="panel">
          <h3>The whole footprint at a glance</h3>
          <p className="panel-note">
            Each block is one source, sized by its tCO₂e. Hover a block for
            its number.
          </p>

          <FootprintTreemap rows={explorer} height={380} />
        </div>

        <div className="panel">
          <h3>How Scope 1 is calculated</h3>
          <p className="panel-note">
            Fuel burned on campus multiplied by that fuel's emission factor.
          </p>

          <Scope1Trace />
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>How Scope 2 is calculated</h3>
              <p className="panel-note">
                Electricity use multiplied by the grid emission factor.
              </p>
            </div>

            <GridFactorSelect />
          </div>

          <CalcTrace />
        </div>

        <div className="panel">
          <h3>How the grid factor moves the total</h3>
          <p className="panel-note">
            Only electricity changes. Scope 1 and Scope 3 stay as published.
          </p>

          <ScenarioChart data={scenarioData} height={260} />
        </div>

        <div className="two-column">
          <div className="panel">
            <h3>Scope 1: direct emissions</h3>

            <ul className="clean-list">
              <li>Stationary fuel combustion</li>
              <li>Campus-owned vehicles</li>
              <li>Refrigerants and fugitive emissions</li>
            </ul>
          </div>

          <div className="panel">
            <h3>Scope 2: purchased energy</h3>

            <ul className="clean-list">
              <li>Purchased electricity</li>
              <li>Purchased heating and cooling</li>
              <li>Grid emission factors</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default Inventory;
