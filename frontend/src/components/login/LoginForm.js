import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  // Get CSRF token when component mounts
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/csrf/', {
          credentials: 'include',
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    getCsrfToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Client-side validation
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setErrors({ general: data.message || 'Login failed' });
      } else {
        
        // Store user data in localStorage if needed
        localStorage.setItem('user', JSON.stringify(data.user));
        // Store the email for profile fetch
        localStorage.setItem('userEmail', formData.email);
        // On success, redirect to home
        navigate('/home');
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>WELCOME BACK</h1>
      <h2>Welcome back! Please enter your details.</h2>

      {errors.general && (
        <div className="error-message">{errors.general}</div>
      )}

      <div className="input-group">
        <FaUser className="icon" />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        <div className="underline"></div>
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="input-group">
        <FaLock className="icon" />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'error' : ''}
        />
        <div className="underline"></div>
        {errors.password && <span className="field-error">{errors.password}</span>}
      </div>

      <div className="options">
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <div className="remember-me"> 
          <Link to="/forgot-password-profile">Forgot password?</Link>
        </div>
      </div>

      <button className="sign-btn" type="submit" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign'}
      </button>
      <button className="google-btn" type="button">
        <FcGoogle className="google-icon" />
        Sign in with Google
      </button>

      <p>Don't have an account? <Link to="/signup">Sign up for free!</Link></p>
    </form>
  );
};

export default LoginForm;
