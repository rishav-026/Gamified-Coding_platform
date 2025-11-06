from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from enum import Enum

class DifficultyLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class Quest(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(__import__('bson').ObjectId()), alias="_id")
    title: str
    description: str
    difficulty: DifficultyLevel
    xp_reward: int
    estimated_duration: int  # minutes
    
    # Content
    objectives: List[str]
    prerequisites: List[str] = []
    tasks: List[dict] = []
    
    # Status
    is_published: bool = False
    is_archived: bool = False
    
    # Metadata
    category: str  # "github", "coding", "open_source"
    tags: List[str] = []
    order: int = 0
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: str  # user_id

class Task(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(__import__('bson').ObjectId()), alias="_id")
    quest_id: str
    title: str
    description: str
    type: str  # "github_action", "code_submission", "quiz", "reading"
    
    # Task specific fields
    hints: List[str] = []
    resources: List[str] = []
    test_cases: Optional[dict] = None
    
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
