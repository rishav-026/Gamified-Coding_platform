from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    username: str
    email: str
    avatar_url: Optional[str] = None
    level: int
    total_xp: int
    current_streak: int
    longest_streak: int
    badges: list = []
    created_at: datetime

    class Config:
        populate_by_name = True

class UserUpdate(BaseModel):
    username: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
