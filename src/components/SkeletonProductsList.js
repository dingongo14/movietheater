const SKELETON_COUNT = 10;

function SkeletonProductsList({ title }) {
  return (
    <div className="product-list">
      {title && <h1>{title}</h1>}

      <div className="products-grid">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="product-preview skeleton-card">
            {/* Poster */}
            <div className="skeleton skeleton-poster" />

            {/* Informações */}
            <div className="skeleton-info">
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-subtitle" />
              <div className="skeleton skeleton-badge" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonProductsList;
