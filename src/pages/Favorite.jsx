import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import FavoriteCard from "../components/FavoriteCard";
import Loading from "../components/Loading";

const Favorite = () => {
  const { user } = useAuthContext();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch favorites when the component mounts or when the user changes
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = user?.token;
      if (!user || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/favorite", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFavorites(
          response.data.filter(
            (favorite) => favorite.recipeId && favorite.recipeId._id
          )
        );
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Error fetching favorites. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = async (recipeId) => {
    const token = user?.token;
    if (!user || !token) {
      console.error("Token is not available");
      return;
    }

    // Optimistically update the UI
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.recipeId._id !== recipeId
    );
    setFavorites(updatedFavorites);

    try {
      await axios.delete(`http://localhost:4000/api/favorite/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("");

      // Fetch the updated list of favorites even if the deletion fails
      fetchFavorites();
    }
  };

  // Function to fetch favorites
  const fetchFavorites = async () => {
    const token = user?.token;
    if (!user || !token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/api/favorite", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites(
        response.data.filter(
          (favorite) => favorite.recipeId && favorite.recipeId._id
        )
      );
    } catch (error) {
      console.log("");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!loading && favorites.length === 0) {
    return <p>No Favorites Found</p>;
  }

  return (
    <div>
      <div className="w-full">
        <h1 className="text-3xl font-bold">Favorites</h1>
        <hr className="h-[2px] border border-stone-200 mt-[20px] mb-[20px]" />
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {favorites.map((favorite) => {
          const recipe = favorite.recipeId;

          const ratings =
            recipe.reviews && Array.isArray(recipe.reviews)
              ? recipe.reviews.map((review) => review.rating)
              : [];

          const averageRating =
            ratings.length > 0
              ? ratings.reduce((sum, rating) => sum + rating, 0) /
                ratings.length
              : 0;

          return (
            <FavoriteCard
              key={recipe._id}
              recipeid={recipe._id}
              imageSrc={recipe.image}
              title={recipe.title}
              rating={averageRating}
              creator={recipe.createdBy.username}
              onRemoveFavorite={handleRemoveFavorite}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Favorite;
