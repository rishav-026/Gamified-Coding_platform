import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import './AIChat.css';

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "👋 Hi! I'm your CodeQuest AI Assistant powered by Google Gemini!\n\nI can help you with:\n✨ Answer coding questions\n📝 Explain code\n💡 Give hints for problems\n🐛 Debug your code\n📚 Teach programming concepts\n\nWhat would you like help with?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (type, text) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type,
      text,
      timestamp: new Date()
    }]);
  };

  // ==================== CHAT FUNCTIONS ====================

  const sendChatMessage = async () => {
    if (!input.trim() || loading) return;

    try {
      setLoading(true);

      // Add user message
      addMessage('user', input);
      const userMessage = input;
      setInput('');

      // Send to API
      const response = await api.post('/ai/chat', {
        message: userMessage,
        context: context,
        user_id: 'demo_user'
      });

      if (response.data.success) {
        addMessage('bot', response.data.response);
      } else {
        addMessage('bot', '❌ Sorry, I encountered an error. Please try again.');
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('bot', '❌ Error communicating with AI. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Get hint for current problem
  const getHint = async () => {
    if (!context.trim()) {
      alert('Please describe the problem in the context box first!');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/ai/get-hint', {
        problem_title: 'Current Problem',
        problem_description: context,
        difficulty: 'beginner'
      });

      if (response.data.success) {
        addMessage('bot', `💡 **Hint:**\n\n${response.data.hint}`);
      }
    } catch (error) {
      console.error('Hint error:', error);
      alert('Error getting hint');
    } finally {
      setLoading(false);
    }
  };

  // Explain code
  const explainCode = async () => {
    if (!input.trim()) {
      alert('Paste your code first!');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/ai/explain-code', {
        code: input,
        language: 'python'
      });

      if (response.data.success) {
        addMessage('user', `Explain this code:\n\`\`\`python\n${input}\n\`\`\``);
        addMessage('bot', response.data.explanation);
        setInput('');
      }
    } catch (error) {
      console.error('Explain error:', error);
      alert('Error explaining code');
    } finally {
      setLoading(false);
    }
  };

  // Debug code
  const debugCode = async () => {
    const errorMessage = prompt('Enter the error message you received:');
    if (!errorMessage) return;

    try {
      setLoading(true);

      const response = await api.post('/ai/debug-code', {
        code: input,
        error: errorMessage,
        language: 'python'
      });

      if (response.data.success) {
        addMessage('user', `Help me debug this code:\n\nError: ${errorMessage}`);
        addMessage('bot', response.data.advice);
        setInput('');
      }
    } catch (error) {
      console.error('Debug error:', error);
      alert('Error debugging code');
    } finally {
      setLoading(false);
    }
  };

  // Learn concept
  const learnConcept = async () => {
    const concept = prompt('What concept do you want to learn about?');
    if (!concept) return;

    try {
      setLoading(true);

      const response = await api.post('/ai/learn-concept', {
        concept: concept,
        level: 'beginner'
      });

      if (response.data.success) {
        addMessage('user', `Teach me about: ${concept}`);
        addMessage('bot', response.data.content);
      }
    } catch (error) {
      console.error('Learn error:', error);
      alert('Error fetching concept');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return (
    <div className="ai-chat-page">
      <div className="ai-chat-container">
        {/* Header */}
        <div className="chat-header">
          <h1>🤖 AI Assistant (Google Gemini)</h1>
          <p>Your intelligent coding tutor</p>
        </div>

        {/* Tabs */}
        <div className="chat-tabs">
          <button 
            className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat
          </button>
          <button 
            className={`tab ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => setActiveTab('tools')}
          >
            🛠️ Tools
          </button>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.type}`}>
              <div className="message-bubble">
                <div className="message-text" style={{ whiteSpace: 'pre-wrap' }}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Context Box */}
        <div className="chat-context">
          <textarea
            placeholder="Add context (e.g., topic, problem description)..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows="2"
          />
        </div>

        {/* Chat Input */}
        <div className="chat-input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={activeTab === 'chat' 
              ? "Ask me anything about coding..." 
              : "Paste your code here..."}
            disabled={loading}
            rows="3"
            className="chat-input"
          />

          <div className="chat-buttons">
            {activeTab === 'chat' ? (
              <>
                <button
                  onClick={sendChatMessage}
                  disabled={loading || !input.trim()}
                  className="btn-primary"
                >
                  {loading ? '⏳ Thinking...' : '📤 Send'}
                </button>
                <button
                  onClick={getHint}
                  disabled={loading || !context.trim()}
                  className="btn-secondary"
                >
                  💡 Get Hint
                </button>
                <button
                  onClick={learnConcept}
                  disabled={loading}
                  className="btn-secondary"
                >
                  📚 Learn Concept
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={explainCode}
                  disabled={loading || !input.trim()}
                  className="btn-primary"
                >
                  📝 Explain Code
                </button>
                <button
                  onClick={debugCode}
                  disabled={loading || !input.trim()}
                  className="btn-danger"
                >
                  🐛 Debug
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
