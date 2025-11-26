-- Таблица пользователей (students and parents)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    is_active BOOLEAN DEFAULT TRUE,
    is_staff BOOLEAN DEFAULT FALSE,
    date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Таблица курсов
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    level VARCHAR(50),
    duration VARCHAR(100),
    lessons INTEGER,
    price DECIMAL(10, 2),
    icon VARCHAR(50),
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заявок на обучение
CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(200) NOT NULL,
    student_age INTEGER CHECK (student_age >= 9 AND student_age <= 16),
    parent_name VARCHAR(200) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    course_id INTEGER REFERENCES courses(id),
    course_name VARCHAR(200),
    start_date DATE NOT NULL,
    experience VARCHAR(50) DEFAULT 'beginner',
    comment TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации поиска
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_enrollments_email ON enrollments(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);

-- Вставка начальных данных курсов
INSERT INTO courses (title, description, level, duration, lessons, price, icon, color) VALUES
('Python Основы', 'Изучите основы Python: переменные, циклы, функции, работа с файлами', 'Начальный', '3 месяца', 24, 2890, 'Code2', 'bg-blue-500'),
('Django Framework', 'Создание веб-приложений на Django: модели, представления, шаблоны, REST API', 'Средний', '4 месяца', 32, 3490, 'Globe', 'bg-purple-500'),
('Full-Stack разработка', 'Комплексная программа: Backend на Django + Frontend на React', 'Продвинутый', '6 месяцев', 48, 4290, 'Layers', 'bg-indigo-500'),
('Машинное обучение', 'Основы ML и Data Science: numpy, pandas, scikit-learn, нейронные сети', 'Продвинутый', '5 месяцев', 40, 3990, 'Brain', 'bg-pink-500'),
('Python для детей', 'Игровое программирование: создание игр на Pygame, основы алгоритмов', 'Начальный', '3 месяца', 24, 2490, 'Gamepad2', 'bg-green-500'),
('Боты и автоматизация', 'Создание Telegram ботов, парсинг данных, автоматизация задач', 'Средний', '3 месяца', 28, 3190, 'Bot', 'bg-orange-500');

-- Создание тестового пользователя
INSERT INTO users (username, email, password_hash, first_name, last_name, is_staff) VALUES
('admin', 'admin@django-school.ru', 'pbkdf2_sha256$260000$testpassword123', 'Администратор', 'Школы', TRUE);
