from django.db import models
from courses.models import Course  
class Quiz(models.Model):
    ID_quiz = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    passing_score = models.FloatField()
    # Assuming idC* refers to related Course or similar — adjust as needed
    ID_course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='quizzes')

    def __str__(self):
        return self.title


class QuizQuestion(models.Model):
    ID_QQuestion = models.AutoField(primary_key=True)
    QUESTION_TYPES = [
        ('MC', 'Multiple Choice'),
        ('TF', 'True/False'),
        ('SA', 'Short Answer'),
    ]

    ID_quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=2, choices=QUESTION_TYPES)
    points = models.FloatField()
    order = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.order}. {self.question_text}"




class QuizAnswer(models.Model):
    ID_QAnswer = models.AutoField(primary_key=True)

    ID_QQuestion  = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE, related_name='answers')
    answer_text = models.TextField()
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.answer_text} (Correct: {self.is_correct})"

