import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from './pages/Landing'
import Login from './pages/Login'
import Home from './pages/Home'
import Project from './pages/Project'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/user/home' element={<Home />}/>
        <Route path='/user/project' element={<Project />}/>
      </Routes>
    </Router>
  )
}

export default App
