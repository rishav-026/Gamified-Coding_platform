import api from './api';

export const questService = {
  getAllQuests: async () => {
    try {
      const response = await api.get('/quests');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch quests');
    }
  },

  getQuestById: async (questId) => {
    try {
      const response = await api.get(`/quests/${questId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch quest details');
    }
  },

  startQuest: async (questId) => {
    try {
      const response = await api.post(`/quests/${questId}/start`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to start quest');
    }
  },

  completeTask: async (questId, taskId) => {
    try {
      const response = await api.post(`/quests/${questId}/tasks/${taskId}/complete`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to complete task');
    }
  },

  submitCode: async (taskId, code, language = 'javascript') => {
    try {
      const response = await api.post(`/tasks/${taskId}/submit`, { code, language });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to submit code');
    }
  },

  getUserQuestProgress: async () => {
    try {
      const response = await api.get('/quests/progress');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch quest progress');
    }
  },
};
