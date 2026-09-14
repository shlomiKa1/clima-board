import { useEffect, useState } from "react";
import useExecute from "./useExecute";
import { type Favorite, type FavoriteBody } from "../componets/Favorites";

function useFavoriteToggle(cityName: string, lat: number, lon: number) {
  const explorerName = localStorage.getItem("explorerName");
  const [isFavorite, setIsFavorite] = useState(false);
  const [existingId, setExistingId] = useState<number | null>(null);

  const { data: favorites, execute: fetchFavorites } = useExecute<Favorite[]>();
  const { execute: addFav, loading: addLoading } = useExecute<Favorite>();
  const { execute: removeFav, loading: removeLoading } = useExecute();

  useEffect(() => {
    fetchFavorites({
      method: "get",
      url: "/favorites",
      params: { explorerName },
    });
  }, [explorerName]);

  useEffect(() => {
    if (!favorites) return;
    const found = favorites.find((f) => f.lat === lat && f.lon === lon);
    setIsFavorite(!!found);
    setExistingId(found?.id ?? null);
  }, [favorites, cityName]);

  const toggle = async () => {
    if (isFavorite && existingId) {
      await removeFav({ method: "delete", url: `/favorites/${existingId}` });
      setIsFavorite(false);
      setExistingId(null);
    } else {
      const body: FavoriteBody = {
        explorerName: explorerName ?? "",
        cityName,
        lat,
        lon,
      };
      const created = await addFav({
        method: "post",
        url: "/favorites",
        data: body,
      });
      setIsFavorite(true);
      setExistingId(created?.id ?? null);
    }
  };
  return { isFavorite, toggle, loading: addLoading || removeLoading };
}

export default useFavoriteToggle;
