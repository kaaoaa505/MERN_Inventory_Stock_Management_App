import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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

import * as AuthSlice from "../redux/Auth/AuthSlice";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loggedinStatus(){
      let token = '';
      if(localStorage.getItem("token")){
        token = JSON.parse(localStorage.getItem("token"));
      }

      if (token) {
        dispatch(AuthSlice.SET_LOGIN(true));
      }else{
        dispatch(AuthSlice.SET_LOGIN(false));
      }
    } 

    loggedinStatus();
  }, [dispatch]);

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
