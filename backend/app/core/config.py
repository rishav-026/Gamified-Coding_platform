from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "CodeQuest"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Database
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "codequest"
    
    # JWT
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # GitHub OAuth
    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""
    GITHUB_REDIRECT_URI: str = "http://localhost:8000/api/v1/auth/github/callback"
    
    # OpenAI
    OPENAI_API_KEY: str = ""
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000", "http://localhost:8000"]
    
    class Config:
        env_file = ".env.local"
        case_sensitive = True

settings = Settings()
