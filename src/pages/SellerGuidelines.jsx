import React from 'react'

export default function SellerGuidelines() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Seller Guidelines
          </h1>
          <p className="text-gray-600 max-w-2xl">
            A quick, human-readable overview of how to sell on FanForge in a way that feels great
            for both you and your buyers.
          </p>
        </div>

        {/* Overview */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. What kind of products can I list?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Official creators</h3>
              <p className="text-gray-600 text-sm">
                If you are an official license holder or brand, list your official merch under an
                <span className="font-semibold"> Official </span>
                badge. Use clear branding and accurate product information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Fan-made artists</h3>
              <p className="text-gray-600 text-sm">
                Fan-made items should celebrate a fandom without misleading buyers into thinking
                they are official. Avoid using protected logos or copying existing designs.
              </p>
            </div>
          </div>
        </section>

        {/* Quality & listing expectations */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. Listing quality checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Clear photos</h3>
              <ul className="space-y-1">
                <li>• Use bright, non‑blurry images</li>
                <li>• Show product from multiple angles</li>
                <li>• Avoid heavy watermarks over the design</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Honest description</h3>
              <ul className="space-y-1">
                <li>• Mention materials and sizing</li>
                <li>• Call out made‑to‑order vs in‑stock</li>
                <li>• Be transparent about color or print variation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Accurate stock & pricing</h3>
              <ul className="space-y-1">
                <li>• Keep prices in sync with what you actually charge</li>
                <li>• Update stock when items sell out</li>
                <li>• Avoid surprise add‑on fees after a buyer contacts you</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Communication & fulfilment */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. Communicating with buyers
          </h2>
          <p className="text-gray-600 mb-4">
            FanForge connects buyers and sellers directly. To keep things smooth:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
            <li>Respond to new messages within a reasonable timeframe whenever possible.</li>
            <li>Confirm final price, shipping method, and estimated delivery before taking payment.</li>
            <li>Share tracking information or proof of shipment once the order is sent.</li>
            <li>Be respectful and professional even if there is a dispute or cancellation.</li>
          </ul>
        </section>

        {/* Safety & prohibited items */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Safety, IP, and prohibited content
          </h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              We reserve the right to remove listings or suspend accounts that break these
              guidelines or local laws. As a seller you are responsible for the legality of what
              you list and ship.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>No hate, harassment, or discriminatory content.</li>
              <li>No adult content targeted at minors.</li>
              <li>No dangerous or illegal items.</li>
              <li>Avoid using trademarks or logos that you do not have rights to use.</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Ready to open your shop?
              </h2>
              <p className="text-gray-600 text-sm">
                Start your seller application in a few minutes. You can always come back to these
                guidelines later.
              </p>
            </div>
            <a
              href="/sell"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#007AFF] text-white hover:bg-[#0056CC] transition-colors font-medium shadow-sm"
            >
              Apply as a seller
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

