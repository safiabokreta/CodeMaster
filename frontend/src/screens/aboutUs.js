import React from "react";
import "../assets/styles/aboutUs/aboutUs.css"; // Adjust the path as necessary
import Navbar from "../components/navBar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Intelligent Programming Learning Assistant</strong>, an
          innovative educational platform designed to help aspiring programmers
          build strong coding skills through an adaptive learning experience.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our goal is to make programming education accessible and efficient by
          providing a structured, personalized learning system that adapts to
          each student's skill level. Whether you're a beginner learning the
          basics or an advanced learner tackling complex algorithms, our
          platform ensures an engaging and effective learning journey.
        </p>

        <h2>What We Offer</h2>
        <h3>Structured Courses</h3>
        <p>
          Our platform provides predefined courses, each containing chapters
          organized in a logical order.
        </p>
        
        <h3>Interactive Learning</h3>
        <ul>
          <li><strong>Concept Explanations & Examples:</strong> Clear and concise lessons to help users understand programming concepts.</li>
          <li><strong>Hands-on Exercises:</strong> A variety of exercises with different difficulty levels, allowing users to practice and test their skills.</li>
        </ul>
        
        <h3>Intelligent Exercise System</h3>
        <ul>
          <li>Exercises are categorized by difficulty (stars) and progress tracking is available.</li>
          <li>Users receive instant feedback on their code.</li>
          <li>A built-in code editor helps users solve problems directly on the platform.</li>
        </ul>

        <h3>Adaptive Learning</h3>
        <ul>
          <li>A quiz at the start of each chapter assesses the student’s level.</li>
          <li>Personalized exercises and challenges are recommended based on progress.</li>
        </ul>

        <h3>Dashboard & Progress Tracking</h3>
        <ul>
          <li>Students can monitor their performance across different programming languages.</li>
          <li>Progress visualization with detailed analytics on completed exercises and learning milestones.</li>
        </ul>

        <h2>Why Choose Us?</h2>
        <p>
          Unlike other learning platforms, our system dynamically adapts to each
          student’s learning pace, providing:
        </p>
        <ul>
          <li><strong>Automatic Exercise Evaluation:</strong> Immediate feedback and suggested improvements.</li>
          <li><strong>Personalized Learning Paths:</strong> Exercises and content tailored to skill level.</li>
          <li><strong>Interactive & Engaging Challenges:</strong> Hands-on practice with real-world coding problems.</li>
        </ul>

        <h2>Meet the Team</h2>
        <p>
          Our project is led by <strong>Dr. HADJ AMEUR</strong>, with a dedicated team working to
          bridge the gap between AI and education by making programming more
          intuitive and accessible.
        </p>

        <h2>Get in Touch</h2>
        <p>
          For inquiries, collaborations, or feedback, contact us at
          <strong> codemaster@gmail.com</strong>.
        </p>
        <button onClick={() => {
        console.log("Storage cleared!"); 
        console.log("Current localStorage:", localStorage);
          // Or to see each item clearly:
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            console.log(`${key}:`, localStorage.getItem(key));
          }
        }}>Clear Local Storage</button>
      </div>
    </>
  );
};

export default AboutUs;
