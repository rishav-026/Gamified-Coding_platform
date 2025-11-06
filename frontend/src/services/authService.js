import api from './api';
import { GITHUB_CLIENT_ID, GITHUB_REDIRECT_URI } from '../utils/constants';

export const authService = {
  initiateGithubLogin: () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user:email,read:org`;
    window.location.href = githubAuthUrl;
  },

  loginWithGithub: async (code) => {
    try {
      const response = await api.post('/auth/github/callback', { code });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch user data');
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
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
};
