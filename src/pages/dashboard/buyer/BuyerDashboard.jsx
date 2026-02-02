import React from 'react'
import { Link } from 'react-router-dom'
import { useOrders } from '../../../hooks/useOrders'
import { useCart } from '../../../hooks/useCart'
import { useAuth } from '../../../hooks/useAuth'

export default function BuyerDashboard() {
  const { orders } = useOrders({ mode: 'buyer' })
  const { count: cartCount } = useCart()
  const { user } = useAuth()

  const recentOrders = orders.slice(0, 5)
  const pendingOrders = orders.filter((o) => o.status === 'PENDING').length

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {orders.length}
          </div>
          <div className="text-[#6E6E73]">Total Orders</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {pendingOrders}
          </div>
          <div className="text-[#6E6E73]">Pending Orders</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {cartCount}
          </div>
          <div className="text-[#6E6E73]">Items in Cart</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/marketplace"
          className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:border-[#007AFF]/30 hover:shadow-md transition-all block"
        >
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
            Browse Products
          </h3>
          <p className="text-[#6E6E73]">
            Discover new products from independent sellers
          </p>
        </Link>
        <Link
          to="/dashboard/buyer/orders"
          className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:border-[#007AFF]/30 hover:shadow-md transition-all block"
        >
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
            My Orders
          </h3>
          <p className="text-[#6E6E73]">
            Track and manage your orders
          </p>
        </Link>
      </div>

      {/* Recent Orders
      {recentOrders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1D1D1F]">
              Recent Orders
            </h3>
            <Link
              to="/dashboard/buyer/orders"
              className="text-[#007AFF] hover:text-[#0056CC] text-sm font-medium transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id || order._id}
                to={`/dashboard/buyer/orders/${order.id || order._id}`}
                className="block bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-4 hover:border-[#007AFF]/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#1D1D1F]">
                      {order.product?.name || 'Product'}
                    </p>
                    <p className="text-sm text-[#6E6E73]">
                      {new Date(order.createdAt || order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-[#1D1D1F] font-semibold">
                    ${Number(order.totalAmount ?? order.price ?? order.product?.price ?? 0).toFixed(2)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )} */}
    </div>
  )
}
