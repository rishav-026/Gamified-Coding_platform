import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { FaStar, FaCheckCircle, FaLock } from 'react-icons/fa';

const QuestCard = ({ quest, userProgress, isLocked = false }) => {
  const navigate = useNavigate();
  
  const completedTasks = userProgress?.completed_tasks?.length || 0;
  const totalTasks = quest.tasks?.length || 0;
  const isCompleted = completedTasks === totalTasks && totalTasks > 0;
  const isStarted = !!userProgress;

  const difficultyColors = {
    beginner: 'text-green-600 bg-green-50',
    intermediate: 'text-yellow-600 bg-yellow-50',
    advanced: 'text-red-600 bg-red-50',
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{quest.title}</h3>
            <p className={`text-xs font-semibold px-2 py-1 rounded w-fit ${
              difficultyColors[quest.difficulty] || 'text-gray-600 bg-gray-50'
            }`}>
              {quest.difficulty?.charAt(0).toUpperCase() + quest.difficulty?.slice(1)}
            </p>
          </div>
          {isCompleted && (
            <FaCheckCircle className="text-success text-2xl flex-shrink-0" />
          )}
          {isLocked && (
            <FaLock className="text-gray-400 text-xl flex-shrink-0" />
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quest.description}</p>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center space-x-1">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold text-gray-900">{quest.xp_reward}</span>
            <span className="text-xs text-gray-500">XP</span>
          </div>
          {totalTasks > 0 && (
            <div className="text-xs text-gray-500">
              {completedTasks}/{totalTasks} tasks
            </div>
          )}
        </div>
        
        {totalTasks > 0 && (
          <ProgressBar 
            current={completedTasks} 
            max={totalTasks} 
            label={null}
            showPercentage={false}
            color={isCompleted ? 'success' : 'primary'}
          />
        )}
      </div>
      
      <Button 
        onClick={() => navigate(`/quests/${quest.id}`)}
        variant={isCompleted ? 'success' : isLocked ? 'outline' : 'primary'}
        disabled={isLocked}
        className="w-full mt-4"
      >
        {isCompleted ? '✓ Review Quest' : isStarted ? 'Continue Quest' : 'Start Quest'}
      </Button>
    </Card>
  );
};

export default QuestCard;
