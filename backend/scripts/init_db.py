import asyncio
from motor.motor_asyncio import AsyncClient
from app.core.config import settings

async def init_db():
    """Initialize database with collections"""
    client = AsyncClient(settings.MONGODB_URL)
    db = client[settings.DATABASE_NAME]
    
    try:
        # Create collections
        await db.create_collection("users")
        await db.create_collection("quests")
        await db.create_collection("tasks")
        await db.create_collection("user_quests")
        await db.create_collection("badges")
        await db.create_collection("user_badges")
        
        # Create indexes
        await db["users"].create_index("email", unique=True)
        await db["users"].create_index("username", unique=True)
        await db["quests"].create_index("title")
        
        print("✅ Database initialized successfully!")
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(init_db())
