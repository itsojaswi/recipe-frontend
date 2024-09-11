import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import Favorite from "./pages/Favorite";
import Layout from "./components/layouts/Layout";
import MealPlanner from "./pages/MealPlanner";
import AddRecipe from "./pages/AddRecipe";
import PrivateRoute from "./routes/PrivateRoute";
import MyRecipes from "./pages/MyRecipes";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import EditRecipe from "./pages/EditRecipe";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/" element={<Recipes />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/mealplanner" element={<MealPlanner />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/recipe/:recipeId" element={<Recipe />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/edit-recipe" element={<EditRecipe />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/Search" element={<Search />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
