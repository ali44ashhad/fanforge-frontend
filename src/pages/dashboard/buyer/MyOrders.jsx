import React from 'react'
import { Link } from 'react-router-dom'
import { useOrders } from '../../../hooks/useOrders'
import { orderService } from '../../../services/orderService'
import { useNotifications } from '../../../context/NotificationContext'
import OrderHistory from '../../../components/dashboard/buyer/OrderHistory'
import Loader from '../../../components/common/Loader'
import EmptyState from '../../../components/common/EmptyState'

export default function MyOrders() {
  const { orders, isLoading, reload } = useOrders({ mode: 'buyer' })
  const { notify } = useNotifications()

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return
    try {
      await orderService.cancel(orderId)
      notify('Order cancelled successfully', { type: 'success' })
      reload()
    } catch (err) {
      notify(err?.message || 'Failed to cancel order', { type: 'error' })
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading orders..." />
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Start shopping to see your orders here"
        actionLabel="Browse Products"
        onAction={() => (window.location.href = '/marketplace')}
      />
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">My Orders</h2>
      <OrderHistory orders={orders} onCancel={handleCancel} />
    </div>
  )
}
