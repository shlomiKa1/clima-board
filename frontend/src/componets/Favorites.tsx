import { useNavigate } from "react-router-dom";
import AddToFavoriteBtn from "./AddToFavoriteBtn";
import { useFavoritesStore } from "../store/useFavoritesStore";

const Favorites = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const navigate = useNavigate();

  const handleClick = (nameCity: string, lat: number, lon: number) => {
    navigate(`/city/${encodeURIComponent(nameCity)}?lat=${lat}&lon=${lon}`, {
      replace: true,
    });
  };

  if (favorites.length === 0) return <p>רשימת המועדפים ריקה</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>עיר</th>
          <th>קוארדינטות</th>
        </tr>
      </thead>
      <tbody>
        {favorites.map((weather) => (
          <tr
            key={weather.id}
            onClick={() =>
              handleClick(weather.cityName, weather.lat, weather.lon)
            }
          >
            <td>{weather.cityName}</td>
            <td>
              {weather.lat}, {weather.lon}
            </td>
            <td>
              <AddToFavoriteBtn
                cityName={weather.cityName}
                lat={weather.lat}
                lon={weather.lon}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Favorites;
