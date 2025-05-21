from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserCreateSerializer, ProfileSerializer
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render
from .forms import CreateUserForm  
from django.middleware.csrf import get_token

from django.contrib.auth  import authenticate, login, logout
from django.contrib import messages

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Profile, EmailChangeRequest, UserStats, EmailVerification
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import LoginForm
from django.contrib.auth.models import User
from django.contrib.auth import views as auth_views

from django.utils import timezone
from datetime import timedelta
import random
import string
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site

from courses.models import Course, Chapter, UserCourse, UserChapter, UserExercise
from django.db.models import Avg
from django.contrib.auth.models import User as CustomUser
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.tokens import default_token_generator

User = get_user_model()

def home(request):
    return HttpResponse("Welcome to the backend! Visit /admin/ for the admin panel.")

@api_view(['POST'])
@permission_classes([AllowAny])
def signup_api(request):
    serializer = UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Update the profile with extra fields if provided
        profile = user.profile
        profile.english_level = request.data.get('english_level', '')
        profile.programming_level = request.data.get('programming_level', '')
        profile.save()

        # Create verification token
        token = get_random_string(64)
        expires_at = timezone.now() + timedelta(days=1)
        EmailVerification.objects.create(
            user=user,
            token=token,
            expires_at=expires_at
        )

        # Send verification email
        current_site = get_current_site(request)
        verification_link = f"http://{current_site.domain}{reverse('verify_email')}?token={token}"
        subject = 'Verify your email address'
        message = f'''Hi {user.username},\n\nPlease click on the link below to verify your email address:\n{verification_link}\n\nThis link will expire in 24 hours.\n\nIf you did not create an account, please ignore this email.'''
        send_mail(
            subject,
            message,
            'noreply@codemaster.com',
            [user.email],
            fail_silently=False,
        )
        return Response({'message': 'Account created successfully. Please check your email to verify your account.'}, status=201)
    else:
        return Response({'errors': serializer.errors}, status=400)

def verify_email(request):
    token = request.GET.get('token')
    try:
        verification = EmailVerification.objects.get(token=token)
        if verification.is_valid():
            verification.user.profile.is_email_verified = True
            verification.user.profile.save()
            verification.delete()
            # Redirect to React frontend login page after success
            return redirect('http://localhost:3000/login')
        else:
            # Expired link
            return HttpResponse('Verification link has expired. Please register again.', status=400)
    except EmailVerification.DoesNotExist:
        return HttpResponse('Invalid verification link.', status=400)

def homePage(request):
    context={}
    return render (request, 'accounts/home.html', context)

@login_required
def profile_view(request):
    profile = request.user.profile
    return render(request, 'accounts/profile.html', {'profile': profile})


@login_required
def edit_profile(request):
    profile = request.user.profile
    if request.method == 'POST':
        profile.bio = request.POST.get('bio', '')
        profile.english_level = request.POST.get('english_level', '')
        profile.programming_level = request.POST.get('programming_level', '')
        profile.save()
        return redirect('profile')
    return render(request, 'accounts/edit_profile.html', {'profile': profile})

class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def password_reset(request):
    return render(request, 'accounts/password_reset_form.html')

class CustomPasswordChangeView(auth_views.PasswordChangeView):
    template_name = 'accounts/change_password.html'
    success_url = '/api/auth/password_change/done/'
    login_url = '/api/auth/login/'

    def get_success_url(self):
        return self.success_url

class CustomPasswordChangeDoneView(auth_views.PasswordChangeDoneView):
    template_name = 'accounts/password_change_done.html'

@login_required
def settings_view(request):
    return render(request, 'accounts/settings.html')

@api_view(['POST'])
@login_required
def delete_account(request):
    password = request.data.get('password')
    user = request.user
    
    # Verify password
    if not user.check_password(password):
        return Response({'error': 'Invalid password'}, status=400)
    
    try:
        # Delete the user account
        user.delete()
        return Response({'message': 'Account deleted successfully'})
    except Exception as e:
        return Response({'error': 'Failed to delete account'}, status=500)

