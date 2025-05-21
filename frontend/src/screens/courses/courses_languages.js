import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import Language from "../../components/courses/language.js"; 
import Navbar from "../../components/navBar.js";
import "../../assets/styles/courses/courses_languages.css";
import api from '../../services/api';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // 1. Make API call to Django endpoint
        const response = await api.getCourses();
        console.log("API response:", response); // Debugging
        // 2. Check if response has data (structure depends on your Django view)
        if (response.data && Array.isArray(response.data)) {
          setCourses(response.data);
        } else if (response.data.courses) {
          // If your Django returns {courses: [...]}
          setCourses(response.data.courses);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <Navbar />
        <div className="loading-message">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Navbar />
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      <div className="courses-container">
        <div className="courses-page">
          {courses.map((course) => (
            // 3. Use course.ID_course instead of title for the URL
            <Link 
              to={`/courses/${course.ID_course}`} 
              key={course.ID_course} 
              className="course-link"
            >
              {/* 4. Make sure these props match what your Language component expects */}
                <Language 
                  key={course.ID_course}
                  title={course.name}
                  description={course.description}
                  progress={0}
                  courseId={course.ID_course}  // Pass the course ID
                />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;