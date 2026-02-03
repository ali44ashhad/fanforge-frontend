 
// import React, { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { productService } from '../services/productService'
// import ProductGallery from '../components/product/ProductGallery'
// import ProductInfo from '../components/product/ProductInfo'
// import ProductActions from '../components/product/ProductActions'
// import SellerInfo from '../components/product/SellerInfo' 
// import { useCart } from '../hooks/useCart'
// import { useNotifications } from '../context/NotificationContext'
// import { useAuth } from '../hooks/useAuth'
// import Loader from '../components/common/Loader'

// export default function ProductDetail() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const { addItem } = useCart()
//   const { notify } = useNotifications()
//   const { isAuthed, isBuyer } = useAuth()
//   const [product, setProduct] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [quantity, setQuantity] = useState(1)

//   useEffect(() => {
//     if (!id) return
//     setIsLoading(true)
//     setError(null)
//     productService
//       .getById(id)
//       .then((data) => {
//         // Backend returns { success, data: product }
//         const p = data?.data || data?.product || data
//         setProduct(p)
//       })
//       .catch((err) => {
//         setError(err)
//         notify('Failed to load product', { type: 'error' })
//       })
//       .finally(() => setIsLoading(false))
//   }, [id, notify])

//   const handleAddToCart = () => {
//     if (!product) return
//     // Only logged-in buyers can add to cart
//     if (!isAuthed || !isBuyer) {
//       notify('Please sign in as a buyer to add items to your cart.', { type: 'warning' })
//       navigate('/login', { state: { from: `/product/${id}` } })
//       return
//     }
//     addItem(product, quantity)
//     notify('Added to cart!', { type: 'success' })
//   }

//   const handleBuyNow = () => {
//     if (!isAuthed) {
//       notify('Please sign in to place an order', { type: 'warning' })
//       navigate('/login', { state: { from: `/product/${id}` } })
//       return
//     }
//     navigate('/checkout', { state: { product, quantity } })
//   }

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <Loader />
//       </div>
//     )
//   }

//   if (error || !product) {
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">
//           Product Not Found
//         </h2>
//         <p className="text-[#6E6E73] mb-6">
//           {error?.message || 'The product you are looking for does not exist.'}
//         </p>
//         <button
//           onClick={() => navigate('/marketplace')}
//           className="px-4 py-2 bg-[#007AFF] text-white rounded-lg hover:bg-[#0056CC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2"
//         >
//           Back to Marketplace
//         </button>
//       </div>
//     )
//   }

//   // Prefer seller type so ALL products follow the seller's current type
//   const productType = String(
//     product.seller?.sellerType || product.productType || 'FAN_MADE'
//   ).toUpperCase()

//   // Normalize images from backend: can be [{ url, ... }] or simple strings
//   const rawImages = product.images || (product.image ? [product.image] : [])
//   const imageUrls = rawImages
//     .map((img) => (typeof img === 'string' ? img : img?.url))
//     .filter(Boolean)

//   const normalizedSeller = product.seller
//     ? {
//         ...product.seller,
//         name:
//           product.seller.businessName ||
//           product.seller.name ||
//           'Seller',
//         description:
//           product.seller.businessDescription ||
//           product.seller.description ||
//           '',
//       }
//     : null

//   const normalizedProduct = {
//     id: product.id || product._id,
//     title: product.name || product.title,
//     description: product.description,
//     price: Number(product.price || 0),
//     images: imageUrls,
//     seller: normalizedSeller,
//     badge: productType === 'OFFICIAL' ? 'official' : 'fan_made',
//     stock: product.stock,
//     category: product.category?.name || product.categoryId,
//     tags: product.tags || [],
//     rating: product.rating,
//     reviewCount: product.reviewCount,
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//         {/* Product Gallery */}
//         <ProductGallery images={normalizedProduct.images} productName={normalizedProduct.title} />

