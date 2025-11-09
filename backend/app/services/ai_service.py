"""
AI Chat Service - Powered by Google Gemini
Handles AI conversations, code explanations, and hints
"""

import os
import json
from datetime import datetime
import google.generativeai as genai
from app.core.config import settings

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)

class AIService:
    """Handle AI chat interactions using Google Gemini"""
    
    def __init__(self):
        """Initialize AI service with Gemini model"""
        self.model_name = os.getenv("GEMINI_MODEL", "models/gemini-2.5-flash-lite-preview-09-2025")
        self.max_tokens = int(os.getenv("GEMINI_MAX_TOKENS", "1000"))
        self.temperature = float(os.getenv("GEMINI_TEMPERATURE", "0.7"))
        
        # Initialize the model
        self.model = genai.GenerativeModel(self.model_name)
        
        # Store conversation history
        self.conversation_history = []
        
        print(f"✅ Gemini AI Service initialized with model: {self.model_name}")
    
    async def chat(self, user_message: str, user_id: str, context: str = "") -> dict:
        """
        Chat with AI assistant using Gemini
        
        Args:
            user_message (str): The user's question/message
            user_id (str): ID of the user asking
            context (str): Additional context (topic, problem details)
        
        Returns:
            dict: Response from AI
        """
        try:
            # Build the system prompt
            system_prompt = """You are CodeQuest AI Assistant, a friendly and helpful coding tutor.

Your responsibilities:
1. Answer programming questions clearly and concisely
2. Explain code concepts in simple terms
3. Provide hints (NOT full solutions) for coding problems
4. Encourage learning and problem-solving skills
5. Be supportive and encouraging
6. Format code examples with triple backticks (``````javascript, etc.)
7. Keep responses under 500 words
8. Ask clarifying questions if needed

Teaching Philosophy:
- Help users understand concepts, don't give answers
- Guide them to discover solutions
- Celebrate their learning journey
- Make programming fun and accessible"""
            
            # Add context if provided
            if context:
                system_prompt += f"\n\nCurrent Context: {context}"
            
            # Create the full prompt
            full_prompt = f"{system_prompt}\n\nUser Question: {user_message}"
            
            # Generate response using Gemini
            response = self.model.generate_content(
                full_prompt,
                generation_config=genai.types.GenerationConfig(
                    max_output_tokens=self.max_tokens,
                    temperature=self.temperature,
                )
            )
            
            # Extract the AI response
            ai_response = response.text
            
            # Estimate tokens (rough calculation)
            tokens_used = len(user_message.split()) + len(ai_response.split())
            
            # Add to conversation history
            self.conversation_history.append({
                "role": "user",
                "content": user_message,
                "timestamp": datetime.utcnow().isoformat()
            })
            self.conversation_history.append({
                "role": "assistant",
                "content": ai_response,
                "timestamp": datetime.utcnow().isoformat()
            })
            
            # Keep only last 10 exchanges (20 messages)
            if len(self.conversation_history) > 20:
                self.conversation_history = self.conversation_history[-20:]
            
            return {
                "success": True,
                "response": ai_response,
                "timestamp": datetime.utcnow().isoformat(),
                "tokens_used": tokens_used,
                "user_id": user_id,
                "model": self.model_name
            }
        
        except Exception as e:
            print(f"❌ Error in AI chat: {str(e)}")
            return {
                "success": False,
                "response": "Sorry, I'm having trouble processing your request. Please try again.",
                "error": str(e),
                "user_id": user_id
            }
    
    async def get_code_explanation(self, code: str, language: str = "python") -> str:
        """
        Explain a code snippet
        
        Args:
            code (str): The code to explain
            language (str): Programming language
        
        Returns:
            str: Explanation of the code
        """
        try:
            prompt = f"""Explain this {language} code in simple terms:


Please provide:
1. **What it does**: Brief description of the overall purpose
2. **How it works**: Step-by-step explanation of the logic
3. **Key concepts**: Important programming concepts used
4. **Example**: Show how it would work with sample input/output

Keep it concise and easy to understand for beginners."""
            
            response = self.model.generate_content(prompt)
            return response.text
        
        except Exception as e:
            print(f"❌ Error explaining code: {str(e)}")
            return f"Error explaining code: {str(e)}"
    
    async def generate_hint(self, problem_title: str, problem_description: str, difficulty: str = "beginner") -> str:
        """
        Generate a helpful hint for a coding problem
        
        Args:
            problem_title (str): Title of the problem
            problem_description (str): Full description of the problem
            difficulty (str): Difficulty level
        
        Returns:
            str: A helpful hint that doesn't give away the answer
        """
        try:
            difficulty_guidance = {
                "beginner": "Give a very basic hint about the approach",
                "intermediate": "Mention the algorithm type but not specific implementation",
                "advanced": "Suggest optimization techniques"
            }
            
            guidance = difficulty_guidance.get(difficulty, "Give a helpful hint")
            
            prompt = f"""Generate a helpful hint for this {difficulty} coding problem.
{guidance}

IMPORTANT: Do NOT give the full solution or code!

Problem Title: {problem_title}
Problem Description: {problem_description}

Provide:
1. A hint about the approach to solve it
2. Key concepts to think about
3. A question to guide their thinking
4. One small example if helpful

Keep the hint encouraging and educational."""
            
            response = self.model.generate_content(prompt)
            return response.text
        
        except Exception as e:
            print(f"❌ Error generating hint: {str(e)}")
            return f"Error generating hint: {str(e)}"
    
    async def debug_code(self, code: str, error: str, language: str = "python") -> str:
        """
        Help debug code by explaining the error
        
        Args:
            code (str): The buggy code
            error (str): The error message
            language (str): Programming language
        
        Returns:
            str: Debugging advice
        """
        try:
            prompt = f"""Help debug this {language} code:


Error: {error}

Please:
1. Explain what went wrong
2. Identify the root cause
3. Suggest how to fix it
4. Show corrected code
5. Explain how to prevent this error

Keep it educational and constructive."""
            
            response = self.model.generate_content(prompt)
            return response.text
        
        except Exception as e:
            print(f"❌ Error debugging code: {str(e)}")
            return f"Error debugging: {str(e)}"
    
    async def learn_concept(self, concept: str, level: str = "beginner") -> str:
        """
        Teach a programming concept
        
        Args:
            concept (str): The concept to learn (e.g., "recursion")
            level (str): Learning level
        
        Returns:
            str: Explanation with examples
        """
        try:
            prompt = f"""Teach me about {concept} at the {level} level.

Please include:
1. **Simple Definition**: What is {concept}?
2. **Why It Matters**: When and why use {concept}?
3. **Key Points**: 3-4 important things to know
4. **Code Example**: A simple, clear code example
5. **Common Mistakes**: Things beginners often get wrong
6. **Practice Tip**: How to practice this concept

Make it engaging, clear, and not overwhelming."""
            
            response = self.model.generate_content(prompt)
            return response.text
        
        except Exception as e:
            print(f"❌ Error explaining concept: {str(e)}")
            return f"Error explaining concept: {str(e)}"
    
    def clear_history(self):
        """Clear conversation history"""
        self.conversation_history = []
        print("✅ Conversation history cleared")
    
    def get_history(self) -> list:
        """Get conversation history"""
        return self.conversation_history
