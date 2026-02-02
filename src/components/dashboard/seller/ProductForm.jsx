import React, { useState, useEffect } from 'react'
import { Upload, X, Tag, DollarSign, Package, Globe } from 'lucide-react'
import PropTypes from 'prop-types'
import Button from '../../common/Button'
import Input from '../../common/Input'

const ProductForm = ({
  product = null,
  categories = [],
  onSubmit,
  onCancel,
  isSaving = false,
  allowImageUpload = true,
}) => {
  // Ensure categories is always an array to avoid runtime errors
  const safeCategories = Array.isArray(categories) ? categories : []
  const [formData, setFormData] = useState({
    title: product?.title || product?.name || '',
    description: product?.description || '',
    price: product?.price ?? '',
    categoryId: product?.categoryId ?? product?.category ?? '',
    images: Array.isArray(product?.images) ? product.images : [],
    tags: product?.tags || [],
    shippingPrice: product?.shippingPrice || '',
    estimatedDelivery: product?.estimatedDelivery || '7-14',
    regions: product?.regions || [],
    acceptsReturns: product?.acceptsReturns !== false,
    offersRefunds: product?.offersRefunds !== false,
  })

  const [imageFiles, setImageFiles] = useState([])
  const [newTag, setNewTag] = useState('')
  const [newRegion, setNewRegion] = useState('')

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || product.name || '',
        description: product.description || '',
        price: product.price ?? '',
        categoryId: product.categoryId ?? product.category ?? '',
        images: Array.isArray(product.images) ? product.images : [],
        tags: product.tags || [],
        shippingPrice: product.shippingPrice || '',
        estimatedDelivery: product.estimatedDelivery || '7-14',
        regions: product.regions || [],
        acceptsReturns: product.acceptsReturns !== false,
        offersRefunds: product.offersRefunds !== false,
      })
    }
  }, [product])

  const totalImageCount = formData.images.length + imageFiles.length
  const maxImages = 5
  const canAddMoreImages = allowImageUpload && totalImageCount < maxImages

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      images: [...formData.images, ...imageFiles],
    }
    onSubmit?.(submitData)
  }

  const handleImageUpload = (e) => {
    if (!allowImageUpload) {
      e.target.value = ''
      return
    }
    const files = Array.from(e.target.files || [])
    const remaining = maxImages - (formData.images.length + imageFiles.length)
    const toAdd = files.slice(0, Math.max(0, remaining))
    if (toAdd.length > 0) setImageFiles((prev) => [...prev, ...toAdd])
    e.target.value = ''
  }

  const handleRemoveImage = (index, isFile = false) => {
    if (isFile) {
      setImageFiles((prev) => prev.filter((_, i) => i !== index))
    } else {
      setFormData({
        ...formData,
        images: formData.images.filter((_, i) => i !== index),
      })
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] })
      setNewTag('')
    }
  }

  const handleAddRegion = () => {
    if (newRegion.trim() && !formData.regions.includes(newRegion.trim())) {
      setFormData({ ...formData, regions: [...formData.regions, newRegion.trim()] })
      setNewRegion('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-4">
              Basic Information
            </h3>

            <div className="space-y-4">
              <Input
                label="Product Title *"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isSaving}
                placeholder="e.g., Limited Edition Print"
              />

              <div>
                <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  disabled={isSaving}
                  className="w-full px-4 py-2 border border-[#E5E5E7] rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] outline-none text-[#1D1D1F] placeholder:text-[#6E6E73]"
                  placeholder="Describe your product..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    <DollarSign size={16} className="inline mr-1" />
                    Price *
                  </label>
                  <Input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    disabled={isSaving}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    <Package size={16} className="inline mr-1" />
                    Category *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    disabled={isSaving}
                    required
                    className="w-full px-4 py-2 border border-[#E5E5E7] rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] outline-none text-[#1D1D1F] bg-white"
                  >
                    <option value="">Select Category</option>
                    {safeCategories.map((cat) => (
                      <option key={cat.id || cat._id} value={cat.id || cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Images — up to 5 */}
          <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
              Product Images
            </h3>
            <p className="text-sm text-[#6E6E73] mb-4">
              Up to {maxImages} images. Current: {totalImageCount} of {maxImages}.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={`existing-${index}`} className="relative">
                  <img
                    src={
                      typeof image === 'string'
                        ? image
                        : image?.url
                          ? image.url
                          : image instanceof File
                            ? URL.createObjectURL(image)
                            : ''
                    }
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-[#E5E5E7]"
                  />
                  {allowImageUpload && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, false)}
                      disabled={isSaving}
                      className="absolute top-2 right-2 p-1 bg-[#FF3B30] text-white rounded-full hover:bg-[#E6342E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              {imageFiles.map((file, index) => (
                <div key={`file-${index}`} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-[#E5E5E7]"
                  />
                  {allowImageUpload && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, true)}
                      disabled={isSaving}
                      className="absolute top-2 right-2 p-1 bg-[#FF3B30] text-white rounded-full hover:bg-[#E6342E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              {canAddMoreImages && (
                <label className="border-2 border-dashed border-[#E5E5E7] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#007AFF] hover:bg-[#F5F5F7] transition-colors h-32">
                  <Upload size={24} className="text-[#6E6E73] mb-2" />
                  <span className="text-sm text-[#6E6E73]">Add image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={isSaving}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
            <div className="space-y-3">
              <Button type="submit" fullWidth isLoading={isSaving} disabled={isSaving}>
                {product ? 'Update Product' : 'Create Product'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                fullWidth
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

ProductForm.propTypes = {
  product: PropTypes.object,
  categories: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  allowImageUpload: PropTypes.bool,
}

export default ProductForm
