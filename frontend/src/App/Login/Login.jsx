import { BiLogIn } from "@react-icons/all-files/bi/BiLogIn";
import { Link } from "react-router-dom";

import "./Login.scss";

import Card from "../../components/Card/Card";

const Login = () => {
  return (
    <div className="LoginComponent">
      <Card>
        <div className="form">
          <div className="--flex-center">
            <BiLogIn size={50} color="gray" />
          </div>

          <h2>Login</h2>

          <form>
            <input type="email" name="email" placeholder="Email..." />
            <input type="password" name="password" placeholder="Password..." />
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
