from django import forms
from .models import Enrollment


class EnrollmentForm(forms.ModelForm):
    """Форма для создания заявки на курс"""
    
    class Meta:
        model = Enrollment
        fields = [
            'student_name', 'student_age', 'parent_name',
            'email', 'phone', 'course_name', 'start_date',
            'experience', 'comment'
        ]
        widgets = {
            'student_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Иванов Иван Иванович'
            }),
            'student_age': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '9',
                'max': '16',
                'placeholder': '12'
            }),
            'parent_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Иванов Сергей Петрович'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'example@mail.ru'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '+7 (999) 123-45-67'
            }),
            'course_name': forms.Select(attrs={
                'class': 'form-control'
            }),
            'start_date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'experience': forms.Select(attrs={
                'class': 'form-control'
            }),
            'comment': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Дополнительная информация или вопросы'
            }),
        }
        labels = {
            'student_name': 'ФИО ученика',
            'student_age': 'Возраст ученика',
            'parent_name': 'ФИО родителя',
            'email': 'Email',
            'phone': 'Телефон',
            'course_name': 'Курс',
            'start_date': 'Желаемая дата начала',
            'experience': 'Уровень подготовки',
            'comment': 'Комментарий',
        }
