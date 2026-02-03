// import React from 'react'
// import PropTypes from 'prop-types'
// import CategoryFilter from './CategoryFilter'
// import PriceFilter from './PriceFilter'

// export default function ProductFilters({ categories = [], filters = {}, onFiltersChange }) {
//   const handleCategoryChange = (selectedCategories) => {
//     onFiltersChange({
//       ...filters,
//       categoryId: selectedCategories.length > 0 ? selectedCategories[0] : '',
//     })
//   }

//   const handlePriceChange = (value) => {
//     // PriceFilter passes [min, max] array
//     const [min, max] = Array.isArray(value) ? value : [value?.min || '', value?.max || '']
//     onFiltersChange({
//       ...filters,
//       minPrice: min || '',
//       maxPrice: max || '',
//     })
//   }

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6">
//       <CategoryFilter
//         categories={categories}
//         selectedCategories={filters.categoryId ? [filters.categoryId] : []}
//         onCategoryChange={handleCategoryChange}
//       />
//       <PriceFilter
//         min={0}
//         max={1000}
//         value={[
//           Number(filters.minPrice) || 0,
//           Number(filters.maxPrice) || 1000,
//         ]}
//         onPriceChange={handlePriceChange}
//       />
//     </div>
//   )
// }

// ProductFilters.propTypes = {
//   categories: PropTypes.array,
//   filters: PropTypes.object,
//   onFiltersChange: PropTypes.func.isRequired,
// }

import React from 'react'
import PropTypes from 'prop-types'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'

export default function ProductFilters({ categories = [], filters = {}, onFiltersChange }) {
  const handleCategoryChange = (selectedCategories) => {
    onFiltersChange({
      ...filters,
      categoryId: selectedCategories.length > 0 ? selectedCategories[0] : '',
    })
  }

  const handlePriceChange = (value) => {
    // PriceFilter passes [min, max] array
    const [min, max] = Array.isArray(value) ? value : [value?.min || '', value?.max || '']
    onFiltersChange({
      ...filters,
      minPrice: min || '',
      maxPrice: max || '',
    })
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-[#E5E5E7] p-4 sm:p-6 space-y-4 sm:space-y-6 min-w-0 overflow-visible">
      <CategoryFilter
        categories={categories}
        selectedCategories={filters.categoryId ? [filters.categoryId] : []}
        onCategoryChange={handleCategoryChange}
      />
      <PriceFilter
        min={0}
        max={1000}
        value={[
          Number(filters.minPrice) || 0,
          Number(filters.maxPrice) || 1000,
        ]}
        onPriceChange={handlePriceChange}
      />
    </div>
  )
}

ProductFilters.propTypes = {
  categories: PropTypes.array,
  filters: PropTypes.object,
  onFiltersChange: PropTypes.func.isRequired,
}