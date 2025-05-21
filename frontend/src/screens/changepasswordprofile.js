import React, { useState, useEffect } from "react";
import "../assets/styles/settings/forgotpasswordprofile.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBarprofile";
import { Link } from "react-router-dom";  

const ChangePasswordProfile = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Get the logged-in user's email from localStorage
    const userEmail = localStorage.getItem("userEmail");
    setEmail(userEmail || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/password_reset_request/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors({ general: data.message || "Failed to send reset link" });
      } else {
        setSuccessMessage("Reset link has been sent to your email!");
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-bg">
      <div className="forgot-overlay">
        <div className="forgot-modal">
          <h2 className="forgot-title">Change Password</h2>
          <form onSubmit={handleSubmit}>
            <label className="forgot-label">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="forgot-input"
              placeholder="Enter your email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
            {errors.general && <div className="error-message">{errors.general}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <button type="submit" className="forgot-btn" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordProfile;
