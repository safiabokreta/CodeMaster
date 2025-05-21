import { useParams, useNavigate } from "react-router-dom";
import "../../assets/styles/courses/chapterDetails.css";
import Navbar from "../../components/navBar";
import { useEffect, useState } from 'react';
import api from '../../services/api';

const ChapterDetailsPage = () => {
  const { courseId, chapterId } = useParams();  // Get courseId from URL
  console.log("Received params details:", { courseId, chapterId });
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        // Using your existing getChapterDetails method
        const chapterData = await api.getChapterDetails(chapterId);
        setChapter(chapterData);
      } catch (error) {
        console.error('Error fetching chapter:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChapter();
  }, [chapterId]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-message">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="chapter-details-container">
        <div 
          className="chapter-option"
          onClick={() => navigate(`/courses/${courseId}/${chapterId}/content`)}
        >
          Lecture Content
        </div>
        <div 
          className="chapter-option"
          // Change the Exercises navigation to:
          onClick={() => navigate(`/courses/${courseId}/${chapterId}/exercises`)}
        >
          Exercises
        </div>
      </div>
    </div>
  );
};

export default ChapterDetailsPage;