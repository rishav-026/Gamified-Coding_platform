import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  border = false,
  shadow = 'md',
}) => {
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: 'shadow-none',
  };

  const borderClass = border ? 'border border-gray-200' : '';
  const hoverClass = hover ? 'hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-200' : '';

  return (
    <div 
      className={`card bg-white rounded-lg p-6 ${shadowClasses[shadow]} ${borderClass} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
