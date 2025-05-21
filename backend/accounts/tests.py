from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from courses.models import Course, Chapter, UserCourse, UserChapter, UserExercise, Excercise

class DashboardTests(TestCase):
    def setUp(self):
        # Create test user
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        # Create test course
        self.course = Course.objects.create(
            name='Python Programming'
        )
        
        # Create test chapters
        self.chapter1 = Chapter.objects.create(
            name='Introduction',
            course=self.course
        )
        self.chapter2 = Chapter.objects.create(
            name='Variables',
            course=self.course
        )
        
        # Create test exercises
        self.exercise1 = Excercise.objects.create(
            name='First Exercise',
            chapter=self.chapter1,
            exerciseType='Complete the Code',
            difficultyLevel=1
        )
        self.exercise2 = Excercise.objects.create(
            name='Second Exercise',
            chapter=self.chapter1,
            exerciseType='Multiple Choice Question',
            difficultyLevel=2
        )
        
        # Create user course
        self.user_course = UserCourse.objects.create(
            user=self.user,
            course=self.course
        )
        
        # Create user chapter
        self.user_chapter = UserChapter.objects.create(
            user=self.user,
            chapter=self.chapter1
        )
        
        # Create user exercise with some progress
        self.user_exercise = UserExercise.objects.create(
            user=self.user,
            exercise=self.exercise1,
            level=0.8  # 80% completion
        )
        
        # Setup API client
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_dashboard_progress(self):
        """Test getting overall progress for all courses"""
        response = self.client.get('/api/auth/dashboard/progress/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # One course
        
        course_data = response.data[0]
        self.assertEqual(course_data['course_name'], 'Python Programming')
        self.assertEqual(course_data['course_id'], self.course.ID_course)
        # Progress should be 50% (1 chapter out of 2 has progress)
        self.assertAlmostEqual(course_data['progress'], 50.0)
        # Level should be 80% (from the exercise completion)
        self.assertAlmostEqual(course_data['level'], 80.0)

    def test_course_chapter_progress(self):
        """Test getting progress for chapters in a specific course"""
        response = self.client.get(f'/api/auth/dashboard/course/{self.course.ID_course}/chapters/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Two chapters
        
        # Check first chapter (has progress)
        chapter1_data = next(c for c in response.data if c['chapter_id'] == self.chapter1.ID_chapter)
        self.assertEqual(chapter1_data['chapter_name'], 'Introduction')
        self.assertAlmostEqual(chapter1_data['progress'], 80.0)  # From exercise completion
        
        # Check second chapter (no progress)
        chapter2_data = next(c for c in response.data if c['chapter_id'] == self.chapter2.ID_chapter)
        self.assertEqual(chapter2_data['chapter_name'], 'Variables')
        self.assertEqual(chapter2_data['progress'], 0.0)

    def test_course_chapter_progress_invalid_course(self):
        """Test getting progress for non-existent course"""
        response = self.client.get('/api/auth/dashboard/course/999/chapters/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_dashboard_progress_unauthenticated(self):
        """Test getting progress without authentication"""
        self.client.force_authenticate(user=None)
        response = self.client.get('/api/auth/dashboard/progress/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
