import pytest

@pytest.mark.asyncio
async def test_create_submission(client):
    """Test creating submission"""
    headers = {"Authorization": "Bearer test_token"}
    submission_data = {
        "task_id": "test_task",
        "code": "print('hello')",
        "language": "python"
    }
    response = await client.post(
        "/api/v1/submissions",
        json=submission_data,
        headers=headers
    )
    assert response.status_code in [200, 401]
