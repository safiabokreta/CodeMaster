import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/styles/courses/exercises.css";
import Navbar from "../../components/navBar";
import ExerciseCard from "../../components/courses/Exercises";
import api from '../../services/api';

const ExercisesPage = () => {
  const { chapterId } = useParams();
  const [exercises, setExercises] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await api.getChapterExercises(chapterId);
        
        // Ensure response.data is an array
        const exercisesData = Array.isArray(response.data) 
          ? response.data 
          : response.data.exercises || [];
        
        setExercises(exercisesData);
        
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load exercises");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [chapterId]);

  if (loading) return <div>Loading exercises...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="exercises-page">
      <Navbar />
      <div className="exercises-container">
        {exercises.length > 0 ? (
          exercises.map(exercise => (
            <ExerciseCard 
              key={exercise.ID_exercise}
              id={exercise.ID_exercise}
              title={exercise.name}
              description={exercise.description}
              rating={exercise.difficultyLevel}
              done={exercise.is_completed}
            />
          ))
        ) : (
          <div className="no-exercises">No exercises found for this chapter</div>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;