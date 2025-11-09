from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from app.core.database import get_db
from app.services.tutorial_service import TutorialService
from pydantic import BaseModel

router = APIRouter(prefix="/tutorials", tags=["tutorials"])
tutorial_service = TutorialService()

class CompleteTutorialRequest(BaseModel):
    tutorial_id: str
    quiz_score: float
    user_id: str

@router.get("/list")
async def get_tutorials():
    """Get all available tutorials"""
    tutorials = await tutorial_service.get_all_tutorials()
    return {
        "success": True,
        "tutorials": tutorials
    }

@router.get("/{tutorial_id}")
async def get_tutorial(tutorial_id: str):
    """Get a specific tutorial by ID"""
    tutorial = await tutorial_service.get_tutorial(tutorial_id)
    
    if not tutorial:
        raise HTTPException(status_code=404, detail="Tutorial not found")
    
    return {
        "success": True,
        "tutorial": tutorial
    }

@router.get("/user/{user_id}/progress")
async def get_user_progress(user_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Get user's tutorial progress"""
    result = await tutorial_service.get_user_progress(db, user_id)
    return result

@router.post("/complete")
async def complete_tutorial(request: CompleteTutorialRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Mark tutorial as completed"""
    result = await tutorial_service.mark_tutorial_complete(
        db, 
        request.user_id, 
        request.tutorial_id, 
        request.quiz_score
    )
    return result

@router.get("/health")
async def tutorials_health():
    """Health check for tutorials service"""
    return {
        "status": "healthy",
        "service": "Tutorials API",
        "total_tutorials": len(await tutorial_service.get_all_tutorials()),
        "version": "1.0.0"
    }
