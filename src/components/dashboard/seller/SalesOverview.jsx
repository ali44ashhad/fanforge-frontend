import React, { useState, useEffect } from 'react'
import { useOrders } from '../../../hooks/useOrders'
import { productService } from '../../../services/productService'
import Loader from '../../common/Loader'

export default function SalesOverview() {
  const { orders } = useOrders({ mode: 'seller' })
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await productService.myProducts()
      setProducts(data?.products || data || [])
    } catch (err) {
      // ignore
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader text="Loading sales data..." />
  }

  const totalRevenue = orders
    .filter((o) => o.status !== 'CANCELLED' && o.status !== 'PENDING')
    .reduce((sum, o) => sum + Number(o.totalAmount ?? o.price ?? o.product?.price ?? 0), 0)

  const totalOrders = orders.length
  const completedOrders = orders.filter(
    (o) => o.status === 'DELIVERED' || o.status === 'delivered'
  ).length

  // Calculate top products from orders
  const productSales = {}
  orders.forEach((order) => {
    const productId = order.product?.id || order.product?._id
    if (productId) {
      productSales[productId] = (productSales[productId] || 0) + 1
    }
  })

  const topProducts = Object.entries(productSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, count]) => {
      const product = products.find((p) => (p.id || p._id) === id)
      return { product, sales: count }
    })
    .filter((item) => item.product)

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {totalOrders}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Total Orders</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {completedOrders}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Completed Orders</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ${totalRevenue.toFixed(2)}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Total Revenue</div>
        </div>
      </div>

      {/* Top Products */}
      {topProducts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-3">
            {topProducts.map(({ product, sales }) => (
              <div key={product.id || product._id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {product.name || product.title}
                  </p>
                </div>
                <div className="text-gray-600 dark:text-gray-400">{sales} sales</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
