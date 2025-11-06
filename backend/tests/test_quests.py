import pytest

@pytest.mark.asyncio
async def test_get_quests(client):
    """Test getting quests"""
    response = await client.get("/api/v1/quests")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

@pytest.mark.asyncio
async def test_create_quest(client):
    """Test creating quest"""
    quest_data = {
        "title": "Test Quest",
        "description": "Test Description",
        "difficulty": "beginner",
        "xp_reward": 100,
        "objectives": ["Test"]
    }
    response = await client.post("/api/v1/quests", json=quest_data)
    assert response.status_code in [200, 201]
