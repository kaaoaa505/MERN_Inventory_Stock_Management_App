import { TiMail } from "@react-icons/all-files/ti/TiMail";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Forgot.scss";

import Card from "../../components/Card/Card";
import * as AuthService from "../../services/AuthService";
import Loading from "../../components/Loading/Loading";

const Forgot = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const forgotSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      return toast.error("Email is required.");
    }

    if (!AuthService.validateEmail(email)) {
      return toast.error("Invalid Email.");
    }

    const userData = {
      email,
    };

    try {
      setIsLoading(true);

      await AuthService.forgot(userData);

      navigate("/login");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);

      return toast.error(error.message);
    }
  };

  return (
    <div className="ForgotComponent">
      <Card>
        <div className="form">

          {isLoading && <Loading />}

          <div className="--flex-center">
            <TiMail size={50} color="gray" />
          </div>

          <h2>Forgot Password</h2>

          <form onSubmit={forgotSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email..."
              value={email}
              onChange={handleInputChange}
            />
            <button className="--btn --btn-primary --btn-block">
              Send Reset Email
            </button>
          </form>

          <br />

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

export default Forgot;
