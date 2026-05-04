import { useEffect, useState } from "react";

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // ✅ cancela se o utilizador continuar a digitar
  }, [value, delay]);

  return debounced;
}

export default useDebounce;
