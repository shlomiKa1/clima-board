import { Navigate, Outlet } from "react-router-dom";

const ProtectedPublic = () => {
  const explorerName = localStorage.getItem("explorerName");

  if (explorerName) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedPublic;
