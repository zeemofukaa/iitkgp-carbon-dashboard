function MetricCard({ label, value, detail, positive }) {
  return (
    <div className="metric-card">
      <p>{label}</p>
      <h3>{value}</h3>
      <span className={positive ? "positive" : ""}>
        {detail}
      </span>
    </div>
  );
}

export default MetricCard;