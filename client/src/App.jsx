import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Profile from "./pages/Profile";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<ProtectedLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="project" element={<Project />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
