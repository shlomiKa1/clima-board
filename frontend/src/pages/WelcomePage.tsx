import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";

const WelcomePage = () => {
  const [explorerName, setExplorerName] = useState("");
  const navigate = useNavigate();
  const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);

  const handleLogin = () => {
    if (!explorerName.trim()) return;

    const name = explorerName.trim();
    localStorage.setItem("explorerName", name);
    fetchFavorites(name);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div>
      <input
        type="text"
        value={explorerName}
        onChange={(e) => setExplorerName(e.target.value)}
        placeholder="מומו טוטו"
      />
      <button onClick={handleLogin}>התחברות</button>
    </div>
  );
};

export default WelcomePage;
