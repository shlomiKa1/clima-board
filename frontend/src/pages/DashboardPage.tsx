import { Link } from "react-router-dom";
import CurrentWeather from "../componets/CurrentWeather";
import { getLastViewedCity } from "../utils/lastViewedCity";

const DEFAULT_CITY = { name: "Tel Aviv", latitude: 31.875, longitude: 35.1875 };
const DashboardPage = () => {
  const explorerName = localStorage.getItem("explorerName");
  const city = getLastViewedCity() ?? DEFAULT_CITY;

  return (
    <div>
      <h1>שלום {explorerName}</h1>
      <hr />
      <h2>מזג אוויר ב {city.name}</h2>
      <CurrentWeather lat={32.08088} lon={34.78057} />
      <div>
        <button>
          <Link to="/search">חיפוש עיר</Link>
        </button>
        <button>
          <Link to="/favorites">מעודפים</Link>
        </button>
        <button>
          <Link to="/compare">השוואה</Link>
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
