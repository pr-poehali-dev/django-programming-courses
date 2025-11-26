from django.db import models


class Course(models.Model):
    """Модель курса программирования"""
    
    LEVEL_CHOICES = [
        ('beginner', 'Начальный'),
        ('intermediate', 'Средний'),
        ('advanced', 'Продвинутый'),
    ]
    
    title = models.CharField('Название', max_length=200)
    description = models.TextField('Описание')
    level = models.CharField('Уровень', max_length=20, choices=LEVEL_CHOICES)
    duration = models.CharField('Длительность', max_length=100)
    lessons = models.IntegerField('Количество уроков')
    price = models.DecimalField('Цена', max_digits=10, decimal_places=2)
    icon = models.CharField('Иконка', max_length=50, blank=True)
    color = models.CharField('Цвет', max_length=50, blank=True)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)
    
    class Meta:
        verbose_name = 'Курс'
        verbose_name_plural = 'Курсы'
        ordering = ['id']
    
    def __str__(self):
        return self.title
