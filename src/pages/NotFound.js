import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link to="/">
        <button>Voltar a página inicial</button>
      </Link>
    </div>
  );
}

export default NotFound;
