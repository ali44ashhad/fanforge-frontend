import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/common/Button'
import Badge from '../../../components/common/Badge'

export default function ProductPreview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const product = location.state?.product || null

  if (!product) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
          <h2 className="text-xl font-semibold text-[#1D1D1F] mb-2">
            Product preview unavailable
          </h2>
          <p className="text-[#6E6E73] mb-4">
            Please open this preview from Admin → Product Management → View Product.
          </p>
          <Button variant="outline" onClick={() => navigate('/dashboard/admin/products')}>
            Back to Product Management
          </Button>
        </div>
      </div>
    )
  }

  const images = Array.isArray(product.images) ? product.images : []
  const imageUrls = images
    .map((img) => (typeof img === 'string' ? img : img?.url))
    .filter(Boolean)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1D1D1F]">
            {product.name || product.title || 'Product'}
          </h1>
          <p className="text-sm text-[#6E6E73] mt-1">
            Product ID: {id}
          </p>
          <p className="text-sm text-[#6E6E73] mt-1">
            Seller: {product.seller?.businessName || product.seller?.name || 'N/A'}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="aspect-square bg-[#F5F5F7] rounded-lg overflow-hidden border border-[#E5E5E7]">
              <img
                src={imageUrls[0] || '/placeholder-product.jpg'}
                alt={product.name || product.title || 'Product'}
                className="w-full h-full object-cover"
              />
            </div>
            {imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {imageUrls.slice(0, 4).map((url, idx) => (
                  <div
                    key={url + idx}
                    className="aspect-square bg-[#F5F5F7] rounded-md overflow-hidden border border-[#E5E5E7]"
                  >
                    <img
                      src={url}
                      alt={`Product ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-[#6E6E73]">Price</div>
              <div className="text-2xl font-bold text-[#1D1D1F]">
                ${Number(product.price || 0).toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-[#6E6E73]">Category</div>
              <div className="text-[#1D1D1F] font-medium">
                {product.category?.name || product.categoryId || 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-sm text-[#6E6E73]">Description</div>
              <div className="text-[#1D1D1F] whitespace-pre-line">
                {product.description || '—'}
              </div>
            </div>
            <div>
              <div className="text-sm text-[#6E6E73]">Status</div>
              <Badge
                type={(product.isApproved === false || product.isApproved === 'false') ? 'pending' : 'approved'}
                size="medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

