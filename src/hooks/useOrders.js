import { useCallback, useEffect, useState } from 'react'
import { orderService } from '../services/orderService'

export function useOrders({ mode } = {}) {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data =
        mode === 'seller'
          ? await orderService.myOrdersSeller()
          : await orderService.myOrdersBuyer()
      const ordersData = data?.orders || data?.data || data || []
      setOrders(Array.isArray(ordersData) ? ordersData : [])
    } catch (e) {
      setError(e)
      setOrders([])
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [mode])

  useEffect(() => {
    load().catch(() => {})
  }, [load])

  return { orders, isLoading, error, reload: load, setOrders }
}
