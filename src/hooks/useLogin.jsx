import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log("Backend response:", json); // Log the entire response

      if (response.ok && json.token) {
        // Save the user data to local storage
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        console.log("User saved to local storage and dispatched:", json);
        navigate("/recipes");
      } else {
        setError(json.error || "Signup failed");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
