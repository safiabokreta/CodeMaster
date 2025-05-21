import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/navBar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item" onClick={() => navigate("/Home")}>Home</li>
        <li className="nav-item" onClick={() => navigate("/courses")}>Courses</li>
        <li className="nav-item" onClick={() => navigate("/dashboard")} >Profile</li>
        <li className="nav-item" onClick={() => navigate("/about-us")}>About Us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
//onClick={() => navigate("/dashboard")}