import React from "react";
import "../../assets/styles/courses/CircularProgress.css";

const CircularProgress = ({ percentage }) => {
  const radius = 25; // Radius of the progress circle
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="70" height="70" viewBox="0 0 60 60" className="progress-circle">
      {/* Background Circle (Gray) */}
      <circle
        cx="30"
        cy="30"
        r={radius}
        fill="none"
        stroke="#e0e0e0"
        strokeWidth={strokeWidth}
      />

      {/* Progress Circle (Colored) */}
      <circle
        cx="30"
        cy="30"
        r={radius}
        fill="none"
        stroke="rgb(3,19,68)" /* Change this to your preferred color */
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 30 30)"
      />

      {/* Inner Text */}
      <text x="30" y="35" textAnchor="middle" fontSize="14" fill="rgb(3,19,68)" fontWeight="bold">
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgress;
