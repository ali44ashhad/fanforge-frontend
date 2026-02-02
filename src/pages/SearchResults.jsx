// import React from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { useProducts } from '../hooks/useProducts'
// import ProductGrid from '../components/marketplace/ProductGrid'
// import { useCart } from '../hooks/useCart'
// import { useNotifications } from '../context/NotificationContext'

// export default function SearchResults() {
//   const [searchParams] = useSearchParams()
//   const query = searchParams.get('q') || ''
//   const { products, isLoading, error } = useProducts({ search: query })
//   const { addItem } = useCart()
//   const { notify } = useNotifications()

//   const handleAddToCart = (product) => {
//     addItem(product, 1)
//     notify('Added to cart!', { type: 'success' })
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//           Search Results
//         </h1>
//         {query && (
//           <p className="text-gray-600 dark:text-gray-400">
//             Results for: <strong>"{query}"</strong>
//           </p>
//         )}
//       </div>

//       <ProductGrid
//         products={products}
//         loading={isLoading}
//         error={error}
//         onAddToCart={handleAddToCart}
//         columns={4}
//         emptyStateProps={{
//           title: query ? 'No products found' : 'Enter a search query',
//           description: query
//             ? 'Try adjusting your search terms'
//             : 'Search for products, sellers, or categories',
//         }}
//       />
//     </div>
//   )
// }

import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductGrid from '../components/marketplace/ProductGrid'
import { useCart } from '../hooks/useCart'
import { useNotifications } from '../context/NotificationContext'
import { useAuth } from '../hooks/useAuth'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { products, isLoading, error } = useProducts({ search: query })
  const { addItem } = useCart()
  const { notify } = useNotifications()
  const { isBuyer } = useAuth()

  const handleAddToCart = (product) => {
    if (!isBuyer) {
      notify('Only buyer accounts can add items to the cart.', { type: 'warning' })
      return
    }
    addItem(product, 1)
    notify('Added to cart!', { type: 'success' })
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
          Search Results
        </h1>
        {query && (
          <p className="text-[#6E6E73]">
            Results for: <strong className="text-[#1D1D1F]">"{query}"</strong>
          </p>
        )}
      </div>

      <ProductGrid
        products={products}
        loading={isLoading}
        error={error}
        onAddToCart={handleAddToCart}
        columns={4}
        emptyStateProps={{
          title: query ? 'No products found' : 'Enter a search query',
          description: query
            ? 'Try adjusting your search terms'
            : 'Search for products, sellers, or categories',
        }}
      />
      </div>
    </div>
  )
}