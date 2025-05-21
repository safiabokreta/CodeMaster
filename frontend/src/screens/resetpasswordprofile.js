import React, { useState } from "react";
import "../assets/styles/settings/resetpasswordprofile.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBarprofile";
import { Link } from "react-router-dom";  

const ResetPasswordProfile = () => {
  const [bio, setBio] = useState("Code enthusiast, bug slayer, and coffee-fueled problem solver.");
  const [name, setName] = useState("Put New Password ...");
  const [namee, setNamee] = useState("Confirm New Password ...");
  const [code, setCode] = useState("Enter code...");

  const handleSave = () => {
    // Here you would handle saving logic, e.g. API call
    console.log("Profile saved:", { name, bio });
  };

  return (
    <div className="profilee4-container">
      <Sidebar />
      <div className="profile4-content">
        <div>
          <h1 className="section-title">Settings</h1>
          <div className="profile4-main">
            <div className="edit-form4">
              <h2 className="labell4">Reset your Password</h2>
             
              <div className="form4-group">
                <label className="labelll">Enter email code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="input-field"
                  disabled
                />
              </div>

              <div className="form4-group">
                <label className="labelll">New Password</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  disabled
                />
              </div>

              <div className="form4-group">
                <label className="labelll">Confirm New Password</label>
                <input
                  type="text"
                  value={namee}
                  onChange={(e) => setNamee(e.target.value)}
                  className="input-field"
                  disabled
                />
              </div>

             <div className="but4">
                           <Link to="/successful-reset-password-profile">
              
             <button className="save-btn" >
                Reset Password
              </button>
              </Link>
             </div>
            </div>
          </div>
        </div>
        <div className="navbar-wrapper4">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordProfile;