def generate_verification_code():
    return ''.join(random.choices(string.digits, k=6))

@api_view(['POST'])
@login_required
def initiate_email_change(request):
    new_email = request.data.get('new_email')
    if not new_email:
        return Response({'error': 'New email is required'}, status=400)
    
    # Delete any existing email change requests for this user
    EmailChangeRequest.objects.filter(user=request.user).delete()
    
    # Generate verification codes
    old_email_code = generate_verification_code()
    new_email_code = generate_verification_code()
    
    # Create email change request
    change_request = EmailChangeRequest.objects.create(
        user=request.user,
        new_email=new_email,
        old_email_code=old_email_code,
        new_email_code=new_email_code,
        expires_at=timezone.now() + timedelta(hours=24)
    )
    
    # Send verification code to old email
    send_mail(
        'Verify Email Change',
        f'Your verification code is: {old_email_code}',
        'noreply@codemaster.com',
        [request.user.email],
        fail_silently=False,
    )
    
    # Send verification code to new email
    send_mail(
        'Verify New Email',
        f'Your verification code is: {new_email_code}',
        'noreply@codemaster.com',
        [new_email],
        fail_silently=False,
    )
    
    return Response({'message': 'Verification codes sent to both emails'})

@api_view(['POST'])
@login_required
def verify_email_change(request):
    old_email_code = request.data.get('old_email_code')
    new_email_code = request.data.get('new_email_code')
    
    try:
        change_request = EmailChangeRequest.objects.get(user=request.user)
    except EmailChangeRequest.DoesNotExist:
        return Response({'error': 'No email change request found'}, status=400)
    
    if change_request.is_expired():
        change_request.delete()
        return Response({'error': 'Email change request expired'}, status=400)
    
    if old_email_code:
        if old_email_code == change_request.old_email_code:
            change_request.old_email_verified = True
            change_request.save()
        else:
            return Response({'error': 'Invalid old email verification code'}, status=400)
    
    if new_email_code:
        if new_email_code == change_request.new_email_code:
            change_request.new_email_verified = True
            change_request.save()
        else:
            return Response({'error': 'Invalid new email verification code'}, status=400)
    
    # If both emails are verified, update the user's email
    if change_request.is_verified():
        request.user.email = change_request.new_email
        request.user.save()
        change_request.delete()
        return Response({'message': 'Email successfully changed'})
    
    return Response({'message': 'Code verified', 
                    'old_email_verified': change_request.old_email_verified,
                    'new_email_verified': change_request.new_email_verified})

@login_required
def change_email_page(request):
    return render(request, 'accounts/change_email.html')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chapter_progress(request, course_id):
    user = request.user
    chapters = Chapter.objects.filter(course_id=course_id)
    progress = []
    for chapter in chapters:
        # Replace with your actual logic to get progress
        stat = UserStats.objects.filter(user=user, chapter=chapter).first()
        percent = stat.completion_percentage if stat else 0
        progress.append({
            'chapter_id': chapter.id,
            'chapter_name': chapter.name,
            'progress': percent,
        })
    return Response(progress)

