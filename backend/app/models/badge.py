from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Badge(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(__import__('bson').ObjectId()), alias="_id")
    name: str
    description: str
    icon: str  # emoji or URL
    color: str
    category: str  # "quest", "streak", "level", "contribution", "social"
    
    # Criteria
    criteria_type: str  # "quest_complete", "streak_days", "level_reached", etc.
    criteria_value: int
    
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserBadge(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(__import__('bson').ObjectId()), alias="_id")
    user_id: str
    badge_id: str
    earned_at: datetime = Field(default_factory=datetime.utcnow)
