import { useParams, useSearchParams } from "react-router-dom";
import ForecastWeather from "../componets/ForecastWeather";
import { useEffect, useState } from "react";
import AddToFavoriteBtn from "../componets/AddToFavoriteBtn";
import CurrentWeather from "../componets/CurrentWeather";
import { saveLastViewedCity } from "../utils/lastViewedCity";

const CityDetailsPage = () => {
  const { cityName } = useParams();
  const [searchParams] = useSearchParams();

  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");
  const lat = latParam !== null ? Number(latParam) : NaN;
  const lon = lonParam !== null ? Number(lonParam) : NaN;
  const [days, setDays] = useState(7);

  useEffect(() => {
    if (cityName && !Number.isNaN(lat) && !Number.isNaN(lon)) {
      saveLastViewedCity({ name: cityName, latitude: lat, longitude: lon });
    }
  }, [cityName, lat, lon]);

  const handleDays = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDays(Number(e.target.value));
  };

  if (!cityName || Number.isNaN(lat) || Number.isNaN(lon))
    return <p>חסרים נתונים</p>;

  const listDays = [];
  for (let i = 1; i <= 16; i++) {
    const str =
      i === 7 ? `ל- ${i} הימים הקרובים (ברירת מחדל)` : `ל- ${i} הימים הקרובים`;
    listDays.push(
      <option key={i} value={i}>
        {str}
      </option>,
    );
  }

  return (
    <div>
      <article>
        <h1>מזג האוויר לעיר: {cityName}</h1>
        <CurrentWeather lat={lat} lon={lon} />
        <AddToFavoriteBtn cityName={cityName} lat={lat} lon={lon} />
        <br />
        <hr />
        <br />
      </article>

      <article>
        <h2>תחזית לפי יום</h2>
        <select name="days" value={days} onChange={handleDays}>
          {listDays}
        </select>
        <ForecastWeather lat={lat} lon={lon} days={days} />
      </article>
    </div>
  );
};

export default CityDetailsPage;
