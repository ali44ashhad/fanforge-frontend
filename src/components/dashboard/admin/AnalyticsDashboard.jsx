// import React from 'react'
// import PropTypes from 'prop-types'

// export default function AnalyticsDashboard({ stats = {} }) {
//   return (
//     <div className="space-y-6">
//       {/* Main Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
//             {stats?.totalOrders || 0}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Total Orders</div>
//         </div>
//       </div>

//       {/* Revenue Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             ${(stats?.totalRevenue || 0).toFixed(2)}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Total Revenue</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             {stats?.pendingProducts || 0}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Pending Products</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             {stats?.pendingSellers || 0}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Pending Sellers</div>
//         </div>
//       </div>

//       {/* Additional Stats */}
//       {stats && Object.keys(stats).length > 0 && (
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Additional Statistics
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {Object.entries(stats).map(([key, value]) => {
//               if (
//                 ['totalUsers', 'totalSellers', 'totalProducts', 'totalOrders', 'totalRevenue', 'pendingProducts', 'pendingSellers'].includes(
//                   key
//                 )
//               ) {
//                 return null
//               }
//               return (
//                 <div key={key}>
//                   <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
//                     {key.replace(/([A-Z])/g, ' $1').trim()}
//                   </div>
//                   <div className="text-xl font-bold text-gray-900 dark:text-white">
//                     {typeof value === 'number' ? value.toFixed(2) : String(value)}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// AnalyticsDashboard.propTypes = {
//   stats: PropTypes.object,
// }

import React from 'react'
import PropTypes from 'prop-types'

export default function AnalyticsDashboard({ stats = {} }) {
  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.totalUsers || 0}
          </div>
          <div className="text-[#6E6E73]">Total Users</div>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.totalSellers || 0}
          </div>
          <div className="text-[#6E6E73]">Total Sellers</div>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.totalProducts || 0}
          </div>
          <div className="text-[#6E6E73]">Total Products</div>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.totalOrders || 0}
          </div>
          <div className="text-[#6E6E73]">Total Orders</div>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.totalCategories || 0}
          </div>
          <div className="text-[#6E6E73]">Total Categories</div>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.pendingProducts || 0}
          </div>
          <div className="text-[#6E6E73]">Pending Products</div>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {stats?.pendingOrders || 0}
          </div>
          <div className="text-[#6E6E73]">Pending Orders</div>
        </div>
      </div>
 
    </div>
  )
}

AnalyticsDashboard.propTypes = {
  stats: PropTypes.object,
}