import pytest

@pytest.mark.asyncio
async def test_chat_with_ai(client):
    """Test chatting with AI"""
    headers = {"Authorization": "Bearer test_token"}
    chat_data = {
        "message": "Hello, how can you help?",
        "context": None
    }
    response = await client.post(
        "/api/v1/ai/chat",
        json=chat_data,
        headers=headers
    )
    assert response.status_code in [200, 401]

@pytest.mark.asyncio
async def test_code_review(client):
    """Test code review"""
    headers = {"Authorization": "Bearer test_token"}
    review_data = {
        "code": "print('hello')",
        "language": "python",
        "context": None
    }
    response = await client.post(
        "/api/v1/ai/code-review",
        json=review_data,
        headers=headers
    )
    assert response.status_code in [200, 401]