@login_required
def dashboard_view(request):
    user = request.user
    # Get all courses the user is enrolled in
    user_courses = UserCourse.objects.filter(user=user)
    all_courses = [uc.course for uc in user_courses]

    # Get selected course from GET param or default to first course
    selected_course_id = request.GET.get('course_id')
    if selected_course_id:
        try:
            selected_course = Course.objects.get(ID_course=selected_course_id)
        except Course.DoesNotExist:
            selected_course = all_courses[0] if all_courses else None
    else:
        selected_course = all_courses[0] if all_courses else None

    chapters = Chapter.objects.filter(course=selected_course) if selected_course else []
    user_course = UserCourse.objects.filter(user=user, course=selected_course).first() if selected_course else None
    overall_progress = user_course.progress * 100 if user_course else 0
    current_level = user_course.level * 100 if user_course else 0

    chapter_progress = []
    for chapter in chapters:
        user_chapter = UserChapter.objects.filter(user=user, chapter=chapter).first()
        progress = user_chapter.level * 100 if user_chapter else 0
        chapter_progress.append({
            'name': chapter.name,
            'progress': progress
        })

    context = {
        'all_courses': all_courses,
        'selected_course': selected_course,
        'overall_progress': overall_progress,
        'current_level': current_level,
        'chapter_progress': chapter_progress,
    }
    return render(request, 'accounts/dashboard.html', context)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_progress(request):
    """Get overall progress for all courses"""
    user = request.user
    user_courses = UserCourse.objects.filter(user=user)
    
    progress_data = []
    for user_course in user_courses:
        course = user_course.course
        chapters = Chapter.objects.filter(course=course)
        total_chapters = chapters.count()
        
        if total_chapters == 0:
            continue
            
        completed_chapters = UserChapter.objects.filter(
            user=user,
            chapter__in=chapters
        ).count()
        
        progress = (completed_chapters / total_chapters) * 100 if total_chapters > 0 else 0
        
        # Calculate average level from exercises
        exercises = UserExercise.objects.filter(
            user=user,
            exercise__chapter__course=course
        )
        level = exercises.aggregate(Avg('level'))['level__avg'] or 0
        
        progress_data.append({
            'course_id': course.ID_course,
            'course_name': course.name,
            'progress': progress,
            'level': level * 100  # Convert to percentage
        })
    
    return Response(progress_data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def course_chapter_progress(request, course_id):
    """Get progress for chapters in a specific course"""
    try:
        course = Course.objects.get(ID_course=course_id)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    user = request.user
    chapters = Chapter.objects.filter(course=course)
    
    progress_data = []
    for chapter in chapters:
        exercises = UserExercise.objects.filter(
            user=user,
            exercise__chapter=chapter
        )
        progress = exercises.aggregate(Avg('level'))['level__avg'] or 0
        
        progress_data.append({
            'chapter_id': chapter.ID_chapter,
            'chapter_name': chapter.name,
            'progress': progress * 100  # Convert to percentage
        })
    
    return Response(progress_data)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_api(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    
    if user is not None:
        if not user.profile.is_email_verified:
            return Response({'message': 'Please verify your email address before logging in.'}, status=400)
        
        # Login the user and create session
        login(request, user)
        
        # Set session cookie settings
        response = Response({
            'message': 'Login successful!',
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username
            }
        })
        
        return response
    else:
        return Response({'message': 'Invalid email or password.'}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def password_reset_api(request):
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')
    
    if not new_password or not confirm_password:
        return Response({'message': 'New password and confirm password are required.'}, status=400)
    
    if new_password != confirm_password:
        return Response({'message': 'Passwords do not match.'}, status=400)
    
    try:
        validate_password(new_password, request.user)
    except ValidationError as e:
        return Response({'message': e.messages}, status=400)
    
    request.user.set_password(new_password)
    request.user.save()
    update_session_auth_hash(request, request.user)
    
    return Response({'message': 'Password reset successful!'}, status=200)

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request_api(request):
    email = request.data.get('email')
    if not email:
        return Response({'message': 'Email is required.'}, status=400)
    try:
        user = User.objects.get(email=email)
        token = default_token_generator.make_token(user)
        uid = user.pk
        reset_link = f"http://localhost:3000/reset-password?uid={uid}&token={token}"
        send_mail(
            'Password Reset',
            f'Click the link to reset your password: {reset_link}',
            'noreply@codemaster.com',
            [email],
            fail_silently=False,
        )
    except User.DoesNotExist:
        pass  # Don't reveal if the email exists
    return Response({'message': 'If the email exists, a reset link has been sent.'})

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm_api(request):
    uid = request.data.get('uid')
    token = request.data.get('token')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    if not (uid and token and new_password and confirm_password):
        return Response({'message': 'All fields are required.'}, status=400)
    if new_password != confirm_password:
        return Response({'message': 'Passwords do not match.'}, status=400)

    User = get_user_model()
    try:
        user = User.objects.get(pk=uid)
    except User.DoesNotExist:
        return Response({'message': 'Invalid user.'}, status=400)

    if not default_token_generator.check_token(user, token):
        return Response({'message': 'Invalid or expired token.'}, status=400)

    try:
        validate_password(new_password, user)
    except ValidationError as e:
        return Response({'message': e.messages}, status=400)

    user.set_password(new_password)
    user.save()
    return Response({'message': 'Password has been reset successfully!'})

@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf_token(request):
    return Response({'csrfToken': get_token(request)})

@api_view(['GET', 'PUT'])
@permission_classes([AllowAny])
def public_profile_api(request):
    user_id = request.GET.get('user_id')
    email = request.GET.get('email')
    if user_id:
        try:
            user = User.objects.get(pk=user_id)
            profile = user.profile
        except (User.DoesNotExist, Profile.DoesNotExist):
            return Response({'error': 'User or profile not found.'}, status=404)
    elif email:
        try:
            user = User.objects.get(email=email)
            profile = user.profile
        except (User.DoesNotExist, Profile.DoesNotExist):
            return Response({'error': 'User or profile not found.'}, status=404)
    else:
        profile = Profile.objects.first()
        if not profile:
            return Response({'error': 'No profiles found.'}, status=404)
    if request.method == 'PUT':
        data = request.data
        # Update username if provided
        if 'username' in data:
            user.username = data['username']
            user.save()
        profile.bio = data.get('bio', profile.bio)
        profile.programming_level = data.get('programming_level', profile.programming_level)
        profile.english_level = data.get('english_level', profile.english_level)
        profile.save()
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def public_initiate_email_change(request):
    current_email = request.data.get('current_email')
    new_email = request.data.get('new_email')
    if not current_email or not new_email:
        return Response({'error': 'Both current and new email are required.'}, status=400)
    try:
        user = User.objects.get(email=current_email)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)
    if User.objects.filter(email=new_email).exists():
        return Response({'error': 'This email is already in use.'}, status=400)

    # Generate code
    old_email_code = get_random_string(6, allowed_chars='0123456789')

    # Save the request (for later verification)
    EmailChangeRequest.objects.create(
        user=user,
        new_email=new_email,
        old_email_code=old_email_code,
        expires_at=timezone.now() + timedelta(hours=24)
    )

    # Send code to old email
    send_mail(
        'Verify Email Change',
        f'Your verification code is: {old_email_code}',
        'noreply@codemaster.com',
        [current_email],
        fail_silently=False,
    )

    # Send link to new email
    # The link should include the user's email and the new email as query params
    confirm_url = f'http://localhost:3000/confirm-email-change?current_email={current_email}&new_email={new_email}'
    send_mail(
        'Confirm Your New Email',
        f'Click the link to confirm your new email: {confirm_url}',
        'noreply@codemaster.com',
        [new_email],
        fail_silently=False,
    )

    return Response({'message': 'Verification code sent to old email and confirmation link sent to new email.'})

@api_view(['POST'])
@permission_classes([AllowAny])
def public_verify_email_change(request):
    current_email = request.data.get('current_email')
    new_email = request.data.get('new_email')
    old_email_code = request.data.get('old_email_code')
    try:
        user = User.objects.get(email=current_email)
        change_request = EmailChangeRequest.objects.get(user=user, new_email=new_email)
    except (User.DoesNotExist, EmailChangeRequest.DoesNotExist):
        return Response({'error': 'Invalid request.'}, status=400)
    if change_request.old_email_code != old_email_code:
        return Response({'error': 'Invalid code.'}, status=400)
    # Change the email
    user.email = new_email
    user.save()
    change_request.delete()
    return Response({'message': 'Email successfully changed.'})

@api_view(['POST'])
@permission_classes([AllowAny])
def logout_api(request):
    logout(request)
    response = Response({'message': 'Logged out successfully.'})
    # Optionally clear sessionid cookie
    response.delete_cookie('sessionid')
    return response

@api_view(['POST'])
@permission_classes([AllowAny])
def delete_account_api(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    user = authenticate(request, email=email, password=password)
    if user is not None:
        user.delete()
        return Response({'message': 'Account deleted successfully.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Incorrect password.'}, status=status.HTTP_400_BAD_REQUEST)