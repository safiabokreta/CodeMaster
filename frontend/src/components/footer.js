// components/Footer.jsx
import React from 'react';
import '../assets/styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Column - Brand Info */}
        <div className="footer-brand">
          <h2 className="footer-logo">Code Master</h2>
          <p className="footer-description">
            The ultimate platform for learning programming languages with intelligence and precision. 
            Our goal is to make coding accessible, engaging, and efficient for learners of all levels.
          </p>
        </div>

        {/* Middle Column - Contact Info */}
        <div className="footer-contact">
          <h3 className="footer-heading">Get in Touch</h3>
          <div className="contact-info">
            <p className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              ENSIA Sidi Abdellah, Algiers, Algeria
            </p>
            <p className="contact-item">
              <i className="fas fa-envelope"></i>
              CodeMaster@hello.com
            </p>
            <p className="contact-item">
              <i className="fas fa-phone"></i>
              +1 386-688-3295
            </p>
          </div>
        </div>

        {/* Right Column - Social Media */}
        <div className="footer-social">
          <h3 className="footer-heading">Join us on:</h3>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i> Code_Master
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i> Code Master
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-facebook"></i> Code Master Platform
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Code Master. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;