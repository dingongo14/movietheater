function SkeletonProductDetails() {
  return (
    <div className="modal-container">
      {/* coluna esquerda — poster */}
      <div className="modal-poster-col skeleton-loading">
        <div
          className="skeleton"
          style={{ width: "100%", height: "100%", minHeight: "380px" }}
        ></div>
      </div>

      {/* coluna direita — conteúdo */}
      <div className="modal-content-col">
        <div
          className="modal-header"
          style={{ gap: "0.5rem", display: "flex", flexDirection: "column" }}
        >
          <div
            className="skeleton skeleton-text"
            style={{ width: "60px" }}
          ></div>
          <div
            className="skeleton skeleton-text"
            style={{ width: "200px", height: "22px" }}
          ></div>
        </div>

        <div className="modal-body">
          <div className="modal-meta">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="meta-card skeleton-loading">
                <div
                  className="skeleton skeleton-text"
                  style={{ width: "50px" }}
                ></div>
                <div
                  className="skeleton skeleton-text"
                  style={{ width: "80px", height: "20px", marginTop: "6px" }}
                ></div>
              </div>
            ))}
          </div>

          <div className="modal-description">
            <div
              className="skeleton skeleton-text"
              style={{ width: "60px", marginBottom: "8px" }}
            ></div>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="skeleton skeleton-text"
                style={{ width: i === 3 ? "60%" : "100%", marginBottom: "6px" }}
              ></div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <div
            className="skeleton"
            style={{ width: "70px", height: "34px", borderRadius: "8px" }}
          ></div>
          <div
            className="skeleton"
            style={{ width: "110px", height: "34px", borderRadius: "8px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProductDetails;
