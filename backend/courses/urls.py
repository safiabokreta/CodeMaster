from django.urls import path
from . import views

urlpatterns = [
    # Existing endpoints
    path('courses/', views.get_all_courses, name='get_all_courses'),
    path('chapters/<int:course_id>/', views.get_chapters_by_course),
    path('exercises/<int:chapter_id>/', views.get_exercises_by_chapter),
    path('generate-exercises/', views.generate_exercises_for_all_courses_view, name='generate_exercises_for_all_courses'),
    
    # New endpoints to add
    path('exercise/<int:exercise_id>/', views.get_exercise_detail),
    path('exercise/<int:exercise_id>/submit/', views.submit_exercise),
    path('user-progress/', views.get_user_progress, name='get_user_progress'),
    path('chapters/<int:chapter_id>/content/', views.get_lecture_content),

    
]
