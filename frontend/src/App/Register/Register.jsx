import { TiUserAdd } from "@react-icons/all-files/ti/TiUserAdd";
import { Link } from "react-router-dom";

import "./Register.scss";

import Card from "../../components/Card/Card";

const Register = () => {
  return (
    <div className="RegisterComponent">
      <Card>
        <div className="form">
          <div className="--flex-center">
            <TiUserAdd size={50} color="gray" />
          </div>

          <h2>Register</h2>

          <form>
            <input type="text" name="name" placeholder="Name..." />
            <input type="email" name="email" placeholder="Email..." />
            <input type="password" name="password" placeholder="Password..." />
            <input type="password" name="passwordConfirm" placeholder="Confirm Password..." />
            <button className="--btn --btn-primary --btn-block">Register</button>
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
