from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
    
    
class Profile(models.Model):
    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    english_level = models.CharField(max_length=50, choices=LEVEL_CHOICES, default='Beginner', blank=True)
    programming_level = models.CharField(max_length=50, choices=LEVEL_CHOICES, default='Beginner', blank=True)
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}'s profile"



class CustomUserManager(BaseUserManager):
    """
    Custom manager for user creation with email as the unique identifier.
    Usernames can be duplicated.
    """
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        if not username:
            raise ValueError("The Username field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    """
    Custom User model that uses email as the unique identifier
    """
    username = models.CharField(max_length=255)  # Removed unique=True to allow duplicate usernames
    email = models.EmailField(unique=True)  # Email remains unique
    first_name = models.CharField(max_length=30, blank=True, default="")
    last_name = models.CharField(max_length=30, blank=True, default="")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'  # Use email for authentication
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_superuser or self.is_staff

    def has_module_perms(self, app_label):
        return self.is_superuser or self.is_staff



class EmailChangeRequest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    new_email = models.EmailField()
    old_email_code = models.CharField(max_length=6)
    new_email_code = models.CharField(max_length=6)
    old_email_verified = models.BooleanField(default=False)
    new_email_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_expired(self):
        return timezone.now() > self.expires_at

    def is_verified(self):
        return self.old_email_verified and self.new_email_verified

class UserStats(models.Model):
    """
    Stores aggregated stats for a user by difficulty level and language.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='stats')
    difficulty_level = models.PositiveSmallIntegerField(choices=[(i, f"{i}★") for i in range(1, 6)])
    exercises_completed = models.PositiveIntegerField(default=0)
    language = models.CharField(max_length=50)
    courses_completed = models.PositiveIntegerField(default=0)
    completion_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = [('user', 'difficulty_level'), ('user', 'language')]
        verbose_name_plural = 'User Statistics'

    def __str__(self):
        return f"{self.user.username}'s {self.language} stats"


class EmailVerification(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_valid(self):
        return self.expires_at > timezone.now()
