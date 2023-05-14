import { CgPassword } from "@react-icons/all-files/cg/CgPassword";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "./Reset.scss";

import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import * as AuthService from "../../services/AuthService";


const initialFormData = {
  password: "",
  passwordConfirm: "",
};

const Reset = () => {
  const params = useParams();
  let token = params.token;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const { password, passwordConfirm } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetSubmit = async (event) => {
    event.preventDefault();

    if (!password || !passwordConfirm) {
      return toast.error("Password and Password Confirm are required.");
    }

    if (password !== passwordConfirm) {
      return toast.error("Password and Password Confirm doesn't match.");
    }

    if (password.length < 6) {
      return toast.error("Password length must be more than 6 characters.");
    }

    const userData = {
      password,
    };

    try {
      setIsLoading(true);

      await AuthService.reset(userData, token);

      navigate("/login");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return toast.error(error.message);
    }
  };

  return (
    <div className="ResetComponent">
      <Card>
        <div className="form">
          {isLoading && <Loading />}

          <div className="--flex-center">
            <CgPassword size={50} color="gray" />
          </div>

          <h2>Reset Password</h2>

          <form onSubmit={resetSubmit}>
            <input
              type="password"
              name="password"
              placeholder="New Password..."
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm New Password..."
              value={passwordConfirm}
              onChange={handleInputChange}
            />
            <button className="--btn --btn-primary --btn-block">Reset</button>
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

export default Reset;
