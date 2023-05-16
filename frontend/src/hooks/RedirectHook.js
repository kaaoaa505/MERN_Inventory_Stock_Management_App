import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as AuthSlice from "../redux/Auth/AuthSlice";

const RedirectLoggedoutUser = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function loggedinStatus(path) {
      const cookies = new Cookies();

      const token = cookies.get("token");

      if (token) {
        dispatch(AuthSlice.SET_LOGIN(true));
      } else {
        dispatch(AuthSlice.SET_LOGIN(false));

        navigate(path);
      }
    }

    loggedinStatus(path);
  }, [dispatch, navigate, path]);
};

export default RedirectLoggedoutUser;
