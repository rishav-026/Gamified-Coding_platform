import React from 'react';
import { FaFire } from 'react-icons/fa';
import Card from '../common/Card';

const StreakTracker = ({ streak, longestStreak, lastActivityDate }) => {
  const isStreakActive = streak > 0;

  return (
    <Card className="text-center">
      <div className="flex items-center justify-center mb-4">
        <FaFire 
          className={`text-4xl mr-3 ${
            isStreakActive ? 'text-orange-500 animate-pulse' : 'text-gray-300'
          }`}
        />
        <div className="text-left">
          <h3 className="text-lg font-bold text-gray-900">Streak</h3>
          <p className="text-xs text-gray-500">Keep it alive!</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-4">
        <p className="text-5xl font-bold text-orange-500 mb-2">{streak}</p>
        <p className="text-sm text-gray-600">Consecutive days</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-600">Personal Best</p>
          <p className="text-lg font-bold text-purple-600">{longestStreak}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-600">Status</p>
          <p className={`text-sm font-bold ${isStreakActive ? 'text-success' : 'text-danger'}`}>
            {isStreakActive ? '🔥 Active' : '⏸️ Inactive'}
          </p>
        </div>
      </div>

      {lastActivityDate && (
        <p className="text-xs text-gray-500 mt-3">
          Last active: {new Date(lastActivityDate).toLocaleDateString()}
        </p>
      )}
    </Card>
  );
};

export default StreakTracker;
