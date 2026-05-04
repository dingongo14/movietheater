import { Link } from "react-router-dom";
import { IMG_URL } from "../services/tmdb";

function ProductsList({ title, movies, mediaType }) {
  return (
    <>
      <h1>{title}</h1>
      <div className="section">
        {movies?.map((movie, index) => {
          const itemTitle = movie.title ?? movie.name;
          const itemYear = (movie.release_date ?? movie.first_air_date)?.split(
            "-",
          )[0];
          const itemLink =
            (mediaType ??
              movie.media_type ??
              (movie.title ? "movie" : "tv")) === "tv"
              ? `/series/${movie.id}`
              : `/movies/${movie.id}`;

          return (
            <Link key={movie.id ?? index} to={itemLink}>
              <div className="product-preview">
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
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default ProductsList;
