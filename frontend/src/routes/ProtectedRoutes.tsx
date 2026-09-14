import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const explorerName = localStorage.getItem("explorerName");
  //   const [explorerName, setExplorerName] = useState(() =>
  //     localStorage.getItem("explorerName"),
  //   );

  //   useEffect(() => {
  //     function handleStorageChange() {
  //       setExplorerName(localStorage.getItem("explorerName"));
  //     }

  //     window.addEventListener("storage", handleStorageChange);

  //     return () => window.removeEventListener("storage", handleStorageChange);
  //   }, []);

  if (!explorerName) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
