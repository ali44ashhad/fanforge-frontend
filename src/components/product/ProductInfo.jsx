// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import Badge from '../common/Badge';

// const ProductInfo = ({
//   product,
//   onQuantityChange,
//   className = '',
// }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   const {
//     title,
//     description,
//     price: rawPrice,
//     originalPrice,
//     discount,
//     badge,
//     rating,
//     reviewCount,
//     stock,
//     sku,
//     category,
//     tags = [],
//     variants = [],
//     specifications = {},
//   } = product;

//   // Ensure price is always a valid number for display
//   const price = Number(rawPrice ?? 0);

//   const handleQuantityChange = (newQuantity) => {
//     const qty = Math.max(1, Math.min(stock || 99, newQuantity));
//     setQuantity(qty);
//     onQuantityChange?.(qty);
//   };

//   return (
//     <div className={`space-y-6 ${className}`}>
//       {/* Badge & Title */}
//       <div className="space-y-2">
//         {badge && <Badge type={badge} size="large" />}
//         <h1 className="text-3xl lg:text-4xl font-bold text-[#1D1D1F]">
//           {title}
//         </h1>
//       </div>

//       {/* Rating */}
//       {(rating || reviewCount) && (
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center">
//             <div className="flex mr-1">
//               {[...Array(5)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className={`w-5 h-5 ${
//                     i < Math.floor(rating || 0)
//                       ? 'text-[#FF9500]'
//                       : 'text-[#E5E5E7]'
//                   }`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <span className="ml-1 font-medium text-[#1D1D1F]">
//               {rating?.toFixed(1)}
//             </span>
//           </div>
//           <span className="text-[#6E6E73]">•</span>
//           <button className="text-[#007AFF] hover:text-[#0056CC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded">
//             {reviewCount || 0} reviews
//           </button>
//           <span className="text-[#6E6E73]">•</span>
//           <span className="text-[#6E6E73]">
//             {stock || 0} in stock
//           </span>
//         </div>
//       )}

//       {/* Price */}
//       <div className="space-y-2">
//         <div className="flex items-center gap-3">
//           <span className="text-3xl font-bold text-[#1D1D1F]">
//             ${Number.isFinite(price) ? price.toFixed(2) : '0.00'}
//           </span>
//           {originalPrice && (
//             <span className="text-xl text-[#6E6E73] line-through">
//               ${originalPrice.toFixed(2)}
//             </span>
//           )}
//           {discount && (
//             <span className="bg-[#FFE5E5] text-[#FF3B30] font-bold px-3 py-1 rounded-full">
//               Save {discount}%
//             </span>
//           )}
//         </div>
//         <div className="text-sm text-[#6E6E73]">
//           Price includes all taxes. No additional fees.
//         </div>
//       </div>

//       {/* Description */}
//       {description && (
//         <div className="prose max-w-none">
//           <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">
//             Description
//           </h3>
//           <p className="text-[#6E6E73] whitespace-pre-line">
//             {description}
//           </p>
//         </div>
//       )}

