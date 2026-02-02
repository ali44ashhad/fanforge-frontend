// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from './Button';

// const EmptyState = ({
//   icon,
//   title,
//   description,
//   actionLabel,
//   onAction,
//   className = '',
// }) => {
//   return (
//     <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
//       <div className="mb-4">
//         {icon || (
//           <svg className="w-16 h-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//           </svg>
//         )}
//       </div>
      
//       <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//         {title || 'No items found'}
//       </h3>
      
//       {description && (
//         <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
//           {description}
//         </p>
//       )}
      
//       {actionLabel && onAction && (
//         <Button onClick={onAction}>
//           {actionLabel}
//         </Button>
//       )}
//     </div>
//   );
// };

// EmptyState.propTypes = {
//   icon: PropTypes.node,
//   title: PropTypes.string,
//   description: PropTypes.string,
//   actionLabel: PropTypes.string,
//   onAction: PropTypes.func,
//   className: PropTypes.string,
// };

// export default EmptyState;

import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="mb-4">
        {icon || (
          <svg className="w-16 h-16 text-[#E5E5E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>
      
      <h3 className="text-lg font-medium text-[#1D1D1F] mb-2">
        {title || 'No items found'}
      </h3>
      
      {description && (
        <p className="text-[#6E6E73] max-w-md mb-6">
          {description}
        </p>
      )}
      
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string,
};

export default EmptyState;