import React from 'react';
import Leaderboard from '../components/leaderboard/Leaderboard';
import { FaTrophy } from 'react-icons/fa';

const LeaderboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-lg flex items-center gap-4">
        <FaTrophy className="text-5xl" />
        <div>
          <h1 className="text-4xl font-bold">Leaderboards</h1>
          <p className="text-yellow-100">Compete with others and claim your position at the top!</p>
        </div>
      </div>

      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;
