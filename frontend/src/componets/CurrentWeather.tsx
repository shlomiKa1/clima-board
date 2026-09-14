import { useEffect } from "react";
import useExecute from "../hooks/useExecute";
import type { CurrentWeatherResponse } from "../types/weather";
interface CurrentWeatherProps {
  lat: number;
  lon: number;
}

const CurrentWeather = ({ lat, lon }: CurrentWeatherProps) => {
  //   const lat = 32.08088;
  //   const lon = 34.78057;

  const { data, loading, error, execute } = useExecute<CurrentWeatherResponse>();
  useEffect(() => {
    execute({
      method: "get",
      url: "/weather/current",
      params: { lat, lon },
    });
  }, [lat, lon]);

  if (loading) return <p>טוען נתוני מזג אוויר האחרון...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>עדיין לא חיפשת מזג אוויר</p>;

  return (
    <div>
      <h3>
        עדכון האחרון היה בתאריך:{" "}
        {`${new Date(data.current.time).toLocaleDateString("he-IL")} / ${new Date(data.current.time).toLocaleTimeString("he-IL")}`}
      </h3>
      <p>
        <strong>{data.current.apparent_temperature}°C</strong>
      </p>
      <p>
        <strong>{data.current.temperature_2m}°C</strong>
      </p>
    </div>
  );
};

export default CurrentWeather;
