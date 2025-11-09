from pydantic import BaseModel
from typing import List, Optional

class TutorialQuestion(BaseModel):
    """A quiz question for tutorial"""
    id: str
    question: str
    options: List[str]  # Multiple choice
    correct_answer: int  # Index of correct option
    explanation: str

class TutorialLesson(BaseModel):
    """A lesson in GitHub tutorials"""
    id: str
    title: str
    description: str
    content: str  # HTML/Markdown content
    code_example: str  # Example code block
    difficulty: str  # beginner, intermediate, advanced
    xp_reward: int  # XP for completing
    quiz: List[TutorialQuestion]
    order: int  # Order in course

class UserTutorialProgress(BaseModel):
    """Track user's tutorial progress"""
    user_id: str
    tutorial_id: str
    completed: bool
    quiz_score: float  # 0-100
    xp_earned: int
    completed_at: Optional[str] = None
