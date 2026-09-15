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
          מעודפים
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
