import React from 'react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-[#1D1D1F] mb-6">Terms of Service</h1>
      
      <div className="prose max-w-none space-y-8 text-[#6E6E73]">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 mb-6">
          <p className="text-[#1D1D1F] font-medium">
            By accessing or using FanForge, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">1. Platform Overview</h2>
          <p>
            FanForge is a peer-to-peer marketplace platform that connects creators/sellers ("Sellers") with buyers ("Buyers") for the sale of official and fan-made merchandise. We provide the platform but do not directly handle transactions, inventory, or shipping.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">2. User Accounts</h2>
          <h3 className="font-semibold text-[#1D1D1F] mb-3">2.1 Account Creation</h3>
          <p>To use certain features, you must register for an account. You agree to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update your information if it changes</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
          
          <h3 className="font-semibold text-[#1D1D1F] mt-6 mb-3">2.2 Account Restrictions</h3>
          <p>You may not:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Create multiple accounts without permission</li>
            <li>Use another user's account</li>
            <li>Create accounts for automated use (bots)</li>
            <li>Use false or misleading information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">3. Seller Responsibilities</h2>
          <p>Sellers agree to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Accurately describe items with clear photos</li>
            <li>Set and honor their own return/refund policies</li>
            <li>Ship items promptly after payment confirmation</li>
            <li>Handle customer service inquiries professionally</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Only sell items they have the right to sell</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">4. Buyer Responsibilities</h2>
          <p>Buyers agree to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Read item descriptions and seller policies before purchasing</li>
            <li>Make payments promptly after ordering</li>
            <li>Communicate respectfully with sellers</li>
            <li>Inspect items upon delivery and report issues promptly</li>
            <li>Not initiate fraudulent chargebacks</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">5. Prohibited Items & Activities</h2>
          <div className="bg-[#FFEBE9] border border-[#FFCDD2] rounded-lg p-5">
            <h3 className="font-semibold text-[#D32F2F] mb-3">Strictly Prohibited:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Counterfeit or unauthorized replicas</li>
              <li>Items infringing on intellectual property rights</li>
              <li>Hate speech or discriminatory content</li>
              <li>Adult content or explicit material</li>
              <li>Dangerous or illegal items</li>
              <li>Stolen goods</li>
              <li>Misleading or deceptive listings</li>
            </ul>
          </div>
          <p className="mt-4">
            FanForge reserves the right to remove any listing or suspend any account violating these prohibitions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">6. Fees & Payments</h2>
          <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg p-5">
            <h3 className="font-semibold text-[#2E7D32] mb-2">No Platform Fees</h3>
            <p>
              FanForge currently charges no platform fees to buyers or sellers. All payments are processed directly between users.
            </p>
          </div>
          <p className="mt-4">
            This policy may change with 30 days' notice. Users will be notified of any fee changes before they take effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">7. Intellectual Property</h2>
          <p>
            Sellers must only list items they have the legal right to sell. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Original creations</li>
            <li>Officially licensed merchandise</li>
            <li>Fan art within fair use/fair dealing guidelines</li>
            <li>Items with proper authorization from rights holders</li>
          </ul>
          <p className="mt-4">
            FanForge responds to legitimate DMCA takedown notices. Repeat infringers may have their accounts terminated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">8. Dispute Resolution</h2>
          <p>
            Users are encouraged to resolve disputes directly. If unable to resolve, FanForge may mediate at our discretion. Our decision in disputes is final.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">9. Limitation of Liability</h2>
          <p>
            FanForge provides the platform "as is" without warranties. We are not liable for:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Transactions between users</li>
            <li>Quality or legality of items sold</li>
            <li>Seller or buyer conduct</li>
            <li>Shipping delays or issues</li>
            <li>Payment disputes</li>
            <li>Indirect or consequential damages</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">10. Termination</h2>
          <p>
            We may suspend or terminate accounts for violation of these terms, illegal activities, or harmful conduct. Users may terminate their accounts at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">11. Changes to Terms</h2>
          <p>
            We may update these terms. Continued use after changes constitutes acceptance. We will notify users of significant changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">12. Contact Information</h2>
          <p>
            For questions about these Terms of Service, contact us at:
          </p>
          <div className="bg-[#F5F5F7] rounded-lg p-4 mt-2">
            <p className="font-medium text-[#1D1D1F]">FanForge Support</p>
            <p className="text-sm">Email: legal@fanforge.com</p>
            <p className="text-sm">Response Time: 2-3 business days</p>
          </div>
        </section>

        <div className="pt-6 border-t border-[#E5E5E7]">
          <p className="text-sm text-[#6E6E73]">
            <strong>Effective Date:</strong> January 1, 2026<br />
            <strong>Governing Law:</strong> These terms are governed by the laws of ........<br />
              These terms constitute the entire agreement between you and FanForge.
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}