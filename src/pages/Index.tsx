import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EnrollmentDialog } from '@/components/EnrollmentDialog';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [enrollmentOpen, setEnrollmentOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ title: string; id: number } | null>(null);

  const handleEnrollClick = (courseTitle: string, courseId: number) => {
    setSelectedCourse({ title: courseTitle, id: courseId });
    setEnrollmentOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-gradient-purple">Django</div>
            <span className="text-sm text-muted-foreground">Школа программирования</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => setActiveTab('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
            <button onClick={() => setActiveTab('courses')} className="text-sm font-medium hover:text-primary transition-colors">Курсы</button>
            <button onClick={() => setActiveTab('teachers')} className="text-sm font-medium hover:text-primary transition-colors">Преподаватели</button>
            <button onClick={() => setActiveTab('pricing')} className="text-sm font-medium hover:text-primary transition-colors">Цены</button>
            <button onClick={() => setActiveTab('reviews')} className="text-sm font-medium hover:text-primary transition-colors">Отзывы</button>
            <button onClick={() => setActiveTab('faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
          </nav>

          <Button onClick={() => setActiveTab('dashboard')} className="bg-gradient-purple hover:opacity-90">
            Личный кабинет
          </Button>
        </div>
      </header>

      {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} onEnrollClick={handleEnrollClick} />}
      {activeTab === 'courses' && <CoursesSection onEnrollClick={handleEnrollClick} />}
      {activeTab === 'teachers' && <TeachersSection />}
      {activeTab === 'pricing' && <PricingSection onEnrollClick={handleEnrollClick} />}
      {activeTab === 'reviews' && <ReviewsSection />}
      {activeTab === 'faq' && <FAQSection />}
      {activeTab === 'dashboard' && <DashboardSection />}

      <EnrollmentDialog 
        open={enrollmentOpen} 
        onOpenChange={setEnrollmentOpen}
        courseTitle={selectedCourse?.title}
        courseId={selectedCourse?.id}
      />

      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gradient-purple mb-4">Django</h3>
              <p className="text-sm text-slate-300">Школа программирования для детей и подростков 9-16 лет</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><button onClick={() => setActiveTab('courses')} className="hover:text-white">Курсы</button></li>
                <li><button onClick={() => setActiveTab('teachers')} className="hover:text-white">Преподаватели</button></li>
                <li><button onClick={() => setActiveTab('pricing')} className="hover:text-white">Цены</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>+7 (926) 141-70-24</li>
                <li>info@django-school.ru</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <Icon name="Mail" className="text-slate-300 hover:text-white cursor-pointer" />
                <Icon name="Phone" className="text-slate-300 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm text-slate-400">
            © 2024 Django School. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

const HomeSection = ({ setActiveTab, onEnrollClick }: { setActiveTab: (tab: string) => void; onEnrollClick: (title: string, id: number) => void }) => {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-purple py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">Старт новых групп</Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                ОНЛАЙН ШКОЛА<br />ПРОГРАММИРОВАНИЯ
              </h1>
              <p className="text-xl text-white/90 mb-4">Для детей и подростков в возрасте 9-16 лет</p>
              <p className="text-white/80 mb-8 text-lg">
                Все современные профессии требуют навыков программирования и чем раньше ребенок познакомится с информационными технологиями, тем проще ему будет поступить в ВУЗ на престижную IT специальность и найти высокооплачиваемую работу.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6" onClick={() => onEnrollClick('Python Основы', 1)}>
                  Записаться на курс
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6" onClick={() => setActiveTab('courses')}>
                  Узнать больше
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent">2890₽</div>
                  <div className="text-sm text-white/70">Старт обновленного курса</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"></div>
                <div className="absolute inset-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Icon name="Laptop" size={120} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">Популярные курсы</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выберите направление для изучения</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Python для начинающих', level: 'Начальный', duration: '3 месяца', icon: 'Code2', color: 'bg-blue-500' },
              { title: 'Django веб-разработка', level: 'Средний', duration: '4 месяца', icon: 'Globe', color: 'bg-purple-500' },
              { title: 'Продвинутый Python', level: 'Продвинутый', duration: '5 месяцев', icon: 'Rocket', color: 'bg-orange-500' }
            ].map((course, i) => (
              <Card key={i} className="p-6 hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`${course.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon name={course.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">{course.level}</Badge>
                  <Badge variant="outline">{course.duration}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">Освойте основы программирования на Python и создайте свои первые проекты</p>
                <Button className="w-full bg-gradient-purple" onClick={() => setActiveTab('courses')}>
                  Подробнее
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Почему выбирают нас?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'Users', title: 'Опытные преподаватели', desc: 'Практикующие разработчики с опытом работы 5+ лет' },
              { icon: 'Award', title: 'Сертификаты', desc: 'Выдаем официальные сертификаты об окончании курса' },
              { icon: 'Target', title: 'Практика', desc: 'Более 20 практических проектов в портфолио' },
              { icon: 'Headphones', title: 'Поддержка 24/7', desc: 'Всегда готовы помочь с любыми вопросами' }
            ].map((item, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-20 h-20 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon as any} size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const CoursesSection = ({ onEnrollClick }: { onEnrollClick: (title: string, id: number) => void }) => {
  const courses = [
    { 
      id: 1,
      title: 'Python Основы', 
      description: 'Изучите основы Python: переменные, циклы, функции, работа с файлами',
      level: 'Начальный',
      duration: '3 месяца',
      lessons: 24,
      price: '2890₽/мес',
      icon: 'Code2',
      color: 'bg-blue-500'
    },
    { 
      id: 2,
      title: 'Django Framework', 
      description: 'Создание веб-приложений на Django: модели, представления, шаблоны, REST API',
      level: 'Средний',
      duration: '4 месяца',
      lessons: 32,
      price: '3490₽/мес',
      icon: 'Globe',
      color: 'bg-purple-500'
    },
    { 
      id: 3,
      title: 'Full-Stack разработка', 
      description: 'Комплексная программа: Backend на Django + Frontend на React',
      level: 'Продвинутый',
      duration: '6 месяцев',
      lessons: 48,
      price: '4290₽/мес',
      icon: 'Layers',
      color: 'bg-indigo-500'
    },
    { 
      id: 4,
      title: 'Машинное обучение', 
      description: 'Основы ML и Data Science: numpy, pandas, scikit-learn, нейронные сети',
      level: 'Продвинутый',
      duration: '5 месяцев',
      lessons: 40,
      price: '3990₽/мес',
      icon: 'Brain',
      color: 'bg-pink-500'
    },
    { 
      id: 5,
      title: 'Python для детей', 
      description: 'Игровое программирование: создание игр на Pygame, основы алгоритмов',
      level: 'Начальный',
      duration: '3 месяца',
      lessons: 24,
      price: '2490₽/мес',
      icon: 'Gamepad2',
      color: 'bg-green-500'
    },
    { 
      id: 6,
      title: 'Боты и автоматизация', 
      description: 'Создание Telegram ботов, парсинг данных, автоматизация задач',
      level: 'Средний',
      duration: '3 месяца',
      lessons: 28,
      price: '3190₽/мес',
      icon: 'Bot',
      color: 'bg-orange-500'
    }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <h1 className="text-5xl font-bold mb-4">Наши курсы</h1>
        <p className="text-xl text-muted-foreground mb-12">Программы обучения для всех уровней подготовки</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <Card key={i} className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`${course.color} h-2`}></div>
              <div className="p-6">
                <div className={`${course.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon name={course.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Signal" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Уровень: </span>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Длительность: {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="BookOpen" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Уроков: {course.lessons}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-2xl font-bold text-primary">{course.price}</div>
                  <Button className="bg-gradient-purple" onClick={() => onEnrollClick(course.title, course.id)}>Записаться</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeachersSection = () => {
  const teachers = [
    { name: 'Алексей Петров', role: 'Senior Python Developer', experience: '8 лет', courses: 'Python, Django', avatar: '👨‍💻' },
    { name: 'Мария Иванова', role: 'Full-Stack Developer', experience: '6 лет', courses: 'Django, React', avatar: '👩‍💻' },
    { name: 'Дмитрий Смирнов', role: 'ML Engineer', experience: '7 лет', courses: 'Machine Learning', avatar: '👨‍🔬' },
    { name: 'Елена Козлова', role: 'Python Teacher', experience: '5 лет', courses: 'Python для детей', avatar: '👩‍🏫' }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <h1 className="text-5xl font-bold mb-4">Наши преподаватели</h1>
        <p className="text-xl text-muted-foreground mb-12">Практикующие разработчики с многолетним опытом</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, i) => (
            <Card key={i} className="p-6 text-center hover:shadow-xl transition-all hover:-translate-y-2 animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-24 h-24 bg-gradient-purple rounded-full flex items-center justify-center text-5xl mx-auto mb-4">
                {teacher.avatar}
              </div>
              <h3 className="text-xl font-bold mb-1">{teacher.name}</h3>
              <p className="text-primary font-medium mb-2">{teacher.role}</p>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <div className="flex items-center justify-center gap-2">
                  <Icon name="Briefcase" size={14} />
                  <span>Опыт: {teacher.experience}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Icon name="GraduationCap" size={14} />
                  <span>{teacher.courses}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">Узнать больше</Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = ({ onEnrollClick }: { onEnrollClick: (title: string, id: number) => void }) => {
  const plans = [
    { 
      name: 'Базовый', 
      price: '2890', 
      period: 'месяц',
      features: ['4 занятия в месяц', 'Доступ к платформе', 'Домашние задания', 'Сертификат'],
      popular: false
    },
    { 
      name: 'Стандарт', 
      price: '4990', 
      period: 'месяц',
      features: ['8 занятий в месяц', 'Доступ к платформе', 'Домашние задания', 'Личный наставник', 'Сертификат', 'Проектная работа'],
      popular: true
    },
    { 
      name: 'Премиум', 
      price: '7990', 
      period: 'месяц',
      features: ['12 занятий в месяц', 'Доступ к платформе', 'Домашние задания', 'Личный наставник', 'Сертификат', 'Проектная работа', 'Помощь с трудоустройством', 'Индивидуальные консультации'],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container">
        <h1 className="text-5xl font-bold text-center mb-4">Тарифы</h1>
        <p className="text-xl text-muted-foreground text-center mb-12">Выберите подходящий план обучения</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <Card key={i} className={`p-8 relative hover:shadow-2xl transition-all hover:-translate-y-2 animate-scale-in ${plan.popular ? 'border-primary border-2' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-purple">
                  Популярный
                </Badge>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-primary">{plan.price}₽</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className={`w-full ${plan.popular ? 'bg-gradient-purple' : ''}`} onClick={() => onEnrollClick('Python Основы', 1)}>
                Выбрать план
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const reviews = [
    { name: 'Анна М.', role: 'Мама ученика', text: 'Мой сын занимается уже 3 месяца и очень доволен! Преподаватели объясняют сложные вещи простым языком.', rating: 5 },
    { name: 'Сергей П.', role: 'Студент', text: 'Отличная школа! За полгода освоил Django и создал свое первое веб-приложение. Спасибо преподавателям!', rating: 5 },
    { name: 'Ольга К.', role: 'Мама ученика', text: 'Ребенок в восторге от занятий. Теперь хочет стать программистом! Очень нравится подход преподавателей.', rating: 5 },
    { name: 'Максим Л.', role: 'Студент', text: 'Курс по машинному обучению превзошел ожидания. Много практики, интересные проекты. Рекомендую!', rating: 5 }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <h1 className="text-5xl font-bold text-center mb-4">Отзывы студентов</h1>
        <p className="text-xl text-muted-foreground text-center mb-12">Что говорят наши ученики и их родители</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <Card key={i} className="p-6 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Icon key={j} name="Star" size={20} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-lg mb-4 italic">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container max-w-4xl">
        <h1 className="text-5xl font-bold text-center mb-4">Вопросы и ответы</h1>
        <p className="text-xl text-muted-foreground text-center mb-12">Ответы на часто задаваемые вопросы</p>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-white px-6 rounded-lg border">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              С какого возраста можно начать обучение?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Наши программы рассчитаны на детей и подростков от 9 до 16 лет. Для самых маленьких у нас есть специальный курс "Python для детей" с игровым подходом к обучению.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white px-6 rounded-lg border">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Нужны ли предварительные знания программирования?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Нет, для начальных курсов никаких предварительных знаний не требуется. Мы начинаем с самых основ и постепенно переходим к более сложным темам.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white px-6 rounded-lg border">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Какое оборудование нужно для занятий?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Достаточно компьютера или ноутбука с доступом в интернет. Все необходимое программное обеспечение бесплатное, мы поможем с установкой на первом занятии.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-white px-6 rounded-lg border">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Как проходят занятия?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Занятия проходят онлайн в небольших группах до 8 человек. Каждый урок включает теорию, практику и домашнее задание. Преподаватель всегда доступен для вопросов.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-white px-6 rounded-lg border">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Выдается ли сертификат после окончания курса?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Да, после успешного завершения курса и защиты финального проекта мы выдаем официальный сертификат об окончании обучения.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="bg-white px-6 rounded-lg border">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Можно ли отменить или перенести занятие?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Да, вы можете перенести занятие, предупредив нас за 24 часа. Пропущенные занятия можно посмотреть в записи в личном кабинете.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

const DashboardSection = () => {
  const [selectedCourse, setSelectedCourse] = useState(0);

  const studentData = {
    name: 'Александр Новиков',
    level: 'Средний',
    totalProgress: 67,
    activeCourses: [
      { 
        id: 1,
        title: 'Django Framework', 
        progress: 67, 
        completedLessons: 21, 
        totalLessons: 32,
        nextLesson: 'Создание REST API',
        color: 'bg-purple-500'
      },
      { 
        id: 2,
        title: 'Python Основы', 
        progress: 100, 
        completedLessons: 24, 
        totalLessons: 24,
        nextLesson: 'Курс завершен',
        color: 'bg-blue-500'
      }
    ],
    achievements: [
      { icon: 'Trophy', title: 'Первый проект', desc: 'Создал первое приложение', earned: true },
      { icon: 'Target', title: '10 уроков', desc: 'Прошел 10 уроков подряд', earned: true },
      { icon: 'Zap', title: 'Быстрый старт', desc: 'Завершил первый модуль за неделю', earned: true },
      { icon: 'Award', title: 'Отличник', desc: 'Средний балл выше 90%', earned: true },
      { icon: 'Star', title: '50 задач', desc: 'Решил 50 задач', earned: false },
      { icon: 'Crown', title: 'Эксперт', desc: 'Завершил продвинутый курс', earned: false }
    ],
    recentActivity: [
      { type: 'lesson', title: 'Завершен урок "Django Models"', date: '2 часа назад' },
      { type: 'achievement', title: 'Получено достижение "Отличник"', date: '1 день назад' },
      { type: 'homework', title: 'Сдана домашняя работа #15', date: '2 дня назад' }
    ]
  };

  const courseModules = [
    { id: 1, title: 'Введение в Django', lessons: 4, completed: 4, locked: false },
    { id: 2, title: 'Модели и базы данных', lessons: 6, completed: 6, locked: false },
    { id: 3, title: 'Представления и шаблоны', lessons: 5, completed: 5, locked: false },
    { id: 4, title: 'Формы и валидация', lessons: 4, completed: 4, locked: false },
    { id: 5, title: 'REST API', lessons: 6, completed: 2, locked: false },
    { id: 6, title: 'Аутентификация', lessons: 4, completed: 0, locked: false },
    { id: 7, title: 'Деплой приложения', lessons: 3, completed: 0, locked: true }
  ];

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Личный кабинет</h1>
          <p className="text-muted-foreground">Добро пожаловать, {studentData.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 animate-scale-in">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center text-2xl text-white font-bold">
                АН
              </div>
              <div>
                <h3 className="font-semibold text-lg">{studentData.name}</h3>
                <Badge variant="secondary">{studentData.level}</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Общий прогресс</span>
              <span className="text-2xl font-bold text-primary">{studentData.totalProgress}%</span>
            </div>
            <Progress value={studentData.totalProgress} className="h-3" />
          </Card>

          <Card className="p-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="BookOpen" className="text-accent" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold">{studentData.activeCourses.length}</div>
                <div className="text-sm text-muted-foreground">Активных курсов</div>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="courses">Курсы</TabsTrigger>
            <TabsTrigger value="achievements">Достижения</TabsTrigger>
            <TabsTrigger value="activity">Активность</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studentData.activeCourses.map((course, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`${course.color} h-2`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.completedLessons} из {course.totalLessons} уроков
                        </p>
                      </div>
                      <Badge className={course.progress === 100 ? 'bg-green-500' : ''}>
                        {course.progress === 100 ? 'Завершен' : `${course.progress}%`}
                      </Badge>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="PlayCircle" size={16} />
                        {course.nextLesson}
                      </span>
                      <Button 
                        size="sm" 
                        className="bg-gradient-purple"
                        onClick={() => setSelectedCourse(i)}
                      >
                        {course.progress === 100 ? 'Повторить' : 'Продолжить'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6">Программа курса: {studentData.activeCourses[selectedCourse].title}</h3>
              <div className="space-y-3">
                {courseModules.map((module, i) => (
                  <div 
                    key={i} 
                    className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                      module.locked ? 'bg-slate-50 opacity-50' : 'bg-white cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          module.completed === module.lessons ? 'bg-green-500 text-white' :
                          module.completed > 0 ? 'bg-primary text-white' :
                          module.locked ? 'bg-slate-300 text-slate-500' : 'bg-slate-100'
                        }`}>
                          {module.locked ? (
                            <Icon name="Lock" size={20} />
                          ) : module.completed === module.lessons ? (
                            <Icon name="Check" size={20} />
                          ) : (
                            <span className="font-bold">{module.id}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{module.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {module.completed} из {module.lessons} уроков
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress 
                          value={(module.completed / module.lessons) * 100} 
                          className="w-24 h-2"
                        />
                        {!module.locked && (
                          <Button size="sm" variant={module.completed === module.lessons ? 'outline' : 'default'}>
                            {module.completed === module.lessons ? 'Повторить' : 'Начать'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentData.achievements.map((achievement, i) => (
                <Card 
                  key={i} 
                  className={`p-6 text-center transition-all hover:shadow-lg animate-scale-in ${
                    achievement.earned ? '' : 'opacity-50'
                  }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    achievement.earned ? 'bg-gradient-purple' : 'bg-slate-200'
                  }`}>
                    <Icon 
                      name={achievement.icon as any} 
                      size={36} 
                      className={achievement.earned ? 'text-white' : 'text-slate-400'}
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                  {achievement.earned && (
                    <Badge className="mt-3 bg-green-500">Получено</Badge>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6">Последняя активность</h3>
              <div className="space-y-4">
                {studentData.recentActivity.map((activity, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors animate-fade-in"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'lesson' ? 'bg-blue-500' :
                      activity.type === 'achievement' ? 'bg-purple-500' : 'bg-green-500'
                    }`}>
                      <Icon 
                        name={
                          activity.type === 'lesson' ? 'BookOpen' :
                          activity.type === 'achievement' ? 'Trophy' : 'CheckCircle2'
                        } 
                        className="text-white" 
                        size={20}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Index;