import React, { useState } from 'react';
import { FaUser, FaLock, FaLanguage, FaCode } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    password2: '',
    english_level: '',
    programming_level: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const LEVEL_CHOICES = [
    { value: '', label: 'Select your level' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
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
    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.password2) newErrors.password2 = 'Passwords do not match';
    if (!formData.english_level) newErrors.english_level = 'English level is required';
    if (!formData.programming_level) newErrors.programming_level = 'Programming level is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(  'http://127.0.0.1:8000/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.full_name,
          email: formData.email,
          password: formData.password,
          password2: formData.password2,
          english_level: formData.english_level,
          programming_level: formData.programming_level
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle server validation errors
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || 'Signup failed' });
        }
      } else {
        // Show success message and do not redirect
        alert(data.message || 'Signup successful! Please check your email and wait for verification.');
        // Optionally, clear the form
        setFormData({
          full_name: '',
          email: '',
          password: '',
          password2: '',
          english_level: '',
          programming_level: ''
        });
      }
      
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formm-container">
      <h1>SIGNUP</h1>
      <h2>Welcome!</h2>

      {errors.general && (
        <div className="error-message">{errors.general}</div>
      )}

      <div className="inputtt-group">
        <FaUser className="icon" />
        <input 
          type="text" 
          name="full_name"
          placeholder="Enter your full name"
          value={formData.full_name}
          onChange={handleChange}
          className={errors.full_name ? 'error' : ''}
        />
        <div className="underline"></div>
        {errors.full_name && <span className="field-error">{errors.full_name}</span>}
      </div>

      <div className="inputtt-group">
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

      <div className="inputtt-group">
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

      <div className="inputtt-group">
        <FaLock className="icon" />
        <input 
          type="password" 
          name="password2"
          placeholder="Confirm your password"
          value={formData.password2}
          onChange={handleChange}
          className={errors.password2 ? 'error' : ''}
        />
        <div className="underline"></div>
        {errors.password2 && <span className="field-error">{errors.password2}</span>}
      </div>

      <div className="inputtt-group">
        <FaLanguage className="icon" />
        <select
          name="english_level"
          value={formData.english_level}
          onChange={handleChange}
          className={errors.english_level ? 'error' : ''}
        >
          <option value="" disabled hidden>
            Select your level
          </option>
          {LEVEL_CHOICES.filter(option => option.value).map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.english_level && <span className="field-error">{errors.english_level}</span>}
      </div>

      <div className="inputtt-group">
        <FaCode className="icon" />
        <select
          name="programming_level"
          value={formData.programming_level}
          onChange={handleChange}
          className={errors.programming_level ? 'error' : ''}
        >
          {LEVEL_CHOICES.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="underline"></div>
        {errors.programming_level && <span className="field-error">{errors.programming_level}</span>}
      </div>

      <div className="options">
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
      </div>

      <button 
        type="submit" 
        className="sign-btn" 
        disabled={isLoading}
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>
      
      <button type="button" className="google-btn">
        <FcGoogle className="google-icon" />
        Sign up with Google
      </button>

      <p className='loginlink'>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default SignupForm;