import { useState, useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import RecipesList from "../components/RecipesList";
import { User } from "lucide-react";
import { PiBowlFoodBold } from "react-icons/pi";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const categories = [
  { id: "all", name: "All Foods", icon: <PiBowlFoodBold /> },
  { id: "healthy", name: "Healthy Foods", icon: <User /> },
  { id: "recipes", name: "Healthy Recipes", icon: <User /> },
  { id: "quick", name: "Quick and Fast", icon: <User /> },
];

const Recipes = () => {
  let token;
  const { user } = useAuthContext();
  if (user) {
    token = user.token;
  }

  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
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
