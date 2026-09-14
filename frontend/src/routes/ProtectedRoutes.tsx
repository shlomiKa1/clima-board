import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const explorerName = localStorage.getItem("explorerName");

  if (!explorerName) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
