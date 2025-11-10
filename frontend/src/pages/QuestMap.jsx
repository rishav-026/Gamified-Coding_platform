import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './QuestMap.css';

export default function QuestMap() {
  const [quests, setQuests] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchQuests();
    fetchUserProgress();
  }, []);

  const fetchQuests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/quests-system/all');
      if (response.data.success) {
        setQuests(response.data.quests);
      }
    } catch (error) {
      console.error('Error fetching quests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const response = await api.get('/quests-system/user/demo_user/all-progress');
      if (response.data.success) {
        const progressMap = {};
        response.data.quests.forEach(q => {
          progressMap[q.quest_id] = q;
        });
        setUserProgress(progressMap);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const startQuest = async (questId) => {
    try {
      const response = await api.post('/quests-system/start', {
        quest_id: questId,
        user_id: 'demo_user'
      });

      if (response.data.success) {
        fetchUserProgress();
        alert('Quest started! Good luck!');
      }
    } catch (error) {
      console.error('Error starting quest:', error);
      alert('Error starting quest');
    }
  };

  const getQuestStatus = (questId) => {
    const progress = userProgress[questId];
    if (!progress) return 'not_started';
    return progress.status;
  };

  const getProgressPercentage = (questId) => {
    const progress = userProgress[questId];
    if (!progress) return 0;
    return (progress.tasks_completed / progress.total_tasks) * 100;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return '#2ecc71';
      case 'intermediate':
        return '#f39c12';
      case 'advanced':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  if (loading) {
    return <div className="loading">Loading quests...</div>;
  }

  return (
    <div className="quest-map-container">
      {/* Header */}
      <div className="quest-map-header">
        <h1>🗺️ Your Quest Journey</h1>
        <p>Complete quests to master GitHub and open source contribution</p>
      </div>

      {/* Quest Timeline */}
      <div className="quest-timeline">
        <div className="timeline-line"></div>

        {quests.map((quest, index) => {
          const status = getQuestStatus(quest.id);
          const progress = userProgress[quest.id];

          return (
            <div key={quest.id} className="timeline-item">
              {/* Node */}
              <div className={`timeline-node ${status}`}>
                <div className="node-content">
                  {status === 'completed' && <span>✓</span>}
                  {status === 'in_progress' && <span>⟳</span>}
                  {status === 'not_started' && <span>{index + 1}</span>}
                </div>
              </div>

              {/* Quest Card */}
              <div className="quest-card" onClick={() => {
                setSelectedQuest(quest);
                setShowDetails(true);
              }}>
                <div className="card-header">
                  <h3>{quest.title}</h3>
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(quest.difficulty) }}
                  >
                    {quest.difficulty}
                  </span>
                </div>

                <p className="card-description">{quest.description}</p>

                {/* Stats */}
                <div className="card-stats">
                  <div className="stat">
                    <span className="stat-label">Tasks</span>
                    <span className="stat-value">
                      {progress ? `${progress.tasks_completed}/${progress.total_tasks}` : `0/${quest.tasks.length}`}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">XP</span>
                    <span className="stat-value" style={{ color: '#f39c12' }}>
                      {progress ? progress.xp_earned : 0}/{quest.total_xp}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Time</span>
                    <span className="stat-value">{quest.estimated_time}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${getProgressPercentage(quest.id)}%` }}
                  ></div>
                </div>
                <p className="progress-text">{getProgressPercentage(quest.id).toFixed(0)}% Complete</p>

                {/* Action Button */}
                {status === 'not_started' && (
                  <button 
                    className="btn-start-quest"
                    onClick={(e) => {
                      e.stopPropagation();
                      startQuest(quest.id);
                    }}
                  >
                    🚀 Start Quest
                  </button>
                )}
                {status === 'in_progress' && (
                  <button 
                    className="btn-continue-quest"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuest(quest);
                      setShowDetails(true);
                    }}
                  >
                    ▶️ Continue Quest
                  </button>
                )}
                {status === 'completed' && (
                  <button className="btn-completed">
                    ✓ Completed
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quest Detail Modal */}
      {showDetails && selectedQuest && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDetails(false)}>×</button>

            <h2>{selectedQuest.title}</h2>
            <p>{selectedQuest.description}</p>

            <div className="quest-details">
              <h3>📚 Learning Outcomes</h3>
              <ul>
                {selectedQuest.learning_outcomes.map((outcome, idx) => (
                  <li key={idx}>{outcome}</li>
                ))}
              </ul>

              <h3>✓ Tasks</h3>
              <div className="tasks-list">
                {selectedQuest.tasks.map((task, idx) => {
                  const progress = userProgress[selectedQuest.id];
                  const taskProgress = progress?.task_progress?.[task.id];
                  const taskStatus = taskProgress?.status || 'pending';

                  return (
                    <div key={task.id} className={`task-item ${taskStatus}`}>
                      <span className="task-status">
                        {taskStatus === 'completed' ? '✓' : idx + 1}
                      </span>
                      <div className="task-info">
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                      </div>
                      <span className="task-xp">{task.xp_reward}XP</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
