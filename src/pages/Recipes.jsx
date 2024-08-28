import { useState, useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import RecipesList from "../components/RecipesList";
import { MdOutlineFoodBank } from "react-icons/md";
import { User } from "lucide-react";
import { PiBowlFoodBold } from "react-icons/pi";
import { GiOpenedFoodCan } from "react-icons/gi";
import { IoFastFoodSharp } from "react-icons/io5";
import { LuDessert } from "react-icons/lu";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

// Define the categories for filtering recipes
const categories = [
  { id: "All", name: "All Foods", icon: <PiBowlFoodBold /> },
  { id: "Healthy", name: "Healthy Foods", icon: <GiOpenedFoodCan /> },
  { id: "Indian", name: "Indian Recipes", icon: <MdOutlineFoodBank /> },
  { id: "Italian", name: "Italian Recipes", icon: <IoFastFoodSharp /> },
  { id: "Dessert", name: "Dessert & sweets", icon: <LuDessert /> },
];

const Recipes = () => {
  let token;
  const { user } = useAuthContext();
  if (user) {
    token = user.token;
  }

  // State variables for recipes, error, loading, and selected category
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch recipes from the API
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/recipe", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Filter recipes based on the selected category
  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.tags.includes(selectedCategory));

  // Get the name of the selected category
  const selectedCategoryName =
    categories.find((category) => category.id === selectedCategory)?.name ||
    "All Foods";

  return (
    <div>
      <div className="w-full">
        <h1 className="text-3xl font-bold">Discover Recipes</h1>
        <hr className="h-[2px] border border-stone-200 mt-[20px]" />
      </div>
      <div className="">
        {/* Render the category filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <h2 className="text-2xl font-semibold mt-6 mb-6">
          {selectedCategoryName}
        </h2>
        {/* Render the list of recipes */}
        <RecipesList recipes={filteredRecipes} />
      </div>
    </div>
  );
};

export default Recipes;
