from datetime import datetime, timedelta

def is_streak_alive(last_activity: datetime) -> bool:
    """Check if streak is still alive"""
    if not last_activity:
        return False
    
    # Streak is alive if activity was within last 24 hours
    today = datetime.utcnow().date()
    last_date = last_activity.date()
    yesterday = today - timedelta(days=1)
    
    return last_date >= yesterday

def increment_streak(current_streak: int, last_activity: datetime) -> int:
    """Increment streak if active"""
    if is_streak_alive(last_activity):
        return current_streak + 1
    return 1

def reset_streak() -> int:
    """Reset streak"""
    return 0
