import pytest
from app.schemas.user import UserCreate, UserLogin

@pytest.mark.asyncio
async def test_register_user(client):
    """Test user registration"""
    user_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "SecurePass123!"
    }
    
    response = await client.post("/api/v1/auth/register", json=user_data)
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"

@pytest.mark.asyncio
async def test_health_check(client):
    """Test health check endpoint"""
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
