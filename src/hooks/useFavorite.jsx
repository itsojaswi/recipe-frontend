import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "sonner";

export const useFavorite = (recipeId) => {
  const { user } = useAuthContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const token = user?.token;

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user) return;

      try {
        const response = await axios.get(
          `http://localhost:4000/api/favorite/check/${recipeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setIsFavorite(response.data.isFavorite);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkIfFavorite();
  }, [recipeId, token, user]);

  const toggleFavorite = async () => {
    if (!user) return;

    try {
      setIsFavorite((prev) => !prev);

      const response = await axios.post(
        "http://localhost:4000/api/favorite/toggle",
        {
          recipeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsFavorite(response.data.message.includes("added"));
        toast.success(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#BD6E64",
            color: "white",
          },
        });
      } else {
        console.error("Failed to toggle favorite:", response.data.message);
        setIsFavorite((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setIsFavorite((prev) => !prev);
    }
  };

  return { isFavorite, toggleFavorite };
};
