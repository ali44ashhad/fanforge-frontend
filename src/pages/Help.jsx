import React from 'react'
import { Link } from 'react-router-dom'

export default function Help() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-3">
            Help Center
          </h1>
          <p className="text-[#6E6E73] max-w-2xl">
            Find quick answers to common questions, or jump straight to contact and policy pages
            if you need more detail.
          </p>
        </div>

        {/* Quick links */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link
            to="/faqs"
            className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:shadow-md hover:border-[#007AFF]/30 transition-all block"
          >
            <h2 className="text-lg font-semibold text-[#1D1D1F] mb-2">
              FAQs
            </h2>
            <p className="text-[#6E6E73] text-sm">
              Short answers to the most common buyer and seller questions.
            </p>
          </Link>

          <Link
            to="/contact"
            className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:shadow-md hover:border-[#007AFF]/30 transition-all block"
          >
            <h2 className="text-lg font-semibold text-[#1D1D1F] mb-2">
              Contact support
            </h2>
            <p className="text-[#6E6E73] text-sm">
              Reach out if something looks wrong with an order or a listing.
            </p>
          </Link>

          <Link
            to="/seller-guidelines"
            className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:shadow-md hover:border-[#007AFF]/30 transition-all block"
          >
            <h2 className="text-lg font-semibold text-[#1D1D1F] mb-2">
              Seller guidelines
            </h2>
            <p className="text-[#6E6E73] text-sm">
              Learn what we expect from official creators and fan-made artists.
            </p>
          </Link>
        </section>

        {/* Buyer & seller help */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              I&apos;m a buyer
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>
                Use the product detail page to review price, stock, and seller information before you
                reach out.
              </li>
              <li>
                Confirm payment method, total cost, and shipping timeframe directly with the seller.
              </li>
              <li>
                If a listing looks suspicious, avoid paying and contact support so we can review it.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#1D1D1F] mb-3">
              I&apos;m a seller
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-[#6E6E73] text-sm">
              <li>Keep product details, pricing, and stock up to date.</li>
              <li>Reply to new buyer messages as promptly and clearly as you can.</li>
              <li>Read the full seller guidelines before listing your first product.</li>
            </ul>
          </div>
        </section>

        {/* Policies */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Policies & safety
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            FanForge is a peer‑to‑peer marketplace. Payments and shipping happen directly between
            buyers and sellers, but we provide clear policies so everyone knows the rules.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/returns"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7] text-sm font-medium transition-colors"
            >
              Returns & refunds policy
            </Link>
            <Link
              to="/terms"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7] text-sm font-medium transition-colors"
            >
              Terms of service
            </Link>
            <Link
              to="/privacy"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7] text-sm font-medium transition-colors"
            >
              Privacy policy
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

