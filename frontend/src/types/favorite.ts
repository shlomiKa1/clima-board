export interface FavoriteBody {
  explorerName: string;
  cityName: string;
  lat: number;
  lon: number;
  created_at: string;
}

export interface Favorite extends FavoriteBody {
  id: number;
}
