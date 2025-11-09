from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from app.core.database import get_db
from app.schemas.user import UserResponse, UserUpdate
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])

# ✅ Temporary mock user for testing (no login required)
MOCK_USER = {
    "_id": "demo123",
    "username": "demo_user",
    "email": "demo@example.com",
    "avatar_url": None,
    "level": 3,
    "total_xp": 1250,
    "current_streak": 5,
    "longest_streak": 12,
    "badges": [],
    "created_at": datetime.utcnow(),
}

@router.get("/me", response_model=UserResponse)
async def get_current_user(db: AsyncIOMotorDatabase = Depends(get_db)):
    """Return mock user instead of requiring authentication"""
    return MOCK_USER


@router.put("/me", response_model=UserResponse)
async def update_user(user_update: UserUpdate, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Mock update user"""
    updated_user = MOCK_USER.copy()
    updated_user.update(user_update.dict(exclude_unset=True))
    return updated_user


@router.get("/me/badges")
async def get_user_badges(db: AsyncIOMotorDatabase = Depends(get_db)):
    """Mock user badges"""
    return [{"name": "First Login", "description": "Welcome to CodeQuest!"}]


@router.get("/me/achievements")
async def get_user_achievements(db: AsyncIOMotorDatabase = Depends(get_db)):
    """Mock user achievements"""
    return [
        {"title": "Code Novice", "xp": 1000, "date": "2025-11-07"},
        {"title": "Quiz Winner", "xp": 2500, "date": "2025-11-06"},
    ]
