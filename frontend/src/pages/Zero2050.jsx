import PageHeader from "../components/PageHeader";
import InfoCard from "../components/InfoCard";

function Zero2050() {
  return (
    <>
      <PageHeader
        eyebrow="DECARBONIZATION"
        title="Zero by 2050"
        description="A long-term pathway toward eliminating direct greenhouse gas emissions from campus operations."
      />

      <main className="content section">
        <div className="roadmap">
          <div className="roadmap-line" />

          <div className="roadmap-point">
            <span>BASELINE</span>
            <strong>2025</strong>
          </div>

          <div className="roadmap-point current">
            <span>CURRENT</span>
            <strong>2026</strong>
          </div>

          <div className="roadmap-point">
            <span>MILESTONE</span>
            <strong>2035</strong>
          </div>

          <div className="roadmap-point">
            <span>TARGET</span>
            <strong>2050</strong>
          </div>
        </div>

        <div className="section-heading">
          <div>
            <p className="eyebrow">DECARBONIZATION PATHWAYS</p>
            <h2>Areas of action</h2>
          </div>
        </div>

        <div className="cards-grid">
          <InfoCard
            number="01"
            title="Energy & buildings"
            text="Improve building efficiency, electrification, energy monitoring, and low-carbon energy systems."
          />

          <InfoCard
            number="02"
            title="Renewable energy"
            text="Track on-campus renewable generation and opportunities for clean electricity procurement."
          />

          <InfoCard
            number="03"
            title="Transportation"
            text="Monitor campus fleet emissions and transition toward lower-emission transportation."
          />

          <InfoCard
            number="04"
            title="Procurement & Scope 3"
            text="Expand accounting for purchased goods, services, travel, commuting, and other indirect emissions."
          />

          <InfoCard
            number="05"
            title="Waste"
            text="Track waste generation, diversion, recycling, and associated greenhouse gas emissions."
          />

          <InfoCard
            number="06"
            title="Construction"
            text="Evaluate embodied carbon from campus construction and major infrastructure projects."
          />
        </div>
      </main>
    </>
  );
}

export default Zero2050;