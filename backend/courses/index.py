'''
Business: Get list of available courses
Args: event with httpMethod; context with request_id
Returns: HTTP response with courses data
'''

import json
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        courses = get_courses()
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'courses': courses}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }


def get_courses() -> List[Dict[str, Any]]:
    return [
        {
            'id': 1,
            'title': 'Python Основы',
            'description': 'Изучите основы Python: переменные, циклы, функции, работа с файлами',
            'level': 'Начальный',
            'duration': '3 месяца',
            'lessons': 24,
            'price': 2890
        },
        {
            'id': 2,
            'title': 'Django Framework',
            'description': 'Создание веб-приложений на Django: модели, представления, шаблоны, REST API',
            'level': 'Средний',
            'duration': '4 месяца',
            'lessons': 32,
            'price': 3490
        },
        {
            'id': 3,
            'title': 'Full-Stack разработка',
            'description': 'Комплексная программа: Backend на Django + Frontend на React',
            'level': 'Продвинутый',
            'duration': '6 месяцев',
            'lessons': 48,
            'price': 4290
        },
        {
            'id': 4,
            'title': 'Машинное обучение',
            'description': 'Основы ML и Data Science: numpy, pandas, scikit-learn, нейронные сети',
            'level': 'Продвинутый',
            'duration': '5 месяцев',
            'lessons': 40,
            'price': 3990
        },
        {
            'id': 5,
            'title': 'Python для детей',
            'description': 'Игровое программирование: создание игр на Pygame, основы алгоритмов',
            'level': 'Начальный',
            'duration': '3 месяца',
            'lessons': 24,
            'price': 2490
        },
        {
            'id': 6,
            'title': 'Боты и автоматизация',
            'description': 'Создание Telegram ботов, парсинг данных, автоматизация задач',
            'level': 'Средний',
            'duration': '3 месяца',
            'lessons': 28,
            'price': 3190
        }
    ]
