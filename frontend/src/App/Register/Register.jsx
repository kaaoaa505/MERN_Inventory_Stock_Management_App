import { TiUserAdd } from "@react-icons/all-files/ti/TiUserAdd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Register.scss";

import Card from "../../components/Card/Card";
import * as AuthService from "../../services/AuthService";
import * as AuthSlice from "../../redux/Auth/AuthSlice";
import Loading from "../../components/Loading/Loading";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const { name, email, password, passwordConfirm } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const registerSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Name, Email, and Password are required.");
    }

    if (!AuthService.validateEmail(email)) {
      return toast.error("Invalid Email.");
    }

    if (password.length < 6) {
      return toast.error("Password length must be more than 6 characters.");
    }

    if (password !== passwordConfirm) {
      return toast.error("Password doesn't match Confirm Password.");
    }

    const userData = {
      name,
      email,
      password,
    };

    try {

      setIsLoading(true);

      const data = await AuthService.registerUser(userData);

      dispatch(AuthSlice.SET_LOGIN(true))
      dispatch(AuthSlice.SET_NAME(data.name))

      setIsLoading(false);

      navigate('/dashboard');
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  return (
    <div className="RegisterComponent">
      <Card>
        <div className="form">
          {isLoading && <Loading />}
          <div className="--flex-center">
            <TiUserAdd size={50} color="gray" />
          </div>

          <h2>Register</h2>

          <form onSubmit={registerSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name..."
              value={name}
              onChange={handleInputChange}
            />
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
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password..."
              value={passwordConfirm}
              onChange={handleInputChange}
            />
            <button className="--btn --btn-primary --btn-block">
              Register
            </button>
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
              <Link to="/login">Login</Link>
            </p>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
