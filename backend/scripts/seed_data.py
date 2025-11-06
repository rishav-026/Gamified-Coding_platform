import asyncio
from motor.motor_asyncio import AsyncClient
from app.core.config import settings
from datetime import datetime

async def seed_data():
    """Seed database with sample data"""
    client = AsyncClient(settings.MONGODB_URL)
    db = client[settings.DATABASE_NAME]
    
    try:
        # Sample quests
        quests = [
            {
                "title": "Exploring GitHub",
                "description": "Learn the basics of GitHub",
                "difficulty": "beginner",
                "xp_reward": 100,
                "estimated_duration": 30,
                "objectives": ["Understand GitHub basics", "Explore repositories"],
                "prerequisites": [],
                "is_published": True,
                "category": "github",
                "tags": ["github", "basics"],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
            },
            {
                "title": "Your First Pull Request",
                "description": "Make your first contribution to open source",
                "difficulty": "beginner",
                "xp_reward": 200,
                "estimated_duration": 60,
                "objectives": ["Fork a repository", "Create a pull request"],
                "prerequisites": [],
                "is_published": True,
                "category": "open_source",
                "tags": ["github", "pull_request", "contribution"],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
            },
        ]
        
        result = await db["quests"].insert_many(quests)
        print(f"✅ Inserted {len(result.inserted_ids)} quests!")
        
        # Sample badges
        badges = [
            {
                "name": "First Steps",
                "description": "Complete your first quest",
                "icon": "🎯",
                "color": "blue",
                "category": "quest",
                "criteria_type": "quest_complete",
                "criteria_value": 1,
                "is_active": True,
                "created_at": datetime.utcnow(),
            },
            {
                "name": "Week Warrior",
                "description": "Maintain a 7-day streak",
                "icon": "🔥",
                "color": "orange",
                "category": "streak",
                "criteria_type": "streak_days",
                "criteria_value": 7,
                "is_active": True,
                "created_at": datetime.utcnow(),
            },
        ]
        
        result = await db["badges"].insert_many(badges)
        print(f"✅ Inserted {len(result.inserted_ids)} badges!")
        
    except Exception as e:
        print(f"❌ Error seeding data: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_data())
