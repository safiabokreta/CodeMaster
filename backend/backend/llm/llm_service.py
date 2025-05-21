import os
import json
import requests
import re
from rest_framework.response import Response
from courses.models import Course, Chapter, Excercise
from django.contrib.auth import get_user_model
from accounts.models import Profile

User = get_user_model()

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

def generate_content_with_gemini(prompt):
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    response = requests.post(GEMINI_URL, headers=headers, data=json.dumps(payload))

    if response.status_code != 200:
        raise Exception(f"Gemini API error: {response.status_code} - {response.text}")

    data = response.json()
    try:
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        raise Exception("Failed to extract content from Gemini response.")

def generate_lecture_content(prompt):
    return generate_content_with_gemini(prompt)

def generate_and_store_lecture(chapter_id):
    if not chapter_id:
        return Response({"error": "Chapter ID is required."}, status=400)

    try:
        chapter = Chapter.objects.get(ID_chapter=chapter_id)
    except Chapter.DoesNotExist:
        return Response({"error": "Chapter not found."}, status=404)

    chapter_name = chapter.name
    course_name = chapter.course.name
    level_programming = chapter.level_programming
    level_english = chapter.level_english

    prompt = f"""
    Please generate a lecture for a {course_name} course in chapter {chapter_name}.
    The user level in programming is {level_programming}, and their English level is {level_english}.
    Format the lecture content using Markdown. Organize the content with `##` for headers, and provide text for the sections.
    At the end of the lecture content, include a sentence that links to a relevant video for the chapter {chapter_name}.
    The link should be presented clearly, like: ' [Watch the video on {chapter_name}](https://example.com/video-link)'.
    """

    llm_output = generate_lecture_content(prompt)
    
    # Clean and format the response content to remove any unwanted characters or titles
    cleaned_output = llm_output.strip("```json\n").strip("```").replace("\n", " ").replace("\r", " ").strip()

    # Directly use the content without extracting from JSON
    lecture_content = cleaned_output

    # Store the lecture content in the chapter or elsewhere as needed
    chapter.lectureContent = lecture_content
    chapter.save()

    return chapter

def generate_chapter_exercise(prompt):
    return generate_content_with_gemini(prompt)

def format_exercise_content(content):
    """
    Enhanced formatting for exercise content to make it more readable
    """
    # Convert markdown headers to HTML headers
    content = re.sub(r'^# (.*?)$', r'<h1>\1</h1>', content, flags=re.MULTILINE)
    content = re.sub(r'^## (.*?)$', r'<h2>\1</h2>', content, flags=re.MULTILINE)
    content = re.sub(r'^### (.*?)$', r'<h3>\1</h3>', content, flags=re.MULTILINE)
    
    # Convert markdown bold and italic
    content = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', content)
    content = re.sub(r'\*(.*?)\*', r'<em>\1</em>', content)
    
    # Convert markdown code blocks with language specification
    def replace_code_block(match):
        language = match.group(1) if match.group(1) else 'python'
        code = match.group(2).strip()
        # Format code properly with proper indentation
        lines = code.split('\n')
        formatted_lines = []
        for line in lines:
            formatted_lines.append(line)
        formatted_code = '\n'.join(formatted_lines)
        return f'<pre><code class="language-{language}">{formatted_code}</code></pre>'
    
    content = re.sub(r'```(\w+)?\n(.*?)```', replace_code_block, content, flags=re.DOTALL)
    
    # Convert inline code
    content = re.sub(r'`([^`]+)`', r'<code>\1</code>', content)
    
    # Convert markdown lists
    content = re.sub(r'^- (.*?)$', r'<li>\1</li>', content, flags=re.MULTILINE)
    content = re.sub(r'^(\d+)\. (.*?)$', r'<li>\1. \2</li>', content, flags=re.MULTILINE)
    
    # Wrap consecutive list items in ul tags
    content = re.sub(r'(<li>.*?</li>(?:\s*<li>.*?</li>)*)', r'<ul>\1</ul>', content, flags=re.DOTALL)
    
    # Convert line breaks to proper HTML
    content = re.sub(r'\n\n', r'<br><br>', content)
    content = re.sub(r'\n', r'<br>', content)
    
    # Clean up any double br tags
    content = re.sub(r'<br><br><br>', r'<br><br>', content)
    
    return content

