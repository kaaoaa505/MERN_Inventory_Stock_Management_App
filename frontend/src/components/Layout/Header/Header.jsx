import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as AuthService from "../../../services/AuthService";
import * as AuthSlice from "../../../redux/Auth/AuthSlice";
import Loading from "../../../components/Loading/Loading";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(AuthSlice.selectName);

  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    try {
      setIsLoading(true);
      
      dispatch(AuthSlice.SET_LOGIN(false));
      dispatch(AuthSlice.SET_NAME(""));
      dispatch(AuthSlice.SET_USER({}));
      
      await AuthService.logout();
      
      setIsLoading(false);

      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return toast.error(error.message);
    }
  };

  return (
    <div className="HeaderComponent --pad header">
      {isLoading && <Loading />}

      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{name}</span>
        </h3>

        <button className="--btn --btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <hr />
    </div>
  );
};

export default Header;
