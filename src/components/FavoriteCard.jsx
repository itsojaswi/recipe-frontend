import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useFavorite } from "../hooks/useFavorite";

const RecipeCard = ({
  recipeid,
  imageSrc,
  title,
  rating,
  creator,
  onRemoveFavorite,
}) => {
  const { isFavorite, toggleFavorite } = useFavorite(recipeid);

  const handleToggleFavorite = () => {
    toggleFavorite();
    if (isFavorite) {
      onRemoveFavorite(recipeid); // Remove from frontend if unfavorited
    }
  };

  return (
    <div className="rounded-[15px] shadow-lg overflow-hidden bg-white transition-transform hover:scale-105 ">
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-2">
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.45 2.104 10.55 2.104 10.951 2.927l1.7 3.429 3.788.584c.842.13 1.175 1.16.568 1.755l-2.739 2.67.646 3.772c.144.84-.74 1.487-1.488 1.09L10 14.347l-3.215 1.69c-.749.396-1.633-.251-1.488-1.09l.646-3.772-2.739-2.67c-.607-.595-.274-1.625.568-1.755l3.788-.584 1.7-3.429z" />
            </svg>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={handleToggleFavorite}>
            {isFavorite ? (
              <FaBookmark className="text-[#B55D51]" />
            ) : (
              <FaRegBookmark className="text-gray-400" />
            )}
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">by {creator}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
