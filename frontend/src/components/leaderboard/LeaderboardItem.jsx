import React from 'react';
import { FaStar } from 'react-icons/fa';
import { formatNumber } from '../../utils/helpers';

const LeaderboardItem = ({ user, position, medal }) => {
  const getPositionColor = (pos) => {
    switch (pos) {
      case 1:
        return 'bg-yellow-100 border-l-4 border-yellow-500';
      case 2:
        return 'bg-gray-100 border-l-4 border-gray-400';
      case 3:
        return 'bg-orange-100 border-l-4 border-orange-600';
      default:
        return 'bg-white border-l-4 border-gray-300';
    }
  };

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg ${getPositionColor(position)} hover:shadow-md transition-shadow`}>
      {/* Rank */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg">
        {medal ? (
          <div>{medal}</div>
        ) : (
          <span className="text-gray-600">{position}</span>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 flex items-center gap-3">
        {user.avatar_url && (
          <img
            src={user.avatar_url}
            alt={user.username}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <p className="font-bold text-gray-900">{user.username}</p>
          <p className="text-sm text-gray-600">Level {user.level}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="flex items-center gap-1 font-bold text-gray-900">
            <FaStar className="text-yellow-500" />
            {formatNumber(user.total_xp)}
          </div>
          <p className="text-xs text-gray-500">XP</p>
        </div>

        <div className="text-right">
          <p className="font-bold text-gray-900">{user.badges?.length || 0}</p>
          <p className="text-xs text-gray-500">Badges</p>
        </div>

        <div className="text-right">
          <p className="font-bold text-gray-900">{user.current_streak || 0}d</p>
          <p className="text-xs text-gray-500">Streak</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardItem;
