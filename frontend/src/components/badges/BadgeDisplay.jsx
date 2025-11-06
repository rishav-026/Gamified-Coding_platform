import React from 'react';

const BadgeDisplay = ({ badge, size = 'md', showLabel = true, animateOnHover = true }) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-20 h-20 text-lg',
    xl: 'w-24 h-24 text-2xl',
  };

  const sizeTextClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  return (
    <div className="text-center">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-md ${
          animateOnHover ? 'hover:scale-110 hover:shadow-lg transition-transform duration-200' : ''
        } mx-auto mb-2 cursor-pointer group relative`}
      >
        <span className="text-2xl">{badge.icon}</span>

        {/* Tooltip on hover */}
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 text-xs pointer-events-none">
          {badge.name}
        </div>
      </div>

      {showLabel && (
        <div>
          <p className={`font-bold text-gray-900 ${sizeTextClasses[size]}`}>{badge.name}</p>
          <p className={`text-gray-600 ${sizeTextClasses[size]} line-clamp-2`}>{badge.description}</p>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;
