import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/courses/chapter.css"; 
import CircularProgress from "../../components/courses/CircularProgress.js";

const ChapterCard = ({ title, progress, chapterId, courseId }) => {  // Add language prop
  const navigate = useNavigate();

  const handleClick = () => {
    // Make sure to pass the language parameter
    navigate(`/courses/${courseId}/${chapterId}`); 
    console.log("Navigating to:", `/courses/${courseId}/${chapterId}`);
  };

  return (
    <div className='chapter-card' onClick={handleClick}>
      <span>{title}</span>
      <div className="progress-container">
        <CircularProgress percentage={progress} />
      </div>
    </div>
  );
};

export default ChapterCard;