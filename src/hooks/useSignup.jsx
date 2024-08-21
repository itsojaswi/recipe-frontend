import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (username, email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setIsLoading(false);
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const json = await response.json();
      console.log("Backend response:", json); // Log the entire response

      if (response.ok && json.token) {
        // Save the user data to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // Update the context with the registered user
        dispatch({ type: "REGISTER", payload: json });
        console.log("User saved to local storage and dispatched:", json);
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

  return { signUp, isLoading, error };
};