def generate_and_store_exercise(exercise_id):
    if not exercise_id:
        return Response({"error": "Exercise ID is required."}, status=400)

    try:
        exercise = Excercise.objects.get(ID_exercise=exercise_id)
    except Excercise.DoesNotExist:
        return Response({"error": "Exercise not found."}, status=404)

    exercise_type = exercise.exerciseType
    difficulty = exercise.difficultyLevel
    chapter = exercise.chapter

    prompt = f"""
    You are creating a programming exercise for a learning platform. Please generate a well-structured exercise with the following requirements:

    Exercise Type: {exercise_type}
    Chapter: {chapter.name}
    Difficulty Level: {difficulty}/5

    IMPORTANT FORMATTING REQUIREMENTS:
    1. Use clear markdown formatting (## for headers, ``` for code blocks)
    2. Make the content easy to read with proper spacing
    3. Use bullet points for multiple items
    4. For code blocks, always specify the language (e.g., ```python)
    5. Keep instructions clear and concise

    CONTENT REQUIREMENTS:
    1. Start with a brief description of what the exercise teaches
    2. Provide clear step-by-step instructions
    3. Include well-formatted code examples if needed
    4. For "Predict the Output" exercises, show the code clearly then ask questions

    OUTPUT FORMAT (as JSON):
    {{
        "exercise_name": "Clear and Descriptive Exercise Name",
        "description": "Brief explanation of what this exercise teaches",
        "exercise_content": "## Exercise Title\\n\\n**Description:** Clear explanation of the exercise\\n\\n**Instructions:**\\n1. Step one\\n2. Step two\\n\\n**Code:**\\n```python\\n# Well formatted code\\nprint('Hello World')\\n```\\n\\n**Question:** What will this code output?",
        "exercise_solution": "## Solution\\n\\n**Explanation:** Detailed explanation of the solution\\n\\n**Answer:** The correct answer with reasoning"
    }}

    Example for a "Predict the Output" exercise:
    {{
        "exercise_content": "## Predict the Output\\n\\n**Description:** This exercise tests your understanding of conditional statements.\\n\\n**Instructions:** Look at the code below and predict what it will output.\\n\\n**Code:**\\n```python\\nx = 10\\ny = 5\\nif x > y:\\n    print('x is greater than y')\\nelse:\\n    print('y is greater than x')\\n```\\n\\n**Question:** What will be printed when this code runs?",
        "exercise_solution": "## Solution\\n\\n**Explanation:** The code compares two variables x (10) and y (5). Since 10 > 5 is True, the if condition is satisfied.\\n\\n**Answer:** The output will be: 'x is greater than y'"
    }}
    """

    llm_output = generate_chapter_exercise(prompt)
    cleaned_output = llm_output.strip("```json\n").strip("```")

    try:
        llm_data = json.loads(cleaned_output)
        
        # Get the content and format it properly
        exercise_content = llm_data.get("exercise_content", "")
        solution_content = llm_data.get("exercise_solution", "")
        
        # Apply enhanced formatting to make content more readable
        formatted_exercise_content = format_exercise_content(exercise_content)
        formatted_solution_content = format_exercise_content(solution_content)

        exercise.name = llm_data.get("exercise_name", "")
        exercise.description = llm_data.get("description", "")
        exercise.exerciseContent = formatted_exercise_content
        exercise.solutionContent = formatted_solution_content
        exercise.exerciseType = exercise_type
        exercise.difficultyLevel = difficulty
        exercise.save()

        return Response({
            "message": "Exercise updated successfully.",
            "exercise_id": exercise.ID_exercise,
            "name": exercise.name,
            "chapter_name": chapter.name,
            "exercise_type": exercise.exerciseType,
            "difficulty_level": exercise.difficultyLevel,
            "content": exercise.exerciseContent,
            "solution": exercise.solutionContent
        }, status=200)
        
    except json.JSONDecodeError as e:
        return Response({"error": f"Failed to parse LLM output: {str(e)}", "raw_output": cleaned_output}, status=500)

##Exercise Evaluation
def evaluate_exercise_answer(exercise, user_answer):
    prompt = f"""
    You are a strict programming exercise evaluator. Analyze this submission critically:

    EXERCISE:
    {exercise.exerciseContent}

    CORRECT SOLUTION:
    {exercise.solutionContent}

    STUDENT'S ANSWER:
    {user_answer}

    Evaluation Guidelines:
    1. Score 0-100 based on correctness (0=completely wrong, 100=perfect)
    2. Identify specific mistakes
    3. Provide targeted hints
    4. Be honest - if the answer is nonsense, say so

    Required JSON Response Format:
    {{
        "score": (0-100),
        "feedback": "Concise evaluation",
        "hints": ["Specific", "hints"],
        "is_correct": (boolean)
    }}

    Important:
    - If the answer is completely unrelated/unintelligible, give 0 score
    - Deduct points for each error
    - Only give full marks for perfect answers
    - Never inflate scores
    """
    
    try:
        evaluation_response = generate_content_with_gemini(prompt)
        cleaned_response = evaluation_response.strip("```json\n").strip("```")
        evaluation = json.loads(cleaned_response)
        
        # Ensure score is within bounds
        evaluation['score'] = max(0, min(100, int(evaluation.get('score', 0))))
        
        return evaluation
    except Exception as e:
        return {
            "score": 0,
            "feedback": "Evaluation failed - please try again",
            "hints": ["There was an error evaluating your answer"],
            "is_correct": False
        }