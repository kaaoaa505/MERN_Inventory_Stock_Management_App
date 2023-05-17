import axios from "axios";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
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
import ProductCreate from "./Product/ProductCreate";
import ProductEdit from "./Product/ProductEdit";
import ProductShow from "./Product/ProductShow";
import ProfileEdit from "./Profile/ProfileEdit";
import ProfileShow from "./Profile/ProfileShow";

import * as AuthSlice from "../redux/Auth/AuthSlice";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loggedinStatus(){
      const cookies = new Cookies();

      const token = cookies.get("token");

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
          <Route path="/product/add" Component={ProductCreate} />
          <Route path="/products/show/:id" Component={ProductShow} />
          <Route path="/products/update/:id" Component={ProductEdit} />
          <Route path="/profile/show" Component={ProfileShow} />
          <Route path="/profile/edit" Component={ProfileEdit} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
