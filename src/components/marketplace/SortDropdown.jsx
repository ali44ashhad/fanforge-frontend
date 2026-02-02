// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// const SortDropdown = ({
//   value = 'newest',
//   onChange,
//   options = [],
//   className = '',
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const defaultOptions = [
//     { value: 'newest', label: 'Newest First' },
//     { value: 'price_low_high', label: 'Price: Low to High' },
//     { value: 'price_high_low', label: 'Price: High to Low' },
//     { value: 'rating', label: 'Highest Rated' },
//     { value: 'popular', label: 'Most Popular' },
//     { value: 'name_asc', label: 'Name: A to Z' },
//     { value: 'name_desc', label: 'Name: Z to A' },
//   ];

//   const sortOptions = options.length > 0 ? options : defaultOptions;
//   const selectedOption = sortOptions.find(opt => opt.value === value) || sortOptions[0];

//   return (
//     <div className={`relative ${className}`}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center justify-between w-full md:w-auto px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
//       >
//         <span className="flex items-center">
//           <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
//           </svg>
//           Sort by: {selectedOption.label}
//         </span>
//         <svg className={`w-5 h-5 ml-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {isOpen && (
//         <>
//           <div
//             className="fixed inset-0 z-10"
//             onClick={() => setIsOpen(false)}
//           />
//           <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
//             <div className="p-2">
//               {sortOptions.map((option) => (
//                 <button
//                   key={option.value}
//                   onClick={() => {
//                     onChange(option.value);
//                     setIsOpen(false);
//                   }}
//                   className={`flex items-center w-full px-3 py-2.5 rounded text-left transition-colors ${
//                     value === option.value
//                       ? 'bg-primary text-white'
//                       : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//                   }`}
//                 >
//                   {option.icon && <span className="mr-3">{option.icon}</span>}
//                   {option.label}
//                   {value === option.value && (
//                     <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   )}
//                 </button>
//               ))}
//             </div>
            
//             {/* Sort Direction Toggle */}
//             <div className="border-t border-gray-200 dark:border-gray-700 p-3">
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only"
//                 />
//                 <div className="relative">
//                   <div className="w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                   <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
//                 </div>
//                 <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Ascending</span>
//               </label>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// SortDropdown.propTypes = {
//   value: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//       icon: PropTypes.node,
//     })
//   ),
//   className: PropTypes.string,
// };

// export default SortDropdown;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SortDropdown = ({
  value = 'newest',
  onChange,
  options = [],
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low_high', label: 'Price: Low to High' },
    { value: 'price_high_low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
  ];

  const sortOptions = options.length > 0 ? options : defaultOptions;
  const selectedOption = sortOptions.find(opt => opt.value === value) || sortOptions[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-auto px-4 py-2.5 border border-[#E5E5E7] rounded-lg bg-white text-[#1D1D1F] hover:border-[#007AFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2"
      >
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-[#6E6E73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
          </svg>
          Sort by: {selectedOption.label}
        </span>
        <svg className={`w-5 h-5 ml-4 transition-transform text-[#6E6E73] ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#E5E5E7] z-20 overflow-hidden">
            <div className="p-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2.5 rounded text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] ${
                    value === option.value
                      ? 'bg-[#007AFF] text-white'
                      : 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
                  }`}
                >
                  {option.icon && <span className="mr-3">{option.icon}</span>}
                  {option.label}
                  {value === option.value && (
                    <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

SortDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ),
  className: PropTypes.string,
};

export default SortDropdown;