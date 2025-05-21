from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Chapter, Excercise, Course
from llm.llm_service import generate_and_store_lecture, generate_and_store_exercise

# Default chapters
DEFAULT_CHAPTERS = [
    "Introduction to Programming",

]

LEVELS = ['beginner', 'intermediate', 'advanced']

@receiver(post_save, sender=Course)
def create_chapters_for_course(sender, instance, created, **kwargs):
    if created:
        for chapter_title in DEFAULT_CHAPTERS:
            for level_prog in LEVELS:
                for level_eng in LEVELS:
                    # Create Chapter
                    chapter = Chapter.objects.create(
                        course=instance,
                        name=chapter_title,
                        level_programming=level_prog,
                        level_english=level_eng
                    )
                    print(f"Chapter '{chapter_title}' created for course '{instance.name}' with ID {instance.ID_course}.")
                    # Generate and save lecture content
                    generate_and_store_lecture(chapter.ID_chapter)
                    
                    print(f"Lecture content generated for chapter '{chapter_title}' in course '{generate_and_store_lecture(chapter.ID_chapter).lectureContent}'.")

                    # Create 9 default exercises for the chapter
                    exercise_types = [choice[0] for choice in Excercise.ExerciseType.choices]
                    difficulty_levels = [level[0] for level in Excercise.DifficultyLevel.choices]

                    for i in range(9):
                        exercise = Excercise.objects.create(
                            chapter=chapter,
                            exerciseType=exercise_types[i % len(exercise_types)],
                            difficultyLevel=difficulty_levels[i % len(difficulty_levels)],
                            name="",
                            description="",
                            exerciseContent="",
                            solutionContent=""
                        )
                        print(f"Exercise {exercise.ID_exercise} created for chapter '{chapter_title}' in course '{instance.name}'.")
                        # Generate and save exercise content
                        generate_and_store_exercise(exercise.ID_exercise)
