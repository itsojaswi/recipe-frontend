import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const response = await axios.post("/api/login", { email, password });

    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });

    // Save the token to localStorage
    localStorage.setItem("authToken", response.data.token);
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.error });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("authToken");
  dispatch({ type: "LOGOUT" });
};
