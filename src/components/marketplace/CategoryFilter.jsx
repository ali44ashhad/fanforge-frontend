// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// const CategoryFilter = ({
//   categories,
//   selectedCategories = [],
//   onCategoryChange,
//   maxVisible = 5,
//   showAll = false,
// }) => {
//   const [showMore, setShowMore] = useState(false);

//   const visibleCategories = showMore || showAll ? (Array.isArray(categories) ? categories : []) : (Array.isArray(categories) ? categories.slice(0, maxVisible) : []);

//   const handleCategoryToggle = (categoryId) => {
//     const newSelection = selectedCategories.includes(categoryId)
//       ? selectedCategories.filter(id => id !== categoryId)
//       : [...selectedCategories, categoryId];
//     onCategoryChange(newSelection);
//   };

//   return (
//     <div>
//       <h4 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h4>
//       <div className="space-y-2">
//         {visibleCategories.map((category) => (
//           <div key={category.id} className="flex items-center justify-between">
//             <label className="flex items-center cursor-pointer flex-1">
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(category.id)}
//                 onChange={() => handleCategoryToggle(category.id)}
//                 className="sr-only"
//               />
//               <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${
//                 selectedCategories.includes(category.id)
//                   ? 'bg-primary border-primary'
//                   : 'border-gray-300 dark:border-gray-600'
//               }`}>
//                 {selectedCategories.includes(category.id) && (
//                   <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                   </svg>
//                 )}
//               </div>
//               <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
//             </label>
//             {category.count !== undefined && (
//               <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
//                 {category.count}
//               </span>
//             )}
//           </div>
//         ))}
//       </div>

//       {!showAll && categories.length > maxVisible && (
//         <button
//           onClick={() => setShowMore(!showMore)}
//           className="mt-3 text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
//         >
//           {showMore ? 'Show Less' : `Show ${categories.length - maxVisible} More`}
//         </button>
//       )}
//     </div>
//   );
// };

// CategoryFilter.propTypes = {
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       name: PropTypes.string.isRequired,
//       count: PropTypes.number,
//     })
//   ).isRequired,
//   selectedCategories: PropTypes.arrayOf(PropTypes.string),
//   onCategoryChange: PropTypes.func.isRequired,
//   maxVisible: PropTypes.number,
//   showAll: PropTypes.bool,
// };

// export default CategoryFilter;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CategoryFilter = ({
  categories,
  selectedCategories = [],
  onCategoryChange,
  maxVisible = 5,
  showAll = false,
}) => {
  const [showMore, setShowMore] = useState(false);

  const visibleCategories = showMore || showAll ? (Array.isArray(categories) ? categories : []) : (Array.isArray(categories) ? categories.slice(0, maxVisible) : []);

  const handleCategoryToggle = (categoryId) => {
    const newSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(newSelection);
  };

  return (
    <div>
      <h4 className="font-medium text-[#1D1D1F] mb-3">Categories</h4>
      <div className="space-y-2">
        {visibleCategories.map((category) => (
          <div key={category.id} className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${
                selectedCategories.includes(category.id)
                  ? 'bg-[#007AFF] border-[#007AFF]'
                  : 'border-[#E5E5E7] hover:border-[#007AFF]'
              }`}>
                {selectedCategories.includes(category.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-[#1D1D1F]">{category.name}</span>
            </label>
            {category.count !== undefined && (
              <span className="text-xs text-[#6E6E73] bg-[#F5F5F7] px-2 py-1 rounded">
                {category.count}
              </span>
            )}
          </div>
        ))}
      </div>

      {!showAll && categories.length > maxVisible && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-3 text-sm text-[#007AFF] hover:text-[#0056CC] transition-colors"
        >
          {showMore ? 'Show Less' : `Show ${categories.length - maxVisible} More`}
        </button>
      )}
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      count: PropTypes.number,
    })
  ).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  onCategoryChange: PropTypes.func.isRequired,
  maxVisible: PropTypes.number,
  showAll: PropTypes.bool,
};

export default CategoryFilter;