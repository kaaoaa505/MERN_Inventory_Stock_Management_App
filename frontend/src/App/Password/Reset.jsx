import { CgPassword } from "@react-icons/all-files/cg/CgPassword";
import { Link } from "react-router-dom";

import "./Reset.scss";

import Card from "../../components/Card/Card";

const Reset = () => {
  return (
    <div className="ResetComponent">
      <Card>
        <div className="form">
          <div className="--flex-center">
            <CgPassword size={50} color="gray" />
          </div>

          <h2>Reset Password</h2>

          <form>
            <input type="password" name="password" placeholder="New Password..." />
            <input type="password" name="passwordConfirm" placeholder="Confirm New Password..." />
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
