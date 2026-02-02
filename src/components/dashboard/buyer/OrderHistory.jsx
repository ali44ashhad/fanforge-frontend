import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '../../common/Button'

function ChevronDown({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function ChevronUp({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  )
}

function getStatusColor(status) {
  const s = String(status || '').toUpperCase()
  if (s === 'PENDING') return 'bg-[#FFF4E5] text-[#663C00]'
  if (s === 'ACCEPTED' || s === 'PROCESSING') return 'bg-[#EBF5FF] text-[#004C99]'
  if (s === 'SHIPPED' || s === 'OUT_FOR_DELIVERY') return 'bg-[#F3E8FF] text-[#5A189A]'
  if (s === 'DELIVERED') return 'bg-[#E8F5E9] text-[#2E7D32]'
  if (s === 'CANCELLED') return 'bg-[#FFEBEE] text-[#C62828]'
  return 'bg-[#F5F5F7] text-[#1D1D1F]'
}

function getStatusLabel(status) {
  const s = String(status || '').toUpperCase()
  const labels = { PENDING: 'Pending', ACCEPTED: 'Accepted', PROCESSING: 'Processing', SHIPPED: 'Shipped', DELIVERED: 'Delivered', CANCELLED: 'Cancelled' }
  return labels[s] || s
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function OrderHistory({ orders = [], onCancel }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6E6E73]">No orders found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id || order._id} order={order} onCancel={onCancel} />
      ))}
    </div>
  )
}

function OrderCard({ order, onCancel }) {
  const [expanded, setExpanded] = useState(false)
  const orderId = order.id || order._id
  const product = order.product || {}
  const canCancel = order.status === 'PENDING'
  const status = order.status || 'PENDING'
  const price = Number(order.totalAmount ?? order.price ?? product.price ?? 0)
  const productImage = (Array.isArray(product.images) && product.images[0])
    ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url)
    : '/placeholder-product.jpg'

  return (
    <div className="bg-white rounded-xl border border-[#E5E5E7] overflow-hidden shadow-sm">
      {/* Header row - same style as seller orders */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src={productImage}
                alt={product.name || product.title}
                className="w-14 h-14 object-cover rounded-lg border border-[#E5E5E7]"
              />
            </div>
            <div>
              <h3 className="font-semibold text-[#1D1D1F]">
                Order #{orderId}
              </h3>
              <p className="text-sm text-[#6E6E73] mt-0.5">
                {product.name || product.title || 'Product'}
              </p>
              <span className={`inline-flex items-center mt-2 text-sm font-medium px-2.5 py-1 rounded-full ${getStatusColor(status)}`}>
                {getStatusLabel(status)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xl font-bold text-[#1D1D1F]">
                ${price.toFixed(2)}
              </p>
              <p className="text-sm text-[#6E6E73]">
                {formatDate(order.createdAt || order.date)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
              aria-expanded={expanded}
            >
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded: seller contact + product details + actions */}
      {expanded && (
        <div className="border-t border-[#E5E5E7] bg-[#F5F5F7]/50 p-6 space-y-6">
          {/* Seller contact */}
          {order.seller && (
            <div>
              <h4 className="font-semibold text-[#1D1D1F] mb-3">Seller contact</h4>
              <div className="p-4 bg-white rounded-xl border border-[#E5E5E7]">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="text-[#6E6E73]">Store / Business</dt>
                    <dd className="font-medium text-[#1D1D1F]">{order.seller.businessName || '—'}</dd>
                  </div>
                  {order.seller.user?.fullName && (
                    <div>
                      <dt className="text-[#6E6E73]">Contact name</dt>
                      <dd className="text-[#1D1D1F]">{order.seller.user.fullName}</dd>
                    </div>
                  )}
                  {order.seller.user?.email && (
                    <div>
                      <dt className="text-[#6E6E73]">Email</dt>
                      <dd>
                        <a href={`mailto:${order.seller.user.email}`} className="text-[#007AFF] hover:text-[#0056CC] underline">
                          {order.seller.user.email}
                        </a>
                      </dd>
                    </div>
                  )}
                  {order.seller.user?.phoneNumber && (
                    <div>
                      <dt className="text-[#6E6E73]">Phone</dt>
                      <dd>
                        <a href={`tel:${order.seller.user.phoneNumber}`} className="text-[#007AFF] hover:text-[#0056CC] underline">
                          {order.seller.user.phoneNumber}
                        </a>
                      </dd>
                    </div>
                  )}
                  {Array.isArray(order.seller.paymentMethods) && order.seller.paymentMethods.length > 0 && (
                    <div className="sm:col-span-2">
                      <dt className="text-[#6E6E73]">Payment methods</dt>
                      <dd className="text-[#1D1D1F]">{order.seller.paymentMethods.join(', ')}</dd>
                    </div>
                  )}
                  {order.seller.estimatedDeliveryDays != null && (
                    <div>
                      <dt className="text-[#6E6E73]">Estimated delivery</dt>
                      <dd className="text-[#1D1D1F]">{order.seller.estimatedDeliveryDays} day(s)</dd>
                    </div>
                  )}
                  {order.seller.shippingRegions && (
                    <div>
                      <dt className="text-[#6E6E73]">Shipping regions</dt>
                      <dd className="text-[#1D1D1F]">{order.seller.shippingRegions}</dd>
                    </div>
                  )}
                </dl>
                <p className="text-xs text-[#6E6E73] mt-3">Contact the seller directly for payment and shipping.</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Link to={`/dashboard/buyer/orders/${orderId}`} state={{ order }}>
              <Button variant="outline" size="small">View Details</Button>
            </Link>
            {canCancel && (
              <Button
                variant="outline"
                size="small"
                onClick={() => onCancel?.(orderId)}
              >
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

OrderHistory.propTypes = {
  orders: PropTypes.array,
  onCancel: PropTypes.func,
}

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  onCancel: PropTypes.func,
}
