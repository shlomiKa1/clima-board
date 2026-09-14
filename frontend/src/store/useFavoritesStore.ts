import { create } from "zustand";
import type { Favorite, FavoriteBody } from "../types/favorite";
import { persist } from "zustand/middleware";
import api from "../api/api";

interface FavoriteStoreProps {
  favorites: Favorite[];
  fetched: boolean;
  fetchFavorites: (explorerName: string) => Promise<void>;
  addFavorite: (favorite: FavoriteBody) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  clear: () => void;
}

export const useFavoritesStore = create<FavoriteStoreProps>()(
  persist(
    (set, get) => ({
      favorites: [],
      fetched: false,

      fetchFavorites: async (explorerName) => {
        if (get().fetched) return;
        const res = await api.get<Favorite[]>("/favorites", {
          params: { explorerName },
        });
        set({ favorites: res.data, fetched: true });
      },

      addFavorite: async (favorite) => {
        const res = await api.post<Favorite>("/favorites", favorite);
        set({ favorites: [...get().favorites, res.data] });
      },

      removeFavorite: async (id) => {
        await api.delete(`/favorites/${id}`);
        set({ favorites: get().favorites.filter((fav) => fav.id !== id) });
      },

      clear: () => set({ favorites: [], fetched: false }),
    }),
    {
      name: "favorites",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
