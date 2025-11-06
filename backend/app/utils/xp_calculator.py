def calculate_xp(difficulty: str, time_taken: float) -> int:
    """
    Calculate XP based on difficulty and time taken
    """
    base_xp = {
        "beginner": 50,
        "intermediate": 100,
        "advanced": 200,
    }
    
    xp = base_xp.get(difficulty, 50)
    
    # Bonus for completing quickly
    if time_taken < 30:  # minutes
        xp *= 1.5
    
    return int(xp)

def calculate_level(total_xp: int) -> int:
    """Calculate level from total XP"""
    levels = [
        (0, 1),
        (100, 2),
        (250, 3),
        (500, 4),
        (1000, 5),
        (2000, 6),
        (3500, 7),
        (5500, 8),
        (8000, 9),
        (12000, 10),
    ]
    
    for xp_required, level in reversed(levels):
        if total_xp >= xp_required:
            return level
    
    return 1
