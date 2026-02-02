import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../common/Badge'

/**
 * Normalize product for display (images, title, price, badge).
 */
function normalizeProduct(product) {
  const images = product?.images || (product?.image ? [product.image] : [])
  const imageUrls = images
    .map((img) => (typeof img === 'string' ? img : img?.url))
    .filter(Boolean)
  const rawType = String(
    product?.seller?.sellerType || product?.productType || product?.badge || ''
  ).toUpperCase()
  const badge =
    product?.badge ||
    (rawType === 'OFFICIAL' ? 'official' : rawType === 'FAN_MADE' ? 'fan_made' : undefined)
  return {
    id: product?.id ?? product?._id,
    title: product?.name ?? product?.title ?? 'Product',
    price: Number(product?.price ?? 0),
    image: imageUrls[0] || '/images/placeholder/product-placeholder.jpg',
    badge,
  }
}

export default function HeroProductCarousel({ products = [], intervalMs = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = Array.isArray(products) ? products.map(normalizeProduct) : []
  const total = items.length

  useEffect(() => {
    if (total <= 1) return
    const t = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total)
    }, intervalMs)
    return () => clearInterval(t)
  }, [total, intervalMs])

  if (items.length === 0) {
    return (
      <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <p className="text-white/50 text-sm">Loading products…</p>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl">
      <div className="relative aspect-square max-h-[320px] bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        {items.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            to={`/product/${item.id}`}
            className={`absolute inset-0 block transition-all duration-500 ease-out ${
              index === currentIndex
                ? 'opacity-100 z-10 scale-100'
                : 'opacity-0 z-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
              <div className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden bg-white/10">
                {item.badge && (
                  <div className="absolute top-2 left-2 z-10">
                    <Badge type={item.badge} size="small" />
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = '/images/placeholder/product-placeholder.jpg'
                  }}
                />
              </div>
              <div className="mt-4 text-center w-full">
                <p className="text-white font-semibold line-clamp-2 text-sm sm:text-base">
                  {item.title}
                </p>
                <p className="text-white/80 mt-1 text-sm">${item.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {total > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
