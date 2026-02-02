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
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../context/NotificationContext'
import Button from '../../components/common/Button'
import EmptyState from '../../components/common/EmptyState'

export default function Cart() {
  const { items, removeItem, setQuantity, subtotal, count } = useCart()
  const { isAuthed } = useAuth()
  const { notify } = useNotifications()
  const navigate = useNavigate()

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
      <div className="min-h-screen bg-[#F5F5F7] py-8">
        <div className="max-w-7xl mx-auto px-4">
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
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex gap-4"
            >
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.image || '/placeholder-product.jpg'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-[#1D1D1F] hover:text-[#007AFF] transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-[#E5E5E7] rounded-lg">
                    <button
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-inset rounded-l-lg"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 text-[#1D1D1F]">{item.quantity}</span>
                    <button
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-inset rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeItem(item.id)
                      notify('Removed from cart', { type: 'success' })
                    }}
                    className="text-red-600 hover:text-red-700 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#1D1D1F]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({count} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6E6E73]">
                <span>Platform Fee</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="border-t border-[#E5E5E7] pt-3">
                <div className="flex justify-between text-lg font-bold text-[#1D1D1F]">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button onClick={handleCheckout} fullWidth size="large">
              Proceed to Checkout
            </Button>
            <Link
              to="/marketplace"
              className="block text-center text-[#007AFF] hover:text-[#0056CC] mt-4 text-sm transition-colors"
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