//       {/* Variants */}
//       {variants.length > 0 && (
//         <div>
//           <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">
//             Options
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {variants.map((variant) => (
//               <button
//                 key={variant.id}
//                 onClick={() => setSelectedVariant(variant.id)}
//                 className={`px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] ${
//                   selectedVariant === variant.id
//                     ? 'bg-[#007AFF] text-white border-[#007AFF]'
//                     : 'border-[#E5E5E7] text-[#1D1D1F] hover:border-[#C2C2C7]'
//                 } ${
//                   variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//                 disabled={variant.stock === 0}
//               >
//                 {variant.name}
//                 {variant.price && variant.price !== price && (
//                   <span className="ml-1 text-sm opacity-75">
//                     (+${(variant.price - price).toFixed(2)})
//                   </span>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Quantity Selector */}
//       <div>
//         <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">
//           Quantity
//         </h3>
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center border border-[#E5E5E7] rounded-lg">
//             <button
//               onClick={() => handleQuantityChange(quantity - 1)}
//               disabled={quantity <= 1}
//               className="px-4 py-2 text-[#6E6E73] hover:text-[#1D1D1F] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-inset"
//             >
//               −
//             </button>
//             <span className="px-4 py-2 text-[#1D1D1F] font-medium">
//               {quantity}
//             </span>
//             <button
//               onClick={() => handleQuantityChange(quantity + 1)}
//               disabled={quantity >= (stock || 99)}
//               className="px-4 py-2 text-[#6E6E73] hover:text-[#1D1D1F] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-inset"
//             >
//               +
//             </button>
//           </div>
          
//         </div>
//       </div>

//       {/* Tags & Categories */}
//       {(tags.length > 0 || category) && (
//         <div className="pt-4 border-t border-[#E5E5E7]">
//           <div className="flex flex-wrap gap-2">
//             {category && (
//               <span className="px-3 py-1 bg-[#F5F5F7] text-[#1D1D1F] rounded-full text-sm">
//                 {category}
//               </span>
//             )}
//             {tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="px-3 py-1 bg-[#F5F5F7] text-[#1D1D1F] rounded-full text-sm"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Specifications */}
//       {Object.keys(specifications).length > 0 && (
//         <div className="pt-4 border-t border-[#E5E5E7]">
//           <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">
//             Specifications
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {Object.entries(specifications).map(([key, value]) => (
//               <div key={key} className="flex justify-between py-2 border-b border-[#F5F5F7]">
//                 <span className="text-[#6E6E73] capitalize">{key}</span>
//                 <span className="text-[#1D1D1F] font-medium">{value}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* SKU */}
//       {sku && (
//         <div className="pt-4 border-t border-[#E5E5E7]">
//           <span className="text-sm text-[#6E6E73]">
//             SKU: {sku}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// ProductInfo.propTypes = {
//   product: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     price: PropTypes.number.isRequired,
//     originalPrice: PropTypes.number,
//     discount: PropTypes.number,
//     badge: PropTypes.oneOf(['official', 'fan_made']),
//     rating: PropTypes.number,
//     reviewCount: PropTypes.number,
//     stock: PropTypes.number,
//     sku: PropTypes.string,
//     category: PropTypes.string,
//     tags: PropTypes.arrayOf(PropTypes.string),
//     variants: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//         name: PropTypes.string,
//         price: PropTypes.number,
//         stock: PropTypes.number,
//       })
//     ),
//     specifications: PropTypes.object,
//   }).isRequired,
//   onQuantityChange: PropTypes.func,
//   className: PropTypes.string,
// };

// export default ProductInfo;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '../common/Badge';

const ProductInfo = ({
  product,
  onQuantityChange,
  className = '',
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const {
    title,
    description,
    price: rawPrice,
    originalPrice,
    discount,
    badge,
    rating,
    reviewCount,
    stock,
    sku,
    category,
    tags = [],
    variants = [],
    specifications = {},
  } = product;

  const price = Number(rawPrice ?? 0);
  const isOutOfStock = typeof stock === 'number' && stock === 0;

  // Shipping / delivery from seller (coerce number/string)
  const seller = product?.seller;
  const shippingCostRaw = seller?.averageShippingCost;
  const shippingCost = typeof shippingCostRaw === 'number'
    ? shippingCostRaw
    : (typeof shippingCostRaw === 'string' ? parseFloat(shippingCostRaw) : NaN);
  const hasShippingCost = Number.isFinite(shippingCost) && shippingCost >= 0;
  const shippingLabel = hasShippingCost ? (shippingCost === 0 ? 'Shipping: Free' : `Shipping: $${shippingCost.toFixed(2)}`) : null;

  const shippingRegions = seller?.shippingRegions;
  const estimatedDeliveryDaysRaw = seller?.estimatedDeliveryDays;
  const estimatedDeliveryDays = typeof estimatedDeliveryDaysRaw === 'number'
    ? estimatedDeliveryDaysRaw
    : (typeof estimatedDeliveryDaysRaw === 'string' ? parseInt(estimatedDeliveryDaysRaw, 10) : NaN);
  const hasEstimatedDays = Number.isFinite(estimatedDeliveryDays) && estimatedDeliveryDays >= 0;

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, Math.min(stock || 99, newQuantity));
    setQuantity(qty);
    onQuantityChange?.(qty);
  };

  const displayTitle = title || product?.name || 'Product';

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Product name first, then badges */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D1D1F] leading-tight">
          {displayTitle}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {badge && (
            <Badge
              type={badge}
              size="medium"
            />
          )}
        </div>
      </div>

      {/* Rating & Stock */}
      <div className="flex items-center flex-wrap gap-4">
        {/* Rating */}
        {(rating || reviewCount) && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating || 0)
                      ? 'text-amber-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-semibold text-gray-900">{rating?.toFixed(1)}</span>
            <span className="text-gray-500">•</span>
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              {reviewCount || 0} reviews
            </button>
          </div>
        )}
        
        {/* Stock Status */}
        <div className="flex items-center gap-3">
          <Badge type={isOutOfStock ? 'out_of_stock' : 'in_stock'} size="medium" />
          {!isOutOfStock && typeof stock === 'number' && (
            <span className="text-sm text-gray-600">{stock} available</span>
          )}
        </div>
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-gray-900">
            ${Number.isFinite(price) ? price.toFixed(2) : '0.00'}
          </span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="text-2xl text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-4 py-1.5 rounded-full">
                Save {Math.round((1 - price / originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>
        <div className="space-y-1 text-[#6E6E73] text-sm">
          <p>All taxes included • No hidden fees</p>
          {hasShippingCost && (
            <p>
              <span className="font-medium text-[#1D1D1F]">Shipping Cost:</span>{' '}
              {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
            </p>
          )}
          {shippingRegions && (
            <p>
              <span className="font-medium text-[#1D1D1F]">Ships to:</span> {shippingRegions}
            </p>
          )}
          {hasEstimatedDays && (
            <p>
              <span className="font-medium text-[#1D1D1F]">Estimated delivery:</span>{' '}
              {estimatedDeliveryDays} {estimatedDeliveryDays === 1 ? 'day' : 'days'}
            </p>
          )}
        </div>
      </div>

      {/* Variants */}
      {variants.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Option</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={`px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectedVariant === variant.id
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 text-blue-700 ring-2 ring-blue-500 ring-opacity-20'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm'
                } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={variant.stock === 0}
              >
                <div className="font-medium">{variant.name}</div>
                {variant.price && variant.price !== price && (
                  <div className="text-sm mt-1">
                    +${(variant.price - price).toFixed(2)}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="px-4 py-3 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-6 py-3 text-lg font-bold text-gray-900 min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= (stock || 99)}
              className="px-4 py-3 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <div className="text-gray-600">
            <span className="font-semibold text-gray-900">
              ${(price * quantity).toFixed(2)}
            </span> total
          </div>
        </div>
      </div>

      {/* Tags & Categories */}
      {(tags.length > 0 || category) && (
        <div className="pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {category && (
              <span className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                {category}
              </span>
            )}
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Specifications */}
      {Object.keys(specifications).length > 0 && (
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 capitalize">{key}</span>
                <span className="text-gray-900 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
    badge: PropTypes.oneOf(['official', 'fan_made']),
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    stock: PropTypes.number,
    sku: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        price: PropTypes.number,
        stock: PropTypes.number,
      })
    ),
    specifications: PropTypes.object,
  }).isRequired,
  onQuantityChange: PropTypes.func,
  className: PropTypes.string,
};

export default ProductInfo;