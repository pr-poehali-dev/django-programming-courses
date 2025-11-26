from rest_framework import serializers
from .models import Course


class CourseSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Course"""
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'level', 'duration', 'lessons', 'price', 'icon', 'color']
