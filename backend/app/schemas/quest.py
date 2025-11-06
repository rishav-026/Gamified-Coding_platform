from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: str
    type: str
    hints: List[str] = []

class QuestCreate(BaseModel):
    title: str
    description: str
    difficulty: str
    xp_reward: int
    objectives: List[str]
    category: str

class QuestResponse(BaseModel):
    id: str = Field(alias="_id")
    title: str
    description: str
    difficulty: str
    xp_reward: int
    is_published: bool
    created_at: datetime

    class Config:
        populate_by_name = True
