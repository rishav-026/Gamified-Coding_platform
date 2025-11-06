import api from './api';

export const aiService = {
  sendMessage: async (message, context = null) => {
    try {
      const response = await api.post('/ai/chat', {
        message,
        context,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to send message to AI');
    }
  },

  reviewCode: async (code, language, taskContext = null) => {
    try {
      const response = await api.post('/ai/code-review', {
        code,
        language,
        context: taskContext,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to review code');
    }
  },

  getHint: async (taskId) => {
    try {
      const response = await api.get(`/ai/hint/${taskId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get hint');
    }
  },

  explainConcept: async (concept, detail = 'medium') => {
    try {
      const response = await api.post('/ai/explain', {
        concept,
        detail,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to explain concept');
    }
  },
};
