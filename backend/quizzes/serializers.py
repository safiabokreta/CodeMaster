from rest_framework import serializers
from .models import Quiz, QuizQuestion, QuizChoice, QuizAnswer

class QuizChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizChoice
        fields = ['ID_QChoice', 'choice_text']

class QuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAnswer
        fields = ['ID_QAnswer', 'answer_text', 'is_correct']

class QuizQuestionSerializer(serializers.ModelSerializer):
    choices = QuizChoiceSerializer(many=True, read_only=True)
    answers = QuizAnswerSerializer(many=True, read_only=True)

    class Meta:
        model = QuizQuestion
        fields = [
            'ID_QQuestion', 'ID_quiz', 'question_text',
            'question_type', 'points', 'order',
            'choices', 'answers'
        ]

class QuizSerializer(serializers.ModelSerializer):
    questions = QuizQuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = [
            'ID_quiz', 'title', 'description',
            'passing_score', 'ID_course', 'questions'
        ]
