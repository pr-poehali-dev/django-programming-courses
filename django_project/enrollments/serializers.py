from rest_framework import serializers
from .models import Enrollment


class EnrollmentSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Enrollment"""
    
    class Meta:
        model = Enrollment
        fields = [
            'id', 'student_name', 'student_age', 'parent_name',
            'email', 'phone', 'course', 'course_name', 'start_date',
            'experience', 'comment', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']
    
    def validate_student_age(self, value):
        """Валидация возраста ученика"""
        if value < 9 or value > 16:
            raise serializers.ValidationError('Возраст ученика должен быть от 9 до 16 лет')
        return value
