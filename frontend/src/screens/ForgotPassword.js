import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "../assets/styles/login/ForgotPassword.css"; 
import robotImage from "../assets/images/robot.png"; 
import Navbar from "../components/navBarprofile";

const ForgotPassword = () => {
    const navigate = useNavigate(); // Initialize navigation

    const handleResetClick = () => {
        navigate("/reset-password"); // Redirect to ResetPassword page
    };

    return (
        <div className="forgot-password-container">
            <div className="background-box" style={{ backgroundImage: `url(${robotImage})` }}>
                <div className="forgot-password-box">
                    <h1>Forgot Password?</h1>
                    <h3>Email</h3>
                    <input className="inputtt" type="email" placeholder="Enter your email" />
                    <button className="reset-btn" onClick={handleResetClick}>Reset Password</button>
                    <p>
                        Remembered your password? <Link to="/login">Go back to Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
