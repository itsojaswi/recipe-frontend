import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import RecipesList from "../components/RecipesList";
import { User } from "lucide-react";
import { PiBowlFoodBold } from "react-icons/pi";

const categories = [
  { id: "all", name: "All Foods", icon: <PiBowlFoodBold /> },
  { id: "healthy", name: "Healthy Foods", icon: <User /> },
  { id: "recipes", name: "Healthy Recipes", icon: <User /> },
  { id: "quick", name: "Quick and Fast", icon: <User /> },
];
const recipes = [
  {
    id: 1,
    name: "Chinese Noodles",
    author: "maddie",
    time: 40,
    rating: 2,
    favorite: false,
    image: "./chowmin.jpg",
  },
  {
    id: 2,
    name: "Burger King",
    author: "harry",
    time: 25,
    rating: 3,
    favorite: false,
    image: "./chowmin.jpg",
  },
  {
    id: 3,
    name: "Burger King",
    author: "harry",
    time: 25,
    rating: 3,
    favorite: false,
    image: "./chowmin.jpg",
  },
  {
    id: 4,
    name: "Burger King",
    author: "harry",
    time: 25,
    rating: 3,
    favorite: false,
    image: "./chowmin.jpg",
  },
];

const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredRecipes =
    selectedCategory === "all"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  return (
    <div>
      <div className="w-full">
        <h1 className="text-3xl font-bold ">Discover Recipes</h1>
        <hr className="h-[2px] border border-stone-200 mt-[20px] " />
      </div>
      <div className="">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <h2 className="text-2xl font-semibold mt-6 mb-6">All Foods</h2>
        <RecipesList recipes={filteredRecipes} />
      </div>
    </div>
  );
};

export default Recipes;
