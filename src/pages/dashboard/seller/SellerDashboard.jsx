// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useOrders } from '../../../hooks/useOrders'
// import { productService } from '../../../services/productService'
// import { sellerService } from '../../../services/sellerService'
// import Loader from '../../../components/common/Loader'

// export default function SellerDashboard() {
//   const { orders } = useOrders({ mode: 'seller' })
//   const [products, setProducts] = useState([])
//   const [sellerProfile, setSellerProfile] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     loadData()
//   }, [])

//   const loadData = async () => {
//     setIsLoading(true)
//     try {
//       const [productsData, profileData] = await Promise.all([
//         productService.myProducts(),
//         sellerService.getProfile().catch(() => null),
//       ])
//       const normalizedProducts = productsData?.products || productsData?.data || productsData || []
//       setProducts(Array.isArray(normalizedProducts) ? normalizedProducts : [])
//       setSellerProfile(profileData?.seller || profileData)
//     } catch (err) {
//       // ignore
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (isLoading) {
//     return <Loader fullScreen text="Loading dashboard..." />
//   }

//   const totalRevenue = orders
//     .filter((o) => o.status !== 'CANCELLED' && o.status !== 'PENDING')
//     .reduce((sum, o) => sum + (Number(o.totalAmount ?? o.price ?? o.product?.price ?? 0)), 0)

//   const pendingOrders = orders.filter((o) => o.status === 'PENDING').length
//   const activeProducts = products.filter((p) => p.isApproved !== false).length
//   const pendingProducts = products.filter((p) => p.isApproved === false).length

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Seller Dashboard</h2>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             {orders.length}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Total Orders</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             {pendingOrders}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Pending Orders</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             {activeProducts}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Active Products</div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             ${totalRevenue.toFixed(2)}
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Total Revenue</div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <Link
//           to="/dashboard/seller/products"
//           className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
//         >
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             Manage Products
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">
//             {activeProducts} active, {pendingProducts} pending approval
//           </p>
//         </Link>
//         <Link
//           to="/dashboard/seller/orders"
//           className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
//         >
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             View Orders
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">
//             {pendingOrders} orders need your attention
//           </p>
//         </Link>
//       </div>

//       {/* Seller Status */}
//       {sellerProfile && (
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Seller Status
//           </h3>
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600 dark:text-gray-400">Approval Status:</span>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   sellerProfile.isApproved
//                     ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                     : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
//                 }`}
//               >
//                 {sellerProfile.isApproved ? 'Approved' : 'Pending Approval'}
//               </span>
//             </div>
//             {sellerProfile.businessName && (
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600 dark:text-gray-400">Business Name:</span>
//                 <span className="text-gray-900 dark:text-white font-medium">
//                   {sellerProfile.businessName}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useOrders } from '../../../hooks/useOrders'
import { productService } from '../../../services/productService'
import { sellerService } from '../../../services/sellerService'
import Loader from '../../../components/common/Loader'

export default function SellerDashboard() {
  const { orders } = useOrders({ mode: 'seller' })
  const [products, setProducts] = useState([])
  const [sellerProfile, setSellerProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [productsData, profileData] = await Promise.all([
        productService.myProducts(),
        sellerService.getProfile().catch(() => null),
      ])
      const normalizedProducts = productsData?.products || productsData?.data || productsData || []
      setProducts(Array.isArray(normalizedProducts) ? normalizedProducts : [])
      setSellerProfile(profileData?.seller || profileData)
    } catch (err) {
      // ignore
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading dashboard..." />
  }

  const totalRevenue = orders
    .filter((o) => o.status !== 'CANCELLED' && o.status !== 'PENDING')
    .reduce((sum, o) => sum + (Number(o.totalAmount ?? o.price ?? o.product?.price ?? 0)), 0)

  const pendingOrders = orders.filter((o) => o.status === 'PENDING').length
  const activeProducts = products.filter((p) => p.isApproved !== false).length
  const pendingProducts = products.filter((p) => p.isApproved === false).length

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Seller Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            {activeProducts}
          </div>
          <div className="text-[#6E6E73]">Active Products</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6">
          <div className="text-3xl font-bold text-[#1D1D1F] mb-2">
            ${totalRevenue.toFixed(2)}
          </div>
          <div className="text-[#6E6E73]">Total Revenue</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/dashboard/seller/products"
          className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:border-[#007AFF]/30 hover:shadow-md transition-all block"
        >
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
            Manage Products
          </h3>
          <p className="text-[#6E6E73]">
            {activeProducts} active, {pendingProducts} pending approval
          </p>
        </Link>
        <Link
          to="/dashboard/seller/orders"
          className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 hover:border-[#007AFF]/30 hover:shadow-md transition-all block"
        >
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
            View Orders
          </h3>
          <p className="text-[#6E6E73]">
            {pendingOrders} orders need your attention
          </p>
        </Link>
      </div>
 
    </div>
  )
}