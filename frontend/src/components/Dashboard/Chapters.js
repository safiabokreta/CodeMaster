// import React, { useEffect, useRef } from 'react';
// import '../../assets/styles/Dashboard/Chapters.css';

// const Chapters = () => {
//   const chapters = [
//     { number: 1, progress: 75, completed: false, color: '#B75CFF' },
//     { number: 2, progress: 30, completed: false, color: '#4CAF50' },
//     { number: 3, progress: 0, completed: false, color: '#2196F3' },
//     { number: 4, progress: 0, completed: false, color: '#FF9800' }
//   ];

//   const circleRefs = useRef([]);

//   useEffect(() => {
//     circleRefs.current.forEach((circle, index) => {
//       if (circle) {
//         // Reset to initial state
//         circle.style.setProperty('--progress', '0%');
//         // Force reflow to ensure animation starts
//         void circle.offsetWidth;
//         // Animate to target progress
//         circle.style.setProperty('--progress', `${chapters[index].progress}%`);
//       }
//     });
//   }, []);

//   return (
//     <div className="chapters-outer-container">
//       {/* First row with Chapter 1 and Chapter 2 */}
//       <div className="chapters-row">
//         {chapters.slice(0, 2).map((chapter, index) => (
//           <div key={index} className="chapter-circle-wrapper">
//             <div className="chapter-circle" style={{ '--color': chapter.color }}>
//               <div
//                 ref={el => circleRefs.current[index] = el}
//                 className="progress-circle"
//               ></div>
//               <div className="percentage-container">
//                 <span className="progress-percent">{chapter.progress}%</span>
//               </div>
//             </div>
//             <div className="chapter-label">Chapter {chapter.number}</div>
//           </div>
//         ))}
//       </div>
      
//       {/* Second row with Chapter 3 and Chapter 4 */}
//       <div className="chapters-row">
//         {chapters.slice(2, 4).map((chapter, index) => (
//           <div key={index + 2} className="chapter-circle-wrapper">
//             <div className="chapter-circle" style={{ '--color': chapter.color }}>
//               <div
//                 ref={el => circleRefs.current[index + 2] = el}
//                 className="progress-circle"
//               ></div>
//               <div className="percentage-container">
//                 <span className="progress-percent">{chapter.progress}%</span>
//               </div>
//             </div>
//             <div className="chapter-label">Chapter {chapter.number}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useRef } from 'react';
import '../../assets/styles/Dashboard/Chapters.css';

const Chapters = () => {
  const chapters = [
    { number: 1, progress: 75, completed: false, color: '#B75CFF' },
    { number: 2, progress: 30, completed: false, color: '#4CAF50' },
    { number: 3, progress: 0, completed: false, color: '#2196F3' },
    { number: 4, progress: 0, completed: false, color: '#FF9800' }
  ];

  const circleRefs = useRef([]);

  useEffect(() => {
    circleRefs.current.forEach((circle, index) => {
      if (circle) {
        // Reset to initial state
        circle.style.setProperty('--progress', '0%');
        // Force reflow to ensure animation starts
        void circle.offsetWidth;
        // Animate to target progress
        circle.style.setProperty('--progress', `${chapters[index].progress}%`);
      }
    });
  }, []);

  return (
    <div className="chapters-outer-container">
      {/* First row with Chapter 1 and Chapter 2 */}
      <div className="chapters-row">
        {chapters.slice(0, 2).map((chapter, index) => (
          <div key={index} className="chapter-circle-wrapper">
            <div className="chapter-circle" style={{ '--color': chapter.color }}>
              <div
                ref={el => circleRefs.current[index] = el}
                className="chapter-progress-circle"
              ></div>
              <span className="progress-percent">{chapter.progress}%</span>
            </div>
            <div className="chapter-label">Chapter {chapter.number}</div>
          </div>
        ))}
      </div>
      
      {/* Second row with Chapter 3 and Chapter 4 */}
      <div className="chapters-row">
        {chapters.slice(2, 4).map((chapter, index) => (
          <div key={index + 2} className="chapter-circle-wrapper">
            <div className="chapter-circle" style={{ '--color': chapter.color }}>
              <div
                ref={el => circleRefs.current[index + 2] = el}
                className="chapter-progress-circle"
              ></div>
              <span className="progress-percent">{chapter.progress}%</span>
            </div>
            <div className="chapter-label">Chapter {chapter.number}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chapters;