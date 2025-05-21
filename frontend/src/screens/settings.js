import React from "react";
import "../assets/styles/settings/settings.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBarprofile";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const Settings = () => {
  return (
    <div className="settings-container">
      <Sidebar />
      <div className="settings-content">
       
      <div className="navbar-wrapper">
          <Navbar />
        </div>
        <h1 className="settings-title">Settings</h1>

        <div className="settings-buttons">
          <div className="button-row">
            <Link to="/forgot-password-profile">
              <button className="btn btn-blue">Forgot Password ?</button>
            </Link>

            <Link to="/change-password-profile">

              <button className="btn btn-blue">Change Password ?</button>
              </Link>
          </div>

          <div className="button-row">
          <Link to="/change-email-profile">

              <button className="btn btn-green">Change Email ?</button>
              </Link>
              <Link to="/delete-account">

              <button className="btn btn-red">Delete Account ?</button>
              </Link>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Settings;
