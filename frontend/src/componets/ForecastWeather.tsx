import { useEffect, useMemo } from "react";
import useExecute from "../hooks/useExecute";

interface Forecast {
  time: string[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
}

type ForecastResponse = {
  daily: Forecast;
};

interface ForecastDaily {
  date: string;
  tempMin: number;
  tempMax: number;
}

interface ForecastProps {
  lat: number;
  lon: number;
  days?: number;
}

const ForecastWeather = ({ lat, lon, days = 7 }: ForecastProps) => {
  const { data, loading, error, execute } = useExecute<ForecastResponse>();

  useEffect(() => {
    execute({
      method: "get",
      url: "/weather/forecast",
      params: { lat, lon, days },
    });
  }, [days, lat, lon]);

  const dailyForecasts: ForecastDaily[] = useMemo(() => {
    if (!data?.daily) return [];

    const { time, temperature_2m_max, temperature_2m_min } = data.daily;
    if (
      time?.length !== temperature_2m_max?.length ||
      time?.length !== temperature_2m_min?.length
    ) {
      console.error("ערכים לא תואמים");
      return [];
    }

    return time?.map((date, i) => ({
      date,
      tempMin: temperature_2m_min[i],
      tempMax: temperature_2m_max[i],
    }));
  }, [data]);

  if (loading) return <p>טעינת תחזי אוויר...</p>;
  if (error) return <p>{error}</p>;
  if (dailyForecasts.length === 0) {
    return <p>אין נתוני תחזית זמינים</p>;
  }

  return (
    <ul className="forecast-list">
      {dailyForecasts.map((f) => (
        <li key={f.date} className="forecast-day">
          <div>{f.date}</div>
          <p>↑ {Math.round(f.tempMax)}°</p>
          <p>↓ {Math.round(f.tempMin)}°</p>
        </li>
      ))}
    </ul>
  );
};

export default ForecastWeather;
