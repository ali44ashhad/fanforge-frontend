// import React, { useState, useEffect } from 'react'
// import { sellerService } from '../../../services/sellerService'
// import { useNotifications } from '../../../context/NotificationContext'
// import Button from '../../../components/common/Button'
// import Input from '../../../components/common/Input'
// import Loader from '../../../components/common/Loader'

// export default function SellerSettings() {
//   const { notify } = useNotifications()
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSaving, setIsSaving] = useState(false)
//   const [formData, setFormData] = useState({
//     businessName: '',
//     businessDescription: '',
//     paymentMethods: [],
//     averageShippingCost: '',
//     estimatedDeliveryDays: '',
//     shippingRegions: '',
//     socialLinks: '',
//   })

//   useEffect(() => {
//     loadProfile()
//   }, [])

//   const loadProfile = async () => {
//     setIsLoading(true)
//     try {
//       const data = await sellerService.getProfile()
//       const profile = data?.seller || data
//       setFormData({
//         businessName: profile.businessName || '',
//         businessDescription: profile.businessDescription || '',
//         paymentMethods: profile.paymentMethods || [],
//         averageShippingCost: profile.averageShippingCost || '',
//         estimatedDeliveryDays: profile.estimatedDeliveryDays || '',
//         shippingRegions: profile.shippingRegions || '',
//         socialLinks: profile.socialLinks || '',
//       })
//     } catch (err) {
//       notify('Failed to load seller profile', { type: 'error' })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSaving(true)
//     try {
//       await sellerService.updateProfile(formData)
//       notify('Profile updated successfully', { type: 'success' })
//     } catch (err) {
//       notify(err?.message || 'Failed to update profile', { type: 'error' })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   if (isLoading) {
//     return <Loader fullScreen text="Loading settings..." />
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Seller Settings</h2>
//       <form onSubmit={handleSubmit} className="max-w-2xl">
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
//           <Input
//             label="Business Name"
//             value={formData.businessName}
//             onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
//             disabled={isSaving}
//           />
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Business Description
//             </label>
//             <textarea
//               value={formData.businessDescription}
//               onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
//               rows={4}
//               disabled={isSaving}
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//             />
//           </div>
//           <Input
//             label="Average Shipping Cost"
//             type="number"
//             value={formData.averageShippingCost}
//             onChange={(e) => setFormData({ ...formData, averageShippingCost: e.target.value })}
//             disabled={isSaving}
//           />
//           <Input
//             label="Estimated Delivery Days"
//             type="number"
//             value={formData.estimatedDeliveryDays}
//             onChange={(e) => setFormData({ ...formData, estimatedDeliveryDays: e.target.value })}
//             disabled={isSaving}
//           />
//           <Input
//             label="Shipping Regions"
//             value={formData.shippingRegions}
//             onChange={(e) => setFormData({ ...formData, shippingRegions: e.target.value })}
//             disabled={isSaving}
//             placeholder="e.g., India, USA, UK"
//           />
//           <Input
//             label="Social Links"
//             value={formData.socialLinks}
//             onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
//             disabled={isSaving}
//             placeholder="e.g., instagram.com/yourstore"
//           />
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Payment Methods Accepted
//             </label>
//             <div className="space-y-2">
//               {formData.paymentMethods && formData.paymentMethods.length > 0 ? (
//                 <div className="space-y-2">
//                   {formData.paymentMethods.map((method, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       <input
//                         type="text"
//                         value={typeof method === 'string' ? method : method.method || ''}
//                         onChange={(e) => {
//                           const updated = [...formData.paymentMethods]
//                           updated[index] = typeof method === 'string' ? e.target.value : { ...method, method: e.target.value }
//                           setFormData({ ...formData, paymentMethods: updated })
//                         }}
//                         disabled={isSaving}
//                         className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                         placeholder="e.g., UPI, Bank Transfer, Cash on Delivery"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           const updated = formData.paymentMethods.filter((_, i) => i !== index)
//                           setFormData({ ...formData, paymentMethods: updated })
//                         }}
//                         disabled={isSaving}
//                         className="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-500 dark:text-gray-400">No payment methods added yet</p>
//               )}
//               <button
//                 type="button"
//                 onClick={() => {
//                   setFormData({
//                     ...formData,
//                     paymentMethods: [...(formData.paymentMethods || []), ''],
//                   })
//                 }}
//                 disabled={isSaving}
//                 className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
//               >
//                 + Add Payment Method
//               </button>
//             </div>
//             <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
//               List the payment methods you accept. This will be shown to buyers.
//             </p>
//           </div>
//           <Button type="submit" isLoading={isSaving} disabled={isSaving}>
//             Save Changes
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { sellerService } from '../../../services/sellerService'
import { useNotifications } from '../../../context/NotificationContext'
import Button from '../../../components/common/Button'
import Input from '../../../components/common/Input'
import Loader from '../../../components/common/Loader'

export default function SellerSettings() {
  const { notify } = useNotifications()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    paymentMethods: [],
    averageShippingCost: '',
    estimatedDeliveryDays: '',
    shippingRegions: '',
    socialLinks: '',
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    setIsLoading(true)
    try {
      const res = await sellerService.getProfile()
      // Backend returns { success, data: sellerProfile }; some wrappers may use .seller
      const profile = res?.data ?? res?.seller ?? res
      if (!profile || typeof profile !== 'object') {
        setIsLoading(false)
        return
      }
      setFormData({
        businessName: profile.businessName ?? '',
        businessDescription: profile.businessDescription ?? '',
        paymentMethods: Array.isArray(profile.paymentMethods) ? profile.paymentMethods : [],
        averageShippingCost: profile.averageShippingCost != null ? String(profile.averageShippingCost) : '',
        estimatedDeliveryDays: profile.estimatedDeliveryDays != null ? String(profile.estimatedDeliveryDays) : '',
        shippingRegions: profile.shippingRegions ?? '',
        socialLinks: profile.socialLinks ?? '',
      })
    } catch (err) {
      notify(err?.data?.message || err?.message || 'Failed to load seller profile', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const payload = {
        ...formData,
        averageShippingCost: formData.averageShippingCost === '' ? undefined : Number(formData.averageShippingCost),
        estimatedDeliveryDays: formData.estimatedDeliveryDays === '' ? undefined : Number(formData.estimatedDeliveryDays),
      }
      await sellerService.updateProfile(payload)
      notify('Profile updated successfully', { type: 'success' })
    } catch (err) {
      notify(err?.data?.message || err?.message || 'Failed to update profile', { type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading settings..." />
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Seller Settings</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6 space-y-4">
          <Input
            label="Business Name"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            disabled={isSaving}
          />
          <div>
            <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
              Business Description
            </label>
            <textarea
              value={formData.businessDescription}
              onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
              rows={4}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-[#E5E5E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] text-[#1D1D1F] placeholder:text-[#6E6E73] transition-colors"
            />
          </div>
          <Input
            label="Average Shipping Cost"
            type="number"
            value={formData.averageShippingCost}
            onChange={(e) => setFormData({ ...formData, averageShippingCost: e.target.value })}
            disabled={isSaving}
          />
          <Input
            label="Estimated Delivery Days"
            type="number"
            value={formData.estimatedDeliveryDays}
            onChange={(e) => setFormData({ ...formData, estimatedDeliveryDays: e.target.value })}
            disabled={isSaving}
          />
          <Input
            label="Shipping Regions"
            value={formData.shippingRegions}
            onChange={(e) => setFormData({ ...formData, shippingRegions: e.target.value })}
            disabled={isSaving}
            placeholder="e.g., India, USA, UK"
          />
          <Input
            label="Social Links"
            value={formData.socialLinks}
            onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
            disabled={isSaving}
            placeholder="e.g., instagram.com/yourstore"
          />
          <div>
            <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
              Payment Methods Accepted
            </label>
            <div className="space-y-2">
              {formData.paymentMethods && formData.paymentMethods.length > 0 ? (
                <div className="space-y-2">
                  {formData.paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={typeof method === 'string' ? method : method.method || ''}
                        onChange={(e) => {
                          const updated = [...formData.paymentMethods]
                          updated[index] = typeof method === 'string' ? e.target.value : { ...method, method: e.target.value }
                          setFormData({ ...formData, paymentMethods: updated })
                        }}
                        disabled={isSaving}
                        className="flex-1 px-4 py-2 border border-[#E5E5E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] text-[#1D1D1F] placeholder:text-[#6E6E73] transition-colors"
                        placeholder="e.g., UPI, Bank Transfer, Cash on Delivery"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.paymentMethods.filter((_, i) => i !== index)
                          setFormData({ ...formData, paymentMethods: updated })
                        }}
                        disabled={isSaving}
                        className="px-3 py-2 text-[#FF3B30] hover:text-[#D70015] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF3B30] rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#6E6E73]">No payment methods added yet</p>
              )}
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    paymentMethods: [...(formData.paymentMethods || []), ''],
                  })
                }}
                disabled={isSaving}
                className="px-4 py-2 text-sm text-[#007AFF] hover:text-[#0056CC] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded"
              >
                + Add Payment Method
              </button>
            </div>
            <p className="text-xs text-[#6E6E73] mt-2">
              List the payment methods you accept. This will be shown to buyers.
            </p>
          </div>
          <Button type="submit" isLoading={isSaving} disabled={isSaving}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}