from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()

class CreateUserForm(UserCreationForm):
    LEVEL_CHOICES = [
        ('', 'Select your level'),
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]
    
    email = forms.EmailField(required=True)
    english_level = forms.ChoiceField(
        choices=LEVEL_CHOICES,
        required=True,
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    programming_level = forms.ChoiceField(
        choices=LEVEL_CHOICES,
        required=True,
        widget=forms.Select(attrs={'class': 'form-control'})
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'english_level', 'programming_level']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].required = True
        self.fields['english_level'].initial = ''
        self.fields['programming_level'].initial = ''

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if not email:
            raise forms.ValidationError('Email is required.')
        return email

    def clean_english_level(self):
        level = self.cleaned_data.get('english_level')
        if not level:
            raise forms.ValidationError('Please select your English level.')
        return level

    def clean_programming_level(self):
        level = self.cleaned_data.get('programming_level')
        if not level:
            raise forms.ValidationError('Please select your Programming level.')
        return level


class LoginForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={
        'class': 'form-control',
        'placeholder': 'Email...'
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Password...'
    }))