'''
Business: Create course enrollment application
Args: event with httpMethod, body; context with request_id
Returns: HTTP response with enrollment confirmation
'''

import json
import os
from typing import Dict, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, ValidationError

class EnrollmentRequest(BaseModel):
    studentName: str = Field(..., min_length=2, max_length=100)
    studentAge: int = Field(..., ge=9, le=16)
    parentName: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    course: str = Field(..., min_length=1)
    startDate: str
    experience: str = Field(default='beginner')
    comment: str = Field(default='', max_length=500)


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            enrollment_data = EnrollmentRequest(**body_data)
            
            enrollment = save_enrollment(enrollment_data)
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Заявка успешно отправлена',
                    'enrollment': enrollment
                }),
                'isBase64Encoded': False
            }
        
        except ValidationError as e:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': 'Validation error',
                    'details': e.errors()
                }),
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


def save_enrollment(data: EnrollmentRequest) -> Dict[str, Any]:
    import psycopg2
    
    db_url = os.environ.get('DATABASE_URL')
    if not db_url:
        return {
            'id': 1,
            'student_name': data.studentName,
            'student_age': data.studentAge,
            'parent_name': data.parentName,
            'email': data.email,
            'phone': data.phone,
            'course': data.course,
            'start_date': data.startDate,
            'experience': data.experience,
            'comment': data.comment,
            'status': 'pending',
            'created_at': datetime.now().isoformat()
        }
    
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute(
        '''
        INSERT INTO enrollments 
        (student_name, student_age, parent_name, email, phone, course_name, start_date, experience, comment, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id, created_at
        ''',
        (
            data.studentName,
            data.studentAge,
            data.parentName,
            data.email,
            data.phone,
            data.course,
            data.startDate,
            data.experience,
            data.comment,
            'pending'
        )
    )
    
    result = cur.fetchone()
    enrollment_id, created_at = result
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'id': enrollment_id,
        'student_name': data.studentName,
        'student_age': data.studentAge,
        'parent_name': data.parentName,
        'email': data.email,
        'phone': data.phone,
        'course': data.course,
        'start_date': data.startDate,
        'experience': data.experience,
        'comment': data.comment,
        'status': 'pending',
        'created_at': created_at.isoformat() if hasattr(created_at, 'isoformat') else str(created_at)
    }