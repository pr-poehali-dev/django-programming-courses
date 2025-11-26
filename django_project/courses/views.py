from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Course
from .serializers import CourseSerializer


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet для получения списка курсов"""
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]


def course_list(request):
    """Список всех курсов (HTML представление)"""
    courses = Course.objects.all()
    return render(request, 'courses/list.html', {'courses': courses})
