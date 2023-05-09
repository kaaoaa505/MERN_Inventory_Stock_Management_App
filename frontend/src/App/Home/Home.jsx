import { FaTablets } from "@react-icons/all-files/fa/FaTablets";
import { Link } from "react-router-dom";

import "./Home.scss";

const Home = () => {
  return (
    <div className="HomeComponent">

      <nav className="container --flex-between">
        <div className="logo">
          <FaTablets size={50} />
          <h1 className="home-title">MERN Stack</h1>
        </div>

        <ul className="home-links">
          <li>
            <button className="--btn">
            <Link to="/register">Register</Link>
            </button>
          </li>

          <li>
            <button className="--btn">
              <Link to="/login">Login</Link>
            </button>
          </li>

          <li>
            <button className="--btn">
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
        </ul>
      </nav>

      <section className="container hero">
        <div className="hero-text">
          NodeJs Frontend(React) & Backend(Express) Management System.
          <br />
          MongoDB Database connection with mongoose.
        </div>
        <div className="hero-image">
          <img src="/mern-stack.png" alt="mern Stack" />
        </div>
      </section>
    </div>
  );
};

export default Home;
