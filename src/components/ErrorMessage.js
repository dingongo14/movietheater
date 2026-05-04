import { FaTriangleExclamation } from "react-icons/fa6";
export const ErrorMessage = ({ message }) => {
  return (
    <div className="message-error">
      <p style={{ paddingRight: "10px" }}>{message}</p>
      <FaTriangleExclamation size={40} />
    </div>
  );
};
