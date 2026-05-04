import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDropdown } from "../utilities/useDropdown";
import { ChevronIcon } from "../components/ChevronIcon";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../hooks/useDebounce";
import tmdb, { IMG_URL } from "../services/tmdb";

const CATEGORIAS = [
  { id: 28, href: "#acao", label: "Acção" },
  { id: 12, href: "#aventura", label: "Aventura" },
  { id: 16, href: "#animacao", label: "Animação" },
  { id: 35, href: "#comedia", label: "Comédia" },
  { id: 80, href: "#crime", label: "Crime" },
  { id: 99, href: "#documentario", label: "Documentário" },
  { id: 18, href: "#drama", label: "Drama" },
  { id: 10751, href: "#familia", label: "Família" },
  { id: 14, href: "#fantasia", label: "Fantasia" },
  { id: 36, href: "#historia", label: "História" },
  { id: 27, href: "#terror", label: "Terror" },
  { id: 10402, href: "#musica", label: "Música" },
  { id: 9648, href: "#misterio", label: "Mistério" },
  { id: 10749, href: "#romance", label: "Romance" },
  { id: 878, href: "#ficcao", label: "Ficção Científica" },
  { id: 10770, href: "#filme-tv", label: "Filme de TV" },
  { id: 53, href: "#suspense", label: "Suspense" },
  { id: 10752, href: "#guerra", label: "Guerra" },
  { id: 37, href: "#western", label: "Western" },
];

const MENUS = [
  { id: "filmes", label: "Filmes" },
  { id: "series", label: "Séries" },
];

export function Navbar() {
  const { openDropdown, toggleDropdown, navRef } = useDropdown();
  const [searchOpen, setSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();
  const debouncedValue = useDebounce(inputValue, 400);

  // src/hooks/useFetch.js — sem alterações

  // Navbar.jsx — atualiza o useEffect das sugestões:
  useEffect(() => {
    if (debouncedValue.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);

    Promise.all([
      tmdb.get("/search/movie", { params: { query: debouncedValue, page: 1 } }),
      tmdb.get("/search/tv", { params: { query: debouncedValue, page: 1 } }),
    ])
      .then(([moviesRes, tvRes]) => {
        const filmes = moviesRes.data.results.map((m) => ({
          ...m,
          tipo: "filme",
          title: m.title,
        }));

        const series = tvRes.data.results.map((s) => ({
          ...s,
          tipo: "serie",
          title: s.name, // ✅ séries usam "name" em vez de "title"
        }));

        // junta, ordena por popularidade e limita a 6
        const combinados = [...filmes, ...series]
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6);

        setSuggestions(combinados);
        setShowSuggestions(combinados.length > 0);
        setIsLoadingSuggestions(false);
      })
      .catch(() => {
        setSuggestions([]);
        setIsLoadingSuggestions(false);
      });
  }, [debouncedValue]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    navigate(`/search?q=${encodeURIComponent(inputValue)}`);
    setInputValue("");
    setSearchOpen(false);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (item) => {
    const rota =
      item.tipo === "serie" ? `/series/${item.id}` : `/movies/${item.id}`;
    navigate(rota);
    setInputValue("");
    setSearchOpen(false);
    setShowSuggestions(false);
  };

  return (
    <nav ref={navRef}>
      <h1>
        <a href="/">🎬CineNgongo</a>
      </h1>
      <div className="menus">
        <a href="/">Home</a>
        {MENUS.map(({ id, label }) => (
          <div className="dropdown" key={id}>
            <button onClick={() => toggleDropdown(id)} className="dropbtn">
              {label}
              <ChevronIcon isOpen={openDropdown === id} />
            </button>
            {openDropdown === id && (
              <div className="dropdown-content">
                {CATEGORIAS.map((cat) => (
                  <a
                    key={cat.id}
                    href={`/genre/${cat.id}?type=${id}`} // ✅ passa "filmes" ou "series"
                    onClick={() => toggleDropdown(null)}
                  >
                    {cat.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        {searchOpen && (
          <div className="search-wrapper" ref={suggestionsRef}>
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                placeholder="Pesquisar filmes e séries"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() =>
                  suggestions.length > 0 && setShowSuggestions(true)
                }
              />
            </form>

            {showSuggestions && (
              <div className="suggestions">
                {!isLoadingSuggestions &&
                  suggestions.map((item) => (
                    <div
                      key={`${item.tipo}-${item.id}`}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(item)}
                    >
                      <img
                        src={
                          item.poster_path
                            ? `${IMG_URL}${item.poster_path}`
                            : "/placeholder.jpg"
                        }
                        alt={item.title}
                      />

                      <div className="suggestion-info">
                        <span className="suggestion-title">{item.title}</span>
                        <span className="suggestion-year">
                          {
                            (item.release_date || item.first_air_date)?.split(
                              "-",
                            )[0]
                          }
                        </span>
                      </div>

                      {/* ✅ badge para distinguir */}
                      <span
                        className="suggestion-badge"
                        style={{
                          background:
                            item.tipo === "serie" ? "#1a6eff22" : "#ff4a4a22",
                          color: item.tipo === "serie" ? "#006eff" : "#e24b4a",
                          fontSize: 11,
                          fontWeight: 500,
                          padding: "2px 7px",
                          borderRadius: 4,
                          marginLeft: "auto",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.tipo === "serie" ? "Série" : "Filme"}
                      </span>

                      <span className="suggestion-rating">
                        ⭐ {item.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  ))}
                {!isLoadingSuggestions &&
                  suggestions.map((movie) => (
                    <div
                      key={movie.id}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(movie)}
                    >
                      {/* Poster */}
                      <img
                        src={
                          movie.poster_path
                            ? `${IMG_URL}${movie.poster_path}`
                            : "/placeholder.jpg"
                        }
                        alt={movie.title}
                      />

                      {/* Info */}
                      <div className="suggestion-info">
                        <span className="suggestion-title">{movie.title}</span>
                        <span className="suggestion-year">
                          {movie.release_date?.split("-")[0]}
                        </span>
                      </div>

                      {/* Avaliação */}
                      <span className="suggestion-rating">
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  ))}

                {!isLoadingSuggestions && suggestions.length > 0 && (
                  <div className="suggestion-all" onClick={handleSubmit}>
                    Ver todos os resultados para "<strong>{inputValue}</strong>"
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <button onClick={searchOpen ? handleSubmit : () => setSearchOpen(true)}>
          <FaSearch />
        </button>
      </div>
    </nav>
  );
}
