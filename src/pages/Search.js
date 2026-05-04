// src/pages/Search.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SkeletonProductsList from "../components/SkeletonProductsList";
import ProductsList from "../components/ProductsList";
import Pagination from "../components/Pagination";
import SearchErrorModal from "../components/SearchErrorModal";
import useFetch from "../hooks/useFetch";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const navigate = useNavigate();

  const {
    data: rawData,
    isLoading,
    isError,
    page,
    setPage,
    totalPages,
  } = useFetch(
    "/search/multi", // 👈 era "/search/movie"
    { query },
  );

  // Filtra pessoas — mantém só filmes e séries
  const data = rawData.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv",
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

  return (
    <main>
      {isLoading && (
        <SkeletonProductsList
          title={
            <>
              Buscando por{" "}
              <span style={{ color: "var(--primary-color)" }}>"{query}"</span>
            </>
          }
        />
      )}

      {showModal && <SearchErrorModal query={query} onClose={handleClose} />}

      {data.length > 0 && (
        <>
          <ProductsList
            movies={data}
            title={
              <>
                Resultados para{" "}
                <span style={{ color: "var(--primary-color)" }}>"{query}"</span>
              </>
            }
          />

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

export default Search;
