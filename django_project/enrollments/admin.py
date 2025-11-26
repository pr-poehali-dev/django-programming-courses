from django.contrib import admin
from .models import Enrollment


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'course_name', 'student_age', 'email', 'status', 'created_at')
    list_filter = ('status', 'experience', 'created_at')
    search_fields = ('student_name', 'parent_name', 'email', 'course_name')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Информация об ученике', {
            'fields': ('student_name', 'student_age', 'parent_name')
        }),
        ('Контактная информация', {
            'fields': ('email', 'phone')
        }),
        ('Информация о курсе', {
            'fields': ('course', 'course_name', 'start_date', 'experience')
        }),
        ('Дополнительно', {
            'fields': ('comment', 'status')
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')
