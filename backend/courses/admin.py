from django.contrib import admin
from .models import Course
from .models import Chapter
from .models import Excercise
from .models import UserChapter
from .models import UserCourse
from .models import UserExercise

admin.site.register(Course)
admin.site.register(Chapter)
admin.site.register(Excercise)
admin.site.register(UserExercise)
admin.site.register(UserChapter)
admin.site.register(UserCourse)