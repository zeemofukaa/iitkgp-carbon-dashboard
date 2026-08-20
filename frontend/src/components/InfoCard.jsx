function InfoCard({ number, title, text }) {
  return (
    <div className="info-card">
      <span className="card-number">{number}</span>

      <h3>{title}</h3>

      <p>{text}</p>

      <span className="arrow">→</span>
    </div>
  );
}

export default InfoCard;