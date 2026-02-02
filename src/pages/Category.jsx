// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { useProducts } from '../hooks/useProducts'
// import { categoryService } from '../services/categoryService'
// import ProductGrid from '../components/marketplace/ProductGrid'
// import { useCart } from '../hooks/useCart'
// import { useNotifications } from '../context/NotificationContext'
// import Loader from '../components/common/Loader'

// export default function Category() {
//   const { slug } = useParams()
//   const { products, isLoading } = useProducts({ categoryId: slug })
//   const { addItem } = useCart()
//   const { notify } = useNotifications()
//   const [category, setCategory] = useState(null)

//   useEffect(() => {
//     if (slug) {
//       categoryService
//         .getById(slug)
//         .then((data) => {
//           const c = data?.category || data
//           setCategory(c)
//         })
//         .catch(() => {})
//     }
//   }, [slug])

//   const handleAddToCart = (product) => {
//     addItem(product, 1)
//     notify('Added to cart!', { type: 'success' })
//   }

//   if (isLoading && !category) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <Loader />
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//           {category?.name || 'Category'}
//         </h1>
//         {category?.description && (
//           <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
//         )}
//       </div>

//       <ProductGrid
//         products={products}
//         loading={isLoading}
//         onAddToCart={handleAddToCart}
//         columns={4}
//       />
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { categoryService } from '../services/categoryService'
import ProductGrid from '../components/marketplace/ProductGrid'
import { useCart } from '../hooks/useCart'
import { useNotifications } from '../context/NotificationContext'
import Loader from '../components/common/Loader'
import { useAuth } from '../hooks/useAuth'

export default function Category() {
  const { slug } = useParams()
  const { products, isLoading } = useProducts({ categoryId: slug })
  const { addItem } = useCart()
  const { notify } = useNotifications()
  const { isBuyer } = useAuth()
  const [category, setCategory] = useState(null)

  useEffect(() => {
    if (slug) {
      categoryService
        .getById(slug)
        .then((data) => {
          const c = data?.category || data
          setCategory(c)
        })
        .catch(() => {})
    }
  }, [slug])

  const handleAddToCart = (product) => {
    if (!isBuyer) {
      notify('Only buyer accounts can add items to the cart.', { type: 'warning' })
      return
    }
    addItem(product, 1)
    notify('Added to cart!', { type: 'success' })
  }

  if (isLoading && !category) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
          {category?.name || 'Category'}
        </h1>
        {category?.description && (
          <p className="text-[#6E6E73]">{category.description}</p>
        )}
      </div>

      <ProductGrid
        products={products}
        loading={isLoading}
        onAddToCart={handleAddToCart}
        columns={4}
      />
      </div>
    </div>
  )
}