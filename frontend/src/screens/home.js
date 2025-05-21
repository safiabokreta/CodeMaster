// // components/Home.jsx
// import React from 'react';
// import '../assets/styles/home/home.css';
// import robotImage from '../assets/images/Robot.png';
// import aboutImage from '../assets/images/Book.png';
// import goalsImage from '../assets/images/Master.jpg';
// import brandonImage from '../assets/images/girl1.jpg';
// import chrisImage from '../assets/images/girl1.jpg';
// import karenImage from '../assets/images/girl1.jpg';
// import Footer from '../components/footer';

// const Home = () => {
//   return (
//     <div className="home-container">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <div className="nav-content">
//           <div className="nav-logo">Code Master</div>
//           <div className="nav-links">
//             <a href="/">Home</a>
//             <a href="/courses">Courses</a>
//             <a href="/profile">Profile</a>
//             <a href="/about">About Us</a>
//           </div>
//           <div className="auth-buttons">
//             <button className="signup-btn">SignUp</button>
//             <button className="login-btn">Login</button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
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

//       {/* About Us Section */}
//       <section className="about-section">
//         <div className="about-content">
//           <h2>About us</h2>
//           <p>
//             Welcome to Code Master, the ultimate platform for learning programming languages with intelligence and precision. Our goal is to make coding accessible, engaging, and efficient for learners of all levels.
//           </p>
//           <p>
//             Whether you're a beginner starting your journey or an experienced developer refining your expertise, Code Master provides an interactive, AI-driven learning experience tailored to your needs.
//           </p>
//           <p>
//             Join Code Master today and take your coding skills to the next level!
//           </p>
//         </div>
//         <div className="about-image">
//           <img src={aboutImage} alt="Code Master Platform" />
//         </div>
//       </section>

//       {/* Goals Section */}
//       <section className="goals-section">
//         <div className="section-container">
//           <h2>Reach Your Goals & Achieve Success</h2>
//           <div className="goals-content">
//             <div className="goals-cards">
//               <div className="goal-card">
//                 <h3>Python -Power&Simplicity</h3>
//                 <p>Python dominates AI, machine learning, and web development. Its clean syntax and vast ecosystem (Django, Flask, TensorFlow)
//                      make it the ultimate language for beginners and experts alike. Write less, do more. </p>
//               </div>
//               <div className="goal-card">
//                 <h3>JavaScript – The Web’s Universal Language</h3>
//                 <p>From frontend (React, Vue) to backend (Node.js), JavaScript powers the modern web.
//                      Build interactive websites, mobile apps, and even servers—all with one versatile language.</p>
//               </div>
//               <div className="goal-card">
//                 <h3>Java – Enterprise-Grade Reliability</h3>
//                 <p>Trusted by Fortune 500 companies, Java runs Android, big data systems, and high-performance backends (Spring). 
//                     Write once, run anywhere—with rock-solid stability.</p>
//               </div>
//               <div className="goal-card">
//                 <h3>C++ – Raw Power & Precision</h3>
//                 <p>The backbone of game engines, operating systems, and high-frequency trading.
//                      If speed and low-level control matter, C++ is your weapon of choice.</p>
//               </div>
//             </div>
//             <div className="goals-visual">
//               <img src={goalsImage} alt="Achieving success with Code Master" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials-section">
//         <h2 className="section-title">Best Feedback From Our Clients</h2>
//         <div className="testimonials-grid">
//           <div className="testimonial-card">
//             <div className="client-image">
//               <img src={brandonImage} alt="Brandon Vega" />
//             </div>
//             <div className="client-info">
//               <h3>Brandon Vega</h3>
//               <p className="role">Computer Science Student</p>
//             </div>
//             <p className="quote">
//               As a new computer science student, I struggled to grasp the concepts of programming until I discovered Code Master...
//             </p>
//           </div>
//           <div className="testimonial-card">
//             <div className="client-image">
//               <img src={chrisImage} alt="Chris Wei" />
//             </div>
//             <div className="client-info">
//               <h3>Chris Wei</h3>
//               <p className="role">Computer Science Student</p>
//             </div>
//             <p className="quote">
//               The instant feedback on my code significantly boosted my confidence and skills...
//             </p>
//           </div>
//           <div className="testimonial-card">
//             <div className="client-image">
//               <img src={karenImage} alt="Karen Weiss" />
//             </div>
//             <div className="client-info">
//               <h3>Karen Weiss</h3>
//               <p className="role">Computer Science Student</p>
//             </div>
//             <p className="quote">
//               Code Master transformed how I learn programming...
//             </p>
//           </div>
//         </div>
//         <p className="testimonial-cta">
//           <a href="/testimonials" className="testimonial-link">Let's see yours here!</a>
//         </p>
//       </section>
//       {/* Add Footer at the end */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import '../assets/styles/home/home.css';
import HeroSection from '../components/home/HeroSection';
import GoalsSection from '../components/home/GoalsSection';
import Testimonials from '../components/home/Testimonials';
import Footer from '../components/footer';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <GoalsSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;