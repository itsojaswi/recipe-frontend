import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const SearchRecipes = () => {
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeResults, setRecipeResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.token || searchQuery.length === 0) {
      setRecipeResults([]);
      setUserResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const headers = {
          Authorization: `Bearer ${user.token}`,
        };

        const response = await axios.get(
          `http://localhost:4000/api/recipe/search`,
          {
            headers,
            Authorization: `Bearer ${user.token}`,
            params: { query: searchQuery },
          }
        );

        setRecipeResults(response.data.recipes);
        setUserResults(response.data.users);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce API calls to avoid excessive requests
    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, user]);

  return (
    <div className="p-4 w-full mx-auto h-full bg-white rounded shadow overflow-auto scrollbar-hide">
      <div className="relative w-full mb-4">
        <div className="flex items-center border-b pb-2 w-full">
          <input
            type="text"
            placeholder="Search for a recipe or user..."
            className="flex-grow p-2 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="text-gray-400 w-5 h-5 hover:text-gray-800" />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-xl">Users</h2>
        <ul className="mt-2">
          {userResults.length > 0 ? (
            userResults.map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b"
              >
                <Link to={`/profile/${user._id}`}>
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 mr-2 rounded-full"
                    ></img>
                    <span>{user.username}</span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p>No users found</p>
          )}
        </ul>
      </div>
      {/* Display results for recipes */}
      <div className="mt-4">
        <h2 className="font-bold text-xl">Recipes</h2>
        <ul className="mt-2">
          {recipeResults.length > 0 ? (
            recipeResults.map((recipe, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b"
              >
                <Link to={`/recipe/${recipe._id}`}>
                  <div className="flex items-center">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-10 h-10 mr-2 rounded-full"
                    />
                    <span>{recipe.title}</span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchRecipes;
