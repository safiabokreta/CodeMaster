from django.urls import path
from .views import generate_course_quiz

urlpatterns = [
    path('generate/<int:course_id>/', generate_course_quiz, name='generate_quiz'),
]