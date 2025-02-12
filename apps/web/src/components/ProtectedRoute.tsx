import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectedRoute = () => {
  const token = Cookies.get("accessToken");
  return token ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedRoute;
