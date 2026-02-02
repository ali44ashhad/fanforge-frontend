// import React from 'react';
// import PropTypes from 'prop-types';

// const Loader = ({ size = 'medium', color = 'primary', fullScreen = false, text = 'Loading...' }) => {
//   const sizeClasses = {
//     small: 'w-6 h-6',
//     medium: 'w-10 h-10',
//     large: 'w-16 h-16',
//   };
  
//   const colorClasses = {
//     primary: 'text-primary',
//     white: 'text-white',
//     gray: 'text-gray-600',
//   };
  
//   const spinner = (
//     <div className="flex flex-col items-center justify-center">
//       <svg
//         className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
//         fill="none"
//         viewBox="0 0 24 24"
//       >
//         <circle
//           className="opacity-25"
//           cx="12"
//           cy="12"
//           r="10"
//           stroke="currentColor"
//           strokeWidth="4"
//         />
//         <path
//           className="opacity-75"
//           fill="currentColor"
//           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//         />
//       </svg>
//       {text && (
//         <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm font-medium">
//           {text}
//         </p>
//       )}
//     </div>
//   );
  
//   if (fullScreen) {
//     return (
//       <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 z-50 flex items-center justify-center">
//         {spinner}
//       </div>
//     );
//   }
  
//   return spinner;
// };

// Loader.propTypes = {
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
//   color: PropTypes.oneOf(['primary', 'white', 'gray']),
//   fullScreen: PropTypes.bool,
//   text: PropTypes.string,
// };

// export default Loader;

import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size = 'medium', color = 'primary', fullScreen = false, text = ' ' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };
  
  const colorClasses = {
    primary: 'text-[#007AFF]',
    white: 'text-white',
    gray: 'text-[#6E6E73]',
  };
  
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className="mt-3 text-[#6E6E73] text-sm font-medium">
          {text}
        </p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'white', 'gray']),
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
};

export default Loader;