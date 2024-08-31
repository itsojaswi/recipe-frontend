import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyRecipe = ({ imageSrc, title, onEdit, onDelete, recipeId }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/recipe/${recipeId}`}>
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold truncate">{title}</h3>
        <div className="flex space-x-2 mt-4 justify-end">
          <button onClick={onEdit} className="">
            <FaEdit />
          </button>
          <button onClick={onDelete} className="">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRecipe;
