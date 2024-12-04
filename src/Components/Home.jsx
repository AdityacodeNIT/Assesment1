import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-logo">TaskManager</div>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="nav-link">
              Tasks
            </Link>
          </li>
        </ul>
      </nav>
      <header className="home-header">
        <div className="header-content">
          <h1>Welcome to TaskManager</h1>
          <p>Organize your tasks efficiently and stay productive.</p>
          <Link to="/tasks" className="cta-button">
            Get Started
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Home;
