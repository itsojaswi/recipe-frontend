import React, { useState, useEffect } from "react";
import axios from "axios";
import MyRecipeCard from "../components/MyRecipeCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const MyRecipesPage = () => {
  const { user } = useAuthContext();
  const [recipes, setRecipes] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
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
        console.error("Error fetching recipes:", error.response.status);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user]);

  const handleEdit = async (recipeId, updatedRecipeData) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/recipe/${recipeId}`,
        updatedRecipeData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Assuming you have a function or state to update the recipe in your component
      console.log("Updated Recipe data:", response.data);
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === recipeId ? response.data : recipe
        )
      );
    } catch (error) {
      console.error("Error editing recipe:", error);
    }
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

  if (loading) {
    return <Loading />;
  }

  if (recipes && recipes.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col m-auto">
        <h1 className="font-bold text-3xl ">No recipes yet</h1>
        <Link to={"/add-recipe"}>
          <Button className="text-white h-[20px] bg-[#B55D51] hover:bg-[#B55D51] p-4 text-lg rounded-[10px] mt-[15px]"></Button>
        </Link>
      </div>
    );
  }

  if (error && error.response.status === 404) {
    return (
      <div className="flex justify-center items-center flex-col m-auto">
        <img src="/recipe.svg" alt="" className="w-[200px] h-[200px] " />

        <h1 className="font-bold text-3xl">No recipes found</h1>
        <Link to={"/add-recipe"}>
          <Button className="text-white h-[20px] bg-[#B55D51] hover:bg-[#B55D51] p-4 text-lg rounded-[10px] mt-[15px]">
            Add Recipe
          </Button>
        </Link>
      </div>
    );
  }

  if (error) {
    return <p>jfdknf</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">My Recipes</h1>
      </div>
      <hr className="h-[2px] border border-stone-200 mt-[20px] " />
      <div className="flex justify-end">
        <Link to={"/add-recipe"}>
          <Button className="text-white h-[20px] bg-[#B55D51] hover:bg-[#B55D51] p-4 text-lg rounded-[10px] mt-[15px]">
            Add Recipe
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 mt-[10px]">
        {recipes &&
          recipes.map((recipe) => (
            <MyRecipeCard
              key={recipe._id}
              recipeId={recipe._id}
              imageSrc={recipe.image}
              title={recipe.title}
              creator={recipe.createdBy.username}
              onEdit={() => handleEdit(recipe._id)}
              onDelete={() => handleDelete(recipe._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default MyRecipesPage;
