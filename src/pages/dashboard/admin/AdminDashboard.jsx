// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { adminService } from '../../../services/adminService'
// import Loader from '../../../components/common/Loader'

// export default function AdminDashboard() {
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
//       // Flatten backend analytics shape into simple stats for the dashboard
//       const flattened = {
//         totalUsers: raw.users?.total || 0,
//         totalSellers: raw.users?.sellers || 0,
//         totalProducts: raw.products?.total || 0,
//         pendingProducts: raw.products?.pending || 0,
//         totalRevenue: 0,
//       }
//       setStats(flattened)
//     } catch (err) {
//       // ignore
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (isLoading) {
//     return <Loader fullScreen text="Loading dashboard..." />
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h2>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             {stats?.totalUsers || 0}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Total Users</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             {stats?.totalSellers || 0}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Total Sellers</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             {stats?.totalProducts || 0}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Total Products</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             ${(stats?.totalRevenue || 0).toFixed(2)}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Total Revenue</div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Link
//           to="/dashboard/admin/users"
//           className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
//         >
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             Manage Users
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">View and manage all users</p>
//         </Link>
//         <Link
//           to="/dashboard/admin/products"
//           className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
//         >
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             Approve Products
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">
//             {stats?.pendingProducts || 0} products pending approval
//           </p>
//         </Link>
//         <Link
//           to="/dashboard/admin/categories"
//           className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
//         >
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             Manage Categories
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">Create and edit categories</p>
//         </Link>
//         <Link
//           to="/dashboard/admin/analytics"
//           className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
//         >
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             View Analytics
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">System-wide statistics</p>
//         </Link>
//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '../../../services/adminService'
import Loader from '../../../components/common/Loader'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setIsLoading(true)
    try {
      const data = await adminService.stats()
      const raw = data?.data || data || {}
      // Flatten backend analytics shape into simple stats for the dashboard
      const flattened = {
        totalUsers: raw.users?.total || 0,
        totalSellers: raw.users?.sellers || 0,
        totalProducts: raw.products?.total || 0,
        totalCategories: raw.categories?.total || 0,
        pendingProducts: raw.products?.pending || 0, 
      }
      setStats(flattened)
    } catch (err) {
      // ignore
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading dashboard..." />
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.totalUsers || 0}
          </div>
          <div className="text-[#6E6E73]">Total Users</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.totalSellers || 0}
          </div>
          <div className="text-[#6E6E73]">Total Sellers</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.totalProducts || 0}
          </div>
          <div className="text-[#6E6E73]">Total Products</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.totalCategories || 0 }
          </div>
          <div className="text-[#6E6E73]">totalCategories</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/dashboard/admin/users"
          className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:border-[#007AFF]/30 hover:shadow-md transition-all block"
        >
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
            Manage Users
          </h3>
          <p className="text-[#6E6E73]">View and manage all users</p>
        </Link>
        <Link
          to="/dashboard/admin/products"
          className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:border-[#007AFF]/30 hover:shadow-md transition-all block"
        >
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
            Approve Products
          </h3>
          <p className="text-[#6E6E73]">
            {stats?.pendingProducts || 0} products pending approval
          </p>
        </Link>
        <Link
          to="/dashboard/admin/categories"
          className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:border-[#007AFF]/30 hover:shadow-md transition-all block"
        >
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
            Manage Categories
          </h3>
          <p className="text-[#6E6E73]">Create and edit categories</p>
        </Link>
        <Link
          to="/dashboard/admin/analytics"
          className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:border-[#007AFF]/30 hover:shadow-md transition-all block"
        >
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
            View Analytics
          </h3>
          <p className="text-[#6E6E73]">System-wide statistics</p>
        </Link>
      </div>
    </div>
  )
}