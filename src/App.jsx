import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
