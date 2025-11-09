import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load the API key
load_dotenv(dotenv_path=".env.local")
api_key = os.getenv("GEMINI_API_KEY")
print(f"🔑 GEMINI_API_KEY: {api_key}")

if not api_key:
    print("❌ No API key found. Please check .env.local.")
    exit()

# Configure Gemini API
genai.configure(api_key=api_key)

# List available models
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Available model: {m.name}")
except Exception as e:
    print(f"Error listing models: {e}")

try:
    # ✅ Use a currently available model
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content("Say hello! This is a test message.")
    print("✅ Gemini API Response:", response.text)
except Exception as e:
    print("❌ Gemini API Error:", e)
