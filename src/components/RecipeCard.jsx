import { useFavorite } from "../hooks/useFavorite";
import { Link } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorite(recipe._id);

  return (
    <div className="bg-white rounded-xl p-2 shadow-xl hover:scale-105 transition-transform duration-400">
      <Link to={`/recipe/${recipe._id}`}>
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
            className="h-6 w-6 rounded-full object-cover"
          />
          <div className="flex justify-between w-full ml-2">
            <div className="w-[120px]">
              <p className="text-sm truncate">by {recipe.createdBy.username}</p>
            </div>
            <p className="text-sm">{recipe.cookTime} min</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < recipe.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.45 2.104 10.55 2.104 10.951 2.927l1.7 3.429 3.788.584c.842.13 1.175 1.16.568 1.755l-2.739 2.67.646 3.772c.144.84-.74 1.487-1.488 1.09L10 14.347l-3.215 1.69c-.749.396-1.633-.251-1.488-1.09l.646-3.772-2.739-2.67c-.607-.595-.274-1.625.568-1.755l3.788-.584 1.7-3.429z" />
            </svg>
          ))}
        </div>
        <button
          onClick={toggleFavorite}
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
