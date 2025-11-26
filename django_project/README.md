# Django School - Онлайн школа программирования

Курсовой проект по разработке веб-приложения на Django для онлайн-школы программирования.

## Особенности проекта

### 1. Использование Django Framework ✅
Проект полностью построен на Django 4.2.7 с использованием:
- Django ORM для работы с базой данных
- Django Forms для обработки пользовательского ввода
- Django Admin для административной панели
- Django REST Framework для API endpoints

### 2. База данных PostgreSQL ✅
Реализована полноценная БД с **тремя основными таблицами**:
- **users** - пользователи системы (студенты и родители)
- **courses** - курсы программирования
- **enrollments** - заявки на запись на курсы

### 3. Авторизация пользователей ✅
Реализована кастомная система авторизации с формами:
- Регистрация новых пользователей (UserRegistrationForm)
- Вход в систему (UserLoginForm)
- Выход из системы
- Личный кабинет пользователя

### 4. Использование Django Forms ✅
Созданы специализированные формы:
- `UserRegistrationForm` - регистрация пользователя
- `UserLoginForm` - авторизация
- `EnrollmentForm` - форма записи на курс

## Структура проекта

```
django_project/
├── config/                 # Конфигурация Django
│   ├── settings.py        # Основные настройки
│   ├── urls.py            # URL маршруты
│   └── wsgi.py            # WSGI конфигурация
├── users/                 # Приложение пользователей
│   ├── models.py          # Модель User
│   ├── forms.py           # Формы регистрации/входа
│   ├── views.py           # Представления
│   └── admin.py           # Админ-панель
├── courses/               # Приложение курсов
│   ├── models.py          # Модель Course
│   ├── views.py           # Представления
│   ├── serializers.py     # REST API сериализаторы
│   └── admin.py           # Админ-панель
├── enrollments/           # Приложение заявок
│   ├── models.py          # Модель Enrollment
│   ├── forms.py           # Форма записи на курс
│   ├── views.py           # Представления
│   └── admin.py           # Админ-панель
├── manage.py              # Django management команды
└── requirements.txt       # Зависимости проекта
```

## Установка и запуск

### 1. Клонирование проекта
```bash
git clone <repository-url>
cd django_project
```

### 2. Создание виртуального окружения
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

### 3. Установка зависимостей
```bash
pip install -r requirements.txt
```

### 4. Настройка базы данных
Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

Отредактируйте `.env` и укажите параметры вашей PostgreSQL базы данных:
```
DB_NAME=django_courses
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 5. Применение миграций
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Создание суперпользователя
```bash
python manage.py createsuperuser
```

### 7. Загрузка начальных данных (курсы)
```bash
python manage.py shell
>>> from courses.models import Course
>>> Course.objects.create(
...     title='Python Основы',
...     description='Изучите основы Python',
...     level='beginner',
...     duration='3 месяца',
...     lessons=24,
...     price=2890
... )
```

### 8. Запуск сервера
```bash
python manage.py runserver
```

Откройте браузер: http://127.0.0.1:8000

## Доступ к админ-панели

URL: http://127.0.0.1:8000/admin

Используйте логин и пароль суперпользователя, созданного на шаге 6.

## API Endpoints

- `GET /api/courses/` - список всех курсов
- `GET /api/courses/{id}/` - детали курса
- `POST /api/enrollments/` - создать заявку на курс
- `GET /api/enrollments/` - список всех заявок

## Технологии

- **Backend**: Django 4.2.7, Django REST Framework
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, Bootstrap 5
- **Authentication**: Django built-in auth system

## Соответствие требованиям курсовой

✅ **Django Framework** - используется как основной фреймворк  
✅ **PostgreSQL БД** - 3 таблицы (users, courses, enrollments)  
✅ **Авторизация** - полноценная система с формами  
✅ **Django Forms** - 3 формы (регистрация, вход, запись на курс)

## Автор

Курсовой проект по веб-разработке

## Лицензия

MIT
