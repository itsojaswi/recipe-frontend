import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipe from "./pages/Recipe";
import Favorite from "./pages/Favorite";
import Layout from "./components/layouts/Layout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Recipe />} />
            <Route path="/favorite" element={<Favorite />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
