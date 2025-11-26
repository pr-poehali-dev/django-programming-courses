from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'duration', 'lessons', 'price', 'created_at')
    list_filter = ('level', 'created_at')
    search_fields = ('title', 'description')
    ordering = ('id',)
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'description', 'level')
        }),
        ('Детали курса', {
            'fields': ('duration', 'lessons', 'price')
        }),
        ('Отображение', {
            'fields': ('icon', 'color')
        }),
    )
