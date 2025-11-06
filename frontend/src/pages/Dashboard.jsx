import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useQuests } from '../hooks/useQuests';
import UserStats from '../components/dashboard/UserStats';
import LevelDisplay from '../components/dashboard/LevelDisplay';
import StreakTracker from '../components/dashboard/StreakTracker';
import RecentAchievements from '../components/dashboard/RecentAchievements';
import QuestCard from '../components/quests/QuestCard';
import Card from '../components/common/Card';
import { userService } from '../services/userService';
import { FaCalendarAlt, FaTasks, FaFire } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const { quests, loading } = useQuests();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const data = await userService.getUserAchievements();
      setAchievements(data);
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.username}! 👋</h1>
        <p className="text-primary-100">Keep grinding and reach new levels!</p>
      </div>

      {/* User Stats */}
      <UserStats user={user} />

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Level & Streak */}
        <div className="lg:col-span-2 space-y-6">
          <LevelDisplay currentXP={user?.total_xp || 0} level={user?.level || 1} />
          
          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <div className="flex items-center gap-3">
                <FaTasks className="text-2xl text-primary-500" />
                <div>
                  <p className="text-sm text-gray-600">Tasks Today</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-2xl text-secondary-500" />
                <div>
                  <p className="text-sm text-gray-600">Quests This Week</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-3">
                <FaFire className="text-2xl text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Best Streak</p>
                  <p className="text-2xl font-bold">{user?.longest_streak || 0}d</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Active Quests */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Active Quests</h2>
            {quests.length === 0 ? (
              <Card className="text-center py-12 text-gray-500">
                <p>No quests available. Check back soon!</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {quests.slice(0, 3).map(quest => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    userProgress={user?.quest_progress?.[quest.id]}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Streak & Achievements */}
        <div className="space-y-6">
          <StreakTracker
            streak={user?.current_streak || 0}
            longestStreak={user?.longest_streak || 0}
            lastActivityDate={user?.last_activity}
          />
          <RecentAchievements achievements={achievements} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
