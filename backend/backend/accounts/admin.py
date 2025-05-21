from django.contrib import admin
from .models import (
    UserStats, Profile
)

admin.site.register(UserStats)
admin.site.register(Profile)

