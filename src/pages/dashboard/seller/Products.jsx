// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { productService } from '../../../services/productService'
// import { categoryService } from '../../../services/categoryService'
// import { useNotifications } from '../../../context/NotificationContext'
// import ProductList from '../../../components/dashboard/seller/ProductList'
// import Loader from '../../../components/common/Loader'
// import Button from '../../../components/common/Button'

// export default function Products() {
//   const navigate = useNavigate()
//   const { notify } = useNotifications()
//   const [products, setProducts] = useState([])
//   const [categories, setCategories] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('all')

//   useEffect(() => {
//     loadProducts()
//     loadCategories()
//   }, [])

//   const loadProducts = async () => {
//     setIsLoading(true)
//     try {
//       const data = await productService.myProducts()
//       const productsData = data?.products || data?.data || data || []
//       setProducts(Array.isArray(productsData) ? productsData : [])
//     } catch (err) {
//       notify('Failed to load products', { type: 'error' })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const loadCategories = async () => {
//     try {
//       const data = await categoryService.listPublic()
//       setCategories(data?.categories || data || [])
//     } catch (err) {
//       // ignore
//     }
//   }

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return
//     try {
//       await productService.remove(id)
//       notify('Product deleted successfully', { type: 'success' })
//       loadProducts()
//     } catch (err) {
//       notify(err?.message || 'Failed to delete product', { type: 'error' })
//     }
//   }

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       (product.name || product.title || '')
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       (product.description || '')
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     const matchesCategory =
//       selectedCategory === 'all' ||
//       product.categoryId === selectedCategory ||
//       product.category?.id === selectedCategory
//     return matchesSearch && matchesCategory
//   })

//   if (isLoading) {
//     return <Loader fullScreen text="Loading products..." />
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Products</h2>
//           <p className="text-gray-600 dark:text-gray-400">Manage your products</p>
//         </div>
//         <Button onClick={() => navigate('/dashboard/seller/products/new')}>
//           Add Product
//         </Button>
//       </div>

//       <ProductList
//         products={filteredProducts}
//         categories={categories}
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//         selectedCategory={selectedCategory}
//         onCategoryChange={setSelectedCategory}
//         onDelete={handleDelete}
//         onEdit={(id) => navigate(`/dashboard/seller/products/${id}`)}
//         onView={(id) => navigate(`/product/${id}`)}
//       />
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { productService } from '../../../services/productService'
import { categoryService } from '../../../services/categoryService'
import { useNotifications } from '../../../context/NotificationContext'
import ProductList from '../../../components/dashboard/seller/ProductList'
import Loader from '../../../components/common/Loader'
import Button from '../../../components/common/Button'

export default function Products() {
  const navigate = useNavigate()
  const { notify } = useNotifications()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const data = await productService.myProducts()
      const productsData = data?.products || data?.data || data || []
      setProducts(Array.isArray(productsData) ? productsData : [])
    } catch (err) {
      notify('Failed to load products', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const data = await categoryService.listPublic()
      // Backend returns { success: true, data: [...] }
      const categoriesData = data?.categories || data?.data || data || []
      const normalized = Array.isArray(categoriesData) ? categoriesData : []
      setCategories(normalized)
    } catch (err) {
      // ignore
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await productService.remove(id)
      notify('Product deleted successfully', { type: 'success' })
      loadProducts()
    } catch (err) {
      notify(err?.message || 'Failed to delete product', { type: 'error' })
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      (product.name || product.title || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (product.description || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' ||
      product.categoryId === selectedCategory ||
      product.category?.id === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return <Loader fullScreen text="Loading products..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1D1D1F]">My Products</h2>
          <p className="text-[#6E6E73]">Manage your products</p>
        </div>
        <Button onClick={() => navigate('/dashboard/seller/products/new')}>
          Add Product
        </Button>
      </div>

      <ProductList
        products={filteredProducts}
        categories={categories}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onDelete={handleDelete}
        onEdit={(id) => navigate(`/dashboard/seller/products/${id}`)}
        onView={(id) => navigate(`/product/${id}`)}
      />
    </div>
  )
}