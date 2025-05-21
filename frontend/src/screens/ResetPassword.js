import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../assets/styles/settings/forgotpasswordprofile.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    // Client-side validation
    const newErrors = {};
    if (!formData.new_password) newErrors.new_password = "New password is required";
    if (!formData.confirm_password) newErrors.confirm_password = "Confirm password is required";
    if (formData.new_password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Extract uid and token from the URL
    const token = searchParams.get('token');
    const uid = searchParams.get('uid'); // NOT uidb64

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/password_reset_confirm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          token,
          new_password: formData.new_password,
          confirm_password: formData.confirm_password
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors({ general: data.message || "Password reset failed" });
      } else {
        setSuccessMessage("Password has been reset successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
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
          <h2 className="forgot-title">Reset your Password</h2>
          <form onSubmit={handleSubmit}>
            <label className="forgot-label">New Password</label>
            <input
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              className="forgot-input"
              placeholder="Enter new password ...."
            />
            {errors.new_password && <span className="field-error">{errors.new_password}</span>}
            <label className="forgot-label">Confirm New Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="forgot-input"
              placeholder="Confirm new password ...."
            />
            {errors.confirm_password && <span className="field-error">{errors.confirm_password}</span>}
            {errors.general && <div className="error-message">{errors.general}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <button type="submit" className="forgot-btn" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

