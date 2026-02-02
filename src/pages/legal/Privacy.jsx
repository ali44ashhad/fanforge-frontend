import React from 'react'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-[#1D1D1F] mb-6">Privacy Policy</h1>
      
      <div className="prose max-w-none space-y-8 text-[#6E6E73]">
        <div className="bg-[#EBF5FF] border border-[#C2E0FF] rounded-2xl p-6 mb-6 shadow-sm">
          <p className="text-[#1D1D1F] font-medium">
            Your privacy is important to us. This Privacy Policy explains how FanForge collects, uses, and protects your information.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">1. Information We Collect</h2>
          
          <h3 className="font-semibold text-[#1D1D1F] mb-3">1.1 Information You Provide</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account Information:</strong> Name, email, username, password</li>
            <li><strong>Profile Information:</strong> Bio, profile picture, location</li>
            <li><strong>Seller Information:</strong> Store name, payment details, tax information</li>
            <li><strong>Communication:</strong> Messages with other users, support tickets</li>
            <li><strong>Content:</strong> Product listings, reviews, comments</li>
          </ul>
          
          <h3 className="font-semibold text-[#1D1D1F] mt-6 mb-3">1.2 Automatically Collected Information</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent, features used</li>
            <li><strong>Cookies & Tracking:</strong> Session data, preferences, analytics</li>
            <li><strong>Location Data:</strong> General location (city/country level)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">2. How We Use Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F5F5F7] p-4 rounded-lg">
              <h4 className="font-semibold text-[#1D1D1F] mb-2">Platform Operation</h4>
              <ul className="text-sm space-y-1">
                <li>• Create and maintain your account</li>
                <li>• Facilitate user connections</li>
                <li>• Process transactions (peer-to-peer)</li>
                <li>• Display your listings and profile</li>
              </ul>
            </div>
            
            <div className="bg-[#F5F5F7] p-4 rounded-lg">
              <h4 className="font-semibold text-[#1D1D1F] mb-2">Communication</h4>
              <ul className="text-sm space-y-1">
                <li>• Send service notifications</li>
                <li>• Respond to support requests</li>
                <li>• Send platform updates</li>
                <li>• Facilitate user messaging</li>
              </ul>
            </div>
            
            <div className="bg-[#F5F5F7] p-4 rounded-lg">
              <h4 className="font-semibold text-[#1D1D1F] mb-2">Improvement & Safety</h4>
              <ul className="text-sm space-y-1">
                <li>• Improve platform features</li>
                <li>• Prevent fraud and abuse</li>
                <li>• Analyze usage patterns</li>
                <li>• Ensure compliance with policies</li>
              </ul>
            </div>
            
            <div className="bg-[#F5F5F7] p-4 rounded-lg">
              <h4 className="font-semibold text-[#1D1D1F] mb-2">Legal Compliance</h4>
              <ul className="text-sm space-y-1">
                <li>• Comply with legal obligations</li>
                <li>• Enforce our terms of service</li>
                <li>• Protect rights and safety</li>
                <li>• Respond to legal requests</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share information with:</p>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start">
              <div className="bg-[#007AFF] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</div>
              <div>
                <h4 className="font-medium text-[#1D1D1F]">Other Users</h4>
                <p className="text-sm">Profile information and listings are visible to other users as intended</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007AFF] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</div>
              <div>
                <h4 className="font-medium text-[#1D1D1F]">Service Providers</h4>
                <p className="text-sm">Trusted partners who help operate the platform (hosting, analytics)</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007AFF] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</div>
              <div>
                <h4 className="font-medium text-[#1D1D1F]">Legal Authorities</h4>
                <p className="text-sm">When required by law or to protect rights and safety</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007AFF] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</div>
              <div>
                <h4 className="font-medium text-[#1D1D1F]">Business Transfers</h4>
                <p className="text-sm">In connection with merger, acquisition, or sale of assets</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">4. Payment Information</h2>
          <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg p-5">
            <h3 className="font-semibold text-[#2E7D32] mb-2">Important: We Don't Process Payments</h3>
            <p>
              FanForge does not handle payment processing. All payments occur directly between buyers and sellers using third-party services (PayPal, Venmo, etc.). We do not collect or store payment card information.
            </p>
          </div>
          <p className="mt-4">
            You are responsible for reviewing the privacy policies of any payment services you use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">5. Cookies & Tracking</h2>
          <p>We use cookies and similar technologies for:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Essential Functionality:</strong> Login sessions, shopping cart</li>
            <li><strong>Preferences:</strong> Language settings, display preferences</li>
            <li><strong>Analytics:</strong> Understanding how users interact with our platform</li>
            <li><strong>Security:</strong> Preventing fraud and abuse</li>
          </ul>
          <p className="mt-4">
            You can control cookies through your browser settings, but this may affect platform functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">6. Data Security</h2>
          <p>We implement appropriate security measures to protect your information:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Encryption of sensitive data</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Secure infrastructure</li>
          </ul>
          <p className="mt-4 text-[#FF3B30]">
            However, no online platform is 100% secure. Please use strong passwords and report any security concerns immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">7. Your Rights & Choices</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#E5E5E7]">
              <span className="font-medium text-[#1D1D1F]">Access Your Data</span>
              <span className="text-[#007AFF] text-sm">Request a copy of your information</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#E5E5E7]">
              <span className="font-medium text-[#1D1D1F]">Correct Information</span>
              <span className="text-[#007AFF] text-sm">Update inaccurate or incomplete data</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#E5E5E7]">
              <span className="font-medium text-[#1D1D1F]">Delete Account</span>
              <span className="text-[#007AFF] text-sm">Request account deletion</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#E5E5E7]">
              <span className="font-medium text-[#1D1D1F]">Opt-Out of Marketing</span>
              <span className="text-[#007AFF] text-sm">Unsubscribe from promotional emails</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-medium text-[#1D1D1F]">Data Portability</span>
              <span className="text-[#007AFF] text-sm">Request data in machine-readable format</span>
            </div>
          </div>
          <p className="mt-4 text-sm">
            To exercise these rights, contact us at privacy@fanforge.com. We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">8. Children's Privacy</h2>
          <div className="bg-[#FFF4E5] border border-[#FFE5B4] rounded-lg p-5">
            <p className="text-[#663C00] font-medium">
              FanForge is not intended for children under 13. We do not knowingly collect information from children under 13.
            </p>
          </div>
          <p className="mt-4">
            If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">9. International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy. We will notify you of significant changes via email or platform notification. Continued use after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">11. Contact Us</h2>
          <div className="bg-[#F5F5F7] rounded-lg p-5">
            <p className="font-medium text-[#1D1D1F]">Privacy Questions & Concerns</p>
            <p className="mt-2">Email: privacy@fanforge.com</p>
            <p>Response Time: 3-5 business days</p>
            <p className="mt-4 text-sm text-[#6E6E73]">
              For data access or deletion requests, please include "Privacy Request" in the subject line.
            </p>
          </div>
        </section>

        <div className="pt-6 border-t border-[#E5E5E7]">
          <p className="text-sm text-[#6E6E73]">
            <strong>Effective Date:</strong> January 1, 2026<br />
            <strong>Governing Law:</strong> These terms are governed by the laws of [Your State/Country]<br />
            This Privacy Policy applies to the FanForge platform and services.
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}