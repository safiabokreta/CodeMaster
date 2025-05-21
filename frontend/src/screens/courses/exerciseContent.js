// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "../../assets/styles/courses/exerciseContent.css"; 
// import Navbar from "../../components/navBar";
// import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css"; 
// import "prismjs/components/prism-javascript"; 
// import api from '../../services/api';

// const ExercisePage = () => {
//   const { exerciseId } = useParams();
//   const [exercise, setExercise] = useState(null);
//   const [userInput, setUserInput] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [isCode, setIsCode] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch exercise details from backend
//   useEffect(() => {
//     const fetchExercise = async () => {
//       try {
//         const response = await api.getExerciseDetails(exerciseId);
//         setExercise(response.data);
//       } catch (err) {
//         setError("Failed to load exercise");
//         console.error("Error fetching exercise:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExercise();
//   }, [exerciseId]);

//   // Highlight code whenever userInput changes
//   useEffect(() => {
//     if (isCode) {
//       Prism.highlightAll();
//     }
//   }, [userInput, isCode]);

//   const handleInputChange = (e) => {
//     const text = e.target.innerText;
//     setUserInput(text);
//     setIsCode(text.includes("function") || text.includes("const") || text.includes("return"));
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await api.submitExerciseAnswer(exerciseId, userInput);
//       setFeedback(response.data.feedback);
//     } catch (err) {
//       setFeedback("Error submitting answer");
//       console.error("Submission error:", err);
//     }
//   };

//   if (loading) return <div className="loading-message">Loading exercise...</div>;
//   if (error) return <div className="error-message">{error}</div>;
//   if (!exercise) return <div className="error-message">Exercise not found</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="exercise-container">
//         <div className="exercise-header">
//           <h2>{exercise.name}</h2>
//           <div className="exercise-meta">
//             <span className="exercise-type">{exercise.content_type}</span>
//           </div>
//         </div>
        
//         <div className="exercise-content">
//           <div dangerouslySetInnerHTML={{ __html: exercise.content }}  />
//         </div>

//         <div className="terminal">
//           <div
//             className={`terminal-input ${isCode ? "language-javascript" : ""}`}
//             contentEditable
//             onInput={handleInputChange}
//             placeholder="Enter your solution here..."
//             suppressContentEditableWarning
//           />
//           <button className="submit-btn" onClick={handleSubmit}>
//             Submit
//           </button>
//         </div>

//         {feedback && (
//           <div className="feedback">
//             <h3>Model Feedback:</h3>
//             <pre><code className="language-javascript">{feedback}</code></pre>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ExercisePage;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/styles/courses/exerciseContent.css";
import Navbar from "../../components/navBar";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import api from '../../services/api';

const ExercisePage = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [isCode, setIsCode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await api.getExerciseDetails(exerciseId);
        setExercise(response.data);
      } catch (err) {
        setError("Failed to load exercise");
        console.error("Error fetching exercise:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  useEffect(() => {
    if (isCode) {
      Prism.highlightAll();
    }
  }, [userInput, isCode]);

  const handleInputChange = (e) => {
    const text = e.target.innerText;
    setUserInput(text);
    setIsCode(text.includes("function") || text.includes("const") || text.includes("return"));
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      setError("Please enter an answer before submitting");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await api.submitExerciseAnswer(exerciseId, userInput);
      setEvaluation(response.data);
    } catch (err) {
      setError("Error submitting answer");
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="loading-message">Loading exercise...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!exercise) return <div className="error-message">Exercise not found</div>;

  return (
    <>
      <Navbar />
      <div className="exercise-container">
        {/* Exercise Header Section */}
        <div className="exercise-header">
          <div>
            <h2>{exercise.name}</h2>
            <div className="exercise-meta">
              <span className="exercise-type">{exercise.content_type}</span>
              {evaluation?.score !== undefined && (
                <span className={`exercise-score ${evaluation.is_correct ? 'correct' : 'incorrect'}`}>
                  {evaluation.score}/100
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Exercise Content */}
        <div className="exercise-content">
          <div dangerouslySetInnerHTML={{ __html: exercise.content }} />
        </div>

        {/* Answer Input Area */}
        <div className="terminal">
          <div
            className={`terminal-input ${isCode ? "language-javascript" : ""}`}
            contentEditable
            onInput={handleInputChange}
            placeholder="Enter your solution here..."
            suppressContentEditableWarning
          />
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Evaluating...' : 'Submit'}
          </button>
        </div>

        {/* Feedback Section */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {evaluation && (
          <div className={`feedback ${evaluation.is_correct ? 'correct' : 'incorrect'}`}>
            <h3>Evaluation Results:</h3>
            <p className="feedback-message">{evaluation.feedback}</p>
            
            {!evaluation.is_correct && evaluation.hints?.length > 0 && (
              <div className="hints-section">
                <h4>Hints:</h4>
                <ul>
                  {evaluation.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ExercisePage;