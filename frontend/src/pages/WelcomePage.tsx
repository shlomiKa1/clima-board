import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";

const WelcomePage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [explorerName, setExplorerName] = useState("");
  const navigate = useNavigate();
  const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleLogin = () => {
    if (!explorerName.trim()) return;

    const name = explorerName.trim();
    localStorage.setItem("explorerName", name);
    fetchFavorites(name);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="welcome-page">
      <h1>מזג האוויר שלך, בכל מקום</h1>
      <input
        type="text"
        value={explorerName}
        onChange={(e) => setExplorerName(e.target.value)}
        placeholder="מומו טוטו"
        ref={inputRef}
      />
      <button onClick={handleLogin}>התחברות</button>
    </div>
  );
};

export default WelcomePage;
