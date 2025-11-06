from motor.motor_asyncio import AsyncClient, AsyncDatabase
from app.core.config import settings

class DatabaseClient:
    def __init__(self):
        self.client: AsyncClient = None
        self.db: AsyncDatabase = None

    async def connect(self):
        """Connect to MongoDB"""
        try:
            self.client = AsyncClient(settings.MONGODB_URL)
            self.db = self.client[settings.DATABASE_NAME]
            # Test connection
            await self.db.command("ping")
            print("✅ Connected to MongoDB")
        except Exception as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            raise

    async def disconnect(self):
        """Disconnect from MongoDB"""
        if self.client:
            self.client.close()
            print("❌ Disconnected from MongoDB")

    async def get_database(self) -> AsyncDatabase:
        """Get database instance"""
        return self.db

db_client = DatabaseClient()

async def get_db() -> AsyncDatabase:
    """Dependency for getting database"""
    return db_client.db
