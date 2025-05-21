import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/courses/language.css";
import CircularProgress from "../../components/courses/CircularProgress.js";

const Language = ({ title, description, progress, courseId }) => {  // Add courseId prop
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${courseId}`);  // Use courseId in navigation
  };

  return (
    <div className="course-card" onClick={handleClick}>
      <div className="card-content">
        <div className="title">{title}</div>
        <p className="description">{description}</p>
      </div>
      <div className="progress-container">
        <CircularProgress percentage={progress} />
      </div>
    </div>
  );
};

export default Language;