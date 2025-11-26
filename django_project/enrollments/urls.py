from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'enrollments'

router = DefaultRouter()
router.register(r'', views.EnrollmentViewSet, basename='enrollment')

urlpatterns = [
    path('', include(router.urls)),
    path('form/', views.enroll_form, name='form'),
    path('success/', views.enrollment_success, name='success'),
]
