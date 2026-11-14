import PageHeader from "../components/PageHeader";
import QualityPanel from "../components/QualityPanel";

function DataMethodology() {
  return (
    <>
      <PageHeader
        eyebrow="Transparency"
        title="Data & Methodology"
        description="Understand where the campus data comes from and how greenhouse gas emissions are calculated."
      />

      <main className="content section">
        <div className="two-column">
          <div className="panel">
            <p className="eyebrow">Data sources</p>
            <h3>Campus data pipeline</h3>

            <div className="pipeline">
              <div>Campus activity data</div>
              <span>↓</span>

              <div>Data cleaning & validation</div>
              <span>↓</span>

              <div>Emission factors</div>
              <span>↓</span>

              <div>GHG calculation</div>
              <span>↓</span>

              <div>Dashboard metrics</div>
            </div>
          </div>

          <div className="panel">
            <p className="eyebrow">Accounting</p>
            <h3>GHG Protocol framework</h3>

            <p className="body-text">
              The dashboard is designed to organize campus greenhouse gas
              emissions into Scope 1, Scope 2, and Scope 3 categories.
            </p>

            <p className="body-text">
              Calculation methods and emission factors will be replaced with
              the methodology approved for the IIT Kharagpur project.
            </p>
          </div>
        </div>

        <QualityPanel />
      </main>
    </>
  );
}

export default DataMethodology;