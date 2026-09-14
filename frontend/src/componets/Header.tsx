import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("explorerName");
    navigate("/", { replace: true });
  };

  return (
    <div>
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
        <button onClick={handleLogout}>יציאה</button>
      </nav>
    </div>
  );
};

export default Header;
