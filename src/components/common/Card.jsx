import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '',
  padding = 'medium',
  shadow = 'medium',
  border = false,
  hoverable = false,
  onClick,
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };
  
  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow',
    large: 'shadow-lg',
    hover: 'shadow hover:shadow-lg transition-shadow duration-300',
  };
  
  const borderClass = border ? 'border border-gray-200 dark:border-gray-700' : '';
  const hoverClass = hoverable ? 'hover:shadow-lg transition-all duration-300 cursor-pointer' : '';
  
  return (
    <div
      className={`
        rounded-xl
        bg-white dark:bg-gray-800
        ${paddingClasses[padding]}
        ${shadowClasses[shadow]}
        ${borderClass}
        ${hoverClass}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  shadow: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'hover']),
  border: PropTypes.bool,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;