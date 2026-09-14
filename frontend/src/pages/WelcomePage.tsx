import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [explorerName, setExplorerName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("explorerName", explorerName);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div>
      <input
        type="text"
        value={explorerName}
        onChange={(e) => setExplorerName(e.target.value)}
        placeholder="מומו טוטו"
        required
      />
      <button onClick={handleLogin}>התחברות</button>
    </div>
  );
};

export default WelcomePage;
