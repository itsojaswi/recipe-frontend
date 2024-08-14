import { useState } from "react";
import { Star, Heart, Heart as HeartOutline } from "lucide-react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  const [rating, setRating] = useState(recipe.rating);
  const [isFavorite, setIsFavorite] = useState(recipe.favorite);

  const handleStarClick = (index) => {
    setRating(index + 1); // Set rating based on the clicked star
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite); // Toggle favorite status
  };

  return (
    <div className="bg-white rounded-xl p-2 shadow-xl hover:scale-105 transition-transform duration-400  ">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="rounded-xl w-full h-34 object-cover mb-4 "
      />
      <h3 className="text-xl font-semibold truncate">{recipe.name}</h3>
      <div className="flex items-center text-gray-500 mt-[12px]">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-[30px] w-[30px] rounded-[100%]"
        />
        <div className="flex justify-between w-full">
          <div className="w-[120px]">
            <p className="text-sm ml-[8px] truncate">by {recipe.author}</p>
          </div>
          <p className="text-sm ">{recipe.time} min</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 ">
        <div className="flex ">
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
          className={` rounded-full mb-3 ${
            isFavorite ? "text-[#B55D51]" : "text-gray-400"
          }`}
        >
          {isFavorite ? (
            <FaBookmark className="h-4 w-4 text-[#B55D51]" />
          ) : (
            <FaRegBookmark className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
