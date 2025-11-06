import pytest
import asyncio
from motor.motor_asyncio import AsyncClient
from app.core.config import settings
from app.core.database import db_client
from app.main import app
from httpx import AsyncClient as HttpAsyncClient

@pytest.fixture
async def client():
    """Test client"""
    async with HttpAsyncClient(app=app, base_url="http://test") as c:
        yield c

@pytest.fixture(scope="session")
def event_loop():
    """Event loop for async tests"""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
async def db():
    """Database fixture"""
    await db_client.connect()
    yield db_client.db
    await db_client.disconnect()
