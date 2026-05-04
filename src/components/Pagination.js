// src/components/Pagination.jsx
function Pagination({ page, totalPages, onPageChange }) {
  const pages = [];

  // ✅ mostra no máximo 5 páginas à volta da actual
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {/* Botão primeira página */}
      <button onClick={() => onPageChange(1)} disabled={page === 1}>
        «
      </button>

      {/* Botão anterior */}
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        ‹
      </button>

      {/* Páginas numeradas */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={p === page ? "active" : ""} // ✅ destaca a página actual
        >
          {p}
        </button>
      ))}

      {/* Botão próximo */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        ›
      </button>

      {/* Botão última página */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        »
      </button>

      {/* Info da página actual */}
      <span>
        Página {page} de {totalPages}
      </span>
    </div>
  );
}

export default Pagination;
