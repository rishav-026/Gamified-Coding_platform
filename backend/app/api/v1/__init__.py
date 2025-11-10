from fastapi import APIRouter
from app.api.v1 import (
    auth,
    users,
    quests,
    tasks,
    leaderboard,
    analytics,
    ai,
    badges,
    github,
    notifications,
    submissions,
    achievements,
    tutorials,
    quests_system  # ✅ Add this import
)

router = APIRouter(prefix="/api/v1")

# Include all routers
router.include_router(auth.router)
router.include_router(users.router)
router.include_router(quests.router)
router.include_router(tasks.router)
router.include_router(leaderboard.router)
router.include_router(analytics.router)
router.include_router(ai.router)
router.include_router(badges.router)
router.include_router(github.router)
router.include_router(notifications.router)
router.include_router(submissions.router)
router.include_router(achievements.router)
router.include_router(tutorials.router)
router.include_router(quests_system.router)  # ✅ Add this line

__all__ = ["router"]
