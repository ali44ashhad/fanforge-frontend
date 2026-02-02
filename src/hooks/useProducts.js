import { useCallback, useEffect, useState, useMemo } from 'react'
import { productService } from '../services/productService'

export function useProducts(params = {}) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Stabilize params by serializing to avoid infinite re-renders
  const stableParams = useMemo(() => params, [JSON.stringify(params)])

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await productService.listApproved(stableParams)
      // Ensure products is always an array (backend returns { success, data: [...] })
      const productsData = data?.products || data?.data || data || []
      setProducts(Array.isArray(productsData) ? productsData : [])
    } catch (e) {
      setError(e)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }, [stableParams])

  useEffect(() => {
    load().catch(() => {})
  }, [load])

  return { products, isLoading, error, reload: load, setProducts }
}
