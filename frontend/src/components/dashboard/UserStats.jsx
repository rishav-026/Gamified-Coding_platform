import React from 'react';
import { FaTrophy, FaStar, FaFire, FaMedal } from 'react-icons/fa';
import Card from '../common/Card';
import { formatXP, formatNumber } from '../../utils/helpers';

const UserStats = ({ user }) => {
  if (!user) return null;

  const stats = [
    { 
      icon: <FaStar className="text-yellow-500" />, 
      label: 'Total XP', 
      value: formatXP(user.total_xp || 0),
      color: 'yellow',
    },
    { 
      icon: <FaTrophy className="text-primary-500" />, 
      label: 'Level', 
      value: user.level || 1,
      color: 'primary',
    },
    { 
      icon: <FaFire className="text-orange-500" />, 
      label: 'Current Streak', 
      value: `${user.current_streak || 0}d`,
      color: 'orange',
    },
    { 
      icon: <FaMedal className="text-purple-500" />, 
      label: 'Badges', 
      value: formatNumber(user.badges?.length || 0),
      color: 'purple',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="flex items-center space-x-4 hover:shadow-lg transition-shadow">
          <div className="text-4xl flex-shrink-0">
            {stat.icon}
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
