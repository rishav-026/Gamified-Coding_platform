import React from 'react';

const ProgressBar = ({ 
  current, 
  max, 
  label, 
  showPercentage = true,
  color = 'primary',
  animated = true,
  size = 'md',
}) => {
  const percentage = Math.min((current / max) * 100, 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success',
    danger: 'bg-danger',
    warning: 'bg-warning',
  };

  const animationClass = animated ? 'transition-all duration-500' : '';

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full ${animationClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {!showPercentage && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">{current}</span>
          <span className="text-xs text-gray-500">{max}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
