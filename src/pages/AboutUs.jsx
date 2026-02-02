import React from 'react'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            About FanForge
          </h1>
          <p className="text-gray-600 max-w-2xl">
            FanForge is a creator-first marketplace where official brands and fan-made artists
            can share their work in one clean, trustworthy place.
          </p>
        </div>

        {/* Mission & How it works */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our mission
            </h2>
            <p className="text-gray-600 mb-4">
              We want to make it ridiculously simple for fans to discover great merch, and for
              independent creators to sell without wrestling a complicated storefront or heavy
              platform fees.
            </p>
            <p className="text-gray-600">
              FanForge focuses on safe, transparent buyer–seller communication. You talk directly
              with sellers to arrange payment and shipping, while we give you a clean interface,
              moderation tools, and clear guidelines so everyone knows what to expect.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              At a glance
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Curated products from official brands & fan artists</li>
              <li>• Lightweight, no-fee marketplace experience</li>
              <li>• Direct messaging between buyers and sellers</li>
              <li>• Clear seller guidelines & safety checks</li>
            </ul>
          </section>
        </div>

        {/* Values */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What we care about
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Creators first</h3>
              <p className="text-gray-600 text-sm">
                We keep the interface simple, highlight your work, and avoid surprise fees so more
                of each sale stays with the artist or brand.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Buyer trust</h3>
              <p className="text-gray-600 text-sm">
                Clear product details, visible seller profiles, and consistent UI across product
                cards and detail pages help buyers feel confident.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthy fandoms</h3>
              <p className="text-gray-600 text-sm">
                We encourage respectful, non‑exploitative fan creations that celebrate communities
                without misleading buyers or infringing on others.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Ready to be part of FanForge?
              </h2>
              <p className="text-gray-600 text-sm">
                Browse the marketplace as a fan, or apply to become a seller and open your own
                store.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/marketplace"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#007AFF] text-white hover:bg-[#0056CC] transition-colors font-medium shadow-sm"
              >
                Browse marketplace
              </a>
             
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

