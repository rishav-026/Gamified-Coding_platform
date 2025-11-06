from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Analytics(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(__import__('bson').ObjectId()), alias="_id")
    user_id: str
    date: datetime
    quests_completed: int = 0
    tasks_completed: int = 0
    xp_earned: int = 0
    streak_maintained: bool = False
