import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/confirmemailchange.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ConfirmEmailChange = () => {
  const query = useQuery();
  const current_email = query.get("current_email");
  // const new_email = query.get("new_email");
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("Email successfully changed! Redirecting to settings...");
    setTimeout(() => navigate("/settings"), 2000);
  };

  return (
    <div className="confirm-email-bg">
      <div className="confirm-email-glass">
        <h2 className="confirm-email-title">Confirm Email Change</h2>
        <p className="confirm-email-desc">
          Enter the code sent to your old email:<br />
          <b>{current_email}</b>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="confirm-email-input"
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button className="confirm-email-btn" type="submit">Confirm</button>
        </form>
        {success && <div className="confirm-email-success">{success}</div>}
      </div>
    </div>
  );
};

export default ConfirmEmailChange;