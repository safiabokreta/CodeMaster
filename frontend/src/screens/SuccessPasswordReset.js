import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import robotImage from "../assets/images/robot.png"; 
import "../assets/styles/login/SuccessPasswordReset.css"; // Only ForgotPassword.css is imported
import Navbar from "../components/navBarprofile";

const SuccessPasswordReset = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login"); // Redirect to login page after success
    };

    return (
        <div className="forgot-password-container">
            <div className="background-box" style={{ backgroundImage: `url(${robotImage})` }}>
                <div className="forgot-password-boxxx">
                    <h1>Successful password reset !</h1>
                    <p>You can now use your new password 
                    to login to your account</p>
                    <button className="resett-btn" onClick={handleLoginClick}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPasswordReset;
