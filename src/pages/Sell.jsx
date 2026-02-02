import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sellerService } from '../services/sellerService'
import { useNotifications } from '../context/NotificationContext'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

export default function Sell() {
  const { isAuthed, isSeller } = useAuth()
  const { notify } = useNotifications()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    paymentMethods: '',
    averageShippingCost: '',
    estimatedDeliveryDays: '',
    shippingRegions: '',
    socialLinks: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthed) {
      notify('Please sign in as a buyer before applying to become a seller.', {
        type: 'warning',
      })
      navigate('/login', { state: { from: '/sell' } })
      return
    }

    if (isSeller) {
      notify('You are already an approved seller.', { type: 'info' })
      navigate('/dashboard/seller')
      return
    }

    setIsSubmitting(true)
    try {
      // Transform form fields to match backend Zod schema
      const paymentMethodsArray = String(formData.paymentMethods || '')
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean)

      const averageShippingCostNumber = Number(formData.averageShippingCost || 0)
      const estimatedDeliveryDaysNumber = Number(formData.estimatedDeliveryDays || 0)

      await sellerService.apply({
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        paymentMethods: paymentMethodsArray,
        averageShippingCost: averageShippingCostNumber,
        estimatedDeliveryDays: estimatedDeliveryDaysNumber,
        shippingRegions: formData.shippingRegions,
        socialLinks: formData.socialLinks,
      })
      notify('Application submitted. An admin will review your request.', {
        type: 'success',
      })
      navigate('/')
    } catch (err) {
      notify(err?.message || 'Failed to submit seller application.', {
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-4">Become a Seller</h1>
      <p className="text-[#6E6E73] mb-8">
        Apply to open your own shop on FanForge. Tell us about your business and how you plan
        to handle payments and shipping.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 sm:p-8">
        <Input
          label="Business Name"
          required
          value={formData.businessName}
          onChange={handleChange('businessName')}
          placeholder="Your brand or shop name"
          disabled={isSubmitting}
        />

        <div>
          <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
            Business Description
          </label>
          <textarea
            required
            rows={4}
            value={formData.businessDescription}
            onChange={handleChange('businessDescription')}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-[#E5E5E7] rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] outline-none"
            placeholder="Tell buyers what you sell and what makes your shop unique."
          />
        </div>

        <Input
          label="Payment Methods"
          required
          value={formData.paymentMethods}
          onChange={handleChange('paymentMethods')}
          placeholder="e.g. UPI, bank transfer, PayPal"
          disabled={isSubmitting}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Average Shipping Cost"
            type="text"
            required
            value={formData.averageShippingCost}
            onChange={handleChange('averageShippingCost')}
            placeholder="e.g. $5 flat, varies by region"
            disabled={isSubmitting}
          />
          <Input
            label="Estimated Delivery Days"
            type="text"
            required
            value={formData.estimatedDeliveryDays}
            onChange={handleChange('estimatedDeliveryDays')}
            placeholder="e.g. 5-10"
            disabled={isSubmitting}
          />
        </div>

        <Input
          label="Shipping Regions"
          type="text"
          required
          value={formData.shippingRegions}
          onChange={handleChange('shippingRegions')}
          placeholder="e.g. India only, Europe & US, Worldwide"
          disabled={isSubmitting}
        />

        <Input
          label="Social / Portfolio Links"
          type="text"
          value={formData.socialLinks}
          onChange={handleChange('socialLinks')}
          placeholder="Optional: Instagram, website, portfolio, etc."
          disabled={isSubmitting}
        />

        <div className="pt-2">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} fullWidth>
            Submit Application
          </Button>
        </div>
      </form>
      </div>
    </div>
  )
}

