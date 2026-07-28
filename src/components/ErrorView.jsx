export function ErrorView({
  message,
  onReset,
}) {
  return (
    <div className="section error-section">
      <div className="error-card">
        <div
          className="error-icon"
          aria-hidden="true"
        >
          ⚠️
        </div>

        <p className="error-msg">
          {message}
        </p>

        <button
          type="button"
          className="btn-primary"
          onClick={onReset}
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}