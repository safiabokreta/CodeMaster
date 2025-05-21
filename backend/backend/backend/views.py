from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User


def home(request):
    return HttpResponse("Welcome to the backend! Visit admin for the admin panel.")

def registerPage(request):
    context={}
    return render (request, 'accounts/register.html', context)

def loginPage(request):
    context={}
    return render (request, 'accounts/login.html', context)
