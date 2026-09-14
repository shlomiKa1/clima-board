import { useEffect } from "react";
import useExecute from "../hooks/useExecute";
import { useNavigate } from "react-router-dom";
import AddToFavoriteBtn from "./AddToFavoriteBtn";
import type { Favorite } from "../types/favorite";

const Favorites = () => {
  const explorerName = localStorage.getItem("explorerName");
  const navigate = useNavigate();
  const { data, loading, error, execute } = useExecute<Favorite[]>();

  useEffect(() => {
    execute({ method: "get", url: "/favorites", params: { explorerName } });
  }, [explorerName]);

  const handleClick = (nameCity: string, lat: number, lon: number) => {
    navigate(`/city/${encodeURIComponent(nameCity)}?lat=${lat}&lon=${lon}`, {
      replace: true,
    });
  };

  if (loading) return <p>טעינת רשימת המועדפים...</p>;
  if (error) return <p>{error}</p>;

  if (!data || data.length === 0) return <p>רשימת המועדפים ריקה</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>עיר</th>
            <th>קוארדינטות</th>
          </tr>
        </thead>
        <tbody>
          {data.map((weather) => (
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
    </div>
  );
};

export default Favorites;
