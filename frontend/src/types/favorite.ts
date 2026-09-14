export interface FavoriteBody {
  explorerName: string;
  cityName: string;
  lat: number;
  lon: number;
}

export interface Favorite extends FavoriteBody {
  id: number;
}
