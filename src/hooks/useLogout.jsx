import { useAuthContext } from "../hooks/useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // update the state to logout
    dispatch({ type: "LOGOUT" });
    // remove the user from local storage
    localStorage.removeItem("user");
  };
  return { logout };
};
