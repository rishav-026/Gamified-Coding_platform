import React, { useState } from 'react';
import { FaCheckCircle, FaCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';

const TaskItem = ({ 
  task, 
  isCompleted, 
  onComplete,
  isExpanded = false,
  onToggleExpand,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await onComplete();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`border-l-4 ${
      isCompleted ? 'border-success bg-green-50' : 'border-primary-500 bg-white'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div 
          className="flex-1 cursor-pointer"
          onClick={() => onToggleExpand && onToggleExpand()}
        >
          <div className="flex items-start gap-3 mb-2">
            {isCompleted ? (
              <FaCheckCircle className="text-success text-xl flex-shrink-0 mt-0.5" />
            ) : (
              <FaCircle className="text-gray-300 text-xl flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className={`font-semibold ${
                isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              
              {task.hints && task.hints.length > 0 && (
                <div className="mt-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleExpand?.();
                    }}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                    {isExpanded ? 'Hide hints' : 'Show hints'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {isExpanded && task.hints && (
            <div className="ml-8 mt-3 space-y-2 bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-xs font-semibold text-blue-900">💡 Hints:</p>
              {task.hints.map((hint, idx) => (
                <p key={idx} className="text-sm text-blue-800">
                  {idx + 1}. {hint}
                </p>
              ))}
            </div>
          )}
        </div>

        {!isCompleted && (
          <Button 
            onClick={handleComplete}
            loading={isLoading}
            variant="primary"
            size="sm"
            className="flex-shrink-0"
          >
            Complete
          </Button>
        )}
      </div>
    </Card>
  );
};

export default TaskItem;
