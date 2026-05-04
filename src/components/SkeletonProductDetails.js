function SkeletonProductDetails() {
  return (
    <div className="product-preview skeleton-loading">
      <h2>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </h2>
      <p>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </p>
      <div className="description">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    </div>
  );
}

export default SkeletonProductDetails;
