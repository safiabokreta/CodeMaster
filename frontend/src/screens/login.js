// src/screens/Login.js
import React from 'react';
import LoginForm from '../components/login/LoginForm';
import '../assets/styles/login/login.css'; // Ensure it only imports its own CSS
import robotImage from '../assets/images/robot.png';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <LoginForm />
      </div>
      <div className="login-image">
        <img src={robotImage} alt="AI Robot" />
      </div>
    </div>
  );
};

export default Login;
