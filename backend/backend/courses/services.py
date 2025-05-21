# services.py
from llm.views import generate_and_store_exercise
from courses.models import Course

def generate_exercises_for_all_courses():
    # Retrieve all courses
    courses = Course.objects.all()

    # Loop through each course
    for course in courses:
        # Loop through each chapter in the course
        for chapter in course.chapters.all():
            # Loop through each exercise in the chapter
            for exercise in chapter.exercises.all():
                try:
                    # Call the existing function to generate and store the exercise
                    generate_and_store_exercise(exercise.ID_exercise)
                    print(f"Exercise {exercise.ID_exercise} updated successfully.")
                except Exception as e:
                    print(f"Failed to generate or store exercise {exercise.ID_exercise}: {str(e)}")
