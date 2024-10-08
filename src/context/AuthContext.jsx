import { createContext, useReducer, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Define the reducer function
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

// Context provider component
export const AuthContextProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: !!localStorage.getItem("user"),
    user: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.token && user.username) {
        dispatch({ type: "LOGIN", payload: user });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
