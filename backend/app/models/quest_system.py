from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

class TaskDetail(BaseModel):
    """Individual task within a quest"""
    id: str
    title: str
    description: str
    instructions: str  # Detailed instructions
    difficulty: str  # easy, medium, hard
    xp_reward: int
    validation_type: str  # github_action, manual, code_submission
    validation_criteria: Dict  # How to validate completion
    status: str = "pending"  # pending, completed, in_progress

class QuestDefinition(BaseModel):
    """A complete quest with multiple tasks"""
    id: str
    title: str
    description: str
    category: str  # github_basics, community, contribution
    difficulty: str  # beginner, intermediate, advanced
    order: int
    tasks: List[TaskDetail]
    total_xp: int
    estimated_time: str  # "30 mins", "1 hour", etc
    image_url: Optional[str]
    learning_outcomes: List[str]  # What students learn

class UserQuestProgress(BaseModel):
    """Track user's progress on a quest"""
    user_id: str
    quest_id: str
    status: str  # not_started, in_progress, completed
    tasks_completed: int
    total_tasks: int
    xp_earned: int
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    task_progress: Dict[str, Dict]  # Per-task progress

class UserBadge(BaseModel):
    """Badge earned by user"""
    id: str
    name: str
    description: str
    icon: str
    category: str  # quest, milestone, streak, achievement
    earned_at: datetime
    criteria: str

class UserStreak(BaseModel):
    """User's activity streak"""
    user_id: str
    current_streak: int
    longest_streak: int
    last_activity: datetime
    streak_broken_at: Optional[datetime]

class GamificationStats(BaseModel):
    """User's gamification statistics"""
    user_id: str
    total_xp: int
    level: int
    badges: List[str]  # Badge IDs
    quests_completed: int
    tasks_completed: int
    current_streak: int
    longest_streak: int
    rank: int
    last_updated: datetime