//         {/* Product Info & Actions */}
//         <div className="space-y-6">
//           <ProductInfo product={normalizedProduct} onQuantityChange={setQuantity} />
//           <ProductActions
//             product={normalizedProduct}
//             onAddToCart={handleAddToCart}
//             onBuyNow={handleBuyNow}
//           />
//           {normalizedProduct.seller && (
//             <SellerInfo seller={normalizedProduct.seller} badge={normalizedProduct.badge} />
//           )}
//         </div>
//       </div>

      
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '../services/productService'
import { useCart } from '../hooks/useCart'
import { useNotifications } from '../context/NotificationContext'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/common/Loader'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductActions from '../components/product/ProductActions'
import SellerInfo from '../components/product/SellerInfo'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { notify } = useNotifications()
  const { isAuthed, isBuyer } = useAuth()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    productService
      .getById(id)
      .then((data) => {
        const p = data?.data || data?.product || data
        setProduct(p)
      })
      .catch((err) => {
        setError(err)
        notify('Failed to load product', { type: 'error' })
      })
      .finally(() => setIsLoading(false))
  }, [id, notify])

  const handleAddToCart = () => {
    if (!product) return
    if (!isAuthed || !isBuyer) {
      notify('Please sign in as a buyer to add items to your cart.', { type: 'warning' })
      navigate('/login', { state: { from: `/product/${id}` } })
      return
    }
    addItem(product, quantity)
    notify('Added to cart!', { type: 'success' })
  }

  const handleBuyNow = () => {
    if (!isAuthed) {
      notify('Please sign in to place an order', { type: 'warning' })
      navigate('/login', { state: { from: `/product/${id}` } })
      return
    }
    if (!isBuyer) {
      notify('Only buyer accounts can place orders.', { type: 'warning' })
      return
    }
    navigate('/checkout', { state: { product, quantity } })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Loader />
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-50 to-pink-50 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error?.message || 'The product you are looking for does not exist.'}
          </p>
          <button
            onClick={() => navigate('/marketplace')}
            className="px-6 py-3 bg-[#007AFF] text-white font-medium rounded-xl hover:bg-[#0056CC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    )
  }

  const productType = String(
    product.seller?.sellerType || product.productType || 'FAN_MADE'
  ).toUpperCase()

  const rawImages = product.images || (product.image ? [product.image] : [])
  const imageUrls = rawImages
    .map((img) => (typeof img === 'string' ? img : img?.url))
    .filter(Boolean)

  const normalizedSeller = product.seller
    ? {
        ...product.seller,
        name: product.seller.businessName || product.seller.name || 'Seller',
        description: product.seller.businessDescription || product.seller.description || '',
      }
    : null

  const normalizedProduct = {
    id: product.id || product._id,
    title: product.name || product.title,
    description: product.description,
    price: Number(product.price || 0),
    images: imageUrls,
    seller: normalizedSeller,
    badge: productType === 'OFFICIAL' ? 'official' : 'fan_made',
    stock: product.stock,
    category: product.category?.name || product.categoryId,
    tags: product.tags || [],
    rating: product.rating,
    reviewCount: product.reviewCount,
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Gallery + Product Details */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            <ProductGallery images={normalizedProduct.images} productName={normalizedProduct.title} />
            {/* Product Details - below product, left side */}
            {normalizedProduct.description && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 border border-[#E5E5E7]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-4 sm:mb-6">Product Details</h2>
                <div className="prose max-w-none text-[#6E6E73]">
                  <p className="whitespace-pre-line leading-relaxed">{normalizedProduct.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info & Actions */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 sm:top-24 lg:top-8 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 border border-[#E5E5E7]">
                <ProductInfo 
                  product={normalizedProduct} 
                  onQuantityChange={setQuantity} 
                />
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 border border-[#E5E5E7]">
                <ProductActions
                  product={normalizedProduct}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />
              </div>
              
              {normalizedProduct.seller && (
                <SellerInfo 
                  seller={normalizedProduct.seller} 
                  badge={normalizedProduct.badge} 
                  className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}