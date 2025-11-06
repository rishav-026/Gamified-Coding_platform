import React from 'react';
import { FaStar, FaCheck, FaMedal } from 'react-icons/fa';
import Card from '../common/Card';
import { formatRelativeTime } from '../../utils/helpers';

const RecentAchievements = ({ achievements = [] }) => {
  const getAchievementIcon = (type) => {
    switch (type) {
      case 'badge':
        return <FaMedal className="text-yellow-500" />;
      case 'level':
        return <FaStar className="text-purple-500" />;
      case 'quest':
        return <FaCheck className="text-success" />;
      default:
        return <FaCheck className="text-primary-500" />;
    }
  };

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4">Recent Achievements</h3>
      {achievements.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No achievements yet.</p>
          <p className="text-sm text-gray-400">Start completing quests to earn rewards!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {achievements.slice(0, 10).map((achievement, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-xl mt-1 flex-shrink-0">
                {getAchievementIcon(achievement.type)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{achievement.title}</p>
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-semibold text-yellow-600">+{achievement.xp} XP</p>
                <p className="text-xs text-gray-400">
                  {formatRelativeTime(achievement.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentAchievements;
