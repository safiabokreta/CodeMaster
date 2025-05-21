import React from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/courses/exerciseCard.css"; 

const ExerciseCard = ({ id, title, rating }) => {
  const navigate = useNavigate();
  const { courseId, chapterId } = useParams();

  const handleClick = () => {
    navigate(`/courses/${courseId}/${chapterId}/exercises/${id}`);
  };

  return (
    <div className="exercise-card" onClick={handleClick}>
      <div className="exercise-header">
        <div className="exercise-title">{title}</div>
        <div className="exercise-rating">
          {[...Array(5)].map((_, index) => (
            <FaStar 
              key={index} 
              className={index < rating ? "star filled" : "star"} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ExerciseCard;
