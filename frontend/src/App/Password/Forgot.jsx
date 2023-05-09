import { TiMail } from "@react-icons/all-files/ti/TiMail";
import { Link } from "react-router-dom";

import "./Forgot.scss";

import Card from "../../components/Card/Card";

const Forgot = () => {
  return (
    <div className="ForgotComponent">
      <Card>
        <div className="form">
          <div className="--flex-center">
            <TiMail size={50} color="gray" />
          </div>

          <h2>Forgot Password</h2>

          <form>
            <input type="email" name="email" placeholder="Email..." />
            <button className="--btn --btn-primary --btn-block">Send Reset Email</button>
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
