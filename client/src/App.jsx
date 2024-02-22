import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import ProtectedLayout from "./components/ProtectedLayout";
import Register from "./pages/Register";
import CreateProject from "./pages/CreateProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<ProtectedLayout />}>
          <Route path="your-work" element={<Home />} />
          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path="new" element={<CreateProject />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
