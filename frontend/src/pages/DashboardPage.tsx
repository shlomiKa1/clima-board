import { Link } from "react-router-dom";
import CurrentWeather from "../componets/CurrentWeather";
import { getLastViewedCity } from "../utils/lastViewedCity";

const DEFAULT_CITY = { name: "Givat Zeev", latitude: 31.875, longitude: 35.1875 };
const DashboardPage = () => {
  const explorerName = localStorage.getItem("explorerName");
  const city = getLastViewedCity() ?? DEFAULT_CITY;

  return (
    <div>
      <h1>שלום {explorerName}</h1>
      <h2>מזג אוויר ב {city.name}</h2>
      <CurrentWeather lat={city.latitude} lon={city.longitude} />
      <div className="dashboard-links">
        <button>
          <Link to="/search">חיפוש עיר</Link>
        </button>
        <button>
          <Link to="/favorites">מועדפים</Link>
        </button>
        <button>
          <Link to="/compare">השוואה</Link>
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
