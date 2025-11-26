from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Кастомная модель пользователя для системы курсов программирования.
    Расширяет стандартную модель Django User.
    """
    email = models.EmailField('Email адрес', unique=True)
    phone = models.CharField('Телефон', max_length=20, blank=True)
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['-date_joined']
    
    def __str__(self):
        return self.username