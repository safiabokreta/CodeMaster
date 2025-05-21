from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from accounts import views

urlpatterns = [
    path('api/auth/', include('accounts.urls')),  # This should be first
    path('admin/', admin.site.urls),
    path('api/', include('courses.urls')),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('courses/', include('courses.urls')),
    path('llm/', include('llm.urls')),
    path('accounts/', include('accounts.urls')),
    path('quizzes/', include('quizzes.urls')),
]
