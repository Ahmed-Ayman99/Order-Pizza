import { useEffect, useState } from "react";

import { API_URL } from "../../utils/constant";

const useMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/menu`);

        if (!res.ok) throw Error("Failed getting menu");
        const data = await res.json();

        setMenu(data.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    })();
  }, []);

  return { isLoading, menu, error };
};

export default useMenu;
