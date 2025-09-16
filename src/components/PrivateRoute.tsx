import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.tsx";

const PrivateRoute = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;