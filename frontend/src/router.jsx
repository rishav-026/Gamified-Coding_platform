import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './AppLayout';

// Import Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Quests from './pages/Quests';
import QuestDetail from './pages/QuestDetail';
import Leaderboard from './pages/Leaderboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AIChat from './pages/AIChat';
import GitHubIntegration from "./pages/GitHubIntegration"; // ✅ Added this
import GitHubTutorials from './pages/GitHubTutorials';


export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/ai-chat',
        element: (
          <ProtectedRoute>
            <AIChat />
          </ProtectedRoute>
        ),
      },
      {
        path: '/tutorials',
        element: (
          <ProtectedRoute>
            <GitHubTutorials />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/quests',
        element: (
          <ProtectedRoute>
            <Quests />
          </ProtectedRoute>
        ),
      },
      {
        path: '/quests/:questId',
        element: (
          <ProtectedRoute>
            <QuestDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: '/leaderboard',
        element: (
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/analytics',
        element: (
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      // ✅ NEW GITHUB INTEGRATION PAGE
      {
        path: '/github',
        element: (
          <ProtectedRoute>
            <GitHubIntegration />
          </ProtectedRoute>
        ),
      },

      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
