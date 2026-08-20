function ProgressBar({ label, value, target }) {
  const percentage = Math.min((value / target) * 100, 100);

  return (
    <div className="progress-item">
      <div className="progress-label">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;