from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import Course, Chapter, Excercise, UserChapter,UserCourse,UserExercise
from rest_framework.decorators import api_view
from .services import generate_exercises_for_all_courses
from llm.llm_service import evaluate_exercise_answer  
from django.conf import settings 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Excercise, UserExercise
from django.shortcuts import get_object_or_404
import json
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import Chapter
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from accounts.models import Profile

@api_view(['GET'])
def get_chapters_by_course(request, course_id):
    print("=== DEBUG START ===")
    try:
        # Get user ID from query params
        user_id = request.GET.get('user_id')
        logger.info("\n=== DEBUG START ===")
        logger.info(f"1. Received user_id from request: {user_id}")
        logger.info(f"2. Course ID requested: {course_id}")
        
        if not user_id:
            logger.error("3. ERROR: No user_id provided")
            return JsonResponse({'error': 'User ID missing'}, status=400)
            
        # Get user and profile
        User = get_user_model()
        try:
            user = User.objects.get(id=user_id)
            profile = user.profile
            logger.info(f"4. Found user: {user.email}")
            logger.info(f"5. User levels - English: {profile.english_level}, Programming: {profile.programming_level}")
        except (User.DoesNotExist, Profile.DoesNotExist) as e:
            logger.error(f"6. ERROR: {str(e)}")
            return JsonResponse({'error': 'User profile not found'}, status=404)
            
        # Debug chapters query
        chapters = Chapter.objects.filter(course_id=course_id)
        logger.info(f"7. Found {chapters.count()} chapters for course {course_id}")
        
        # Print all chapters and their levels for debugging
        logger.info("=== CHAPTER LEVELS DEBUG ===")
        for ch in chapters:
            logger.info(f"Chapter {ch.ID_chapter}: {ch.name}, English: {ch.level_english}, Programming: {ch.level_programming}")
        logger.info("=== END CHAPTER LEVELS DEBUG ===")
        
        # Filter chapters based on user's levels
        filtered_chapters = []
        level_order = {'Beginner': 0, 'Intermediate': 1, 'Advanced': 2}
        
        # Get user levels once
        user_english = level_order.get(profile.english_level, 0)
        user_programming = level_order.get(profile.programming_level, 0)
        logger.info(f"User levels (numeric): English={user_english}, Programming={user_programming}")
        
        for chapter in chapters:
            # Convert chapter levels to comparable values
            chapter_english = level_order.get(chapter.level_english, 0)
            chapter_programming = level_order.get(chapter.level_programming, 0)
            
            logger.info(f"Chapter {chapter.ID_chapter} levels (numeric): English={chapter_english}, Programming={chapter_programming}")
            
            # Check if user meets level requirements - using >= comparison
            meets_requirements = user_english >= chapter_english and user_programming >= chapter_programming
            logger.info(f"Chapter {chapter.ID_chapter} meets requirements: {meets_requirements}")
            
            if meets_requirements:
                # Get user progress for this chapter
                user_chapter = UserChapter.objects.filter(
                    user=user,
                    chapter=chapter
                ).first()
                
                progress = user_chapter.level * 100 if user_chapter else 0
                
                filtered_chapters.append({
                    'ID_chapter': chapter.ID_chapter,
                    'name': chapter.name,
                    'progress': progress,
                    'level_english': chapter.level_english,
                    'level_programming': chapter.level_programming,
                    'user_english_level': profile.english_level,
                    'user_programming_level': profile.programming_level
                })
               
        logger.info(f"8. Returning {len(filtered_chapters)} filtered chapters")
        logger.info("=== DEBUG END ===\n")
        
        return JsonResponse({'chapters': filtered_chapters})
        
    except Exception as e:
        logger.error(f"9. EXCEPTION: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
def get_exercise_detail(request, exercise_id):
    exercise = get_object_or_404(Excercise, ID_exercise=exercise_id)
    return Response({
        'id': exercise.ID_exercise,
        'name': exercise.name,
        'description': exercise.description,
        'difficulty': exercise.difficultyLevel,
        'chapter_id': exercise.chapter.ID_chapter,
        'content_type':exercise.exerciseType,
        'content': exercise.exerciseContent,
        'solution': exercise.solutionContent,
    })

@api_view(['POST'])
def submit_exercise(request, exercise_id):
    try:
        exercise = Excercise.objects.get(ID_exercise=exercise_id)
        data = json.loads(request.body)
        user_answer = data.get('answer', '')
        
        # Here you would normally call your LLM evaluation
        # For now, we'll simulate a response
        feedback = "Good attempt! Here's some simulated feedback."
        
        # Save user progress
        UserExercise.objects.update_or_create(
            user=request.user,
            exercise=exercise,
            defaults={
                'answer': user_answer,
                'feedback': feedback,
                'is_completed': True
            }
        )
        
        return Response({
            'feedback': feedback,
            'is_correct': True
        })
        
    except Excercise.DoesNotExist:
        return Response({'error': 'Exercise not found'}, status=404)

@api_view(['GET'])
def get_user_progress(request):
    user = request.user
    # Implement your progress calculation logic here
    return Response({
        'total_courses': 5,  # Example data
        'completed_exercises': 12,
        'completion_percentage': 65
    })



@api_view(['GET'])
def get_all_courses(request):
    courses = Course.objects.all().values('ID_course', 'name')
    print(courses)
    return Response({"courses": list(courses)})



@api_view(['GET'])
def _user(request, course_id):
    chapters = Chapter.objects.filter(course_id=course_id).values('ID_chapter', 'name')  # Ensure these fields exist
    return JsonResponse({'chapters': list(chapters)})



@api_view(['GET'])
def get_exercises_by_chapter(request, chapter_id):
    exercises = Excercise.objects.filter(chapter__ID_chapter=chapter_id).values('ID_exercise', 'name', 'difficultyLevel')
    return Response({"exercises": list(exercises)})




@api_view(['POST'])
def generate_exercises_for_all_courses_view(request):
    try:
        # Call the service function to generate exercises for all courses
        generate_exercises_for_all_courses()
        return Response({"message": "Exercises generated and stored successfully."}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    



# views.py
@api_view(['GET'])
def get_lecture_content(request, chapter_id):
    try:
        chapter = Chapter.objects.get(ID_chapter=chapter_id)
        return JsonResponse({
            'title': chapter.name,
            'content': chapter.lectureContent,  # Make sure this field exists
            'course_id': chapter.course_id
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# views.py
@api_view(['POST'])
def submit_exercise(request, exercise_id):
    try:
        exercise = Excercise.objects.get(ID_exercise=exercise_id)
        user_answer = request.data.get('answer', '').strip()
        
        if not user_answer:
            return Response({'error': 'Empty answer'}, status=400)
        
        # Get evaluation from LLM
        evaluation = evaluate_exercise_answer(exercise, user_answer)
        
        # Force 0 score for nonsense answers
        if len(user_answer) < 5 or "asdfghjkl" in user_answer.lower():  # Example nonsense detection
            evaluation['score'] = 0
            evaluation['is_correct'] = False
            evaluation['feedback'] = "This doesn't appear to be a valid attempt"
            evaluation['hints'] = ["Please provide a proper solution attempt"]
        
        return Response(evaluation)
        
    except Excercise.DoesNotExist:
        return Response({'error': 'Exercise not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


import logging
logger = logging.getLogger(__name__)

