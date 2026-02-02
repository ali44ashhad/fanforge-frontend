// import React from 'react';
// import PropTypes from 'prop-types';

// const Button = ({ 
//   children, 
//   variant = 'primary', 
//   size = 'medium', 
//   isLoading = false,
//   disabled = false,
//   fullWidth = false,
//   onClick,
//   type = 'button',
//   className = '',
//   ...props 
// }) => {
//   const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
//   const variants = {
//     primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
//     secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary',
//     outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
//     ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-800',
//     danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
//   };
  
//   const sizes = {
//     small: 'px-3 py-1.5 text-sm',
//     medium: 'px-4 py-2.5 text-base',
//     large: 'px-6 py-3 text-lg',
//   };
  
//   const widthClass = fullWidth ? 'w-full' : '';
  
//   return (
//     <button
//       type={type}
//       className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
//       onClick={onClick}
//       disabled={disabled || isLoading}
//       {...props}
//     >
//       {isLoading ? (
//         <div className="flex items-center justify-center">
//           <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//           </svg>
//           Loading...
//         </div>
//       ) : children}
//     </button>
//   );
// };

// Button.propTypes = {
//   children: PropTypes.node.isRequired,
//   variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
//   isLoading: PropTypes.bool,
//   disabled: PropTypes.bool,
//   fullWidth: PropTypes.bool,
//   onClick: PropTypes.func,
//   type: PropTypes.string,
//   className: PropTypes.string,
// };

// export default Button;

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  isLoading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#007AFF] text-white hover:bg-[#0056CC] focus:ring-[#007AFF]',
    secondary: 'bg-[#6E6E73] text-white hover:bg-[#4A4A4F] focus:ring-[#6E6E73]',
    outline: 'border-2 border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF] hover:text-white focus:ring-[#007AFF]',
    ghost: 'text-[#6E6E73] hover:bg-[#F5F5F7] focus:ring-[#E5E5E7]',
    danger: 'bg-[#FF3B30] text-white hover:bg-[#D70015] focus:ring-[#FF3B30]',
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2.5 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg> 
        </div>
      ) : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;