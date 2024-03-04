import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Login, Register } from "./pages/auth";
import Home from "./pages/Home";
import Profile from "./pages/profile/Profile";
import ProtectedLayout from "./components/ProtectedLayout";
import {
  Board,
  Project,
  Projects,
  CreateProject,
  Details,
  Access,
  Files,
  File,
} from "./pages/project";

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
            <Route path=":id" element={<Project />}>
              <Route path="board" element={<Board />} />
              <Route path="resources">
                <Route index element={<Files />} />
                <Route path=":fileId" element={<File />} />
              </Route>
              <Route path="details" element={<Details />} />
              <Route path="access" element={<Access />} />
            </Route>
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
