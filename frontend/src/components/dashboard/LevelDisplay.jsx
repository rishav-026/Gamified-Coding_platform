import React from 'react';
import ProgressBar from '../common/ProgressBar';
import { XP_LEVELS } from '../../utils/constants';
import { calculateLevelProgress, getLevelTitle } from '../../utils/helpers';
import Card from '../common/Card';

const LevelDisplay = ({ currentXP, level }) => {
  const progress = calculateLevelProgress(currentXP, level);
  const levelTitle = getLevelTitle(level);
  const nextLevelXP = XP_LEVELS.find(l => l.level === level + 1)?.xpRequired;

  const xpToNextLevel = nextLevelXP ? nextLevelXP - currentXP : 0;

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">Level {level}</h3>
          <p className="text-sm text-gray-500 font-medium">{levelTitle}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">
            {currentXP.toLocaleString()} XP
          </p>
          {nextLevelXP && (
            <p className="text-xs text-gray-500">
              {xpToNextLevel.toLocaleString()} to Level {level + 1}
            </p>
          )}
        </div>
      </div>

      <ProgressBar 
        current={progress.current} 
        max={progress.max} 
        label="Progress to Next Level"
        color="primary"
      />

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-600">Current Level</p>
          <p className="font-bold">{XP_LEVELS.find(l => l.level === level)?.xpRequired.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-600">Current XP</p>
          <p className="font-bold">{currentXP.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-600">Next Level</p>
          <p className="font-bold">{nextLevelXP?.toLocaleString() || 'Max'}</p>
        </div>
      </div>
    </Card>
  );
};

export default LevelDisplay;
