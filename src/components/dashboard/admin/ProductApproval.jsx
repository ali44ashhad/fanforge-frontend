// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import Button from '../../common/Button'

// export default function ProductApproval({ products = [], onApprove, onDelete, onChangeType }) {
//   const [changingType, setChangingType] = useState(null)
//   if (products.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500 dark:text-gray-400">No products found</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {products.map((product) => {
//         const productId = product.id || product._id
//         const isPending = product.isApproved === false || product.isApproved === 'false'
//         return (
//           <div
//             key={productId}
//             className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
//           >
//             <div className="flex gap-4">
//               <img
//                 src={product.images?.[0] || '/placeholder-product.jpg'}
//                 alt={product.name}
//                 className="w-24 h-24 object-cover rounded-lg"
//               />
//               <div className="flex-1">
//                 <div className="flex items-start justify-between mb-2">
//                   <div>
//                     <h3 className="font-semibold text-gray-900 dark:text-white">
//                       {product.name || product.title}
//                     </h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Seller: {product.seller?.businessName || product.seller?.name || 'N/A'}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Price: ${Number(product.price || 0).toFixed(2)}
//                     </p>
//                   </div>
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       isPending
//                         ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
//                         : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                     }`}
//                   >
//                     {isPending ? 'Pending' : 'Approved'}
//                   </span>
//                 </div>
//                 <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
//                   {product.description}
//                 </p>
//                 <div className="flex flex-wrap gap-3">
//                   <Link to={`/product/${productId}`}>
//                     <Button variant="outline" size="small">
//                       View Product
//                     </Button>
//                   </Link>
//                   {isPending && (
//                     <Button
//                       size="small"
//                       onClick={() => onApprove?.(productId)}
//                     >
//                       Approve
//                     </Button>
//                   )}
//                   <Button
//                     variant="outline"
//                     size="small"
//                     onClick={async () => {
//                       if (!onChangeType) return
//                       const currentType = String(product.productType || '').toUpperCase()
//                       const nextType = currentType === 'OFFICIAL' ? 'FAN_MADE' : 'OFFICIAL'
//                       try {
//                         setChangingType(productId)
//                         await onChangeType(productId, nextType)
//                       } finally {
//                         setChangingType(null)
//                       }
//                     }}
//                     disabled={changingType === productId}
//                   >
//                     {changingType === productId
//                       ? 'Changing...'
//                       : String(product.productType || '').toUpperCase() === 'OFFICIAL'
//                       ? 'Mark as Fan-Made'
//                       : 'Mark as Official'}
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="small"
//                     onClick={() => onDelete?.(productId)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// ProductApproval.propTypes = {
//   products: PropTypes.array,
//   onApprove: PropTypes.func,
//   onDelete: PropTypes.func,
//   onChangeType: PropTypes.func,
// }

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '../../common/Button'
import Badge from '../../common/Badge'

export default function ProductApproval({ products = [], onApprove, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6E6E73]">No products found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const productId = product.id || product._id
        const isPending = product.isApproved === false || product.isApproved === 'false'
        return (
          <div
            key={productId}
            className="bg-white rounded-lg border border-[#E5E5E7] p-6"
          >
            <div className="flex gap-4">
              <img
                src={
                  (Array.isArray(product.images) &&
                    (typeof product.images[0] === 'string'
                      ? product.images[0]
                      : product.images[0]?.url)) ||
                  '/placeholder-product.jpg'
                }
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-[#1D1D1F]">
                      {product.name || product.title}
                    </h3>
                    <p className="text-sm text-[#6E6E73]">
                      Seller: {product.seller?.businessName || product.seller?.name || 'N/A'}
                    </p>
                    <p className="text-sm text-[#6E6E73]">
                      Price: ${Number(product.price || 0).toFixed(2)}
                    </p>
                  </div>
                  <Badge type={isPending ? 'pending' : 'approved'} size="small" />
                </div>
                <p className="text-[#6E6E73] mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/dashboard/admin/products/${productId}/preview`}
                    state={{ product }}
                  >
                    <Button variant="outline" size="small">
                      View Product
                    </Button>
                  </Link>
                  {isPending && (
                    <Button
                      size="small"
                      onClick={() => onApprove?.(productId)}
                    >
                      Approve
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => onDelete?.(productId)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

ProductApproval.propTypes = {
  products: PropTypes.array,
  onApprove: PropTypes.func,
  onDelete: PropTypes.func,
}