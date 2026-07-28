export function ProcessingView({
  progress,
}) {
  const percentage = Math.min(
    100,
    Math.max(0, progress.pct),
  );

  return (
    <div className="section">
      <div className="progress-card">
        <div
          className="spinner-ring"
          aria-hidden="true"
        >
          <div className="ring ring-1" />
          <div className="ring ring-2" />
        </div>

        <div className="progress-body">
          <p className="prog-step">
            {progress.step}
          </p>

          <p className="prog-detail">
            {progress.detail}
          </p>

          <div className="prog-track">
            <div
              className="prog-fill"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

          <p className="prog-pct">
            {Math.round(percentage)}%
          </p>
        </div>
      </div>
    </div>
  );
}