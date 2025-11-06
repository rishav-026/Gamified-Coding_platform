// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
export const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
export const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

// XP Levels Configuration
export const XP_LEVELS = [
  { level: 1, xpRequired: 0, title: 'Newbie' },
  { level: 2, xpRequired: 100, title: 'Beginner' },
  { level: 3, xpRequired: 250, title: 'Apprentice' },
  { level: 4, xpRequired: 500, title: 'Intermediate' },
  { level: 5, xpRequired: 1000, title: 'Advanced' },
  { level: 6, xpRequired: 2000, title: 'Expert' },
  { level: 7, xpRequired: 3500, title: 'Master' },
  { level: 8, xpRequired: 5500, title: 'Grandmaster' },
  { level: 9, xpRequired: 8000, title: 'Legend' },
  { level: 10, xpRequired: 12000, title: 'Mythical' },
];

// Badge Types
export const BADGE_TYPES = {
  FIRST_QUEST: {
    id: 'first_quest',
    name: 'First Steps',
    description: 'Complete your first quest',
    icon: '🎯',
    color: 'blue',
  },
  FIRST_PR: {
    id: 'first_pr',
    name: 'Open Source Hero',
    description: 'Submit your first pull request',
    icon: '🚀',
    color: 'green',
  },
  STREAK_3: {
    id: 'streak_3',
    name: '3-Day Warrior',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    color: 'orange',
  },
  STREAK_7: {
    id: 'streak_7',
    name: 'Week Champion',
    description: 'Maintain a 7-day streak',
    icon: '⚡',
    color: 'yellow',
  },
  STREAK_30: {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '💎',
    color: 'purple',
  },
  CODE_REVIEWER: {
    id: 'code_reviewer',
    name: 'Code Critic',
    description: 'Review 10 code submissions',
    icon: '👁️',
    color: 'indigo',
  },
  HELPER: {
    id: 'helper',
    name: 'Community Helper',
    description: 'Help 5 other learners',
    icon: '🤝',
    color: 'pink',
  },
  LEVEL_5: {
    id: 'level_5',
    name: 'Level 5 Achiever',
    description: 'Reach Level 5',
    icon: '⭐',
    color: 'yellow',
  },
  LEVEL_10: {
    id: 'level_10',
    name: 'Max Level Master',
    description: 'Reach Level 10',
    icon: '👑',
    color: 'gold',
  },
  QUEST_MASTER: {
    id: 'quest_master',
    name: 'Quest Master',
    description: 'Complete all available quests',
    icon: '🏆',
    color: 'gold',
  },
};

// Quest Status
export const QUEST_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  LOCKED: 'locked',
};

// Task Types
export const TASK_TYPES = {
  GITHUB_ACTION: 'github_action',
  CODE_SUBMISSION: 'code_submission',
  QUIZ: 'quiz',
  READING: 'reading',
};

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: {
    value: 'beginner',
    label: 'Beginner',
    color: 'green',
    xpMultiplier: 1,
  },
  INTERMEDIATE: {
    value: 'intermediate',
    label: 'Intermediate',
    color: 'yellow',
    xpMultiplier: 1.5,
  },
  ADVANCED: {
    value: 'advanced',
    label: 'Advanced',
    color: 'red',
    xpMultiplier: 2,
  },
};

// Code Editor Languages
export const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', icon: '📜' },
  { value: 'typescript', label: 'TypeScript', icon: '📘' },
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'cpp', label: 'C++', icon: '⚙️' },
  { value: 'go', label: 'Go', icon: '🔵' },
  { value: 'rust', label: 'Rust', icon: '🦀' },
  { value: 'html', label: 'HTML', icon: '🌐' },
  { value: 'css', label: 'CSS', icon: '🎨' },
];

// Achievement Categories
export const ACHIEVEMENT_CATEGORIES = {
  QUEST: 'quest',
  STREAK: 'streak',
  LEVEL: 'level',
  CONTRIBUTION: 'contribution',
  SOCIAL: 'social',
  SPECIAL: 'special',
};

// Leaderboard Types
export const LEADERBOARD_TYPES = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  ALL_TIME: 'all_time',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};
