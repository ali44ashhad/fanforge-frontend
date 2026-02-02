// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { categoryService } from '../services/categoryService'
// import Loader from '../components/common/Loader'
// import EmptyState from '../components/common/EmptyState'

// export default function Categories() {
//   const [categories, setCategories] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     loadCategories()
//   }, [])

//   const loadCategories = async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const data = await categoryService.listPublic()
//       // Backend returns { success: true, data: [...] }
//       const categoriesData = data?.categories || data?.data || data || []
//       const normalized = Array.isArray(categoriesData) ? categoriesData : []
//       // Map _count.products to productCount for display
//       const mapped = normalized.map((cat) => ({
//         ...cat,
//         productCount: cat.productCount ?? cat._count?.products ?? 0,
//       }))
//       setCategories(mapped)
//     } catch (err) {
//       setError(err)
//       setCategories([])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <Loader fullScreen text="Loading categories..." />
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center">
//           <p className="text-red-600 dark:text-red-400 mb-4">
//             Failed to load categories
//           </p>
//           <button
//             onClick={loadCategories}
//             className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//           Browse Categories
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           Explore products by category
//         </p>
//       </div>

//       {categories.length === 0 ? (
//         <EmptyState
//           title="No categories found"
//           description="Categories will appear here once they are created"
//         />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {categories.map((category) => {
//             const categoryId = category.id || category._id
//             return (
//               <Link
//                 key={categoryId}
//                 to={`/category/${categoryId}`}
//                 className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow text-center"
//               >
//                 <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
//                   <span className="text-2xl font-bold text-primary">
//                     {category.name?.[0]?.toUpperCase() || '?'}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                   {category.name}
//                 </h3>
//                 {category.description && (
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
//                     {category.description}
//                   </p>
//                 )}
//                 {category.productCount !== undefined && (
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
//                   </p>
//                 )}
//               </Link>
//             )
//           })}
//         </div>
//       )}
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoryService } from '../services/categoryService'
import Loader from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await categoryService.listPublic()
      // Backend returns { success: true, data: [...] }
      const categoriesData = data?.categories || data?.data || data || []
      const normalized = Array.isArray(categoriesData) ? categoriesData : []
      // Map _count.products to productCount for display
      const mapped = normalized.map((cat) => ({
        ...cat,
        productCount: cat.productCount ?? cat._count?.products ?? 0,
      }))
      setCategories(mapped)
    } catch (err) {
      setError(err)
      setCategories([])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Loader fullScreen text="Loading categories..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <p className="text-red-600 mb-4">
            Failed to load categories
          </p>
          <button
            onClick={loadCategories}
            className="px-6 py-3 bg-[#007AFF] text-white font-medium rounded-xl hover:bg-[#0056CC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2 shadow-sm"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
          Browse Categories
        </h1>
        <p className="text-[#6E6E73]">
          Explore products by category
        </p>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          title="No categories found"
          description="Categories will appear here once they are created"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const categoryId = category.id || category._id
            return (
              <Link
                key={categoryId}
                to={`/category/${categoryId}`}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-md transition-all text-center focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#007AFF]">
                    {category.name?.[0]?.toUpperCase() || '?'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-[#6E6E73] mb-3 line-clamp-2">
                    {category.description}
                  </p>
                )}
                {category.productCount !== undefined && (
                  <p className="text-sm text-[#6E6E73]">
                    {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      )}
      </div>
    </div>
  )
}