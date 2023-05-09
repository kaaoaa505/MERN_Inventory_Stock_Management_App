import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Forgot from "./Password/Forgot";
import Reset from "./Password/Reset";

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
    </div>
  );
}

export default App;
