from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Achievement(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(__import__('bson').ObjectId()), alias="_id")
    user_id: str
    title: str
    description: str
    icon: str
    type: str  # "quest", "level", "streak", "contribution", "special"
    xp_reward: int = 0
    earned_at: datetime = Field(default_factory=datetime.utcnow)
    is_hidden: bool = False
