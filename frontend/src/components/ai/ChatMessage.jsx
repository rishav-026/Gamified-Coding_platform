import React from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div className={`flex gap-3 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-primary-500' : 'bg-secondary-500'
        }`}>
          {isUser ? (
            <FaUser className="text-white text-sm" />
          ) : (
            <FaRobot className="text-white text-sm" />
          )}
        </div>

        {/* Message Bubble */}
        <div className={`px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-primary-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-900 rounded-bl-none'
        }`}>
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          {message.timestamp && (
            <p className={`text-xs mt-1 ${isUser ? 'text-primary-100' : 'text-gray-500'}`}>
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
