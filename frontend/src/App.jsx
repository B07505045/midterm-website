import './App.css'
import Home from "./Home"
import About from "./About"
import CreateUsers from './CreateUsers';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './Navbar';
import Users from './Users';
import Login from './Login';
import Logout from './Logout';
import Dashboard from './Dashboard';
import AI from './AI';

function App() {
  return (
    <>
    <Router>
        <div className="container">
          <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/CreateUsers" element={<CreateUsers />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/AI" element={<AI />} />
            </Routes>
        </div>
    </Router>
    </>
  )
}

export default App
