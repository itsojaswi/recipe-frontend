import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const RecipeCard = ({
  imageSrc,
  title,
  rating,
  creator,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <div className="rounded-[15px] shadow-lg overflow-hidden bg-white ">
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-2 w-full">
        <div className="flex gap-2 items-center">
          <img src={imageSrc} alt="" className="h-8 w-8 rounded-full" />
          <p className="text-sm text-gray-500 font-semibold">by bruh</p>
        </div>
        <div className="flex justify-between items-center ">
          <div className=" w-full">
            <h3 className="text-lg font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </h3>
          </div>
          <button onClick={toggleFavorite}>
            <FaBookmark className="text-[#B55D51]" />
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default RecipeCard;
