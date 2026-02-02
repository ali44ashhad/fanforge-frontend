// import React from 'react'
// import { useOrders } from '../../../hooks/useOrders'
// import { orderService } from '../../../services/orderService'
// import { useNotifications } from '../../../context/NotificationContext'
// import OrderList from '../../../components/dashboard/seller/OrderList'
// import Loader from '../../../components/common/Loader'
// import EmptyState from '../../../components/common/EmptyState'

// export default function SellerOrders() {
//   const { orders, isLoading, reload } = useOrders({ mode: 'seller' })
//   const { notify } = useNotifications()

//   const handleStatusUpdate = async (orderId, newStatus) => {
//     try {
//       await orderService.updateStatus(orderId, newStatus)
//       notify('Order status updated successfully', { type: 'success' })
//       reload()
//     } catch (err) {
//       notify(err?.message || 'Failed to update order status', { type: 'error' })
//     }
//   }

//   if (isLoading) {
//     return <Loader fullScreen text="Loading orders..." />
//   }

//   if (orders.length === 0) {
//     return (
//       <EmptyState
//         title="No orders yet"
//         description="Orders from buyers will appear here"
//       />
//     )
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Orders</h2>
//       <OrderList orders={orders} onStatusUpdate={handleStatusUpdate} />
//     </div>
//   )
// }

import React from 'react'
import { useOrders } from '../../../hooks/useOrders'
import { orderService } from '../../../services/orderService'
import { useNotifications } from '../../../context/NotificationContext'
import OrderList from '../../../components/dashboard/seller/OrderList'
import Loader from '../../../components/common/Loader'
import EmptyState from '../../../components/common/EmptyState'

export default function SellerOrders() {
  const { orders, isLoading, reload } = useOrders({ mode: 'seller' })
  const { notify } = useNotifications()

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus)
      notify('Order status updated successfully', { type: 'success' })
      reload()
    } catch (err) {
      notify(err?.message || 'Failed to update order status', { type: 'error' })
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading orders..." />
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Orders from buyers will appear here"
      />
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Orders</h2>
      <OrderList orders={orders} onStatusUpdate={handleStatusUpdate} />
    </div>
  )
}