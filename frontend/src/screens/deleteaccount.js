import React, { useState } from "react";
import "../assets/styles/settings/deleteaccount.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBarprofile";
import { Link, useNavigate } from "react-router-dom";  


const ChangePasswordProfile = () => {
  const [bio, setBio] = useState("Code enthusiast, bug slayer, and coffee-fueled problem solver.");
  const [name, setName] = useState("Put your last password ...");
  const [namee, setNamee] = useState("Put your new password ...");
  const [nameee, setNameee] = useState("Confirm your new password ...");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    // Here you would handle saving logic, e.g. API call
    console.log("Profile saved:", { name, bio });
  };

  const handleDelete = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setError("No user email found.");
      return;
    }
    const res = await fetch("http://127.0.0.1:8000/api/auth/delete-account-api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.clear();
      navigate("/signup");
    } else {
      setError(data.error || "Failed to delete account.");
    }
  };

  return (
    <div className="profile10-container">
      <Sidebar />
      <div className="profile10-content">
        <div className="delete-10">
          <h1 className="section-title">Settings</h1>
          <div className="profile10-main">
            <div className="edit-form10">
              <h2 className="labell10">Delete Account</h2>

              <div className="form10-group">
                <label className="labelll10">Enter your Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Put your last password ..."
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="button-group">
                <div className="delete-btn-wrapper">
                  <button className="savee-btn" onClick={handleDelete}>
                    Delete Account
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="navbar-wrapper10">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordProfile;
