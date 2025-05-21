from django.contrib import admin
from .models import Quiz, QuizQuestion,  QuizAnswer

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('ID_quiz', 'title', 'passing_score', 'ID_course')
    search_fields = ('title', 'description')
    list_filter = ('ID_course',)

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('ID_QQuestion', 'ID_quiz', 'question_text', 'question_type', 'points', 'order')
    list_filter = ('ID_quiz', 'question_type')
    search_fields = ('question_text',)

@admin.register(QuizAnswer)
class QuizAnswerAdmin(admin.ModelAdmin):
    list_display = ('ID_QAnswer', 'ID_QQuestion', 'answer_text', 'is_correct')
    list_filter = ('ID_QQuestion', 'is_correct')
    search_fields = ('answer_text',)
