function ApiStatus({ error }) {
  return (
    <main className="content section">
      {error ? (
        <div className="prototype-notice">
          <strong>Can't reach the data API</strong>

          <span>
            {error}. Start the backend with{" "}
            <code>uvicorn main:app --reload</code> and check VITE_API_URL.
          </span>
        </div>
      ) : (
        <p className="body-text">Loading campus data…</p>
      )}
    </main>
  );
}

export default ApiStatus;
