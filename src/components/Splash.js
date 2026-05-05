import {
  faCircleNotch,
  faCloudSunRain,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // ← novo estado
  const navigate = useNavigate();

  const handleEntrar = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/home");
    }, 2000);
  };

  const handleCriarConta = (e) => {
    e.preventDefault();
    setShowModal(true); // ← abre o modal
  };

  return (
    <div className="splash">
      <FontAwesomeIcon icon={faCloudSunRain} style={{ fontSize: "150px" }} />
      <h1>
        <span>Clima</span> <br />
        no <br />
        <span>Mundo</span>
      </h1>
      <div>
        <button onClick={handleEntrar} className="start">
          Vamos lá
        </button>
        <p className="link-create">
          {/* ← substituído Link por <a> para interceptar o clique */}
          <a href="/" onClick={handleCriarConta}>
            Criar uma conta
          </a>
        </p>
      </div>

      {/* Modal — só renderiza quando showModal for true */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Serviço não disponível no momento</p>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </div>
        </div>
      )}

      <div className="version">
        {isLoading && (
          <FontAwesomeIcon
            className="loading"
            icon={faCircleNotch}
            style={{ fontSize: "20px" }}
          />
        )}
        <p>Version.2.1.14</p>
      </div>
    </div>
  );
}

export default Splash;
