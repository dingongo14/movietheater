import { useState, useEffect } from "react";
import { IMG_URL } from "../services/tmdb";
import SkeletonProductDetails from "./SkeletonProductDetails";
function ProductDetails({ item, onClose }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (item) setIsLoading(false);
  }, [item]);
  const isMovie = Boolean(item.title);
  const name = item.title ?? item.name;
  const date = item.release_date ?? item.first_air_date;
  const rating = item.vote_average?.toFixed(1);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {isLoading && <SkeletonProductDetails />}
        {/* coluna esquerda — poster */}
        {item.poster_path && (
          <div className="modal-poster-col">
            <img
              src={IMG_URL + item.poster_path}
              alt={name}
              className="modal-poster"
            />
          </div>
        )}

        {/* coluna direita — conteúdo */}
        <div className="modal-content-col">
          <div className="modal-header">
            <span className="modal-label">{isMovie ? "Filme" : "Série"}</span>
            <h2>{name}</h2>
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-meta">
              <div className="meta-card">
                <span className="meta-label">Avaliação</span>
                <p className="meta-value">⭐ {rating}</p>
              </div>
              <div className="meta-card">
                <span className="meta-label">Data</span>
                <p className="meta-value">{date ?? "—"}</p>
              </div>
              <div className="meta-card">
                <span className="meta-label">Votos</span>
                <p className="meta-value">
                  {item.vote_count?.toLocaleString()}
                </p>
              </div>
              <div className="meta-card">
                <span className="meta-label">Popularidade</span>
                <p className="meta-value">{Math.round(item.popularity)}</p>
              </div>
            </div>

            <div className="modal-description">
              <span className="meta-label">Sinopse</span>
              <p>{item.overview || "Sem sinopse disponível."}</p>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
