import { Link } from "react-router-dom";
import { IMG_URL } from "../services/tmdb";

function ProductsList({ title, movies, mediaType, onItemClick }) {
  return (
    <>
      <h1>{title}</h1>
      <div className="section">
        {movies?.map((movie, index) => {
          const itemTitle = movie.title ?? movie.name;
          const itemYear = (movie.release_date ?? movie.first_air_date)?.split(
            "-",
          )[0];
          const itemType =
            mediaType ?? movie.media_type ?? (movie.title ? "movie" : "tv");
          const itemLink =
            itemType === "tv" ? `/series/${movie.id}` : `/movies/${movie.id}`;

          return (
            <div
              key={movie.id ?? index}
              className="product-preview"
              onClick={() => onItemClick?.(movie)}
              style={{ cursor: onItemClick ? "pointer" : "default" }}
            >
              <Link
                to={itemLink}
                onClick={(e) => onItemClick && e.preventDefault()}
              >
                <img
                  src={
                    movie.poster_path
                      ? `${IMG_URL}${movie.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={itemTitle}
                  title={`${itemTitle} (${itemYear})`}
                />
                <p>Ano: {itemYear}</p>
                <i>Avaliação: ⭐ {movie.vote_average?.toFixed(1)}</i>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductsList;
