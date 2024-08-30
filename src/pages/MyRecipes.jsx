import React, { useState, useEffect } from "react";
import axios from "axios";
import MyRecipeCard from "../components/MyRecipeCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const MyRecipesPage = () => {
  const { user } = useAuthContext();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const token = user?.token;

      if (!user || !token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:4000/api/recipe/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user]);

  const handleEdit = (recipeId) => {
    // Implement your edit logic here
    console.log("Edit recipe with id:", recipeId);
  };

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:4000/api/recipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">My Recipes</h1>
      </div>
      <hr className="h-[2px] border border-stone-200 mt-[20px] " />
      <div className="flex justify-end">
        <Link to={"/add-recipe"}>
          <Button className="h-[20px] bg-red-200 hover:bg-red-200 p-4 text-lg rounded-[10px] mt-[15px]">
            Add Recipe
          </Button>
        </Link>
        ;
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 mt-[10px]">
          {recipes.map((recipe) => (
            <MyRecipeCard
              key={recipe._id}
              imageSrc={recipe.image}
              title={recipe.title}
              creator={recipe.createdBy.username}
              onEdit={() => handleEdit(recipe._id)}
              onDelete={() => handleDelete(recipe._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipesPage;
