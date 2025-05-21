import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import robotImage from "../assets/images/robot.png"; 
import "../assets/styles/signup/EmailSuccessfullyVerified.css"; // Only ForgotPassword.css is imported
import Navbar from "../components/navBarprofile";

const SuccessPasswordReset = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/home"); // Redirect to login page after success
    };

    return (
        <div className="forgot-password-container">
            <div className="background-box" style={{ backgroundImage: `url(${robotImage})` }}>
                <div className="forgot-password-boxxx">
                    <h1>Email Successfully Verified</h1>
                    <p>Welcome !</p>
                    <button className="resett-btn" onClick={handleLoginClick}>Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPasswordReset;
