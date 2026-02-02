// import React, { useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { productService } from '../../../services/productService'
// import { categoryService } from '../../../services/categoryService'
// import { useNotifications } from '../../../context/NotificationContext'
// import ProductForm from '../../../components/dashboard/seller/ProductForm'
// import Loader from '../../../components/common/Loader'

// export default function ProductEdit() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const { notify } = useNotifications()
//   const [product, setProduct] = useState(null)
//   const [categories, setCategories] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSaving, setIsSaving] = useState(false)

//   useEffect(() => {
//     if (id && id !== 'new') {
//       loadProduct()
//     } else {
//       setIsLoading(false)
//     }
//     loadCategories()
//   }, [id])

//   const loadProduct = async () => {
//     try {
//       const data = await productService.getById(id)
//       const p = data?.product || data
//       setProduct(p)
//     } catch (err) {
//       notify('Failed to load product', { type: 'error' })
//       navigate('/dashboard/seller/products')
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

//   const handleSubmit = async (formData) => {
//     setIsSaving(true)
//     try {
//       const form = new FormData()
//       form.append('name', formData.title || formData.name)
//       form.append('description', formData.description)
//       form.append('price', formData.price)
//       form.append('categoryId', formData.categoryId || formData.category)
//       form.append('productType', formData.badgeType === 'official' ? 'OFFICIAL' : 'FAN_MADE')

//       if (formData.images && formData.images.length > 0) {
//         formData.images.forEach((img) => {
//           if (img instanceof File) {
//             form.append('images', img)
//           }
//         })
//       }

//       if (id && id !== 'new') {
//         await productService.update(id, form)
//         notify('Product updated successfully', { type: 'success' })
//       } else {
//         await productService.create(form)
//         notify('Product created successfully', { type: 'success' })
//       }
//       navigate('/dashboard/seller/products')
//     } catch (err) {
//       notify(err?.message || 'Failed to save product', { type: 'error' })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   if (isLoading) {
//     return <Loader fullScreen text="Loading product..." />
//   }

//   const normalizedProduct = product
//     ? {
//         title: product.name || product.title,
//         description: product.description,
//         price: product.price,
//         category: product.categoryId || product.category?.id,
//         badgeType: product.productType === 'OFFICIAL' ? 'official' : 'fan_made',
//         images: product.images || [],
//       }
//     : null

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//         {id === 'new' ? 'Create Product' : 'Edit Product'}
//       </h2>
//       <ProductForm
//         product={normalizedProduct}
//         categories={categories}
//         onSubmit={handleSubmit}
//         onCancel={() => navigate('/dashboard/seller/products')}
//         isSaving={isSaving}
//       />
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productService } from '../../../services/productService'
import { categoryService } from '../../../services/categoryService'
import { useNotifications } from '../../../context/NotificationContext'
import ProductForm from '../../../components/dashboard/seller/ProductForm'
import Loader from '../../../components/common/Loader'

export default function ProductEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useNotifications()
  const [product, setProduct] = useState(null)
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (id && id !== 'new') {
      loadProduct()
    } else {
      setIsLoading(false)
    }
    loadCategories()
  }, [id])

  const loadProduct = async () => {
    try {
      const data = await productService.getById(id)
      // Backend returns { success, data: product }
      const p = data?.data || data?.product || data
      setProduct(p)
    } catch (err) {
      notify('Failed to load product', { type: 'error' })
      navigate('/dashboard/seller/products')
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

  const handleSubmit = async (formData) => {
    setIsSaving(true)
    try {
      if (id && id !== 'new') {
        // IMPORTANT: backend PUT /api/products/:id does NOT use multer, so it expects JSON (not FormData)
        const payload = {}
        const name = formData.title || formData.name
        const description = formData.description
        const price = formData.price
        const categoryId = formData.categoryId || formData.category

        if (name) payload.name = name
        if (description) payload.description = description
        if (price !== undefined && price !== null && String(price) !== '') payload.price = price
        if (categoryId) payload.categoryId = categoryId

        await productService.update(id, payload)
        notify('Product updated successfully', { type: 'success' })
      } else {
        // Create supports multipart + images
        const form = new FormData()
        form.append('name', formData.title || formData.name)
        form.append('description', formData.description)
        form.append('price', formData.price)
        form.append('categoryId', formData.categoryId || formData.category)

        if (formData.images && formData.images.length > 0) {
          formData.images.forEach((img) => {
            if (img instanceof File) {
              form.append('images', img)
            }
          })
        }

        await productService.create(form)
        notify('Product created successfully', { type: 'success' })
      }
      navigate('/dashboard/seller/products')
    } catch (err) {
      notify(err?.message || 'Failed to save product', { type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading product..." />
  }

  const normalizedProduct = product
    ? {
        title: product.name || product.title,
        description: product.description || '',
        price: product.price ?? '',
        categoryId: product.categoryId || product.category?.id || '',
        category: product.categoryId || product.category?.id || '',
        images: Array.isArray(product.images) ? product.images : [],
      }
    : null

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">
        {id === 'new' ? 'Create Product' : 'Edit Product'}
      </h2>
      <ProductForm
        product={normalizedProduct}
        categories={categories}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/dashboard/seller/products')}
        isSaving={isSaving}
        allowImageUpload={id === 'new'}
      />
    </div>
  )
}