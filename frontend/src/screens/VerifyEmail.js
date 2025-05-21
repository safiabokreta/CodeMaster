import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/signup/VerifyEmail.css"; 
import robotImage from "../assets/images/robot.png"; 
import Navbar from "../components/navBarprofile";

const VerifyEmail = () => {
    const navigate = useNavigate();

    return (
        <div className="forgot-password-container">
            <div className="background-box" style={{ backgroundImage: `url(${robotImage})` }}>
                <div className="forgot-password-box">
                    <h1>Verify Email</h1>
                    <h3>Check email and enter the code</h3>
                    <input className="inputttt" id="code" type="text" placeholder="Enter code" />
                    
                    {/* ✅ Redirect to EmailSuccessfullyVerified.js */}
                    <button className="reset-btn" onClick={() => navigate("/email-verified")}>Verify Email</button>

                    <p>
                        Want to change email? <Link to="/signup">Go back to Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
