import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import MyRecipe from "../components/MyRecipe";
import FavoriteCard from "../components/FavoriteCard";

const Favorite = () => {
  const { user } = useAuthContext();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = user?.token;

      if (!user || !token) {
        console.error("Token is not available");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/favorite", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  return (
    <div>
      <div className="w-full">
        <h1 className="text-3xl font-bold">Favorites</h1>
        <hr className="h-[2px] border border-stone-200 mt-[20px] mb-[20px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          favorites.map((favorite) => {
            const recipe = favorite.recipeId; // Access the recipeId object
            return (
              <FavoriteCard
                key={recipe._id}
                imageSrc={recipe.image}
                title={recipe.title}
                rating={recipe.rating}
                creator={recipe.creator}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Favorite;
