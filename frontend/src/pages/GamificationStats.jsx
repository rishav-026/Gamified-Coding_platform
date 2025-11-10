import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './GamificationStats.css';

export default function GamificationStats() {
  const [stats, setStats] = useState(null);
  const [levelInfo, setLevelInfo] = useState(null);
  const [badges, setBadges] = useState([]);
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    try {
      setLoading(true);
      const [statsRes, levelRes, badgesRes, streakRes] = await Promise.all([
        api.get('/quests-system/user/demo_user/stats'),
        api.get('/quests-system/user/demo_user/level-info'),
        api.get('/quests-system/user/demo_user/badges'),
        api.get('/quests-system/user/demo_user/streak')
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
      if (levelRes.data.success) {
        setLevelInfo(levelRes.data.level_info);
      }
      if (badgesRes.data.success) {
        setBadges(badgesRes.data.badges);
      }
      if (streakRes.data.success) {
        setStreak(streakRes.data.streak);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading stats...</div>;
  }

  if (!stats) {
    return <div className="error">Failed to load stats</div>;
  }

  return (
    <div className="gamification-stats-container">
      {/* Header */}
      <div className="stats-header">
        <h1>🎮 Gamification Stats</h1>
        <p>Track your progress and achievements</p>
      </div>

      {/* Tabs */}
      <div className="stats-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          🏆 Badges ({badges.length})
        </button>
        <button 
          className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          🔥 Streaks & Achievements
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="stats-content">
          {/* Main Stats Grid */}
          <div className="stats-grid">
            {/* Level Card */}
            <div className="stat-card large">
              <h3>Current Level</h3>
              <div className="level-display">
                <div className="level-number">{stats.level}</div>
                <div className="level-badge">⭐</div>
              </div>
              <p>Next Level in {levelInfo?.xp_needed} XP</p>
            </div>

            {/* XP Card */}
            <div className="stat-card large">
              <h3>Experience Points</h3>
              <div className="xp-display">
                <p className="xp-number">{stats.total_xp}</p>
                <p className="xp-label">Total XP</p>
              </div>
            </div>

            {/* Quests Card */}
            <div className="stat-card">
              <h3>Quests Completed</h3>
              <p className="big-number">{stats.quests_completed}</p>
            </div>

            {/* Badges Card */}
            <div className="stat-card">
              <h3>Badges Earned</h3>
              <p className="big-number">{stats.badges_count}</p>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="level-progress-card">
            <h3>Progress to Next Level</h3>
            <div className="progress-info">
              <span>Level {stats.level}</span>
              <span>{levelInfo?.progress_percentage.toFixed(0)}%</span>
              <span>Level {stats.level + 1}</span>
            </div>
            <div className="progress-bar-large">
              <div 
                className="progress-fill"
                style={{ width: `${levelInfo?.progress_percentage}%` }}
              ></div>
            </div>
            <p className="progress-detail">
              {levelInfo?.xp_in_level} / {levelInfo?.xp_needed} XP
            </p>
          </div>

          {/* Stats Table */}
          <div className="stats-table-card">
            <h3>Detailed Statistics</h3>
            <table className="stats-table">
              <tbody>
                <tr>
                  <td>Total XP Earned</td>
                  <td className="value">{stats.total_xp}</td>
                </tr>
                <tr>
                  <td>Current Level</td>
                  <td className="value">{stats.level}</td>
                </tr>
                <tr>
                  <td>Quests Completed</td>
                  <td className="value">{stats.quests_completed}</td>
                </tr>
                <tr>
                  <td>Badges Earned</td>
                  <td className="value">{stats.badges_count}</td>
                </tr>
                <tr>
                  <td>Current Streak</td>
                  <td className="value">{stats.current_streak} days</td>
                </tr>
                <tr>
                  <td>Longest Streak</td>
                  <td className="value">{stats.longest_streak} days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BADGES TAB */}
      {activeTab === 'badges' && (
        <div className="stats-content">
          <h3>Your Badges</h3>
          {badges.length === 0 ? (
            <p className="no-data">No badges earned yet. Start completing quests!</p>
          ) : (
            <div className="badges-grid">
              {badges.map((badge, idx) => (
                <div key={idx} className={`badge-item ${badge.category}`}>
                  <div className="badge-icon">{badge.icon}</div>
                  <h4>{badge.name}</h4>
                  <p>{badge.description}</p>
                  <p className="badge-date">
                    Earned: {new Date(badge.earned_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* All Available Badges */}
          <div className="all-badges-section">
            <h3>🔒 Badges to Unlock</h3>
            <p>Complete these achievements to earn badges!</p>
            <div className="locked-badges-grid">
              <div className="badge-item locked">
                <div className="badge-icon">🎯</div>
                <h4>First Quest</h4>
                <p>Complete your first quest</p>
              </div>
              <div className="badge-item locked">
                <div className="badge-icon">🚀</div>
                <h4>Quest Enthusiast</h4>
                <p>Complete 3 quests</p>
              </div>
              <div className="badge-item locked">
                <div className="badge-icon">👑</div>
                <h4>Quest Master</h4>
                <p>Complete 10 quests</p>
              </div>
              <div className="badge-item locked">
                <div className="badge-icon">🌟</div>
                <h4>Open Source Contributor</h4>
                <p>Make your first OSS contribution</p>
              </div>
              <div className="badge-item locked">
                <div className="badge-icon">🔥</div>
                <h4>Week Warrior</h4>
                <p>Maintain a 7-day streak</p>
              </div>
              <div className="badge-item locked">
                <div className="badge-icon">💪</div>
                <h4>Month Master</h4>
                <p>Maintain a 30-day streak</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACHIEVEMENTS TAB */}
      {activeTab === 'achievements' && (
        <div className="stats-content">
          {/* Streak Card */}
          <div className="achievement-card">
            <h3>🔥 Your Streak</h3>
            <div className="streak-display">
              <div className="streak-main">
                <p className="streak-number">{streak?.current_streak || 0}</p>
                <p className="streak-label">Current Streak</p>
              </div>
              <div className="streak-secondary">
                <p>{streak?.longest_streak || 0}</p>
                <p>Longest Streak</p>
              </div>
            </div>
            <p className="streak-tip">💡 Maintain your streak by completing tasks daily!</p>
          </div>

          {/* Milestone Tracker */}
          <div className="achievement-card">
            <h3>🎯 Milestones</h3>
            <div className="milestones-list">
              <div className={`milestone ${stats.total_xp >= 100 ? 'completed' : ''}`}>
                <span className="milestone-icon">✓</span>
                <span className="milestone-text">Earn 100 XP</span>
                <span className="milestone-progress">{stats.total_xp}/100</span>
              </div>
              <div className={`milestone ${stats.total_xp >= 500 ? 'completed' : ''}`}>
                <span className="milestone-icon">✓</span>
                <span className="milestone-text">Earn 500 XP</span>
                <span className="milestone-progress">{stats.total_xp}/500</span>
              </div>
              <div className={`milestone ${stats.total_xp >= 1000 ? 'completed' : ''}`}>
                <span className="milestone-icon">✓</span>
                <span className="milestone-text">Earn 1000 XP</span>
                <span className="milestone-progress">{stats.total_xp}/1000</span>
              </div>
              <div className={`milestone ${stats.quests_completed >= 1 ? 'completed' : ''}`}>
                <span className="milestone-icon">✓</span>
                <span className="milestone-text">Complete 1 Quest</span>
                <span className="milestone-progress">{stats.quests_completed}/1</span>
              </div>
              <div className={`milestone ${stats.quests_completed >= 3 ? 'completed' : ''}`}>
                <span className="milestone-icon">✓</span>
                <span className="milestone-text">Complete 3 Quests</span>
                <span className="milestone-progress">{stats.quests_completed}/3</span>
              </div>
              <div className={`milestone ${stats.level >= 5 ? 'completed' : ''}`}>
                <span className="milestone-icon">✓</span>
                <span className="milestone-text">Reach Level 5</span>
                <span className="milestone-progress">{stats.level}/5</span>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="achievement-card">
            <h3>📈 Activity Summary</h3>
            <div className="activity-stats">
              <div className="activity-item">
                <span className="label">Total Tasks Completed</span>
                <span className="count">{stats.badges_count}</span>
              </div>
              <div className="activity-item">
                <span className="label">Average XP per Quest</span>
                <span className="count">
                  {stats.quests_completed > 0 
                    ? Math.round(stats.total_xp / stats.quests_completed)
                    : 0
                  }
                </span>
              </div>
              <div className="activity-item">
                <span className="label">Current Streak</span>
                <span className="count">{stats.current_streak} 🔥</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
