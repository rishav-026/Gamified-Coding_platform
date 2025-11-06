from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Submission(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(__import__('bson').ObjectId()), alias="_id")
    user_id: str
    task_id: str
    quest_id: str
    code: str
    language: str
    status: str  # "pending", "passed", "failed"
    test_results: Optional[dict] = None
    feedback: Optional[str] = None
    xp_awarded: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
