import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Edit, Trash2, Eye, Package, CheckCircle, XCircle, Search, Filter } from 'lucide-react'
import Loader from '../../common/Loader'
import EmptyState from '../../common/EmptyState'
import Badge from '../../common/Badge'

const ProductList = ({
  products = [],
  categories = [],
  searchTerm = '',
  onSearchChange,
  selectedCategory = 'all',
  onCategoryChange,
  onDelete,
  onEdit,
  onView,
  isLoading = false,
}) => {
  // Ensure categories is always an array to avoid runtime errors
  const safeCategories = Array.isArray(categories) ? categories : []
  const getStatusLabel = (product) => {
    if (product.isApproved === false || product.isApproved === 'false') {
      return 'Pending'
    }
    if (product.isApproved === true || product.isApproved === 'true') {
      return 'Active'
    }
    return product.status || 'Unknown'
  }

  if (isLoading) {
    return <Loader text="Loading products..." />
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Create your first product to get started"
        actionLabel="Add Product"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E6E73]" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E5E5E7] rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] outline-none"
            />
          </div>
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E6E73]" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange?.(e.target.value)}
            className="pl-10 pr-4 py-2 border border-[#E5E5E7] rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] outline-none bg-white text-[#1D1D1F] appearance-none"
          >
            <option value="all">All Categories</option>
            {safeCategories.map((cat) => (
              <option key={cat.id || cat._id} value={cat.id || cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-[#E5E5E7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F5F7]">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Product
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Category
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Price
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E7]">
              {products.map((product) => {
                const productId = product.id || product._id
                const productName = product.name || product.title
                // Normalize image: backend images are objects with 'url'
                const productImage =
                  product.images?.[0]?.url ||
                  product.images?.[0] ||
                  product.image
                const productType = product.productType || product.badgeType
                const status = getStatusLabel(product)
                const normalizedType = String(productType || '').toUpperCase()
                const badgeType = normalizedType === 'OFFICIAL' ? 'official' : 'fan_made'
                const statusType =
                  String(status || '').toLowerCase() === 'active' ? 'active' : 'pending'

                return (
                  <tr key={productId} className="hover:bg-[#F5F5F7] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={productImage || '/placeholder-product.jpg'}
                          alt={productName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-[#1D1D1F]">{productName}</p>
                          <Badge type={badgeType} size="small" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[#6E6E73] capitalize">
                        {product.category?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-[#1D1D1F]">
                        ${Number(product.price || 0).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge type={statusType} size="small" />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onView?.(productId)}
                          className="p-2 text-[#6E6E73] hover:text-[#007AFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => onEdit?.(productId)}
                          className="p-2 text-[#6E6E73] hover:text-[#34C759] transition-colors focus:outline-none focus:ring-2 focus:ring-[#34C759] rounded"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => onDelete?.(productId)}
                          className="p-2 text-[#6E6E73] hover:text-[#FF3B30] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF3B30] rounded"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func,
  selectedCategory: PropTypes.string,
  onCategoryChange: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default ProductList
