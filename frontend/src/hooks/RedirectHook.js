import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as AuthSlice from "../redux/Auth/AuthSlice";

const RedirectLoggedoutUser = (path) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {
    async function loggedinStatus(path){
      let token = '';
      if(localStorage.getItem("token")){
        token = JSON.parse(localStorage.getItem("token"));
      }

      if (token) {
        dispatch(AuthSlice.SET_LOGIN(true));
      }else{
        dispatch(AuthSlice.SET_LOGIN(false));

        navigate(path);
      }
    } 

    loggedinStatus(path);
  }, [dispatch, navigate, path]);
}

export default RedirectLoggedoutUser;