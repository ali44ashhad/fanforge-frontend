// import React, { useState, useEffect } from 'react'
// import { adminService } from '../../../services/adminService'
// import { useNotifications } from '../../../context/NotificationContext'
// import CategoryManager from '../../../components/dashboard/admin/CategoryManager'
// import Loader from '../../../components/common/Loader'

// export default function Categories() {
//   const { notify } = useNotifications()
//   const [categories, setCategories] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     loadCategories()
//   }, [])

//   const loadCategories = async () => {
//     setIsLoading(true)
//     try {
//       const data = await adminService.listCategories()
//       const categoriesData = data?.categories || data?.data || data || []
//       const normalized = Array.isArray(categoriesData) ? categoriesData : []
//       const mapped = normalized.map((cat) => ({
//         ...cat,
//         productCount: cat.productCount ?? cat._count?.products ?? 0,
//       }))
//       setCategories(mapped)
//     } catch (err) {
//       notify('Failed to load categories', { type: 'error' })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCreate = async (categoryData) => {
//     try {
//       await adminService.createCategory(categoryData)
//       notify('Category created successfully', { type: 'success' })
//       loadCategories()
//     } catch (err) {
//       notify(err?.message || 'Failed to create category', { type: 'error' })
//     }
//   }

//   const handleUpdate = async (categoryId, categoryData) => {
//     try {
//       await adminService.updateCategory(categoryId, categoryData)
//       notify('Category updated successfully', { type: 'success' })
//       loadCategories()
//     } catch (err) {
//       notify(err?.message || 'Failed to update category', { type: 'error' })
//     }
//   }

//   if (isLoading) {
//     return <Loader fullScreen text="Loading categories..." />
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//         Category Management
//       </h2>
//       <CategoryManager
//         categories={categories}
//         onCreate={handleCreate}
//         onUpdate={handleUpdate}
//       />
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { adminService } from '../../../services/adminService'
import { useNotifications } from '../../../context/NotificationContext'
import CategoryManager from '../../../components/dashboard/admin/CategoryManager'
import Loader from '../../../components/common/Loader'

export default function Categories() {
  const { notify } = useNotifications()
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setIsLoading(true)
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        adminService.listCategories(),
        adminService.listAllProducts(),
      ])
      const categoriesData = categoriesRes?.categories ?? categoriesRes?.data ?? categoriesRes ?? []
      const normalized = Array.isArray(categoriesData) ? categoriesData : []
      const productsList = productsRes?.products ?? productsRes?.data ?? productsRes ?? []
      const products = Array.isArray(productsList) ? productsList : []
      const countByCategoryId = {}
      products.forEach((p) => {
        const cid = p.categoryId ?? p.category?.id ?? p.category?._id
        if (cid) {
          countByCategoryId[cid] = (countByCategoryId[cid] || 0) + 1
        }
      })
      const mapped = normalized.map((cat) => {
        const cid = cat.id ?? cat._id
        return {
          ...cat,
          productCount: countByCategoryId[cid] ?? 0,
        }
      })
      setCategories(mapped)
    } catch (err) {
      notify('Failed to load categories', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (categoryData) => {
    try {
      await adminService.createCategory(categoryData)
      notify('Category created successfully', { type: 'success' })
      loadCategories()
    } catch (err) {
      notify(err?.message || 'Failed to create category', { type: 'error' })
    }
  }

  const handleUpdate = async (categoryId, categoryData) => {
    try {
      await adminService.updateCategory(categoryId, categoryData)
      notify('Category updated successfully', { type: 'success' })
      loadCategories()
    } catch (err) {
      notify(err?.message || 'Failed to update category', { type: 'error' })
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading categories..." />
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">
        Category Management
      </h2>
      <CategoryManager
        categories={categories}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />
    </div>
  )
}