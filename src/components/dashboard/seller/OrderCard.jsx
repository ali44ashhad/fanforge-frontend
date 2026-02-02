import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  User,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  MoreVertical,
} from 'lucide-react'
import Button from '../../common/Button'

const OrderCard = ({ order, onUpdateStatus }) => {
  const [expanded, setExpanded] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const getStatusColor = (status) => {
    const s = String(status || '').toLowerCase()
    if (s === 'pending') {
      return 'bg-[#FFF4E5] text-[#663C00]'
    }
    if (s === 'processing' || s === 'accepted') {
      return 'bg-[#EBF5FF] text-[#004C99]'
    }
    if (s === 'shipped' || s === 'out_for_delivery') {
      return 'bg-[#F3E8FF] text-[#5A189A]'
    }
    if (s === 'delivered') {
      return 'bg-[#E8F5E9] text-[#2E7D32]'
    }
    if (s === 'cancelled') {
      return 'bg-[#FFEBEE] text-[#C62828]'
    }
    return 'bg-[#F5F5F7] text-[#1D1D1F]'
  }

  const getStatusIcon = (status) => {
    const s = String(status || '').toLowerCase()
    if (s === 'pending') return <Clock size={14} />
    if (s === 'processing' || s === 'accepted') return <Package size={14} />
    if (s === 'shipped' || s === 'out_for_delivery') return <Truck size={14} />
    if (s === 'delivered') return <CheckCircle size={14} />
    return <Package size={14} />
  }

  const statusOptions = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'PROCESSING', label: 'Processing' },
    { value: 'SHIPPED', label: 'Shipped' },
    { value: 'DELIVERED', label: 'Delivered' },
  ]

  const getStatusLabel = (s) => {
    const opt = statusOptions.find((o) => o.value === String(s).toUpperCase())
    return opt ? opt.label : String(s || 'Pending')
  }

  // Must mirror backend's validTransitions to avoid 400 errors
  const validTransitions = {
    PENDING: ['ACCEPTED'],
    ACCEPTED: ['PROCESSING'],
    PROCESSING: ['SHIPPED'],
    SHIPPED: ['DELIVERED'],
    DELIVERED: [],
  }

  const handleStatusChange = (newStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(order.id || order._id, newStatus)
      setShowActions(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const orderId = order.id || order._id
  const product = order.product || {}
  const buyer = order.buyer || {}
  const status = order.status || 'PENDING'
  const normalizedStatus = String(status).toUpperCase()
  const allowedNextStatuses = validTransitions[normalizedStatus] || []

  return (
    <div className="bg-white rounded-lg border border-[#E5E5E7] overflow-hidden">
      {/* Order Header */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${getStatusColor(status)}`}>
              {getStatusIcon(status)}
            </div>
            <div>
              <h3 className="font-semibold text-[#1D1D1F]">
                Order #{orderId}
              </h3>
              <p className="text-sm text-[#6E6E73]">
                {product.name || product.title || 'Product'}
              </p>
              <span className={`inline-flex items-center gap-1.5 mt-1 text-sm font-medium px-2.5 py-1 rounded-full ${getStatusColor(status)}`}>
                {getStatusIcon(status)}
                {getStatusLabel(status)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              {(() => {
                const productPrice = Number(order.product?.price || 0)
                const orderAmount = Number(order.totalAmount || order.price || productPrice || 0)
                return (
                  <p className="text-2xl font-bold text-[#1D1D1F]">
                    ${Number.isFinite(orderAmount) ? orderAmount.toFixed(2) : '0.00'}
                  </p>
                )
              })()}
              <p className="text-sm text-[#6E6E73]">
                {formatDate(order.createdAt || order.date)}
              </p>
            </div>
            <div className="relative">
              {allowedNextStatuses.length > 0 ? (
                <>
                  <button
                    onClick={() => setShowActions(!showActions)}
                    className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {showActions && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowActions(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E5E5E7] z-20">
                        {statusOptions
                          .filter((opt) => allowedNextStatuses.includes(opt.value))
                          .map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => handleStatusChange(opt.value)}
                              className="w-full text-left px-4 py-2 text-sm text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                            >
                              Mark as {opt.label}
                            </button>
                          ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg ${getStatusColor(status)}`}>
                  {getStatusIcon(status)}
                  {getStatusLabel(status)}
                </span>
              )}
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded"
            >
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-[#E5E5E7] p-6 space-y-4">
          {/* Buyer Info */}
          <div>
            <h4 className="font-semibold text-[#1D1D1F] mb-3">Buyer Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#1D1D1F]">
                <User size={16} />
                <span>{buyer.fullName || buyer.name || buyer.email || 'N/A'}</span>
              </div>
              {buyer.email && (
                <div className="flex items-center gap-2 text-[#1D1D1F]">
                  <Mail size={16} />
                  <span>{buyer.email}</span>
                </div>
              )}
              {order.buyerAddress && (
                <div className="flex items-center gap-2 text-[#1D1D1F]">
                  <MapPin size={16} />
                  <span>{order.buyerAddress}</span>
                </div>
              )}
              {order.buyerPhone && (
                <div className="text-[#1D1D1F]">
                  Phone: {order.buyerPhone}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h4 className="font-semibold text-[#1D1D1F] mb-3">Product Details</h4>
            <div className="flex gap-4">
              {product.images?.[0] && (
                <img
                  src={typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div>
                <p className="font-medium text-[#1D1D1F]">
                  {product.name || product.title}
                </p>
                <p className="text-sm text-[#6E6E73]">
                  Price: ${Number(product.price || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.buyerNotes && (
            <div>
              <h4 className="font-semibold text-[#1D1D1F] mb-2">Buyer Notes</h4>
              <p className="text-[#1D1D1F]">{order.buyerNotes}</p>
            </div>
          )}

          {/* Status: show "Delivered" in green when done, else Update Status buttons */}
          <div>
            {normalizedStatus === 'DELIVERED' ? (
              <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg font-medium ${getStatusColor(status)}`}>
                <CheckCircle size={20} />
                Delivered
              </div>
            ) : (
              <>
                <h4 className="font-semibold text-[#1D1D1F] mb-3">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {statusOptions
                    .filter((opt) => allowedNextStatuses.includes(opt.value))
                    .map((opt) => (
                      <Button
                        key={opt.value}
                        variant="outline"
                        size="small"
                        onClick={() => handleStatusChange(opt.value)}
                      >
                        Mark as {opt.label}
                      </Button>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  onUpdateStatus: PropTypes.func,
}

export default OrderCard
