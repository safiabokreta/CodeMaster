import React from 'react';
import '../../assets/styles/Dashboard/Languages.css';

const LanguagesList = () => {
  const languages = ['C++', 'Python', 'Java', 'JavaScript', 'Kotlin'];

  return (
    <div className="languages-container">
      {languages.map((language, index) => (
        <div 
          key={index} 
          className={`language-box ${index === 0 ? 'highlighted' : ''}`}
        >
          {language}
        </div>
      ))}
    </div>
  );
};

export default LanguagesList;