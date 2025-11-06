import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { FaCheckCircle } from 'react-icons/fa';
import Card from '../common/Card';

const TaskCheckList = ({ tasks, completedTaskIds = [], onCompleteTask }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const completedCount = tasks.filter(t => completedTaskIds.includes(t.id)).length;
  const completionPercentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <Card>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">Tasks</h3>
          <span className="text-sm font-semibold text-primary-600">
            {completedCount}/{tasks.length} Completed
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            isCompleted={completedTaskIds.includes(task.id)}
            onComplete={() => onCompleteTask(task.id)}
            isExpanded={expandedTaskId === task.id}
            onToggleExpand={() => setExpandedTaskId(
              expandedTaskId === task.id ? null : task.id
            )}
          />
        ))}
      </div>

      {completedCount === tasks.length && (
        <div className="mt-6 p-4 bg-green-50 border border-success rounded-lg flex items-center gap-3">
          <FaCheckCircle className="text-success text-xl flex-shrink-0" />
          <div>
            <p className="font-bold text-gray-900">Quest Completed! 🎉</p>
            <p className="text-sm text-gray-600">Great job! Check your rewards.</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TaskCheckList;
