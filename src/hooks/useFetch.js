// src/hooks/useFetch.js
import { useEffect, useState, useRef } from "react";
import tmdb from "../services/tmdb";

function useFetch(endpoint, params = {}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const paramsKey = JSON.stringify(params);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(1);
  }, [paramsKey]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    tmdb
      .get(endpoint, {
        params: { ...params, page },
      })
      .then(({ data }) => {
        if (data.results.length === 0) {
          setIsError(true);
        } else {
          setData(data.results);
          setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      });
  }, [endpoint, page, paramsKey]);

  return { data, isLoading, isError, page, setPage, totalPages };
}

export default useFetch;
