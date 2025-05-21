// src/screens/signup.js
import React from 'react';
import SignupForm from '../components/login/SignupForm'; // ✅ Correct import path
import '../assets/styles/signup/signup.css'; // ✅ Ensure correct path
import robotImage from '../assets/images/robot.png';

const Signup = () => {
  return (
    <div className="signup-container"> {/* ✅ Changed from login-container */}
      <div className="signup-form"> {/* ✅ Changed from login-form */}
        <SignupForm />  {/* ✅ Corrected component usage */}
      </div>
      <div className="signup-image">
        <img src={robotImage} alt="AI Robot" />
      </div>
    </div>
  );
};

export default Signup;
