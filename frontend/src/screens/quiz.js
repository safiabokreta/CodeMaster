import React from 'react';
import '../assets/styles/quiz.css';
import Navbar from '../components/navBar';
import robotBackground from '../assets/images/image.svg';


const QuizPage = () => {
  const questions = [
    {
      id: 1,
      text: "What does programming mean?",
      options: [
        "Writing instructions for computers",
        "Playing video games", 
        "Designing websites"
      ]
    },
    {
      id: 2,
      text: "What is the purpose of programming languages?",
      options: [
        "To communicate with computers",
        "To make math easier",
        "To create art"
      ]
    },
    {
      id: 3,
      text: "What is the expected output of the code in the picture?",
      code: `#include <iostream>\nint main() { std::cout << "Hello, World!"; }`,
      options: [
        "Hello, World!",
        "Error",
        "No output"
      ]
    },
    {
      id: 4,
      text: "Explain the use of functions in programming:",
      isTextAnswer: true
    }
  ];

  return (
    <div className="quiz-container">
      {/* Full-screen robot background */}
      <div className="robot-background">
        <img 
          src={robotBackground} 
          alt="Decorative robot" 
          className="robot-image"
        />
      </div>
      
      {/* Quiz content overlay */}
      <div className="quiz-content">
        <div className="quiz-header">
          <h1>QUIZ for Level Determination</h1>
        </div>
        
        <div className="questions-container">
          {questions.map((question, index) => (
            <div key={question.id} className="question-card">
              <div className="question-number">Question {index + 1}</div>
              <h3 className="question-text">{question.text}</h3>
              
              {question.code && (
                <pre className="code-snippet">
                  <code>{question.code}</code>
                </pre>
              )}
              
              {question.isTextAnswer ? (
                <textarea 
                  className="text-answer"
                  placeholder="Type your answer here..."
                  rows={4}
                />
              ) : (
                <div className="options-container">
                  {question.options.map((option, i) => (
                    <div key={i} className="option">
                      <input 
                        type="radio" 
                        id={`q${question.id}-opt${i}`}
                        name={`question-${question.id}`} 
                      />
                      <label htmlFor={`q${question.id}-opt${i}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="submit-container">
          <button className="submit-btn">Submit Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;