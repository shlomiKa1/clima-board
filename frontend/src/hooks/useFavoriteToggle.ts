import { useState } from "react";
import { useFavoritesStore } from "../store/useFavoritesStore";

function useFavoriteToggle(cityName: string, lat: number, lon: number) {
  const explorerName = localStorage.getItem("explorerName") ?? "";
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const [loading, setLoading] = useState(false);

  const existing = favorites.find((fav) => fav.lat === lat && fav.lon === lon);
  const isFavorite = !!existing;

  const toggle = async () => {
    setLoading(true);
    try {
      if (isFavorite && existing) {
        await removeFavorite(existing.id);
      } else {
        await addFavorite({ explorerName, cityName, lat, lon });
      }
    } finally {
      setLoading(false);
    }
  };

  return { isFavorite, toggle, loading };
}

export default useFavoriteToggle;
