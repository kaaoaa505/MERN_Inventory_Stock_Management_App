import { BiLogIn } from "@react-icons/all-files/bi/BiLogIn";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Login.scss";

import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import * as AuthSlice from "../../redux/Auth/AuthSlice";
import * as AuthService from "../../services/AuthService";

const initialFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const { email, password } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return toast.error("Email, and Password are required.");
    }

    if (!AuthService.validateEmail(email)) {
      return toast.error("Invalid Email.");
    }

    if (password.length < 6) {
      return toast.error("Password length must be more than 6 characters.");
    }

    const userData = {
      email,
      password,
    };

    try {
      setIsLoading(true);

      const data = await AuthService.login(userData);

      if (data && data.name) {
        dispatch(AuthSlice.SET_LOGIN(true));
        dispatch(AuthSlice.SET_NAME(data.name));

        navigate("/dashboard");
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return toast.error(error.message);
    }
  };

  return (
    <div className="LoginComponent">
      <Card>
        <div className="form">
          
          {isLoading && <Loading />}

          <div className="--flex-center">
            <BiLogIn size={50} color="gray" />
          </div>

          <h2>Login</h2>

          <form onSubmit={loginSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email..."
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password..."
              value={password}
              onChange={handleInputChange}
            />
            <button className="--btn --btn-primary --btn-block">Login</button>
          </form>

          <span className="register">
            <p>
              <Link to="/forgot">Forgot Password</Link>
            </p>
          </span>

          <span className="--flex-between">
            <p className="--flex-start">
              <Link to="/">Home</Link>
            </p>
            <p className="--flex-end">
              <Link to="/register">Register</Link>
            </p>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
