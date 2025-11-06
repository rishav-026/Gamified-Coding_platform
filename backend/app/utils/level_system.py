XP_LEVELS = [
    {"level": 1, "xp_required": 0, "title": "Newbie"},
    {"level": 2, "xp_required": 100, "title": "Beginner"},
    {"level": 3, "xp_required": 250, "title": "Apprentice"},
    {"level": 4, "xp_required": 500, "title": "Intermediate"},
    {"level": 5, "xp_required": 1000, "title": "Advanced"},
    {"level": 6, "xp_required": 2000, "title": "Expert"},
    {"level": 7, "xp_required": 3500, "title": "Master"},
    {"level": 8, "xp_required": 5500, "title": "Grandmaster"},
    {"level": 9, "xp_required": 8000, "title": "Legend"},
    {"level": 10, "xp_required": 12000, "title": "Mythical"},
]

def get_level_from_xp(xp: int) -> int:
    """Calculate level from total XP"""
    for level_info in reversed(XP_LEVELS):
        if xp >= level_info["xp_required"]:
            return level_info["level"]
    return 1

def get_level_info(level: int) -> dict:
    """Get level information"""
    for level_info in XP_LEVELS:
        if level_info["level"] == level:
            return level_info
    return XP_LEVELS[0]

def get_xp_for_next_level(current_level: int) -> int:
    """Get XP needed for next level"""
    for level_info in XP_LEVELS:
        if level_info["level"] == current_level + 1:
            return level_info["xp_required"]
    return None
