"""
Quest System API Endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_db
from app.services.quest_system_service import QuestSystemService
from app.services.gamification_service import GamificationService
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/quests-system", tags=["quest-system"])
quest_service = QuestSystemService()
gamification_service = GamificationService()

class StartQuestRequest(BaseModel):
    """Start a quest"""
    quest_id: str
    user_id: str = "demo_user"

class CompleteTaskRequest(BaseModel):
    """Complete a task"""
    quest_id: str
    task_id: str
    user_id: str = "demo_user"

# ==================== QUEST ENDPOINTS ====================

@router.get("/all")
async def get_all_quests():
    """Get all available quests"""
    try:
        quests = await quest_service.get_all_quests()
        return {
            "success": True,
            "quests": quests,
            "total": len(quests)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{quest_id}")
async def get_quest(quest_id: str):
    """Get specific quest with all tasks"""
    try:
        quest = await quest_service.get_quest(quest_id)
        if not quest:
            raise HTTPException(status_code=404, detail="Quest not found")
        
        return {
            "success": True,
            "quest": quest
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/category/{category}")
async def get_quests_by_category(category: str):
    """Get quests by category"""
    try:
        quests = await quest_service.get_quest_by_category(category)
        return {
            "success": True,
            "quests": quests,
            "category": category
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.post("/start")
async def start_quest(
    req: StartQuestRequest,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Start a new quest"""
    try:
        result = await quest_service.start_quest(db, req.user_id, req.quest_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/complete-task")
async def complete_task(
    req: CompleteTaskRequest,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Mark a task as completed"""
    try:
        result = await quest_service.complete_task(
            db,
            req.user_id,
            req.quest_id,
            req.task_id
        )
        
        if result.get("success"):
            # Check for new badges
            new_badges = await gamification_service.check_new_badges(db, req.user_id)
            result["new_badges"] = new_badges
            
            # Update streak
            streak_result = await gamification_service.update_streak(db, req.user_id)
            result["streak"] = streak_result
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}/progress/{quest_id}")
async def get_quest_progress(
    user_id: str,
    quest_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get user's progress on a specific quest"""
    try:
        result = await quest_service.get_user_quest_progress(db, user_id, quest_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}/all-progress")
async def get_all_quest_progress(
    user_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get user's progress on all quests"""
    try:
        result = await quest_service.get_all_user_quests(db, user_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== GAMIFICATION ENDPOINTS ====================

@router.get("/user/{user_id}/stats")
async def get_user_gamification_stats(
    user_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get user's complete gamification statistics"""
    try:
        result = await gamification_service.get_user_stats(db, user_id)
        return result
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/user/{user_id}/level-info")
async def get_level_info(user_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Get detailed level information"""
    try:
        user = await db["users"].find_one({"_id": user_id})
        if not user:
            return {"success": False, "error": "User not found"}
        
        total_xp = user.get("total_xp", 0)
        level_info = gamification_service.get_xp_progress_to_next_level(total_xp)
        
        return {"success": True, "level_info": level_info}
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/user/{user_id}/badges")
async def get_user_badges(
    user_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get all badges earned by user"""
    try:
        badges = await db["user_badges"].find(
            {"user_id": user_id}
        ).to_list(100)
        
        for badge in badges:
            if "_id" in badge:
                badge["_id"] = str(badge["_id"])
        
        return {"success": True, "badges": badges}
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/user/{user_id}/streak")
async def get_user_streak(
    user_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get user's streak information"""
    try:
        streak = await db["user_streaks"].find_one({"user_id": user_id})
        
        if not streak:
            return {
                "success": True,
                "streak": {
                    "current_streak": 0,
                    "longest_streak": 0,
                    "message": "Start your first task to begin your streak!"
                }
            }
        
        if "_id" in streak:
            streak["_id"] = str(streak["_id"])
        
        return {"success": True, "streak": streak}
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/health")
async def quest_system_health():
    """Health check for quest system"""
    return {
        "status": "healthy",
        "service": "Quest System API",
        "total_quests": len(await quest_service.get_all_quests()),
        "version": "1.0.0"
    }
