import pytest

@pytest.mark.asyncio
async def test_xp_calculation():
    """Test XP calculation"""
    from app.utils import calculate_xp
    
    xp_beginner = calculate_xp("beginner", 20)
    assert xp_beginner > 0
    
    xp_advanced = calculate_xp("advanced", 20)
    assert xp_advanced > xp_beginner

@pytest.mark.asyncio
async def test_level_calculation():
    """Test level calculation"""
    from app.utils import calculate_level
    
    level_0 = calculate_level(0)
    assert level_0 == 1
    
    level_100 = calculate_level(100)
    assert level_100 >= 1
