import { XP_LEVELS } from './constants';

// Calculate percentage
export const calculatePercentage = (current, max) => {
  if (max === 0) return 0;
  return Math.min((current / max) * 100, 100);
};

// Format date
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

// Format XP with commas
export const formatXP = (xp) => {
  return xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format large numbers (e.g., 1000 -> 1K)
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Get level from XP
export const getLevelFromXP = (xp) => {
  let level = 1;
  for (const levelData of XP_LEVELS) {
    if (xp >= levelData.xpRequired) {
      level = levelData.level;
    } else {
      break;
    }
  }
  return level;
};

// Get next level XP requirement
export const getNextLevelXP = (currentLevel) => {
  const nextLevel = XP_LEVELS.find(l => l.level === currentLevel + 1);
  return nextLevel ? nextLevel.xpRequired : null;
};

// Get current level XP requirement
export const getCurrentLevelXP = (currentLevel) => {
  const level = XP_LEVELS.find(l => l.level === currentLevel);
  return level ? level.xpRequired : 0;
};

// Calculate XP progress for current level
export const calculateLevelProgress = (currentXP, currentLevel) => {
  const currentLevelXP = getCurrentLevelXP(currentLevel);
  const nextLevelXP = getNextLevelXP(currentLevel);
  
  if (!nextLevelXP) {
    return { current: 0, max: 0, percentage: 100 };
  }
  
  const xpForCurrentLevel = currentXP - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;
  
  return {
    current: xpForCurrentLevel,
    max: xpNeededForNextLevel,
    percentage: calculatePercentage(xpForCurrentLevel, xpNeededForNextLevel),
  };
};

// Get level title
export const getLevelTitle = (level) => {
  const levelData = XP_LEVELS.find(l => l.level === level);
  return levelData ? levelData.title : 'Unknown';
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random color
export const getRandomColor = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

// Sort array by property
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
};

// Calculate streak from dates
export const calculateStreak = (activityDates) => {
  if (!activityDates || activityDates.length === 0) return 0;
  
  const sortedDates = activityDates
    .map(date => new Date(date).toDateString())
    .sort((a, b) => new Date(b) - new Date(a));
  
  let streak = 1;
  const today = new Date().toDateString();
  
  if (sortedDates[0] !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (sortedDates[0] !== yesterday.toDateString()) {
      return 0;
    }
  }
  
  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    const previousDate = new Date(sortedDates[i - 1]);
    const diffInDays = Math.floor((previousDate - currentDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

// Generate avatar fallback initials
export const getInitials = (name) => {
  if (!name) return '??';
  const names = name.split(' ');
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};
