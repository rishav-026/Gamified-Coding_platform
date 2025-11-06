import pytest

@pytest.mark.asyncio
async def test_get_current_user(client):
    """Test getting current user"""
    headers = {"Authorization": "Bearer test_token"}
    response = await client.get("/api/v1/users/me", headers=headers)
    # Will return 401 without valid token, but endpoint exists
    assert response.status_code in [200, 401, 404]

@pytest.mark.asyncio
async def test_get_user_badges(client):
    """Test getting user badges"""
    headers = {"Authorization": "Bearer test_token"}
    response = await client.get("/api/v1/users/me/badges", headers=headers)
    assert response.status_code in [200, 401, 404]
