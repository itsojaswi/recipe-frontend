import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import Favorite from "./pages/Favorite";
import Layout from "./components/layouts/Layout";
import SearchBar from "./components/SearchBar";
import MealPlanner from "./pages/MealPlanner";
import AddRecipes from "./pages/AddRecipes";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Layout />}>
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/" element={<Recipes />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/mealplanner" element={<MealPlanner />} />
            <Route path="/addrecipe" element={<AddRecipes />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
