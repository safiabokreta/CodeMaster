import React, { useState, useEffect } from "react";
import "../assets/styles/settings/forgotpasswordprofile.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBarprofile";
import { Link } from "react-router-dom";  

const ChangeEmailProfile = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setCurrentEmail(userEmail || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    if (!newEmail.trim()) {
      setErrors({ newEmail: "New email is required" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/public-change-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_email: currentEmail,
          new_email: newEmail
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors({ general: data.error || data.message || "Failed to send verification codes" });
      } else {
        setSuccessMessage("Verification codes have been sent to both your current and new email addresses!");
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
      console.error("Change email error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-bg">
      <div className="forgot-overlay">
        <div className="forgot-modal">
          <h2 className="forgot-title">Change Email</h2>
          <form onSubmit={handleSubmit}>
            <label className="forgot-label">Current Email</label>
            <input
              type="email"
              value={currentEmail}
              readOnly
              className="forgot-input"
            />
            <label className="forgot-label">New Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              className="forgot-input"
              placeholder="Enter your new email"
            />
            {errors.newEmail && <span className="field-error">{errors.newEmail}</span>}
            {errors.general && <div className="error-message">{errors.general}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <button type="submit" className="forgot-btn" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Verification Codes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailProfile;
