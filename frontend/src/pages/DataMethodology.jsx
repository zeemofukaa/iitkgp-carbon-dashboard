import PageHeader from "../components/PageHeader";

function DataMethodology() {
  return (
    <>
      <PageHeader
        eyebrow="TRANSPARENCY"
        title="Data & Methodology"
        description="Understand where the campus data comes from and how greenhouse gas emissions are calculated."
      />

      <main className="content section">
        <div className="two-column">
          <div className="panel">
            <p className="eyebrow">DATA SOURCES</p>
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
            <p className="eyebrow">ACCOUNTING</p>
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

        <div className="panel">
          <p className="eyebrow">DATA QUALITY</p>
          <h3>Current prototype status</h3>

          <div className="status-table">
            <div>
              <strong>Electricity</strong>
              <span className="status available">
                Available
              </span>
            </div>

            <div>
              <strong>Fuel</strong>
              <span className="status available">
                Available
              </span>
            </div>

            <div>
              <strong>Transportation</strong>
              <span className="status pending">
                Pending data
              </span>
            </div>

            <div>
              <strong>Waste</strong>
              <span className="status pending">
                Pending data
              </span>
            </div>

            <div>
              <strong>Procurement</strong>
              <span className="status pending">
                Pending data
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DataMethodology;