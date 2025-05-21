import React from 'react';
import '../../assets/styles/home/GoalsSection.css';
import goalsImage from './../../assets/images/Master.jpg';


const GoalsSection = () => {
  return (
    <section className="goals-section">
      <div className="section-container">
        <h2>Reach Your Goals & Achieve Success</h2>
        <div className="goals-content">
          <div className="goals-cards">
            <div className="goal-card">
              <h3>Python - Power & Simplicity</h3>
              <p>Python dominates AI, machine learning, and web development. Its clean syntax and vast ecosystem (Django, Flask, TensorFlow) make it the ultimate language for beginners and experts alike. Write less, do more.</p>
            </div>
            <div className="goal-card">
              <h3>JavaScript – The Web's Universal Language</h3>
              <p>From frontend (React, Vue) to backend (Node.js), JavaScript powers the modern web. Build interactive websites, mobile apps, and even servers—all with one versatile language.</p>
            </div>
            <div className="goal-card">
              <h3>Java – Enterprise-Grade Reliability</h3>
              <p>Trusted by Fortune 500 companies, Java runs Android, big data systems, and high-performance backends (Spring). Write once, run anywhere—with rock-solid stability.</p>
            </div>
            <div className="goal-card">
              <h3>C++ – Raw Power & Precision</h3>
              <p>The backbone of game engines, operating systems, and high-frequency trading. If speed and low-level control matter, C++ is your weapon of choice.</p>
            </div>
          </div>
          <div className="goals-visual">
            <img src={goalsImage} alt="Achieving success with Code Master" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;