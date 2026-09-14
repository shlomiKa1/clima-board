import { useEffect } from "react";
import type { City } from "../types/city";
import useExecute from "./useExecute";

function useSearch(quary: string) {
  const { data: results, execute } = useExecute<City[]>();

  useEffect(() => {
    if (quary.trim().length < 2) return;
    const timeoutId = setTimeout(() => {
      execute({
        method: "get",
        url: "/city/search",
        params: { name: quary },
      });
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [quary]);

  return results;
}

export default useSearch;
