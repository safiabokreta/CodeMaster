import json
import re
from django.http import JsonResponse
from django.db import transaction
from courses.models import Course
from .models import Quiz, QuizQuestion, QuizAnswer
import together

together.api_key = "a39881d7ff3b9042bc49006d20bff5a4aeee21d94f919406eab24e1b44532d0f"

def generate_course_quiz(request, course_id):
    try:
        # 1. Get course
        course = Course.objects.get(ID_course=course_id)
        
        # 2. Simple prompt
        prompt = f"""
        Create a quiz about {course.name} as pure JSON with this exact structure:
        {{
            "title": "Quiz Title",
            "questions": [
                {{
                    "question_text": "Question?",
                    "question_type": "MC",
                    "answers": [
                        {{"text": "Option 1", "correct": true}},
                        {{"text": "Option 2", "correct": false}}
                    ]
                }}
            ]
        }}
        Include 3-5 questions mixing multiple choice (MC) and true/false (TF).
        Return ONLY the JSON with no additional text.
        """
        
        # 3. Call LLM
        response = together.Complete.create(
            prompt=prompt,
            model="meta-llama/Llama-3-8b-chat-hf",
            max_tokens=1000,
            temperature=0.3
        )
        raw_response = response['choices'][0]['text'].strip()
        
        # 4. Clean and parse response
        json_str = re.sub(r'```(json)?|```', '', raw_response).strip()
        quiz_data = json.loads(json_str)
        
        # 5. Save to database
        with transaction.atomic():
            quiz = Quiz.objects.create(
                ID_course=course,
                title=quiz_data['title'][:100],
                description=quiz_data.get('description', '')[:200],
                passing_score=70
            )
            
            for i, q in enumerate(quiz_data['questions']):
                question = QuizQuestion.objects.create(
                    ID_quiz=quiz,
                    question_text=q['question_text'][:200],
                    question_type=q['question_type'],
                    points=1,
                    order=i+1
                )
                
                for a in q['answers']:
                    QuizAnswer.objects.create(
                        ID_QQuestion=question,
                        answer_text=a['text'][:100],
                        is_correct=a['correct']
                    )
        
        return JsonResponse({
            'status': 'success',
            'quiz_id': quiz.ID_quiz,
            'title': quiz.title,
            'questions': len(quiz_data['questions'])
        })
        
    except Course.DoesNotExist:
        return JsonResponse({'error': 'Course not found'}, status=404)
    except json.JSONDecodeError:
        # Simple fallback quiz
        with transaction.atomic():
            quiz = Quiz.objects.create(
                ID_course=course,
                title=f"Basic {course.name} Quiz",
                description="Default quiz",
                passing_score=70
            )
            
            # Question 1
            q1 = QuizQuestion.objects.create(
                ID_quiz=quiz,
                question_text=f"What is {course.name} about?",
                question_type="MC",
                points=1,
                order=1
            )
            QuizAnswer.objects.create(ID_QQuestion=q1, answer_text=course.name, is_correct=True)
            QuizAnswer.objects.create(ID_QQuestion=q1, answer_text="Programming", is_correct=False)
            QuizAnswer.objects.create(ID_QQuestion=q1, answer_text="Design", is_correct=False)
            QuizAnswer.objects.create(ID_QQuestion=q1, answer_text="Business", is_correct=False)
            
            # Question 2
            q2 = QuizQuestion.objects.create(
                ID_quiz=quiz,
                question_text=f"Is {course.name} a programming course?",
                question_type="TF",
                points=1,
                order=2
            )
            QuizAnswer.objects.create(ID_QQuestion=q2, answer_text="True", is_correct=True)
            QuizAnswer.objects.create(ID_QQuestion=q2, answer_text="False", is_correct=False)
            
        return JsonResponse({
            'status': 'fallback',
            'quiz_id': quiz.ID_quiz,
            'title': quiz.title,
            'questions': 2,
            'warning': 'Used default quiz'
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)