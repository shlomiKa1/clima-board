import { useEffect } from "react";
import useExecute from "../hooks/useExecute";
import type { CurrentWeatherResponse } from "../types/weather";
import { describeWeatherCode } from "../utils/codeWeather";

interface CurrentWeatherProps {
  lat: number;
  lon: number;
}

const CurrentWeather = ({ lat, lon }: CurrentWeatherProps) => {

  const { data, loading, error, execute } =
    useExecute<CurrentWeatherResponse>();
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

  const { temperature_2m, apparent_temperature, wind_speed_10m, weather_code } =
    data.current;

  return (
    <div className="current-weather-card">
      <div className="current-weather-summary">
        <span className="current-weather-temp">
          {Math.round(temperature_2m)}°
        </span>
        <span className="current-weather-desc">
          {describeWeatherCode(weather_code)}
        </span>
      </div>

      <div className="current-weather-details">
        <span>תחושה {Math.round(apparent_temperature)}°</span>
        <span>רוח {Math.round(wind_speed_10m)} קמ"ש</span>
      </div>
    </div>
  );
};

export default CurrentWeather;
