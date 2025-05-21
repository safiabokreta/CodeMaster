import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/styles/courses/lectureContent.css";
import NavBar from "../../components/navBar";
import api from '../../services/api';
import MarkdownContent  from "../../components/courses/MarkdownContent";

const LecturePage = () => {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState({
    title: '',
    content: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLecture(prev => ({...prev, loading: true, error: null}));
        
        // Debugging
        console.log(`Fetching content for chapter ${chapterId}...`);
        
        const response = await api.getLectureContent(chapterId);
        
        if (!response.content) {
          throw new Error('No content found in response');
        }

        setLecture({
          title: response.title || `Chapter ${chapterId}`,
          content: response.content,
          loading: false,
          error: null
        });

      } catch (err) {
        console.error('Fetch error details:', err);
        setLecture({
          title: '',
          content: '',
          loading: false,
          error: err.response?.data?.error || 
                err.message || 
                'Failed to load lecture content'
        });
      }
    };

    fetchContent();
  }, [chapterId]);

  return (
  <div className="lecture-content-page">
    <NavBar />
    <div className="lecture-container">
      <h1>{lecture.title}</h1> {/* Removed "- Lecture Content" for cleaner look */}
      
      {lecture.loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : lecture.error ? (
        <div className="error-container">
          <p style={{ color: 'red' }}>{lecture.error}</p>
          <p>Requested chapter: {chapterId}</p>
          <button 
            onClick={() => navigate(`/courses/${courseId}`)}
            className="retry-button"
          >
            Back to Chapters
          </button>
        </div>
      ) : (
        <div className="content-box">
          <MarkdownContent content={lecture.content} />
        </div>
      )}
    </div>
  </div>
  );
};

export default LecturePage;