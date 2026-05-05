import { useMemo, useState } from "react";
import ProductsList from "../components/ProductsList";
import Pagination from "../components/Pagination";
import useFetch from "../hooks/useFetch";
import SkeletonProductList from "../components/SkeletonProductsList";
import { ErrorMessage } from "../components/ErrorMessage";
import ProductDetails from "../components/ProductDetails";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Home() {
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    data: movies,
    isLoading: loadingMovies,
    isError: errorMovies,
    page,
    setPage: setMoviePage,
    totalPages: movieTotalPages,
  } = useFetch("/movie/popular");

  const {
    data: series,
    isLoading: loadingSeries,
    isError: errorSeries,
    setPage: setSeriePage,
    totalPages: serieTotalPages,
  } = useFetch("/tv/popular");

  const combined = useMemo(
    () => shuffle([...movies, ...series]),
    [movies, series],
  );

  const isLoading = loadingMovies || loadingSeries;
  const isError = errorMovies || errorSeries;
  const totalPages = Math.max(movieTotalPages, serieTotalPages);

  const handlePageChange = (newPage) => {
    setMoviePage(newPage);
    setSeriePage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      {isLoading && (
        <SkeletonProductList title="Filmes e Séries em destaques" />
      )}
      {isError && <ErrorMessage message="Erro ao carregar conteúdo" />}
      {combined.length > 0 && (
        <>
          <ProductsList
            movies={combined}
            title="Filmes e Séries em destaques"
            onItemClick={setSelectedItem}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {selectedItem && (
        <ProductDetails
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </main>
  );
}

export default Home;
