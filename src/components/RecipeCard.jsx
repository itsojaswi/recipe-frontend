import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeCard = ({ recipe }) => {
  let token;
  const { user } = useAuthContext();
  if (user) {
    token = user.token;
  }

  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user) {
        console.error("User is not logged in");
      }
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/favorite/check/${recipe._id}`,
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
      }
    };

    checkIfFavorite();
  }, [recipe._id, token, user]);

  const handleFavoriteClick = async () => {
    try {
      setIsFavorite(!isFavorite);

      const response = await axios.post(
        "http://localhost:4000/api/favorite/toggle",
        {
          recipeId: recipe._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsFavorite(response.data.message.includes("added"));
        console.log(response.data.message);
      } else {
        console.error("Failed to toggle favorite:", response.data.message);
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <div className="bg-white rounded-xl p-2 shadow-xl hover:scale-105 transition-transform duration-400">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-xl w-full h-48 object-cover mb-4"
      />
      <h3 className="text-xl font-semibold truncate">{recipe.title}</h3>
      <div className="flex items-center text-gray-500 mt-2">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="flex justify-between w-full ml-2">
          <div className="w-[120px]">
            <p className="text-sm truncate">by {recipe.author}</p>
          </div>
          <p className="text-sm">{recipe.cookTime} min</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) =>
            star <= rating ? (
              <Star
                key={star}
                className="h-4 w-4 text-yellow-500 cursor-pointer"
                onClick={() => setRating(star)}
              />
            ) : (
              <Star
                key={star}
                className="h-4 w-4 text-gray-400 cursor-pointer"
                onClick={() => setRating(star)}
              />
            )
          )}
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`rounded-full mb-3 ${
            isFavorite ? "text-[#B55D51]" : "text-gray-400"
          }`}
        >
          {isFavorite ? (
            <FaBookmark className="h-4 w-4" />
          ) : (
            <FaRegBookmark className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
