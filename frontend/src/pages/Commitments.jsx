import PageHeader from "../components/PageHeader";
import InfoCard from "../components/InfoCard";

function Commitments() {
  return (
    <>
      <PageHeader
        eyebrow="CAMPUS ACTION"
        title="Campus Commitments"
        description="Strategic and operational actions that support a lower-carbon and more sustainable campus."
      />

      <main className="content section">
        <div className="cards-grid">
          <InfoCard
            number="01"
            title="Energy"
            text="Improve energy efficiency and reduce dependence on carbon-intensive energy sources."
          />

          <InfoCard
            number="02"
            title="Water"
            text="Track campus water consumption and establish measurable reduction targets."
          />

          <InfoCard
            number="03"
            title="Waste"
            text="Reduce waste generation and improve diversion and recycling performance."
          />

          <InfoCard
            number="04"
            title="Food"
            text="Measure food-related emissions and identify lower-carbon procurement opportunities."
          />

          <InfoCard
            number="05"
            title="Mobility"
            text="Reduce transportation emissions through fleet electrification and sustainable mobility."
          />

          <InfoCard
            number="06"
            title="Construction"
            text="Incorporate embodied carbon into campus construction and infrastructure decisions."
          />
        </div>
      </main>
    </>
  );
}

export default Commitments;