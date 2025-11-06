import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

export const useLeaderboard = (type = 'all_time') => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [type]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await userService.getLeaderboard(type);
      setLeaderboard(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    leaderboard,
    loading,
    error,
    refetch: fetchLeaderboard,
  };
};
