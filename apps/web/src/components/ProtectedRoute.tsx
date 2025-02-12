import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
export const ProtectedRoute = () => {
  const token = Cookies.get("accessToken");
  return token ? <Outlet /> : <Navigate to="/" replace />;
};
