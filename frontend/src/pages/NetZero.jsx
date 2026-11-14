import PageHeader from "../components/PageHeader";
import InfoCard from "../components/InfoCard";

function NetZero() {
  return (
    <>
      <PageHeader
        eyebrow="Near-term milestone"
        title="Net Zero"
        description="A dedicated view for monitoring progress toward an interim campus net-zero milestone."
      />

      <main className="content section">
        <div className="netzero-card">
          <div>
            <p className="eyebrow">Current status</p>

            <h2>Net-zero pathway</h2>

            <p>
              This section is intentionally configurable. Once IIT
              Kharagpur's official climate targets are identified, the
              milestone and calculations can be connected to the actual data.
            </p>
          </div>

          <div className="circle-progress">
            <strong>18%</strong>
            <span>progress</span>
          </div>
        </div>

        <div className="cards-grid">
          <InfoCard
            number="01"
            title="Reduce"
            text="Reduce energy demand and direct fossil fuel consumption across campus."
          />

          <InfoCard
            number="02"
            title="Electrify"
            text="Transition suitable building systems and campus vehicles toward electricity."
          />

          <InfoCard
            number="03"
            title="Renew"
            text="Increase renewable electricity generation and procurement."
          />

          <InfoCard
            number="04"
            title="Account"
            text="Maintain transparent greenhouse gas accounting and annual reporting."
          />
        </div>
      </main>
    </>
  );
}

export default NetZero;