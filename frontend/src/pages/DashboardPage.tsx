import { Link } from "react-router-dom";
import CurrentWeather from "../componets/CurrentWeather";

const DashboardPage = () => {
  return (
    <div>
      <h1>שלום {localStorage.getItem("explorerName")}</h1>
      <hr />
      <h2>מזג אוויר ב Tel Aviv</h2>
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
