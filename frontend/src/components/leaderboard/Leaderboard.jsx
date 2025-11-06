import React, { useState, useEffect } from 'react';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import Card from '../common/Card';
import { userService } from '../../services/userService';
import { LEADERBOARD_TYPES } from '../../utils/constants';
import LeaderboardItem from './LeaderboardItem';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [type, setType] = useState('all_time');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [type]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await userService.getLeaderboard(type, 100);
      setLeaderboard(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (position) => {
    switch (position) {
      case 1:
        return <FaTrophy className="text-yellow-500 text-2xl" />;
      case 2:
        return <FaMedal className="text-gray-400 text-2xl" />;
      case 3:
        return <FaMedal className="text-orange-600 text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Type Selection */}
      <div className="flex gap-2">
        {Object.entries(LEADERBOARD_TYPES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setType(value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              type === value
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {key.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {error && (
        <Card className="bg-red-50 border-l-4 border-red-500 text-red-700">
          <p className="font-bold">Error loading leaderboard</p>
          <p className="text-sm">{error}</p>
        </Card>
      )}

      {loading ? (
        <Card className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading leaderboard...</p>
        </Card>
      ) : leaderboard.length === 0 ? (
        <Card className="text-center py-12 text-gray-500">
          <p>No leaderboard data available yet.</p>
        </Card>
      ) : (
        <Card>
          <h3 className="text-2xl font-bold mb-4">
            🏆 Top Contributors {type === 'weekly' ? '(This Week)' : type === 'monthly' ? '(This Month)' : '(All Time)'}
          </h3>
          
          <div className="space-y-2">
            {leaderboard.map((user, index) => (
              <LeaderboardItem
                key={user.id}
                user={user}
                position={index + 1}
                medal={getMedalIcon(index + 1)}
              />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Leaderboard;
