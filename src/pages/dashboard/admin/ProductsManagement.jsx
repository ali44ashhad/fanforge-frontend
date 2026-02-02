// import React, { useState, useEffect } from 'react'
// import { adminService } from '../../../services/adminService'
// import { useNotifications } from '../../../context/NotificationContext'
// import ProductApproval from '../../../components/dashboard/admin/ProductApproval'
// import Loader from '../../../components/common/Loader'
// import Button from '../../../components/common/Button'

// export default function ProductsManagement() {
//   const { notify } = useNotifications()
//   const [pendingProducts, setPendingProducts] = useState([])
//   const [allProducts, setAllProducts] = useState([])
//   const [activeTab, setActiveTab] = useState('pending')
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     loadData()
//   }, [])

//   const loadData = async () => {
//     setIsLoading(true)
//     try {
//       const [pendingData, allData] = await Promise.all([
//         adminService.pendingProducts(),
//         adminService.listAllProducts(),
//       ])
//       const pendingArr = pendingData?.products || pendingData?.data || pendingData || []
//       const allArr = allData?.products || allData?.data || allData || []
//       setPendingProducts(Array.isArray(pendingArr) ? pendingArr : [])
//       setAllProducts(Array.isArray(allArr) ? allArr : [])
//     } catch (err) {
//       notify('Failed to load products', { type: 'error' })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleApprove = async (productId) => {
//     try {
//       await adminService.approveProduct(productId)
//       notify('Product approved successfully', { type: 'success' })
//       loadData()
//     } catch (err) {
//       notify(err?.message || 'Failed to approve product', { type: 'error' })
//     }
//   }

//   const handleDelete = async (productId) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return
//     try {
//       await adminService.removeProduct(productId)
//       notify('Product deleted successfully', { type: 'success' })
//       loadData()
//     } catch (err) {
//       notify(err?.message || 'Failed to delete product', { type: 'error' })
//     }
//   }

//   const handleChangeType = async (productId, nextType) => {
//     try {
//       await adminService.changeProductType(productId, nextType)
//       notify('Product type updated successfully', { type: 'success' })
//       loadData()
//     } catch (err) {
//       notify(err?.message || 'Failed to change product type', { type: 'error' })
//     }
//   }

//   if (isLoading) {
//     return <Loader fullScreen text="Loading products..." />
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Management</h2>
//       </div>

//       <div className="mb-6">
//         <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
//           <button
//             onClick={() => setActiveTab('pending')}
//             className={`px-4 py-2 font-medium ${
//               activeTab === 'pending'
//                 ? 'text-primary border-b-2 border-primary'
//                 : 'text-gray-600 dark:text-gray-400'
//             }`}
//           >
//             Pending ({pendingProducts.length})
//           </button>
//           <button
//             onClick={() => setActiveTab('all')}
//             className={`px-4 py-2 font-medium ${
//               activeTab === 'all'
//                 ? 'text-primary border-b-2 border-primary'
//                 : 'text-gray-600 dark:text-gray-400'
//             }`}
//           >
//             All Products ({allProducts.length})
//           </button>
//         </div>
//       </div>

//       <ProductApproval
//         products={activeTab === 'pending' ? pendingProducts : allProducts}
//         onApprove={handleApprove}
//         onDelete={handleDelete}
//         onChangeType={handleChangeType}
//       />
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react'
import { adminService } from '../../../services/adminService'
import { useNotifications } from '../../../context/NotificationContext'
import ProductApproval from '../../../components/dashboard/admin/ProductApproval'
import Loader from '../../../components/common/Loader'
import Button from '../../../components/common/Button'

export default function ProductsManagement() {
  const { notify } = useNotifications()
  const [pendingProducts, setPendingProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [pendingData, allData] = await Promise.all([
        adminService.pendingProducts(),
        adminService.listAllProducts(),
      ])
      const pendingArr = pendingData?.products || pendingData?.data || pendingData || []
      const allArr = allData?.products || allData?.data || allData || []
      const pendingArrSafe = Array.isArray(pendingArr) ? pendingArr : []
      const allArrSafe = Array.isArray(allArr) ? allArr : []
      setPendingProducts(pendingArrSafe)
      setAllProducts(allArrSafe)
      // If there are any products at all, default to All Products tab,
      // otherwise keep Pending as the fallback.
      if (allArrSafe.length > 0) {
        setActiveTab('all')
      } else {
        setActiveTab('pending')
      }
    } catch (err) {
      notify('Failed to load products', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (productId) => {
    try {
      await adminService.approveProduct(productId)
      notify('Product approved successfully', { type: 'success' })
      loadData()
    } catch (err) {
      notify(err?.message || 'Failed to approve product', { type: 'error' })
    }
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await adminService.removeProduct(productId)
      notify('Product deleted successfully', { type: 'success' })
      loadData()
    } catch (err) {
      notify(err?.message || 'Failed to delete product', { type: 'error' })
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading products..." />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1D1D1F]">Product Management</h2>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 border-b border-[#E5E5E7]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'all'
                ? 'text-[#007AFF] border-b-2 border-[#007AFF]'
                : 'text-[#6E6E73]'
            }`}
          >
            All Products ({allProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'pending'
                ? 'text-[#007AFF] border-b-2 border-[#007AFF]'
                : 'text-[#6E6E73]'
            }`}
          >
            Pending ({pendingProducts.length})
          </button>
        </div>
      </div>

      <ProductApproval
        products={activeTab === 'pending' ? pendingProducts : allProducts}
        onApprove={handleApprove}
        onDelete={handleDelete}
      />
    </div>
  )
}