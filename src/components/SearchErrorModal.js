// src/components/SearchErrorModal.jsx
import { useEffect } from "react";

function SearchErrorModal({ query, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          border: "2px solid #006eff",
          borderRadius: 16,
          padding: "2.5rem 2rem",
          maxWidth: 380,
          width: "90%",
          textAlign: "center",
        }}
      >
        {/* Ícone */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#ebebfc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="7.5"
              stroke="#006eff"
              strokeWidth="1.8"
            />
            <line
              x1="15.5"
              y1="15.5"
              x2="19.5"
              y2="19.5"
              stroke="#006eff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <line
              x1="11"
              y1="8"
              x2="11"
              y2="12"
              stroke="#006eff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="11" cy="14.5" r="0.8" fill="#006eff" />
          </svg>
        </div>

        <p
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "#1a1a2e",
            margin: "0 0 0.5rem",
          }}
        >
          Nenhum resultado encontrado
        </p>
        <p
          style={{
            fontSize: 14,
            color: "#5F5E5A",
            margin: "0 0 0.25rem",
            lineHeight: 1.6,
          }}
        >
          Não encontrámos filmes ou séries com o título que procuras. Verifica
          se está correto ou tenta outra pesquisa.
        </p>
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "#006eff",
            margin: "0 0 1.5rem",
          }}
        >
          "{query}"
        </p>
        <p style={{ fontSize: 13, color: "#888780", margin: "0 0 1.75rem" }}>
          Tenta com outras palavras ou verifica a ortografia.
        </p>

        <button
          onClick={onClose}
          style={{
            background: "#006eff",
            color: "#fff",
            border: "none",
            padding: "0.6rem 2rem",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.3px",
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default SearchErrorModal;
