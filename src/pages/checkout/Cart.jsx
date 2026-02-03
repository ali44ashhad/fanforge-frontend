// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useCart } from '../../hooks/useCart'
// import { useAuth } from '../../hooks/useAuth'
// import { useNotifications } from '../../context/NotificationContext'
// import Button from '../../components/common/Button'
// import EmptyState from '../../components/common/EmptyState'

// export default function Cart() {
//   const { items, removeItem, setQuantity, subtotal, count } = useCart()
//   const { isAuthed } = useAuth()
//   const { notify } = useNotifications()
//   const navigate = useNavigate()

//   const handleCheckout = () => {
//     if (!isAuthed) {
//       notify('Please sign in to checkout', { type: 'warning' })
//       navigate('/login', { state: { from: '/checkout' } })
//       return
//     }
//     if (items.length === 0) {
//       notify('Your cart is empty', { type: 'warning' })
//       return
//     }
//     navigate('/checkout')
//   }

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <EmptyState
//           title="Your cart is empty"
//           description="Add some products to your cart to get started"
//           actionLabel="Browse Products"
//           onAction={() => navigate('/marketplace')}
//         />
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Shopping Cart</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Cart Items */}
//         <div className="lg:col-span-2 space-y-4">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex gap-4"
//             >
//               <Link to={`/product/${item.id}`} className="flex-shrink-0">
//                 <img
//                   src={item.image || '/placeholder-product.jpg'}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//               </Link>
//               <div className="flex-1">
//                 <Link to={`/product/${item.id}`}>
//                   <h3 className="font-semibold text-gray-900 dark:text-white hover:text-primary">
//                     {item.name}
//                   </h3>
//                 </Link>
//                 <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
//                   ${item.price.toFixed(2)}
//                 </p>
//                 <div className="flex items-center gap-4 mt-4">
//                   <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
//                     <button
//                       onClick={() => setQuantity(item.id, item.quantity - 1)}
//                       className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
//                     >
//                       −
//                     </button>
//                     <span className="px-4 py-1 text-gray-900 dark:text-white">{item.quantity}</span>
//                     <button
//                       onClick={() => setQuantity(item.id, item.quantity + 1)}
//                       className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => {
//                       removeItem(item.id)
//                       notify('Removed from cart', { type: 'success' })
//                     }}
//                     className="text-red-600 hover:text-red-700 text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-xl font-bold text-gray-900 dark:text-white">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="lg:col-span-1">
//           <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//               Order Summary
//             </h2>
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between text-gray-600 dark:text-gray-400">
//                 <span>Subtotal ({count} items)</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-gray-600 dark:text-gray-400">
//                 <span>Platform Fee</span>
//                 <span className="text-green-600 dark:text-green-400 font-medium">FREE</span>
//               </div>
//               <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
//                 <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
//                   <span>Total</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//             <Button onClick={handleCheckout} fullWidth size="large">
//               Proceed to Checkout
//             </Button>
//             <Link
//               to="/marketplace"
//               className="block text-center text-primary hover:text-primary-dark dark:hover:text-primary-light mt-4 text-sm"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../context/NotificationContext'
import Button from '../../components/common/Button'
import EmptyState from '../../components/common/EmptyState'

export default function Cart() {
  const { items, removeItem, setQuantity, subtotal, count } = useCart()
  const { isAuthed, isSeller, isAdmin } = useAuth()
  const { notify } = useNotifications()
  const navigate = useNavigate()

  if (isSeller || isAdmin) return <Navigate to="/marketplace" replace />

  const handleCheckout = () => {
    if (!isAuthed) {
      notify('Please sign in to checkout', { type: 'warning' })
      navigate('/login', { state: { from: '/checkout' } })
      return
    }
    if (items.length === 0) {
      notify('Your cart is empty', { type: 'warning' })
      return
    }
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EmptyState
            title="Your cart is empty"
            description="Add some products to your cart to get started"
            actionLabel="Browse Products"
            onAction={() => navigate('/marketplace')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] mb-4 sm:mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4 order-2 lg:order-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow border border-[#E5E5E7] p-4 sm:p-6 flex flex-col sm:flex-row sm:gap-4 gap-3"
              >
                <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold text-[#1D1D1F] hover:text-[#007AFF] transition-colors text-sm sm:text-base line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-base sm:text-lg font-bold text-[#1D1D1F] mt-1">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-[#E5E5E7] pt-3 sm:border-0 sm:pt-0 sm:flex-col sm:items-end">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#E5E5E7] rounded-lg">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="p-2 sm:px-3 sm:py-1 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-inset rounded-l-lg min-w-[44px]"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-3 sm:px-4 py-1 text-[#1D1D1F] min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="p-2 sm:px-3 sm:py-1 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-inset rounded-r-lg min-w-[44px]"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeItem(item.id)
                        notify('Removed from cart', { type: 'success' })
                      }}
                      className="text-[#FF3B30] hover:text-[#D70015] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1 py-2"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-[#1D1D1F]">
                    ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - show first on mobile so it's above cart list */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow border border-[#E5E5E7] p-4 sm:p-6 sticky top-20 sm:top-24 lg:top-8">
              <h2 className="text-lg sm:text-xl font-bold text-[#1D1D1F] mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm sm:text-base text-[#6E6E73]">
                  <span>Subtotal ({count} items)</span>
                  <span className="font-medium text-[#1D1D1F]">${Number(subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-[#6E6E73]">
                  <span>Platform Fee</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="border-t border-[#E5E5E7] pt-3">
                  <div className="flex justify-between text-base sm:text-lg font-bold text-[#1D1D1F]">
                    <span>Total</span>
                    <span>${Number(subtotal).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleCheckout} fullWidth size="large" className="!py-3">
                Proceed to Checkout
              </Button>
              <Link
                to="/marketplace"
                className="block text-center text-[#007AFF] hover:text-[#0056CC] mt-4 text-sm transition-colors py-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}