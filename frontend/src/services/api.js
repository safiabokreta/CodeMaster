import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/courses',
});





export default {
  // Courses
  getCourses() {
    return api.get('courses/');
  },
  
  getChapters(courseId) {
    // Use template literals correctly
    return api.get(`chapters/${courseId}/`)
      .then(res => res.data)
      .catch(error => {
        console.error('API Error:', error);
        throw error;
      });
  },

  // NEW: Add this function for lecture content
  getLectureContent(chapterId) {
  return api.get(`chapters/${chapterId}/content/`)
    .then(res => {
      console.log('Lecture content response:', res.data); // Debugging
      return res.data;
    })
    .catch(error => {
      console.error('Error fetching lecture:', error);
      throw error;
    });
},
  


  getChapterExercises(chapterId) {
    return api.get(`exercises/${chapterId}/`);
  },
  
  getExerciseDetails(exerciseId) {
    return api.get(`exercise/${exerciseId}/`);
  },
  
  submitExerciseAnswer(exerciseId, answer) {
    return api.post(`exercise/${exerciseId}/submit/`, { answer });
  },
  // Progress
  getUserProgress() {
    return api.get('user-progress/');
  },

  // In your api.js service
  getChapterDetails(chapterId) {
    return api.get(`chapters/${chapterId}/`)
      .then(res => res.data);
  }
};