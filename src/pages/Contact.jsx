import React from 'react'

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-3">
            Contact Us
          </h1>
          <p className="text-[#6E6E73] max-w-2xl">
            Have a question about an order, a listing, or the platform itself? Use the options
            below to reach the right place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Contact options */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#1D1D1F] mb-4">
              Support channels
            </h2>
            <div className="space-y-4 text-sm text-[#6E6E73]">
              <div>
                <h3 className="font-semibold text-[#1D1D1F] mb-1">
                  General support
                </h3>
                <p>
                  Email us at{' '}
                  <a
                    href="mailto:support@fanforge.com"
                    className="text-[#007AFF] hover:text-[#0056CC]"
                  >
                    support@fanforge.com
                  </a>{' '}
                  for questions about your account, orders, or platform feedback.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1D1D1F] mb-1">
                  Safety & reporting
                </h3>
                <p>
                  If you see a listing that looks unsafe, misleading, or violates our guidelines,
                  please send details and links to{' '}
                  <a
                    href="mailto:safety@fanforge.com"
                    className="text-[#007AFF] hover:text-[#0056CC]"
                  >
                    safety@fanforge.com
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1D1D1F] mb-1">
                  Partnership & licensing
                </h3>
                <p>
                  Brands or studios interested in official partnerships can reach us at{' '}
                  <a
                    href="mailto:partners@fanforge.com"
                    className="text-[#007AFF] hover:text-[#0056CC]"
                  >
                    partners@fanforge.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Simple info card */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[#1D1D1F] mb-3">
              Response times
            </h2>
            <p className="text-[#6E6E73] text-sm mb-3">
              We aim to respond to most messages within 2–3 business days. Complex safety or
              licensing requests may take longer.
            </p>
            <p className="text-[#6E6E73] text-sm">
              Please avoid sending sensitive payment information over email. Keep communications
              focused on your order details and any public links or screenshots we may need.
            </p>
          </section>
        </div>

        {/* Note */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-[#1D1D1F] mb-3">
            Remember: payments are peer‑to‑peer
          </h2>
          <p className="text-[#6E6E73] text-sm">
            FanForge doesn&apos;t process payments directly. Always confirm details with your seller
            and use trusted payment methods you&apos;re comfortable with. If something feels off,
            pause the transaction and contact us before sending money.
          </p>
        </section>
      </div>
    </div>
  )
}

