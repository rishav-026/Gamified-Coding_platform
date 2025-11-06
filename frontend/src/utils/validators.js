// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Validate username
export const validateUsername = (username) => {
  if (!username) return { valid: false, error: 'Username is required' };
  if (username.length < 3) return { valid: false, error: 'Username must be at least 3 characters' };
  if (username.length > 30) return { valid: false, error: 'Username must be less than 30 characters' };
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { valid: false, error: 'Username can only contain letters, numbers, hyphens, and underscores' };
  }
  return { valid: true, error: null };
};

// Validate password
export const validatePassword = (password) => {
  if (!password) return { valid: false, error: 'Password is required' };
  if (password.length < 8) return { valid: false, error: 'Password must be at least 8 characters' };
  if (!/[A-Z]/.test(password)) return { valid: false, error: 'Password must contain at least one uppercase letter' };
  if (!/[a-z]/.test(password)) return { valid: false, error: 'Password must contain at least one lowercase letter' };
  if (!/[0-9]/.test(password)) return { valid: false, error: 'Password must contain at least one number' };
  return { valid: true, error: null };
};

// Validate code submission
export const validateCodeSubmission = (code, language) => {
  if (!code) return { valid: false, error: 'Code cannot be empty' };
  if (code.trim().length === 0) return { valid: false, error: 'Code cannot be empty' };
  if (!language) return { valid: false, error: 'Programming language must be specified' };
  
  // Basic validation for common syntax errors
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    return { valid: false, error: 'Mismatched braces' };
  }
  
  return { valid: true, error: null };
};

// Validate URL
export const validateURL = (url) => {
  try {
    new URL(url);
    return { valid: true, error: null };
  } catch (_) {
    return { valid: false, error: 'Invalid URL format' };
  }
};

// Validate GitHub username
export const validateGitHubUsername = (username) => {
  if (!username) return { valid: false, error: 'GitHub username is required' };
  if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username)) {
    return { valid: false, error: 'Invalid GitHub username format' };
  }
  return { valid: true, error: null };
};

// Validate quest title
export const validateQuestTitle = (title) => {
  if (!title) return { valid: false, error: 'Quest title is required' };
  if (title.length < 5) return { valid: false, error: 'Quest title must be at least 5 characters' };
  if (title.length > 100) return { valid: false, error: 'Quest title must be less than 100 characters' };
  return { valid: true, error: null };
};

// Validate quest description
export const validateQuestDescription = (description) => {
  if (!description) return { valid: false, error: 'Quest description is required' };
  if (description.length < 20) return { valid: false, error: 'Quest description must be at least 20 characters' };
  if (description.length > 500) return { valid: false, error: 'Quest description must be less than 500 characters' };
  return { valid: true, error: null };
};

// Sanitize input (prevent XSS)
export const sanitizeInput = (input) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return input.replace(reg, (match) => map[match]);
};

// Validate file upload
export const validateFileUpload = (file, maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/gif']) => {
  if (!file) return { valid: false, error: 'No file selected' };
  
  if (file.size > maxSize) {
    return { valid: false, error: `File size must be less than ${maxSize / (1024 * 1024)}MB` };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `File type must be one of: ${allowedTypes.join(', ')}` };
  }
  
  return { valid: true, error: null };
};
