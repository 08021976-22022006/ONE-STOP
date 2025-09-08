import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}