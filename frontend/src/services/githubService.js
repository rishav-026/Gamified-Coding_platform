import api from './api';

export const githubService = {
  getRepositories: async (username) => {
    try {
      const response = await api.get(`/github/repos/${username}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch repositories');
    }
  },

  getPullRequests: async (owner, repo) => {
    try {
      const response = await api.get(`/github/pulls/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch pull requests');
    }
  },

  getIssues: async (owner, repo) => {
    try {
      const response = await api.get(`/github/issues/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch issues');
    }
  },

  forkRepository: async (owner, repo) => {
    try {
      const response = await api.post(`/github/fork/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fork repository');
    }
  },

  createPullRequest: async (owner, repo, data) => {
    try {
      const response = await api.post(`/github/pr/${owner}/${repo}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create pull request');
    }
  },

  getUserContributions: async () => {
    try {
      const response = await api.get('/github/contributions');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch contributions');
    }
  },
};
