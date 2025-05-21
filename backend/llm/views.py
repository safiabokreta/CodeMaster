from rest_framework.response import Response
from courses.models import Course, Chapter, Excercise
from rest_framework.decorators import api_view
from .llm_service import generate_and_store_exercise , generate_and_store_lecture
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

@csrf_exempt
@api_view(['POST'])
def generate_and_store_exercise_view(request):
    exercise_id = request.data.get('exercise_id')
    return generate_and_store_exercise(exercise_id)

@csrf_exempt
@api_view(['POST'])
def generate_and_store_lecture_view(request):
    chapter_id = request.data.get('chapter_id')
    return generate_and_store_lecture(chapter_id)
