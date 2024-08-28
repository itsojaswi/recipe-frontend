import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();

  // If authenticated, render the nested routes; otherwise, redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
