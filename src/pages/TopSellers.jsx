import React from 'react'
import { Link } from 'react-router-dom'

export default function TopSellers() {
  // This is intentionally static for now – once there is a backend endpoint
  // for top sellers we can wire it in here.
  const placeholderSellers = [
    {
      id: 'example-1',
      name: 'PixelForge Studio',
      type: 'FAN_MADE',
      description: 'Bright, character‑driven prints and desk accessories.',
      products: 24,
      rating: 4.9,
    },
    {
      id: 'example-2',
      name: 'Official Brand Lab',
      type: 'OFFICIAL',
      description: 'Licensed collectibles and limited edition drops.',
      products: 12,
      rating: 4.8,
    },
    {
      id: 'example-3',
      name: 'Cozy Prints Co.',
      type: 'FAN_MADE',
      description: 'Soft apparel and prints inspired by your favourite worlds.',
      products: 18,
      rating: 4.7,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Top Sellers
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Discover standout creators and brands on FanForge. This is a preview of the experience;
            once analytics are wired up, this page can reflect real seller performance.
          </p>
        </div>

        {/* Info card */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            How we&apos;ll rank top sellers
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            In the future this page can highlight sellers based on a mix of completed orders,
            rating, and recent activity so that new buyers can quickly find trusted shops.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
            <li>Order volume and on‑time fulfilment</li>
            <li>Buyer ratings and repeat customers</li>
            <li>Profile completeness and clear product listings</li>
          </ul>
        </section>

        {/* Placeholder grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {placeholderSellers.map((seller) => (
            <div
              key={seller.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {seller.name}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">
                    {seller.type === 'OFFICIAL' ? 'Official' : 'Fan Made'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {seller.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{seller.products} products</span>
                  <span>⭐ {seller.rating.toFixed(1)} rating</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Want to appear as a top seller?
              </h2>
              <p className="text-gray-600 text-sm">
                Start listing high‑quality products and provide great service. Once real metrics
                are connected, your shop can be surfaced here automatically.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/sell"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#007AFF] text-white hover:bg-[#0056CC] transition-colors font-medium shadow-sm"
              >
                Become a seller
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors font-medium"
              >
                Explore shops
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

