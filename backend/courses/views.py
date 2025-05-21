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
    return Response({"courses": list(courses)})



@api_view(['GET'])
def get_chapters_by_course(request, course_id):
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