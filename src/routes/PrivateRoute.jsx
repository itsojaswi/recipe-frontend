import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function PrivateRoute() {
  const {
    state: { isAuthenticated },
  } = useAuthContext();

  console.log("PrivateRoute isAuthenticated:", isAuthenticated);

  // If authenticated, render the nested routes; otherwise, redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
