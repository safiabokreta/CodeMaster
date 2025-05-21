import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/navBarprofile.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbarprofile">
      <ul className="nav-listprofile">
        <li className="nav-itemprofile" onClick={() => navigate("/Home")}>Home</li>
        <li className="nav-itemprofile" onClick={() => navigate("/courses")}>Courses</li>
        <li className="nav-itemprofile" onClick={() => navigate("/profile")} >Profile</li>
        <li className="nav-itemprofile" onClick={() => navigate("/about-us")}>AboutUs</li>
      </ul>
    </nav>
  );
};

export default Navbar;
//onClick={() => navigate("/dashboard")}