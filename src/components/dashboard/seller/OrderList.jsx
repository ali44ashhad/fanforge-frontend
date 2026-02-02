import React from 'react'
import PropTypes from 'prop-types'
import OrderCard from './OrderCard'
import EmptyState from '../../common/EmptyState'

const OrderList = ({ orders = [], onStatusUpdate }) => {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Orders from buyers will appear here"
      />
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const orderId = order.id || order._id
        return (
          <OrderCard
            key={orderId}
            order={order}
            onUpdateStatus={onStatusUpdate}
          />
        )
      })}
    </div>
  )
}

OrderList.propTypes = {
  orders: PropTypes.array,
  onStatusUpdate: PropTypes.func,
}

export default OrderList
