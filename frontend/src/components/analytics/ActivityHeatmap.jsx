import React from 'react';
import Card from '../common/Card';

const ActivityHeatmap = ({ data = {} }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeks = 52;

  const getColor = (count) => {
    if (count === 0) return 'bg-gray-100';
    if (count < 2) return 'bg-green-100';
    if (count < 5) return 'bg-green-300';
    if (count < 10) return 'bg-green-500';
    return 'bg-green-700';
  };

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4">Activity Heatmap</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {/* Days header */}
          <div className="flex flex-col gap-1 mr-2">
            <div className="h-6"></div>
            {days.map((day) => (
              <div key={day} className="text-xs font-semibold text-gray-600 h-6 flex items-center">
                {day}
              </div>
            ))}
          </div>

          {/* Weeks */}
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const date = new Date();
                date.setDate(date.getDate() - ((weeks - weekIndex - 1) * 7 + (6 - dayIndex)));
                const dateStr = date.toISOString().split('T')[0];
                const count = data[dateStr] || 0;

                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${getColor(count)} cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all`}
                    title={`${dateStr}: ${count} activities`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 justify-end text-xs">
        <span className="text-gray-600">Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-100 rounded-sm" />
          <div className="w-3 h-3 bg-green-100 rounded-sm" />
          <div className="w-3 h-3 bg-green-300 rounded-sm" />
          <div className="w-3 h-3 bg-green-500 rounded-sm" />
          <div className="w-3 h-3 bg-green-700 rounded-sm" />
        </div>
        <span className="text-gray-600">More</span>
      </div>
    </Card>
  );
};

export default ActivityHeatmap;
