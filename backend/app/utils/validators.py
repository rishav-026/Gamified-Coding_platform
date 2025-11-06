import re
from datetime import datetime

def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_username(username: str) -> bool:
    """Validate username"""
    if len(username) < 3 or len(username) > 50:
        return False
    return re.match(r'^[a-zA-Z0-9_-]+$', username) is not None

def validate_password(password: str) -> bool:
    """Validate password strength"""
    if len(password) < 8:
        return False
    if not re.search(r'[A-Z]', password):
        return False
    if not re.search(r'[a-z]', password):
        return False
    if not re.search(r'[0-9]', password):
        return False
    return True

def validate_code(code: str) -> bool:
    """Validate code submission"""
    if not code or len(code.strip()) == 0:
        return False
    return True
