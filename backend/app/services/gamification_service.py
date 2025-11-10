"""
Gamification Service
Manage XP, levels, badges, streaks, and achievements
"""

from datetime import datetime, timedelta

class GamificationService:
    """Advanced gamification system"""
    
    # Badge definitions
    BADGES = {
        "first_quest": {
            "name": "Quest Starter",
            "description": "Complete your first quest",
            "icon": "🎯",
            "category": "quest"
        },
        "three_quests": {
            "name": "Quest Enthusiast",
            "description": "Complete 3 quests",
            "icon": "🚀",
            "category": "milestone"
        },
        "ten_quests": {
            "name": "Quest Master",
            "description": "Complete 10 quests",
            "icon": "👑",
            "category": "milestone"
        },
        "first_contribution": {
            "name": "Open Source Contributor",
            "description": "Make your first open source contribution",
            "icon": "🌟",
            "category": "achievement"
        },
        "seven_day_streak": {
            "name": "Week Warrior",
            "description": "Maintain a 7-day streak",
            "icon": "🔥",
            "category": "streak"
        },
        "thirty_day_streak": {
            "name": "Month Master",
            "description": "Maintain a 30-day streak",
            "icon": "💪",
            "category": "streak"
        },
        "thousand_xp": {
            "name": "XP Collector",
            "description": "Earn 1000 XP",
            "icon": "💯",
            "category": "milestone"
        },
        "level_five": {
            "name": "Level 5 Achiever",
            "description": "Reach level 5",
            "icon": "⭐",
            "category": "level"
        },
        "level_ten": {
            "name": "Level 10 Legend",
            "description": "Reach level 10",
            "icon": "👸",
            "category": "level"
        }
    }
    
    # XP per level
    XP_PER_LEVEL = 1000
    
    def get_level_from_xp(self, total_xp: int) -> int:
        """Calculate level from total XP"""
        return (total_xp // self.XP_PER_LEVEL) + 1
    
    def get_xp_for_level(self, level: int) -> int:
        """Get required XP to reach a level"""
        return (level - 1) * self.XP_PER_LEVEL
    
    def get_xp_progress_to_next_level(self, total_xp: int) -> dict:
        """Get progress towards next level"""
        current_level = self.get_level_from_xp(total_xp)
        current_level_xp = self.get_xp_for_level(current_level)
        next_level_xp = self.get_xp_for_level(current_level + 1)
        
        xp_in_current_level = total_xp - current_level_xp
        xp_needed_for_level = next_level_xp - current_level_xp
        progress_percentage = (xp_in_current_level / xp_needed_for_level) * 100
        
        return {
            "current_level": current_level,
            "current_level_xp": current_level_xp,
            "next_level_xp": next_level_xp,
            "xp_in_level": xp_in_current_level,
            "xp_needed": xp_needed_for_level,
            "progress_percentage": progress_percentage
        }
    
    async def check_new_badges(self, db, user_id: str) -> list:
        """Check if user earned new badges"""
        try:
            # Get user data
            user = await db["users"].find_one({"_id": user_id})
            if not user:
                return []
            
            # Get user badges
            earned_badges = await db["user_badges"].find(
                {"user_id": user_id}
            ).to_list(100)
            earned_badge_ids = [b["badge_id"] for b in earned_badges]
            
            new_badges = []
            total_xp = user.get("total_xp", 0)
            level = self.get_level_from_xp(total_xp)
            
            # Get quest progress
            quest_progress = await db["user_quest_progress"].find(
                {"user_id": user_id}
            ).to_list(100)
            completed_quests = [q for q in quest_progress if q["status"] == "completed"]
            
            # Get streaks
            streak_doc = await db["user_streaks"].find_one({"user_id": user_id})
            current_streak = streak_doc.get("current_streak", 0) if streak_doc else 0
            
            # Check each badge criteria
            badge_checks = {
                "first_quest": len(completed_quests) >= 1,
                "three_quests": len(completed_quests) >= 3,
                "ten_quests": len(completed_quests) >= 10,
                "thousand_xp": total_xp >= 1000,
                "level_five": level >= 5,
                "level_ten": level >= 10,
                "seven_day_streak": current_streak >= 7,
                "thirty_day_streak": current_streak >= 30,
            }
            
            # Award badges
            for badge_id, criteria_met in badge_checks.items():
                if criteria_met and badge_id not in earned_badge_ids:
                    badge_info = self.BADGES.get(badge_id, {})
                    
                    badge_doc = {
                        "user_id": user_id,
                        "badge_id": badge_id,
                        "name": badge_info.get("name"),
                        "description": badge_info.get("description"),
                        "icon": badge_info.get("icon"),
                        "category": badge_info.get("category"),
                        "earned_at": datetime.utcnow()
                    }
                    
                    await db["user_badges"].insert_one(badge_doc)
                    new_badges.append(badge_id)
            
            return new_badges
        
        except Exception as e:
            print(f"Error checking badges: {e}")
            return []
    
    async def update_streak(self, db, user_id: str) -> dict:
        """Update user's activity streak"""
        try:
            today = datetime.utcnow().date()
            
            # Get current streak
            streak_doc = await db["user_streaks"].find_one({"user_id": user_id})
            
            if not streak_doc:
                # First activity
                streak_doc = {
                    "user_id": user_id,
                    "current_streak": 1,
                    "longest_streak": 1,
                    "last_activity": datetime.utcnow(),
                    "streak_broken_at": None
                }
                await db["user_streaks"].insert_one(streak_doc)
                return {"streak": 1, "message": "Streak started!"}
            
            last_activity = streak_doc["last_activity"].date()
            current_streak = streak_doc.get("current_streak", 0)
            longest_streak = streak_doc.get("longest_streak", 0)
            
            # Check if same day (no double counting)
            if last_activity == today:
                return {
                    "streak": current_streak,
                    "message": "Already active today"
                }
            
            # Check if consecutive day
            yesterday = today - timedelta(days=1)
            if last_activity == yesterday:
                # Continue streak
                current_streak += 1
                if current_streak > longest_streak:
                    longest_streak = current_streak
            else:
                # Streak broken, restart
                current_streak = 1
            
            # Update
            await db["user_streaks"].update_one(
                {"user_id": user_id},
                {
                    "$set": {
                        "current_streak": current_streak,
                        "longest_streak": longest_streak,
                        "last_activity": datetime.utcnow()
                    }
                }
            )
            
            return {
                "streak": current_streak,
                "longest_streak": longest_streak,
                "message": f"Streak: {current_streak} days! 🔥"
            }
        
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def get_user_stats(self, db, user_id: str) -> dict:
        """Get comprehensive gamification stats"""
        try:
            user = await db["users"].find_one({"_id": user_id})
            if not user:
                return {"success": False, "error": "User not found"}
            
            total_xp = user.get("total_xp", 0)
            level = self.get_level_from_xp(total_xp)
            level_progress = self.get_xp_progress_to_next_level(total_xp)
            
            # Get badges
            badges = await db["user_badges"].find(
                {"user_id": user_id}
            ).to_list(100)
            
            # Get quests
            quest_progress = await db["user_quest_progress"].find(
                {"user_id": user_id}
            ).to_list(100)
            completed_quests = len([q for q in quest_progress if q["status"] == "completed"])
            
            # Get streak
            streak_doc = await db["user_streaks"].find_one({"user_id": user_id})
            current_streak = streak_doc.get("current_streak", 0) if streak_doc else 0
            longest_streak = streak_doc.get("longest_streak", 0) if streak_doc else 0
            
            return {
                "success": True,
                "stats": {
                    "total_xp": total_xp,
                    "level": level,
                    "level_progress": level_progress,
                    "badges_count": len(badges),
                    "badges": badges,
                    "quests_completed": completed_quests,
                    "current_streak": current_streak,
                    "longest_streak": longest_streak
                }
            }
        
        except Exception as e:
            return {"success": False, "error": str(e)}
