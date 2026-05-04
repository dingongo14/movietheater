// src/pages/Genre.jsx
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import SkeletonProductsList from "../components/SkeletonProductsList";
import ProductsList from "../components/ProductsList";
import Pagination from "../components/Pagination";
import SearchErrorModal from "../components/SearchErrorModal";
import useFetch from "../hooks/useFetch";

const NOMES_GENEROS = {
  28: "Acção",
  12: "Aventura",
  16: "Animação",
  35: "Comédia",
  80: "Crime",
  99: "Documentário",
  18: "Drama",
  10751: "Família",
  14: "Fantasia",
  36: "História",
  27: "Terror",
  10402: "Música",
  9648: "Mistério",
  10749: "Romance",
  878: "Ficção Científica",
  10770: "Filme de TV",
  53: "Suspense",
  10752: "Guerra",
  37: "Western",
};

function Genre() {
  const { genreId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = searchParams.get("type");
  const endpoint = type === "series" ? "/discover/tv" : "/discover/movie";

  const { data, isLoading, isError, page, setPage, totalPages } = useFetch(
    endpoint,
    { with_genres: genreId },
  );

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isError) setShowModal(true);
  }, [isError]);

  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nomeGenero = NOMES_GENEROS[Number(genreId)] ?? "Género";
  const tipoLabel = type === "series" ? "Séries" : "Filmes";

  const titulo = (
    <>
      {tipoLabel} · <span style={{ color: "#006eff" }}>{nomeGenero}</span>
    </>
  );

  return (
    <main>
      {isLoading && <SkeletonProductsList title={titulo} />}

      {showModal && (
        <SearchErrorModal
          query={`${tipoLabel} · ${nomeGenero}`}
          onClose={handleClose}
        />
      )}

      {data.length > 0 && (
        <>
          <ProductsList movies={data} title={titulo} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}

export default Genre;
