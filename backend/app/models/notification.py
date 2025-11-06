from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Notification(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(__import__('bson').ObjectId()), alias="_id")
    user_id: str
    title: str
    message: str
    type: str  # "achievement", "level_up", "badge", "reminder", "system"
    is_read: bool = False
    action_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
