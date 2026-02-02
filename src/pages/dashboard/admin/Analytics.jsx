// import React, { useState, useEffect } from 'react'
// import { adminService } from '../../../services/adminService'
// import AnalyticsDashboard from '../../../components/dashboard/admin/AnalyticsDashboard'
// import Loader from '../../../components/common/Loader'

// export default function Analytics() {
//   const [stats, setStats] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     loadStats()
//   }, [])

//   const loadStats = async () => {
//     setIsLoading(true)
//     try {
//       const data = await adminService.stats()
//       const raw = data?.data || data || {}
//       const flattened = {
//         totalUsers: raw.users?.total || 0,
//         totalSellers: raw.users?.sellers || 0,
//         totalProducts: raw.products?.total || 0,
//         pendingProducts: raw.products?.pending || 0,
//         totalOrders: raw.orders?.total || 0,
//         totalRevenue: 0,
//         pendingSellers: 0,
//       }
//       setStats(flattened)
//     } catch (err) {
//       // ignore
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (isLoading) {
//     return <Loader fullScreen text="Loading analytics..." />
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Analytics</h2>
//       <AnalyticsDashboard stats={stats} />
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { adminService } from '../../../services/adminService'
import AnalyticsDashboard from '../../../components/dashboard/admin/AnalyticsDashboard'
import Loader from '../../../components/common/Loader'

export default function Analytics() {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setIsLoading(true)
    try {
      const res = await adminService.stats()
      // Backend returns { success: true, data: { users, products, orders, categories, pendingSellers } }
      const raw = res?.data ?? res ?? {}
      const flattened = {
        totalUsers: raw.users?.total ?? 0,
        totalSellers: raw.users?.sellers ?? 0,
        totalProducts: raw.products?.total ?? 0,
        pendingProducts: raw.products?.pending ?? 0,
        totalOrders: raw.orders?.total ?? 0,
        totalCategories: raw.categories?.total ?? 0,
        pendingSellers: raw.pendingSellers ?? 0,
      }
      setStats(flattened)
    } catch (err) {
      console.error('Analytics load failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading analytics..." />
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Analytics</h2>
      <AnalyticsDashboard stats={stats ?? {}} />
    </div>
  )
}