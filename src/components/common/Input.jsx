// import React, { forwardRef } from 'react';
// import PropTypes from 'prop-types';

// const Input = forwardRef(({
//   label,
//   type = 'text',
//   error,
//   helperText,
//   required = false,
//   disabled = false,
//   className = '',
//   leftIcon,
//   rightIcon,
//   ...props
// }, ref) => {
//   return (
//     <div className="w-full">
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}
      
//       <div className="relative">
//         {leftIcon && (
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             {leftIcon}
//           </div>
//         )}
        
//         <input
//           ref={ref}
//           type={type}
//           disabled={disabled}
//           className={`
//             block w-full rounded-lg border
//             ${error 
//               ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
//               : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'
//             }
//             ${leftIcon ? 'pl-10' : 'pl-4'}
//             ${rightIcon ? 'pr-10' : 'pr-4'}
//             py-2.5
//             bg-white dark:bg-gray-800
//             text-gray-900 dark:text-gray-100
//             placeholder:text-gray-400 dark:placeholder:text-gray-500
//             focus:outline-none focus:ring-2 focus:ring-opacity-50
//             disabled:opacity-50 disabled:cursor-not-allowed
//             transition-colors duration-200
//             ${className}
//           `}
//           {...props}
//         />
        
//         {rightIcon && (
//           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//             {rightIcon}
//           </div>
//         )}
//       </div>
      
//       {(error || helperText) && (
//         <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
//           {error || helperText}
//         </p>
//       )}
//     </div>
//   );
// });

// Input.propTypes = {
//   label: PropTypes.string,
//   type: PropTypes.string,
//   error: PropTypes.string,
//   helperText: PropTypes.string,
//   required: PropTypes.bool,
//   disabled: PropTypes.bool,
//   className: PropTypes.string,
//   leftIcon: PropTypes.node,
//   rightIcon: PropTypes.node,
// };

// Input.displayName = 'Input';

// export default Input;

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#1D1D1F] mb-1">
          {label}
          {required && <span className="text-[#FF3B30] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={`
            block w-full rounded-lg border
            ${error 
              ? 'border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]' 
              : 'border-[#E5E5E7] focus:border-[#007AFF] focus:ring-[#007AFF]'
            }
            ${leftIcon ? 'pl-10' : 'pl-4'}
            ${rightIcon ? 'pr-10' : 'pr-4'}
            py-2.5
            bg-white
            text-[#1D1D1F]
            placeholder:text-[#6E6E73]
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
            ${className}
          `}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-[#FF3B30]' : 'text-[#6E6E73]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

Input.displayName = 'Input';

export default Input;