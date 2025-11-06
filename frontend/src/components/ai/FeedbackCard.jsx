import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

const FeedbackCard = ({ feedback, type = 'info' }) => {
  const config = {
    correct: {
      icon: <FaCheckCircle />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      emoji: '✅',
    },
    warning: {
      icon: <FaExclamationTriangle />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      emoji: '⚠️',
    },
    improvement: {
      icon: <FaLightbulb />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      emoji: '🚀',
    },
    info: {
      icon: null,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      emoji: 'ℹ️',
    },
  };

  const style = config[type] || config.info;

  return (
    <div className={`${style.bgColor} border-l-4 ${style.borderColor} p-4 rounded-r-lg`}>
      <div className="flex gap-3">
        <span className="text-2xl flex-shrink-0">{style.emoji}</span>
        <div className="flex-1">
          {Array.isArray(feedback) ? (
            <ul className="space-y-2">
              {feedback.map((item, idx) => (
                <li key={idx} className={`${style.textColor} text-sm`}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className={`${style.textColor} text-sm`}>{feedback}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
