import api from './api';

export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch profile');
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/me', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update profile');
    }
  },

  getLeaderboard: async (type = 'all_time', limit = 50) => {
    try {
      const response = await api.get(`/leaderboard?type=${type}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch leaderboard');
    }
  },

  getAnalytics: async () => {
    try {
      const response = await api.get('/analytics/me');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch analytics');
    }
  },

  getUserBadges: async () => {
    try {
      const response = await api.get('/users/me/badges');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch badges');
    }
  },

  getUserAchievements: async () => {
    try {
      const response = await api.get('/users/me/achievements');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch achievements');
    }
  },
};
