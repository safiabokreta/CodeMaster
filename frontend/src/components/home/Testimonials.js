import React from 'react';
import '../../assets/styles/home/Testimonials.css';
import brandonImage from './../../assets/images/girl1.jpg';
import chrisImage from './../../assets/images/girl1.jpg';
import karenImage from './../../assets/images/girl1.jpg';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2 className="section-title">Best Feedback From Our Clients</h2>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <div className="client-image">
            <img src={brandonImage} alt="Brandon Vega" />
          </div>
          <div className="client-info">
            <h3>Brandon Vega</h3>
            <p className="role">Computer Science Student</p>
          </div>
          <p className="quote">
            As a new computer science student, I struggled to grasp the concepts of programming until I discovered Code Master...
          </p>
        </div>
        <div className="testimonial-card">
          <div className="client-image">
            <img src={chrisImage} alt="Chris Wei" />
          </div>
          <div className="client-info">
            <h3>Chris Wei</h3>
            <p className="role">Computer Science Student</p>
          </div>
          <p className="quote">
            The instant feedback on my code significantly boosted my confidence and skills...
          </p>
        </div>
        <div className="testimonial-card">
          <div className="client-image">
            <img src={karenImage} alt="Karen Weiss" />
          </div>
          <div className="client-info">
            <h3>Karen Weiss</h3>
            <p className="role">Computer Science Student</p>
          </div>
          <p className="quote">
            Code Master transformed how I learn programming...
          </p>
        </div>
      </div>
      <p className="testimonial-cta">
        <a href="/testimonials" className="testimonial-link">Let's see yours here!</a>
      </p>
    </section>
  );
};

export default Testimonials;