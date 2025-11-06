import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import ProgressChart from '../components/analytics/ProgressChart';
import XPChart from '../components/analytics/XPChart';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import Card from '../components/common/Card';
import { FaChartLine } from 'react-icons/fa';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await userService.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
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
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-8 rounded-lg flex items-center gap-4">
        <FaChartLine className="text-5xl" />
        <div>
          <h1 className="text-4xl font-bold">Your Analytics</h1>
          <p className="text-primary-100">Track your learning progress and growth</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ProgressChart data={analytics?.progress || []} />
        <XPChart data={analytics?.xp_growth || []} />
      </div>

      <ActivityHeatmap data={analytics?.activity || {}} />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-3xl font-bold text-primary-600">{analytics?.total_quests || 0}</p>
          <p className="text-gray-600 mt-2">Quests Completed</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-success">{analytics?.total_tasks || 0}</p>
          <p className="text-gray-600 mt-2">Tasks Completed</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-warning">{analytics?.avg_time || '0m'}</p>
          <p className="text-gray-600 mt-2">Avg. Time/Quest</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-danger">{analytics?.streak_days || 0}</p>
          <p className="text-gray-600 mt-2">Days Streak</p>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
