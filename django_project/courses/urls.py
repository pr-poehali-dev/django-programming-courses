from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'courses'

router = DefaultRouter()
router.register(r'', views.CourseViewSet, basename='course')

urlpatterns = [
    path('', include(router.urls)),
    path('list/', views.course_list, name='list'),
]
