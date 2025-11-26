from django.shortcuts import render, redirect
from django.contrib import messages
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Enrollment
from .forms import EnrollmentForm
from .serializers import EnrollmentSerializer


class EnrollmentViewSet(viewsets.ModelViewSet):
    """ViewSet для работы с заявками"""
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['post'])
    def create_enrollment(self, request):
        """Создание новой заявки"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message': 'Заявка успешно отправлена',
                'enrollment': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


def enroll_form(request):
    """Форма записи на курс (HTML представление)"""
    if request.method == 'POST':
        form = EnrollmentForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.')
            return redirect('enrollments:success')
    else:
        form = EnrollmentForm()
    return render(request, 'enrollments/form.html', {'form': form})


def enrollment_success(request):
    """Страница успешной отправки заявки"""
    return render(request, 'enrollments/success.html')
