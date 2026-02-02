import React from 'react'

const faqs = [
  {
    question: 'Is FanForge a payment processor?',
    answer:
      'No. FanForge is a peer‑to‑peer marketplace. You contact the seller directly to arrange payment and shipping. We provide the interface, guidelines, and tools, but do not hold funds.',
  },
  {
    question: 'How do I know if a product is official or fan‑made?',
    answer:
      'Look for the badge on the product card and detail page. Official creators are marked as “Official” and fan artists as “Fan Made”, following the seller type.',
  },
  {
    question: 'Can I edit my product after listing it?',
    answer:
      'Yes. Visit your Seller Dashboard and open the Products section. From there you can edit titles, descriptions, prices, and stock for existing listings.',
  },
  {
    question: 'What happens if a buyer or seller breaks the rules?',
    answer:
      'Report the issue to support with as much detail as possible (links, screenshots, message logs). We may remove listings, restrict accounts, or ban repeat offenders based on severity.',
  },
  {
    question: 'How do returns and refunds work?',
    answer:
      'Each seller sets their own return/refund policy. Check the product details and the seller store description. For more context, read the Returns & Refunds Policy page.',
  },
]

export default function Faqs() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-[#6E6E73]">
            Quick answers to common questions about using FanForge as a buyer or a seller.
          </p>
        </div>

        {/* FAQ list */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 sm:p-8">
          <div className="space-y-4">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group border border-[#E5E5E7] rounded-xl px-4 py-3 open:bg-[#F5F5F7]"
              >
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm sm:text-base font-semibold text-[#1D1D1F]">
                    {item.question}
                  </span>
                  <span className="ml-3 text-[#6E6E73] group-open:hidden">＋</span>
                  <span className="ml-3 text-[#6E6E73] hidden group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-sm text-[#6E6E73] leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#6E6E73]">
            Still stuck? Visit the Help Center or use the contact page to reach our support team.
          </p>
        </section>
      </div>
    </div>
  )
}

