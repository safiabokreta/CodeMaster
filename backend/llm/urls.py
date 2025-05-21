from django.urls import path
from .views import generate_and_store_exercise , generate_and_store_lecture_view

urlpatterns = [
    path('generate_exercise/', generate_and_store_exercise, name='generate_exercise_content'),
    path('generate-lecture/', generate_and_store_lecture_view, name='generate_lecture'),
]
