import { useState, useEffect } from 'react';
import { questService } from '../services/questService';

export const useQuests = () => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuests();
  }, []);

  const fetchQuests = async () => {
    try {
      setLoading(true);
      const data = await questService.getAllQuests();
      setQuests(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startQuest = async (questId) => {
    try {
      await questService.startQuest(questId);
      await fetchQuests();
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const completeTask = async (questId, taskId) => {
    try {
      await questService.completeTask(questId, taskId);
      await fetchQuests();
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return {
    quests,
    loading,
    error,
    refetch: fetchQuests,
    startQuest,
    completeTask,
  };
};
