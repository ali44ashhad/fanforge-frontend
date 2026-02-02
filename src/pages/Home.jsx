import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { categoryService } from '../services/categoryService'
import ProductGrid from '../components/marketplace/ProductGrid'
import HeroProductCarousel from '../components/home/HeroProductCarousel'
import { useCart } from '../hooks/useCart'
import { useNotifications } from '../context/NotificationContext'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const { products, isLoading } = useProducts({})
  const { addItem } = useCart()
  const { notify } = useNotifications()
  const { isBuyer } = useAuth()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    categoryService
      .listPublic()
      .then((data) => {
        const categoriesData = data?.categories ?? data?.data ?? data ?? []
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      })
      .catch(() => setCategories([]))
  }, [])

  const handleAddToCart = (product) => {
    if (!isBuyer) {
      notify('Only buyer accounts can add items to the cart.', { type: 'warning' })
      return
    }
    addItem(product, 1)
    notify('Added to cart!', { type: 'success' })
  }

  const featuredProducts = Array.isArray(products) ? products.slice(0, 8) : []
  const categorySlug = (cat) => cat?.slug ?? cat?.id ?? cat?._id

  return (
    <div className="min-h-screen">
      {/* Hero — left: copy, right: product carousel */}
      <section className="relative bg-[#1D1D1F] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-white/70 uppercase tracking-widest mb-4">
                Creator-first marketplace
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Official & fan-made merch, one place.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">
                Discover curated products from independent sellers. Shop by category, support creators, no platform fee.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/marketplace"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-[#1D1D1F] font-semibold hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1D1D1F]"
                >
                  Shop now
                </Link>
                <Link
                  to="/categories"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1D1D1F]"
                >
                  Browse categories
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <HeroProductCarousel products={products} intervalMs={4000} />
            </div>
          </div>
        </div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/10 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Trust strip */}
      <section className="border-b border-[#E5E5E7] bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-sm text-[#6E6E73]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34C759]" />
              Curated products
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#007AFF]" />
              Independent sellers
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF9500]" />
              No platform fee
            </span>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-14 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F]">
                Shop by category
              </h2>
              <p className="mt-1 text-[#6E6E73]">
                Jump to your favorite section
              </p>
            </div>
            <Link
              to="/categories"
              className="text-[#007AFF] font-semibold hover:text-[#0056CC] transition-colors shrink-0"
            >
              View all categories →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id ?? cat._id}
                to={`/category/${categorySlug(cat)}`}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-[#E5E5E7] hover:border-[#007AFF]/30 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-xl font-bold text-[#007AFF] group-hover:bg-[#007AFF]/10 transition-colors mb-3">
                  {cat.name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <span className="text-sm font-medium text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors line-clamp-2">
                  {cat.name}
                </span>
                {cat.productCount != null && (
                  <span className="text-xs text-[#6E6E73] mt-1">
                    {cat.productCount} products
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured / New arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F]">
              New arrivals
            </h2>
            <p className="mt-1 text-[#6E6E73]">
              Fresh picks from the marketplace
            </p>
          </div>
          <Link
            to="/marketplace"
            className="text-[#007AFF] font-semibold hover:text-[#0056CC] transition-colors shrink-0"
          >
            View all products →
          </Link>
        </div>
        <ProductGrid
          products={featuredProducts}
          loading={isLoading}
          onAddToCart={handleAddToCart}
          columns={4}
        />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-14 sm:py-16">
        <div className="rounded-3xl bg-[#1D1D1F] text-white p-8 sm:p-12 lg:p-16 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Find something you’ll love
          </h3>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Explore the full marketplace — official merch and fan creations, all in one place.
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-[#1D1D1F] font-semibold hover:bg-white/90 transition-colors mt-8 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1D1D1F]"
          >
            Go to marketplace
          </Link>
        </div>
      </section>
    </div>
  )
}
