import React from "react";
import MyRecipe from "../components/MyRecipe";
import { Search, Upload } from "lucide-react";

const AddRecipes = () => {
  const recipe = [
    {
      imageSrc: "./chowmin.jpg",
      title: "Green Salad Recipes",
      initialRating: 3,
      initialBookmarked: true,
    },
  ];
  return (
    <div className="h-[830px]">
      <div className="w-full">
        <h1 className="text-3xl font-bold">Add Recipe</h1>
        <hr className="h-[2px] border border-stone-200 mt-[20px] " />
      </div>
    </div>
  );
};

export default AddRecipes;
