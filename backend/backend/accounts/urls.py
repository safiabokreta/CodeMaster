from django.urls import include, path
from . import views
from .views import ProfileAPIView, CustomPasswordChangeView, CustomPasswordChangeDoneView, initiate_email_change, verify_email_change, signup_api, login_api, get_csrf_token
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import LogoutView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model, authenticate
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

urlpatterns = [
    path('signup/', signup_api, name='signup_api'),
    path('login/', login_api, name='login_api'),
    path('csrf/', get_csrf_token, name='get_csrf_token'),
    path('homepage/', views.homePage, name='homepage'),
    path('profile/', views.profile_view, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('profile-api/', ProfileAPIView.as_view(), name='profile-api'),
    
    # Password change URLs
    path('password_change/', CustomPasswordChangeView.as_view(), name='password_change'),
    path('password_change/done/', CustomPasswordChangeDoneView.as_view(), name='password_change_done'),
    
    # Password reset URLs
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='accounts/password_reset_form.html'), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='accounts/password_reset_done.html'), name='password_reset_done'),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='accounts/password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='accounts/password_reset_complete.html'), name='password_reset_complete'),
    path('change-email/', initiate_email_change, name='change_email'),
    path('verify-email-change/', verify_email_change, name='verify_email_change'),
    path('change-email-page/', views.change_email_page, name='change_email_page'),
    path('settings/', views.settings_view, name='settings'),
    path('delete-account/', views.delete_account, name='delete_account'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('dashboard/progress/', views.dashboard_progress, name='dashboard_progress'),
    path('dashboard/course/<int:course_id>/chapters/', views.course_chapter_progress, name='course_chapter_progress'),
    path('quizzes/', include('quizzes.urls')),
    path('verify-email/', views.verify_email, name='verify_email'),
    path('password_reset/', views.password_reset_api, name='password_reset_api'),
    path('password_reset_request/', views.password_reset_request_api, name='password_reset_request_api'),
    path('password_reset_confirm/', views.password_reset_confirm_api, name='password_reset_confirm_api'),
    path('public-profile/', views.public_profile_api, name='public_profile_api'),
    path('public-change-email/', views.public_initiate_email_change, name='public_initiate_email_change'),
    path('delete-account-api/', views.delete_account_api, name='delete_account_api'),
]

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
