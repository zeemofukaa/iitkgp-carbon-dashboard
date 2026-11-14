import FootprintBand from "../components/FootprintBand";
import SourcesRanked from "../components/SourcesRanked";
import ScenarioChart from "../components/ScenarioChart";
import ApiStatus from "../components/ApiStatus";

import { useCarbon } from "../context/CarbonContext";

function Overview() {
  const { charts, explorer, error } = useCarbon();

  if (!charts) return <ApiStatus error={error} />;

  return (
    <>
      <FootprintBand />

      <main className="content section ov-section">
        <div className="ov-grid">
          <div className="panel">
            <h3>Largest sources</h3>
            <p className="panel-note">
              The 8 biggest of {explorer.length} line items, in tCO₂e.
            </p>

            <SourcesRanked rows={explorer} />
          </div>

          <div className="panel">
            <h3>How the grid factor moves the total</h3>
            <p className="panel-note">
              Only electricity changes. Scope 1 and Scope 3 stay as published.
            </p>

            <ScenarioChart data={charts.scenarioData} height={250} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Overview;
