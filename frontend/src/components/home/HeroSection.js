// import React from 'react';
// import '../../assets/styles/home/HeroSection.css';
// import robotImage from './../../assets/images/Robot.png';


// const HeroSection = () => {
//   return (
//     <div className="home-container">
//       {/* Top Bar with Logo and Auth Buttons */}
//       <div className="top-bar">
//         <div className="nav-logo">Code Master</div>
//         <div className="auth-buttons">
//           <button className="login-btn">Login</button>
//           <button className="signup-btn">SignUp</button>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="navbar">
//         <div className="nav-links">
//           <a href="/">Home</a>
//           <a href="/courses">Courses</a>
//           <a href="/profile">Profile</a>
//           <a href="/about">About Us</a>
//         </div>
//       </nav>

//       {/* Hero Content */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1>Getting Quality Education Is Now More Easy</h1>
//           <div className="cta-buttons">
//             <button className="primary-btn">Get Started →</button>
//             <button className="secondary-btn">Learn more</button>
//           </div>
//         </div>
//         <div className="hero-image">
//           <img src={robotImage} alt="Learning Robot" />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HeroSection;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/home/HeroSection.css';
import robotImage from './../../assets/images/Robot1.png';

const HeroSection = () => {
  const navigate = useNavigate();

  // Navigation handlers with exact paths
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      {/* Top Bar with Logo and Auth Buttons */}
      <div className="top-bar">
        <div className="nav-logo">Code Master</div>
        <div className="auth-buttons">
          <button 
            className="login-btn" 
            onClick={() => handleNavigation('/login')}
          >
            Login
          </button>
          <button 
            className="signup-btn" 
            onClick={() => handleNavigation('/signup')}
          >
            SignUp
          </button>
        </div>
      </div>

      {/* Navigation Menu with correct paths */}
      <nav className="Navbar">
        <div className="nav-links">
          <a href="/home" onClick={(e) => { e.preventDefault(); handleNavigation('/home'); }}>
            Home
          </a>
          <a href="/courses" onClick={(e) => { e.preventDefault(); handleNavigation('/courses'); }}>
            Courses
          </a>
          <a href="/profile" onClick={(e) => { e.preventDefault(); handleNavigation('/profile'); }}>
            Profile
          </a>
          <a href="/about-us" onClick={(e) => { e.preventDefault(); handleNavigation('/about-us'); }}>
            About Us
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Getting Quality Education Is Now More Easy</h1>
          <div className="cta-buttons">
            <button 
              className="primary-btn" 
              onClick={() => handleNavigation('/signup')} 
            >
              Get Started →
            </button>
            <button 
              className="secondary-btn" 
              onClick={() => handleNavigation('/about-us')} // Changed to about-us
            >
              Learn more
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={robotImage} alt="Learning Robot" />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;