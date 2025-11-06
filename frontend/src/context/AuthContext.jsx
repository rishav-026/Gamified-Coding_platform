import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check for test user in localStorage
      const testUser = localStorage.getItem('test_user');
      const token = localStorage.getItem('access_token');
      
      if (testUser) {
        const userData = JSON.parse(testUser);
        setUser(userData);
        setIsAuthenticated(true);
      } else if (token) {
        // If token exists, simulate user
        setUser({
          id: '1',
          username: 'test_user',
          email: 'test@example.com',
          avatar_url: null,
          level: 3,
          total_xp: 1250,
          current_streak: 5,
          longest_streak: 12,
          badges: [],
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = () => {
    // Create mock user for testing
    const mockUser = {
      id: '1',
      username: 'demo_user',
      email: 'demo@example.com',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo_user',
      level: 3,
      total_xp: 1250,
      current_streak: 5,
      longest_streak: 12,
      badges: [
        { id: 1, name: 'First Quest' },
        { id: 2, name: 'Week Warrior' },
      ],
    };

    localStorage.setItem('test_user', JSON.stringify(mockUser));
    localStorage.setItem('access_token', 'test_token_12345');
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const login = async (code) => {
    try {
      // For now, just use test login
      testLogin();
      return { user: user, access_token: 'test_token' };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('test_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
    localStorage.setItem('test_user', JSON.stringify({ ...user, ...userData }));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    refreshUser: checkAuth,
    testLogin, // Expose test login for testing
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
