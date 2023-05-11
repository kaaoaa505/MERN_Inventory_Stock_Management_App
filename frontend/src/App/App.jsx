import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Forgot from "./Password/Forgot";
import Reset from "./Password/Reset";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="AppComponent">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/forgot" Component={Forgot} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/reset/:token" Component={Reset} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
