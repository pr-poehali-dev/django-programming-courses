'''
Business: Django REST API endpoint for course enrollment system
Args: event with httpMethod, body, queryStringParameters; context with request_id
Returns: HTTP response with statusCode, headers, body
'''

import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    if method == 'GET':
        path = event.get('path', '/')
        
        if '/courses' in path:
            courses = get_courses()
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'courses': courses}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'Django API is running', 'version': '1.0'}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        path = event.get('path', '/')
        
        if '/enroll' in path:
            enrollment = create_enrollment(body_data)
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps({'success': True, 'enrollment': enrollment}),
                'isBase64Encoded': False
            }
        
        if '/register' in path:
            user = create_user(body_data)
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps({'success': True, 'user': user}),
                'isBase64Encoded': False
            }
        
        if '/login' in path:
            token = authenticate_user(body_data)
            if token:
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'success': True, 'token': token}),
                    'isBase64Encoded': False
                }
            return {
                'statusCode': 401,
                'headers': headers,
                'body': json.dumps({'success': False, 'error': 'Invalid credentials'}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }


def get_courses():
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
        }
    ]


def create_enrollment(data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        'id': 1,
        'student_name': data.get('studentName'),
        'student_age': data.get('studentAge'),
        'parent_name': data.get('parentName'),
        'email': data.get('email'),
        'phone': data.get('phone'),
        'course': data.get('course'),
        'start_date': data.get('startDate'),
        'experience': data.get('experience'),
        'status': 'pending',
        'created_at': '2024-11-26T12:00:00Z'
    }


def create_user(data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        'id': 1,
        'username': data.get('username'),
        'email': data.get('email'),
        'first_name': data.get('firstName', ''),
        'last_name': data.get('lastName', ''),
        'created_at': '2024-11-26T12:00:00Z'
    }


def authenticate_user(data: Dict[str, Any]) -> str:
    username = data.get('username')
    password = data.get('password')
    
    if username and password:
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3QifQ.token'
    
    return ''
