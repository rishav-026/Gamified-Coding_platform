"""
AI Chat API Endpoints
Routes for AI interactions, code explanations, hints, etc.
"""

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_db
from app.services.ai_service import AIService
from pydantic import BaseModel
from datetime import datetime

# Create router
router = APIRouter(prefix="/ai", tags=["ai"])

# Initialize AI service
ai_service = AIService()

# ==================== PYDANTIC MODELS ====================

class ChatRequest(BaseModel):
    """Request body for chat endpoint"""
    message: str
    context: str = ""
    user_id: str = "demo_user"

class ExplainCodeRequest(BaseModel):
    """Request to explain code"""
    code: str
    language: str = "python"

class HintRequest(BaseModel):
    """Request for a hint"""
    problem_title: str
    problem_description: str
    difficulty: str = "beginner"

class DebugRequest(BaseModel):
    """Request for debugging help"""
    code: str
    error: str
    language: str = "python"

class LearnRequest(BaseModel):
    """Request to learn a concept"""
    concept: str
    level: str = "beginner"

# ==================== ENDPOINTS ====================

@router.post("/chat")
async def ai_chat(request: ChatRequest, db: AsyncIOMotorDatabase = Depends(get_db)):

    """
    Chat with AI assistant using Google Gemini
    
    Parameters:
    - message: Your question or message
    - context: Optional context about what you're working on
    - user_id: Your user ID (default: demo_user)
    
    Example:
    {
        "message": "How do I use loops in Python?",
        "context": "I'm learning Python basics",
        "user_id": "demo_user"
    }
    """
    try:
        print(f"🤖 Processing chat request from {request.user_id}")
        
        # Get AI response
        result = await ai_service.chat(
            request.message,
            request.user_id,
            request.context
        )
        
        # Save to database if successful
        if result["success"]:
            await db["ai_chats"].insert_one({
                "user_id": request.user_id,
                "message": request.message,
                "response": result["response"],
                "context": request.context,
                "tokens_used": result["tokens_used"],
                "model": result["model"],
                "timestamp": datetime.utcnow()
            })
            print(f"✅ Chat saved to database")
        
        return result
    
    except Exception as e:
        print(f"❌ Error in chat endpoint: {str(e)}")
        return {
            "success": False,
            "response": "Sorry, I encountered an error. Please try again.",
            "error": str(e)
        }


@router.post("/explain-code")
async def explain_code(request: ExplainCodeRequest):
    """
    Get explanation for a code snippet
    
    Parameters:
    - code: The code to explain
    - language: Programming language (python, javascript, java, etc.)
    
    Example:
    {
        "code": "def factorial(n):\\n    return 1 if n <= 1 else n * factorial(n-1)",
        "language": "python"
    }
    """
    try:
        print(f"📝 Explaining {request.language} code")
        
        explanation = await ai_service.get_code_explanation(
            request.code,
            request.language
        )
        
        return {
            "success": True,
            "explanation": explanation,
            "timestamp": datetime.utcnow().isoformat(),
            "language": request.language
        }
    
    except Exception as e:
        print(f"❌ Error explaining code: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }


@router.post("/get-hint")
async def get_hint(request: HintRequest):
    """
    Get a helpful hint for a problem
    
    Important: Hints guide learning, they don't give away answers!
    
    Parameters:
    - problem_title: The problem's title
    - problem_description: Full description of the problem
    - difficulty: Difficulty level (beginner/intermediate/advanced)
    
    Example:
    {
        "problem_title": "Find Largest Number",
        "problem_description": "Find the largest number in an array",
        "difficulty": "beginner"
    }
    """
    try:
        print(f"💡 Generating hint for: {request.problem_title}")
        
        hint = await ai_service.generate_hint(
            request.problem_title,
            request.problem_description,
            request.difficulty
        )
        
        return {
            "success": True,
            "hint": hint,
            "problem_title": request.problem_title,
            "difficulty": request.difficulty,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    except Exception as e:
        print(f"❌ Error generating hint: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }


@router.post("/debug-code")
async def debug_code(request: DebugRequest):
    """
    Get help debugging code
    
    Parameters:
    - code: The code that has an error
    - error: The error message you received
    - language: Programming language
    
    Example:
    {
        "code": "x = [1, 2, 3]\\nprint(x[10])",
        "error": "IndexError: list index out of range",
        "language": "python"
    }
    """
    try:
        print(f"🐛 Debugging {request.language} code")
        
        advice = await ai_service.debug_code(
            request.code,
            request.error,
            request.language
        )
        
        return {
            "success": True,
            "advice": advice,
            "error": request.error,
            "language": request.language,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    except Exception as e:
        print(f"❌ Error debugging: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }


@router.post("/learn-concept")
async def learn_concept(request: LearnRequest):
    """
    Learn a programming concept
    
    Parameters:
    - concept: The concept to learn (e.g., recursion, loops, async/await)
    - level: Learning level (beginner/intermediate/advanced)
    
    Example:
    {
        "concept": "recursion",
        "level": "beginner"
    }
    """
    try:
        print(f"📚 Teaching {request.concept} at {request.level} level")
        
        content = await ai_service.learn_concept(
            request.concept,
            request.level
        )
        
        return {
            "success": True,
            "content": content,
            "concept": request.concept,
            "level": request.level,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    except Exception as e:
        print(f"❌ Error teaching concept: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }


@router.post("/clear-history")
async def clear_chat_history():
    """Clear the AI conversation history"""
    try:
        ai_service.clear_history()
        return {
            "success": True,
            "message": "Chat history cleared successfully"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


@router.get("/health")
async def ai_health():
    """Check if AI service is healthy"""
    try:
        return {
            "status": "healthy",
            "service": "AI Assistant (Google Gemini)",
            "model": ai_service.model_name,
            "version": "1.0.0"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
