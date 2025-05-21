import React from 'react';
import '../../assets/styles/Dashboard/Progress.css';
// Import your images
import cppIcon from '../../assets/images/cpp.png';
import pythonIcon from '../../assets/images/python.png';
import javaIcon from '../../assets/images/java.png';
import javascriptIcon from '../../assets/images/javascript.png';
import kotlinIcon from '../../assets/images/kotlin.png';

const ProgressChart = () => {
  const languages = [
    { name: 'C++', progress: 85, color: '#B75CFF', icon: cppIcon },
    { name: 'Python', progress: 90, color: '#4CAF50', icon: pythonIcon },
    { name: 'Java', progress: 70, color: '#F89820', icon: javaIcon },
    { name: 'JavaScript', progress: 95, color: '#F0DB4F', icon: javascriptIcon },
    { name: 'Kotlin', progress: 60, color: '#7F52FF', icon: kotlinIcon }
  ];

  return (
    <div className="progress-chart-compact">
      {languages.map((lang, index) => (
        <div key={index} className="language-row">
          <div className="language-icon">
            <img 
              src={lang.icon} 
              alt={`${lang.name} logo`}
              className="language-img"
            />
          </div>
          <div className="progress-wrapper">
            <div 
              className="progress-bar" 
              style={{
                width: `${lang.progress}%`,
                backgroundColor: lang.color
              }}
            >
              <span className="progress-percent">{lang.progress}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressChart;