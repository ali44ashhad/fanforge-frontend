// import React, { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useCart } from '../../hooks/useCart'
// import { useAuth } from '../../hooks/useAuth'
// import { orderService } from '../../services/orderService'
// import { useNotifications } from '../../context/NotificationContext'
// import Button from '../../components/common/Button'
// import Input from '../../components/common/Input'
// import RequireAuth from '../../components/auth/RequireAuth'

// function Checkout() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { items, subtotal, clear } = useCart()
//   const { user } = useAuth()
//   const { notify } = useNotifications()
//   const [formData, setFormData] = useState({
//     buyerAddress: user?.address || '',
//     buyerPhone: user?.phoneNumber || '',
//     buyerNotes: '',
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   // If coming from "Buy Now", use that product
//   const buyNowProduct = location.state?.product
//   const checkoutItems = buyNowProduct ? [buyNowProduct] : items

//   if (checkoutItems.length === 0) {
//     navigate('/cart')
//     return null
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     try {
//       // For now, place order for first item. In a real app, you'd handle multiple items
//       const product = checkoutItems[0]
//       await orderService.placeOrder({
//         productId: product.id || product._id,
//         buyerAddress: formData.buyerAddress,
//         buyerPhone: formData.buyerPhone,
//         buyerNotes: formData.buyerNotes,
//       })
//       clear()
//       notify('Order placed successfully!', { type: 'success' })
//       navigate('/order-success', { state: { order: { product } } })
//     } catch (err) {
//       notify(err?.message || 'Failed to place order', { type: 'error' })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <RequireAuth>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Shipping Form */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                 Shipping Information
//               </h2>
//               <div className="space-y-4">
//                 <Input
//                   label="Full Address"
//                   required
//                   value={formData.buyerAddress}
//                   onChange={(e) => setFormData({ ...formData, buyerAddress: e.target.value })}
//                   placeholder="123 Main St, City, State, ZIP"
//                 />
//                 <Input
//                   label="Phone Number"
//                   type="tel"
//                   required
//                   value={formData.buyerPhone}
//                   onChange={(e) => setFormData({ ...formData, buyerPhone: e.target.value })}
//                   placeholder="+1 (555) 123-4567"
//                 />
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Notes for Seller (Optional)
//                   </label>
//                   <textarea
//                     value={formData.buyerNotes}
//                     onChange={(e) => setFormData({ ...formData, buyerNotes: e.target.value })}
//                     rows={4}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
//                     placeholder="Any special instructions..."
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Important Notice */}
//             <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
//               <p className="text-sm text-amber-800 dark:text-amber-300">
//                 <strong>Important:</strong> After placing your order, you'll receive the seller's
//                 contact information to arrange payment and shipping directly. FanForge does not
//                 process payments.
//               </p>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                 Order Summary
//               </h2>
//               <div className="space-y-3 mb-6">
//                 {checkoutItems.map((item) => (
//                   <div key={item.id} className="flex gap-3">
//                     <img
//                       src={item.image || '/placeholder-product.jpg'}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Qty: {item.quantity || 1}
//                       </p>
//                     </div>
//                     <p className="font-bold text-gray-900 dark:text-white">
//                       ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
//                     </p>
//                   </div>
//                 ))}
//                 <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
//                   <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
//                     <span>Total</span>
//                     <span>${subtotal.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//               <Button type="submit" fullWidth size="large" isLoading={isSubmitting}>
//                 Place Order
//               </Button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </RequireAuth>
//   )
// }

// export default Checkout

import React, { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { orderService } from '../../services/orderService'
import { useNotifications } from '../../context/NotificationContext'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import RequireAuth from '../../components/auth/RequireAuth'

function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { items, subtotal, clear } = useCart()
  const { user, isSeller, isAdmin } = useAuth()
  const { notify } = useNotifications()
  const [formData, setFormData] = useState({
    buyerAddress: user?.address || '',
    buyerPhone: user?.phoneNumber || '',
    buyerNotes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // If coming from "Buy Now", use that product (may need quantity from state)
  const buyNowProduct = location.state?.product
  const buyNowQty = location.state?.quantity || 1
  const checkoutItems = buyNowProduct
    ? [{ ...buyNowProduct, quantity: buyNowQty }]
    : items

  const orderSubtotal = checkoutItems.reduce(
    (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1),
    0
  )

  // Get display image: cart items have normalized .image; raw product may have .images array
  const getItemImage = (item) => {
    if (item.image) return item.image
    const imgs = item.images ?? item.raw?.images
    if (Array.isArray(imgs) && imgs.length > 0) {
      const first = imgs[0]
      return typeof first === 'string' ? first : first?.url || ''
    }
    return '/placeholder-product.jpg'
  }

  if (isSeller || isAdmin) return <Navigate to="/marketplace" replace />
  if (checkoutItems.length === 0) {
    navigate('/cart')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const product = checkoutItems[0]
      const res = await orderService.placeOrder({
        productId: product.id || product._id,
        buyerAddress: formData.buyerAddress,
        buyerPhone: formData.buyerPhone,
        buyerNotes: formData.buyerNotes,
      })
      clear()
      notify('Order placed successfully!', { type: 'success' })
      const orderData = res?.data ?? res
      const placedOrder = orderData?.data ?? orderData
      navigate('/order-success', { state: { order: placedOrder, product } })
    } catch (err) {
      notify(err?.message || 'Failed to place order', { type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-[#F5F5F7] py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] mb-2">Checkout</h1>
          <p className="text-sm sm:text-base text-[#6E6E73] mb-6 sm:mb-8">Enter shipping details and review your order.</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Shipping Information */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-2 lg:order-1">
              <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-[#E5E5E7] p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-[#1D1D1F] mb-1">
                  Shipping Information
                </h2>
                <p className="text-sm text-[#6E6E73] mb-6">
                  We&apos;ll share this with the seller so they can ship your order.
                </p>
                <div className="space-y-4">
                  <Input
                    label="Full Address*"
                    required
                    value={formData.buyerAddress}
                    onChange={(e) => setFormData({ ...formData, buyerAddress: e.target.value })}
                    placeholder="Street, city, state, PIN"
                  />
                  <Input
                    label="Phone Number*"
                    type="tel"
                    required
                    value={formData.buyerPhone}
                    onChange={(e) => setFormData({ ...formData, buyerPhone: e.target.value })}
                    placeholder="e.g. 9876543210"
                  />
                  <div>
                    <label className="block text-sm font-medium text-[#1D1D1F] mb-1">
                      Notes for Seller (Optional)
                    </label>
                    <textarea
                      value={formData.buyerNotes}
                      onChange={(e) => setFormData({ ...formData, buyerNotes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-[#E5E5E7] rounded-xl bg-white text-[#1D1D1F] placeholder:text-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] transition-colors"
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>
              </section>

              {/* Important Notice */}
              <div className="flex gap-3 rounded-2xl border border-[#E5E5E7] bg-[#FFF9E6] p-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF9500]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#FF9500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p className="text-sm text-[#6E6E73]">
                  <strong className="text-[#1D1D1F]">Important:</strong> After placing your order, you&apos;ll receive the seller&apos;s contact information to arrange payment and shipping directly. FanForge does not process payments.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-[#E5E5E7] p-4 sm:p-6 sticky top-20 sm:top-24 lg:top-8">
                <h2 className="text-xl font-semibold text-[#1D1D1F] mb-4">
                  Order Summary
                </h2>
                <ul className="space-y-3 sm:space-y-4 mb-6">
                  {checkoutItems.map((item) => (
                    <li key={item.id || item._id} className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden bg-[#F5F5F7] border border-[#E5E5E7]">
                        <img
                          src={getItemImage(item)}
                          alt={item.name || item.title || 'Product'}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = '/placeholder-product.jpg' }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#1D1D1F] truncate">
                          {item.name || item.title || 'Product'}
                        </p>
                        <p className="text-sm text-[#6E6E73]">
                          Qty: {item.quantity || 1}
                        </p>
                      </div>
                      <p className="flex-shrink-0 font-semibold text-[#1D1D1F]">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[#E5E5E7] pt-4">
                  <div className="flex justify-between text-lg font-semibold text-[#1D1D1F]">
                    <span>Total</span>
                    <span>${orderSubtotal.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  isLoading={isSubmitting}
                  className="mt-6"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </RequireAuth>
  )
}

export default Checkout