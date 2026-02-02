import React from 'react'

export default function Returns() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-[#1D1D1F] mb-6">Returns & Refunds Policy</h1>
      
      <div className="prose max-w-none space-y-6 text-[#6E6E73]">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-[#FF9500] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-amber-900 font-medium mb-1">Important Notice</p>
              <p className="text-amber-800 text-sm">
                FanForge is a peer-to-peer marketplace. Returns and refunds are handled directly between buyers and sellers.
              </p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">Overview</h2>
          <p>
            At FanForge, we facilitate connections between creators/sellers and buyers. Since transactions occur directly between parties, our role is to provide a platform for communication and dispute resolution when needed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">Seller-Determined Policies</h2>
          <p>
            Each seller on FanForge sets their own return and refund policies. Before making a purchase, please review the seller's specific policies listed on their store page.
          </p>
          
          <div className="bg-[#F5F5F7] rounded-lg p-5 mt-4">
            <h3 className="font-semibold text-[#1D1D1F] mb-3">Common Seller Policies May Include:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>No returns accepted</strong> - Common for custom or personalized items</li>
              <li><strong>Returns accepted within 14-30 days</strong> - For non-custom items in original condition</li>
              <li><strong>Exchanges only</strong> - Size/color exchanges may be offered</li>
              <li><strong>Store credit only</strong> - Refunds issued as credit for future purchases</li>
              <li><strong>Buyer pays return shipping</strong> - Standard for peer-to-peer platforms</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">When Returns Are Typically Accepted</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Item received is damaged or defective</li>
            <li>Item received differs significantly from the description</li>
            <li>Wrong item was shipped</li>
            <li>Item doesn't fit (if seller accepts size exchanges)</li>
          </ul>
          
          <p className="mt-4 text-[#FF3B30] font-medium">
            Note: Returns for "change of mind" are at the seller's discretion and not guaranteed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">Return Process</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#007AFF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
              <div>
                <h4 className="font-medium text-[#1D1D1F]">Contact the Seller</h4>
                <p className="text-sm">Message the seller through the platform within 48 hours of receiving your order</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007AFF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
              <div>
                <h4 className="font-medium text-[#1D1D1F]">Provide Details</h4>
                <p className="text-sm">Explain the issue and provide photos if applicable (damage, wrong item, etc.)</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007AFF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
              <div>
                <h4 className="font-medium text-[#1D1D1F]">Follow Seller's Instructions</h4>
                <p className="text-sm">The seller will provide return instructions if they accept the return</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007AFF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</div>
              <div>
                <h4 className="font-medium text-[#1D1D1F]">Ship the Return</h4>
                <p className="text-sm">Ship the item back with tracking. Keep your receipt!</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">Refund Timeline</h2>
          <p>
            Once the seller receives and inspects the returned item, they should issue a refund within:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>3-5 business days</strong> for digital payments (PayPal, Venmo, etc.)</li>
            <li><strong>5-10 business days</strong> for credit card refunds</li>
            <li><strong>1-2 business days</strong> for cryptocurrency refunds</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">Platform Protection</h2>
          <div className="bg-[#EBF5FF] border border-[#C2E0FF] rounded-xl p-6">
            <h3 className="font-semibold text-[#1D1D1F] mb-3">When We Step In</h3>
            <p className="mb-4">FanForge may intervene in disputes when:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The seller is unresponsive for more than 72 hours</li>
              <li>Clear evidence of fraud is provided</li>
              <li>The item received is significantly different from what was advertised</li>
              <li>The seller violates our platform policies</li>
            </ul>
            <p className="mt-4 text-sm text-[#004C99]">
              To request platform intervention, contact support with order details and evidence.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">Non-Returnable Items</h2>
          <p>The following items are typically non-returnable:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Custom or personalized items</li>
            <li>Digital products (downloads, eBooks, digital art)</li>
            <li>Items marked as "final sale"</li>
            <li>Items damaged by the buyer</li>
            <li>Items not in original condition (worn, washed, altered)</li>
          </ul>
        </section>

        <div className="pt-6 border-t border-[#E5E5E7]">
          <p className="text-sm text-[#6E6E73]">
            <strong>Last Updated:</strong> January 20, 2026<br />
            <strong>Policy Version:</strong> 2.0<br />
            This policy may be updated. Please check back periodically for changes.
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}