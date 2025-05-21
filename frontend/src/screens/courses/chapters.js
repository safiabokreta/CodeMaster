import { useParams } from "react-router-dom";
import ChapterCard from "../../components/courses/chapter.js";
import "../../assets/styles/courses/chaptersPage.css"; 
import Navbar from "../../components/navBar.js";
import React, { useEffect, useState } from "react";
import api from '../../services/api';


const ChaptersPage = () => {
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        console.log('Fetching chapters for course ID:', courseId);
        const response = await api.getChapters(courseId);
        console.log('API Response:', response);
        
        // Ensure we have an array of chapters
        const chaptersData = response.chapters || [];
        console.log('Chapters data:', chaptersData);
        
        if (!Array.isArray(chaptersData)) {
          throw new Error('Invalid chapters data format');
        }
        
        setChapters(chaptersData);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [courseId]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading chapters...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />  {/* ✅ Navbar at the top */}
      <div className="chapters-container">
        <div className="chapters-page">
          {chapters.map(chapter => (
              <ChapterCard 
                key={chapter.ID_chapter}
                title={chapter.name || chapter.title}
                progress={chapter.progress || 0}
                chapterId={chapter.ID_chapter}
                courseId={courseId}  // Pass courseId to ChapterCard
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChaptersPage;


