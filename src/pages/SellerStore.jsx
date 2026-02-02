import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '../services/productService'
import ProductGrid from '../components/marketplace/ProductGrid'
import Badge from '../components/common/Badge'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { useNotifications } from '../context/NotificationContext'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import Loader from '../components/common/Loader'

export default function SellerStore() {
  const { id: sellerId } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { isAuthed, isBuyer } = useAuth()
  const { notify } = useNotifications()

  const [products, setProducts] = useState([])
  const [seller, setSeller] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!sellerId) return
    let cancelled = false

    setIsLoading(true)
    setError(null)

    productService
      .listApproved({ limit: 100 })
      .then((data) => {
        if (cancelled) return
        const list = data?.data || data?.products || data || []
        const arr = Array.isArray(list) ? list : []
        const bySeller = arr.filter(
          (p) => String(p.seller?.id || p.sellerId || '') === String(sellerId)
        )

        setProducts(bySeller)
        setSeller(bySeller[0]?.seller || null)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err)
          setProducts([])
          setSeller(null)
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [sellerId])

  const handleAddToCart = (product) => {
    if (!isAuthed || !isBuyer) {
      notify('Please sign in as a buyer to add items to your cart.', { type: 'warning' })
      navigate('/login', { state: { from: `/seller/${sellerId}` } })
      return
    }
    addItem(product, 1)
    notify('Added to cart!', { type: 'success' })
  }

  const sellerName = seller?.businessName || seller?.name || 'Seller Store'
  const sellerDescription = seller?.businessDescription || seller?.description || ''
  const sellerRating = seller?.rating
  const totalSales = seller?.totalSales
  const sellerType = seller?.sellerType || 'FAN_MADE'
  const sellerAvatar = seller?.avatar
  const sellerLocation = seller?.location
  const joinDate = seller?.joinDate
  const isVerified = seller?.isVerified || false

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Loader fullScreen text="Loading store..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
      {/* Seller Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-[#E5E5E7] bg-[#F5F5F7]">
              {sellerAvatar ? (
                <img
                  src={sellerAvatar}
                  alt={sellerName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-3xl font-bold text-gray-600">
                    {sellerName[0]}
                  </span>
                </div>
              )}
            </div>

            {isVerified && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow">
                ✓
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold text-[#1D1D1F]">{sellerName}</h1>
              <Badge
                type={sellerType === 'OFFICIAL' ? 'official' : 'fan_made'}
                size="medium"
              />
            </div>

            {sellerDescription && (
              <p className="text-gray-600 mb-6 max-w-3xl">
                {sellerDescription}
              </p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {sellerRating && (
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.floor(sellerRating)
                          ? 'text-amber-500'
                          : 'text-gray-300'
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="font-semibold text-[#1D1D1F]">
                    {sellerRating.toFixed(1)}
                  </span>
                </div>
              )}

              {totalSales && (
                <div>
                  <div className="font-bold text-lg text-[#1D1D1F]">
                    {totalSales.toLocaleString()}
                  </div>
                  <div className="text-[#6E6E73] text-sm">Total Sales</div>
                </div>
              )}

              <div>
                <div className="font-bold text-lg text-[#1D1D1F]">{products.length}</div>
                <div className="text-[#6E6E73] text-sm">Products</div>
              </div>
            </div>

            {/* Extra info */}
            <div className="flex flex-wrap gap-6 mt-6 text-[#6E6E73]">
              {sellerLocation && <span>📍 {sellerLocation}</span>}
              {joinDate && <span>🗓 Member since {joinDate}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div>
        {error ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-8 text-center">
            <p className="text-red-600 mb-4">
              {error.message || 'Something went wrong'}
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="No Products Available"
            description="This seller hasn't listed any products yet."
            actionLabel="Browse Marketplace"
            onAction={() => navigate('/marketplace')}
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">Shop All Products</h2>
            <p className="text-[#6E6E73] mb-8">
              Browse products from {sellerName}
            </p>

            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
              columns={4}
            />
          </>
        )}
      </div>
      </div>
    </div>
  )
}
