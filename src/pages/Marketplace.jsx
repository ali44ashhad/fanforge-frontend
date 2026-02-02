// import React, { useState, useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { useProducts } from '../hooks/useProducts'
// import { categoryService } from '../services/categoryService'
// import ProductGrid from '../components/marketplace/ProductGrid'
// import ProductFilters from '../components/marketplace/ProductFilters'
// import SortDropdown from '../components/marketplace/SortDropdown'
// import { useCart } from '../hooks/useCart'
// import { useNotifications } from '../context/NotificationContext'

// export default function Marketplace() {
//   const [searchParams] = useSearchParams()
//   const { addItem } = useCart()
//   const { notify } = useNotifications()
//   const [categories, setCategories] = useState([])
//   const [filters, setFilters] = useState({
//     search: searchParams.get('q') || '',
//     categoryId: searchParams.get('categoryId') || '',
//     minPrice: searchParams.get('minPrice') || '',
//     maxPrice: searchParams.get('maxPrice') || '',
//     productType: searchParams.get('productType') || '',
//   })
//   const [sortBy, setSortBy] = useState('newest')

//   const { products, isLoading, error } = useProducts(filters)

//   useEffect(() => {
//     categoryService
//       .listPublic()
//       .then((data) => {
//         const categoriesData = data?.categories || data?.data || data || []
//         setCategories(Array.isArray(categoriesData) ? categoriesData : [])
//       })
//       .catch(() => {
//         setCategories([])
//       })
//   }, [])

//   const handleAddToCart = (product) => {
//     addItem(product, 1)
//     notify('Added to cart!', { type: 'success' })
//   }

//   const sortedProducts = [...(products || [])].sort((a, b) => {
//     switch (sortBy) {
//       case 'price-low':
//         return (a.price || 0) - (b.price || 0)
//       case 'price-high':
//         return (b.price || 0) - (a.price || 0)
//       case 'newest':
//         return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
//       default:
//         return 0
//     }
//   })

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Marketplace</h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           Discover unique products from independent sellers
//         </p>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Sidebar Filters */}
//         <aside className="lg:w-64 flex-shrink-0">
//           <ProductFilters
//             categories={categories}
//             filters={filters}
//             onFiltersChange={setFilters}
//           />
//         </aside>

//         {/* Main Content */}
//         <div className="flex-1">
//           <div className="flex items-center justify-between mb-6">
//             <div className="text-sm text-gray-600 dark:text-gray-400">
//               {isLoading ? 'Loading...' : `${sortedProducts.length} products found`}
//             </div>
//             <SortDropdown value={sortBy} onChange={setSortBy} />
//           </div>

//           <ProductGrid
//             products={sortedProducts}
//             loading={isLoading}
//             error={error}
//             onAddToCart={handleAddToCart}
//             columns={4}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { categoryService } from '../services/categoryService'
import ProductGrid from '../components/marketplace/ProductGrid'
import ProductFilters from '../components/marketplace/ProductFilters'
import SortDropdown from '../components/marketplace/SortDropdown'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { useNotifications } from '../context/NotificationContext'
import Loader from '../components/common/Loader'

export default function Marketplace() {
  const [searchParams] = useSearchParams()
  const { addItem } = useCart()
  const { notify } = useNotifications()
  const { isAuthed, isBuyer } = useAuth()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    categoryId: searchParams.get('categoryId') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    productType: searchParams.get('productType') || '',
  })
  const [sortBy, setSortBy] = useState('newest')

  const { products, isLoading, error } = useProducts(filters)

  useEffect(() => {
    categoryService
      .listPublic()
      .then((data) => {
        const categoriesData = data?.categories || data?.data || data || []
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      })
      .catch(() => {
        setCategories([])
      })
  }, [])

  const handleAddToCart = (product) => {
    // Only logged-in buyers can add to cart
    if (!isAuthed || !isBuyer) {
      notify('Please sign in as a buyer to add items to your cart.', { type: 'warning' })
      navigate('/login', { state: { from: '/marketplace' } })
      return
    }
    addItem(product, 1)
    notify('Added to cart!', { type: 'success' })
  }

  const sortedProducts = [...(products || [])].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0)
      case 'price-high':
        return (b.price || 0) - (a.price || 0)
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">Marketplace</h1>
        <p className="text-[#6E6E73]">
          Discover unique products from independent sellers
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <ProductFilters
            categories={categories}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-[#6E6E73]">
              {isLoading ? <Loader /> : `${sortedProducts.length} products found`}
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          <ProductGrid
            products={sortedProducts}
            loading={isLoading}
            error={error}
            onAddToCart={handleAddToCart}
            columns={4}
          />
        </div>
      </div>
      </div>
    </div>
  )
}