import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../utilities/useFetch";
import SkeletonProductDetails from "../components/SkeletonProductDetails";
import { ErrorMessage } from "../components/ErrorMessage";

function ProductDetails() {
  const { id } = useParams();
  const { isLoading, error, isError, data } = useFetch(
    "http://localhost:8000/products/" + id,
  );
  const navigate = useNavigate();
  const handleDeletar = () => {
    const choice = window.confirm("Pretende mesmo apagar esse produto?");
    if (choice) {
      fetch("http://localhost:8000/products/" + id, {
        method: "DELETE",
      }).then(() => {
        navigate("/");
      });
    }
  };
  return (
    <main>
      {isLoading && <SkeletonProductDetails />}
      {isError && <ErrorMessage message={error.message} />}
      {data && (
        <article className="product-details">
          <h2>{data.name}</h2>
          <p>Preço: {data.price}</p>
          <div className="description">{data.description}</div>
          <i>Adicionado por: {data.worker}</i>
          <button onClick={handleDeletar}>Apagar produto</button>
        </article>
      )}
    </main>
  );
}

export default ProductDetails;
