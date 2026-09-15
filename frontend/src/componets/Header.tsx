import { NavLink, useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("explorerName");
    useFavoritesStore.getState().clear();
    navigate("/", { replace: true });
  };

  return (
    <header>
      <nav>
        {/* <img
          src="/logo.svg"
          alt="ClimaBoard"
          style={{ height: 32, width: "auto" }}
        /> */}
        <div
          className="logo-container"
          // style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <img
            src="/favicon.svg"
            alt="logo ClimaBoard"
            // style={{ height: 32, width: 32 }}
          />
          <span className="logo-title">ClimaBoard</span>
        </div>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/dashboard"
        >
          דף הבית
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/search"
        >
          חיפוש
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/favorites"
        >
          מועדפים
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/compare"
        >
          השוואה
        </NavLink>
        <button onClick={handleLogout}>התנתקות</button>
      </nav>
    </header>
  );
};

export default Header;
