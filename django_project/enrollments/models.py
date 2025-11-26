from django.db import models
from courses.models import Course


class Enrollment(models.Model):
    """Модель заявки на запись на курс"""
    
    EXPERIENCE_CHOICES = [
        ('beginner', 'Без опыта'),
        ('basic', 'Базовые знания'),
        ('intermediate', 'Средний уровень'),
        ('advanced', 'Продвинутый'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Ожидает обработки'),
        ('confirmed', 'Подтверждена'),
        ('rejected', 'Отклонена'),
        ('completed', 'Завершена'),
    ]
    
    student_name = models.CharField('ФИО ученика', max_length=200)
    student_age = models.IntegerField('Возраст ученика')
    parent_name = models.CharField('ФИО родителя', max_length=200)
    email = models.EmailField('Email')
    phone = models.CharField('Телефон', max_length=20)
    course = models.ForeignKey(
        Course, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        verbose_name='Курс',
        related_name='enrollments'
    )
    course_name = models.CharField('Название курса', max_length=200)
    start_date = models.DateField('Желаемая дата начала')
    experience = models.CharField('Уровень подготовки', max_length=20, choices=EXPERIENCE_CHOICES, default='beginner')
    comment = models.TextField('Комментарий', blank=True)
    status = models.CharField('Статус', max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)
    
    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.student_name} - {self.course_name}"
