from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone


class Course(models.Model): 
    ID_course = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,default="")

class Chapter(models.Model): 
    ID_chapter = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default="")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='chapters')

    class LevelChoices(models.TextChoices):
        BEGINNER = 'beginner', 'Beginner'
        INTERMEDIATE = 'intermediate', 'Intermediate'
        ADVANCED = 'advanced', 'Advanced'

    level_english = models.CharField(
        max_length=20,
        choices=LevelChoices.choices,
        default=LevelChoices.BEGINNER
    )

    level_programming = models.CharField(
        max_length=20,
        choices=LevelChoices.choices,
        default=LevelChoices.BEGINNER
    )

    lectureContent = models.TextField(default="", blank=True, null=True)


class Excercise(models.Model): 
    ID_exercise = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,default="",blank=True, null=True)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='exercises')
    exerciseContent = models.TextField(default="",blank=True, null=True)
    solutionContent = models.TextField(default="",blank=True, null=True)
    class ExerciseType(models.TextChoices):  # Use TextChoices for string-based options
        COMPLETE_THE_CODE = 'Complete the Code'
        PREDICT_OUTPUT = 'Predict Output'
        WRITE_YOUR_OWN_CODE = 'Write Your Own Code'
        SPOT_THE_ERROR = 'Spot the Error'
        EXPLAIN_THE_CODE = 'Explain the Code'
        IDENTIFY_ERROR = 'Identify Error'
        MULTIPLE_CHOICE = 'Multiple Choice Question'
        TRUE_OR_FALSE = 'True or False'
        MATCH_THE_FOLLOWING = 'Match the Following'

    exerciseType = models.CharField(
        max_length=50,
        choices=ExerciseType.choices,  # Use ExerciseType.choices here
    )

    class DifficultyLevel(models.IntegerChoices):  # Define difficulty level as integer choices
        LEVEL_1 = 1
        LEVEL_2 = 2
        LEVEL_3 = 3
        LEVEL_4 = 4
        LEVEL_5 = 5

    difficultyLevel = models.IntegerField(
        choices=DifficultyLevel.choices,
    )

    description = models.TextField(default="",blank=True, null=True)


class UserExercise(models.Model):
    # Keep existing fields
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    exercise = models.ForeignKey('Excercise', on_delete=models.CASCADE)
    level = models.FloatField(default=0.0)  # Keep temporarily
    
    # Add new fields
    answer = models.TextField(default="", blank=True)
    feedback = models.TextField(default="", blank=True)
    score = models.FloatField(default=0.0)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)  # Temporary default
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('user', 'exercise')
class UserCourse(models.Model): 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    @property
    def level(self):
        chapters = self.course.chapters.all()
        if not chapters.exists():
            return 0.0
        user_chapters = UserChapter.objects.filter(user=self.user, chapter__in=chapters)
        if not user_chapters.exists():
            return 0.0
        total = sum(uc.level for uc in user_chapters)
        return total / chapters.count()

    @property
    def progress(self):
        chapters = self.course.chapters.all()
        if not chapters.exists():
            return 0.0
        completed = 0
        for chapter in chapters:
            uc = UserChapter.objects.filter(user=self.user, chapter=chapter).first()
            if uc and uc.level > 0:
                completed += 1
        return completed / chapters.count()

class UserChapter(models.Model): 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    @property
    def level(self):
        exercises = self.chapter.exercises.all()
        if not exercises.exists():
            return 0.0
        user_exercises = UserExercise.objects.filter(user=self.user, exercise__in=exercises)
        if not user_exercises.exists():
            return 0.0
        total = sum(ue.level for ue in user_exercises)
        return total / exercises.count()
    
