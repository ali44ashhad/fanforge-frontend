import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { orderService } from '../../../services/orderService'
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  Phone,
} from 'lucide-react'
import Loader from '../../common/Loader'

const OrderTracking = () => {
  const { orderId } = useParams()
  const location = useLocation()
  const initialOrder = location.state?.order || null
  const [order, setOrder] = useState(initialOrder)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // If we already have the order from navigation state, just stop loading
    if (initialOrder) {
      setIsLoading(false)
      return
    }
    if (orderId) {
      loadOrder()
    }
  }, [orderId, initialOrder])

  const loadOrder = async () => {
    setIsLoading(true)
    try {
      // Get order from buyer orders list
      const data = await orderService.myOrdersBuyer()
      const orders = data?.orders || data || []
      const found = orders.find((o) => (o.id || o._id) === orderId)
      if (found) {
        setOrder(found)
      }
    } catch (err) {
      // ignore
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const s = String(status || '').toLowerCase()
    if (s === 'pending') {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    }
    if (s === 'accepted' || s === 'processing') {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    }
    if (s === 'shipped' || s === 'out_for_delivery') {
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    }
    if (s === 'delivered') {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handleContactSeller = () => {
    if (!order?.seller) return
    const subject = `Regarding Order ${order.id || order._id}`
    const body = `Hello,\n\nI have a question about my order ${order.id || order._id}.\n\nBest regards`
    window.location.href = `mailto:${order.seller.email || order.seller.businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading order details..." />
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6E6E73]">Order not found</p>
      </div>
    )
  }

  const product = order.product || {}
  const seller = order.seller || {}
  const status = order.status || 'PENDING'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1D1D1F]">Order Tracking</h2>
        <p className="text-[#6E6E73]">Track your order status and shipping progress</p>
      </div>

      {/* Order Status */}
      <div className="bg-white rounded-lg border border-[#E5E5E7] overflow-hidden">
        <div className="p-6 border-b border-[#E5E5E7]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-[#1D1D1F]">
                  Order #{order.id || order._id}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    status
                  )}`}
                >
                  {status === 'SHIPPED' || status === 'shipped' ? (
                    <Truck size={14} />
                  ) : (
                    <Package size={14} />
                  )}
                  {status}
                </span>
              </div>
              <p className="text-[#6E6E73]">{product.name || product.title}</p>
              <p className="text-sm text-[#6E6E73] mt-1">
                Seller: {seller.businessName || seller.name || 'N/A'}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-[#1D1D1F]">
                ${Number(order.totalAmount ?? order.price ?? product?.price ?? 0).toFixed(2)}
              </p>
              <p className="text-sm text-[#6E6E73]">
                Ordered: {formatDate(order.createdAt || order.date)}
              </p>
            </div>
          </div>
        </div>

        {/* Status Info */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-[#007AFF]" />
            <div>
              <p className="font-medium text-[#1D1D1F]">Order Status</p>
              <p className="text-[#6E6E73]">
                {status === 'PENDING' && 'Your order is pending seller confirmation'}
                {status === 'ACCEPTED' && 'Seller has accepted your order'}
                {status === 'PROCESSING' && 'Seller is preparing your order'}
                {status === 'SHIPPED' && 'Your order has been shipped'}
                {status === 'DELIVERED' && 'Your order has been delivered'}
                {status === 'CANCELLED' && 'This order has been cancelled'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Contact */}
      {seller && (status === 'ACCEPTED' || status === 'PROCESSING' || status === 'SHIPPED') && (
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
          <h4 className="text-lg font-semibold text-[#1D1D1F] mb-4">
            Seller Contact & Support
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-[#6E6E73] mb-2">Seller Information</p>
              <p className="font-medium text-[#1D1D1F]">
                {seller.businessName || seller.name || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#6E6E73] mb-2">Contact Options</p>
              <div className="flex flex-wrap gap-2">
                {seller.email || seller.businessEmail ? (
                  <button
                    onClick={handleContactSeller}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#007AFF] text-white rounded-lg hover:bg-[#0056D6] transition-colors text-sm font-medium"
                  >
                    <MessageSquare size={16} />
                    Message Seller
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          {/* Important Notes */}
          <div className="mt-6 pt-6 border-t border-[#E5E5E7]">
            <div className="flex items-start gap-3 p-4 bg-[#FFF4E5] rounded-lg border border-[#FFE0B2]">
              <AlertCircle size={20} className="text-[#FF9500] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#1D1D1F] mb-1">Important Information</p>
                <ul className="text-sm text-[#6E6E73] space-y-1">
                  <li>• FanForge does not handle shipping - contact the seller directly</li>
                  <li>• Payment was arranged directly with the seller</li>
                  <li>• For returns or refunds, contact the seller using the information above</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderTracking
