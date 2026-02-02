// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import Badge from '../common/Badge';
// import Button from '../common/Button';

// const ProductCard = ({ product, onAddToCart, onAddToWishlist, showActions = true }) => {
//   const {
//     id,
//     title,
//     price,
//     images = [],
//     seller,
//     badge,
//     rating,
//     reviewCount,
//     stock,
//     isNew = false,
//     discount,
//   } = product;

//   const mainImage = images[0] || '/images/placeholder/product-placeholder.jpg';

//   return (
//     <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
//       {/* Product Image */}
//       <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
//         <Link to={`/product/${id}`}>
//           <img
//             src={mainImage}
//             alt={title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           />
//         </Link>
        
//         {/* Badge & Discount */}
//         <div className="absolute top-3 left-3 flex flex-col gap-2">
//           {badge && <Badge type={badge} size="small" />}
//           {isNew && (
//             <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
//               NEW
//             </span>
//           )}
//         </div>
        
//         {discount && (
//           <div className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
//             -{discount}%
//           </div>
//         )}
        
//         {/* Quick Actions */}
//         {showActions && (
//           <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <button
//               onClick={() => onAddToWishlist?.(product)}
//               className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               title="Add to wishlist"
//             >
//               <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//               </svg>
//             </button>
//             <button
//               onClick={() => onAddToCart?.(product)}
//               className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               title="Add to cart"
//             >
//               <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="p-4">
//         {/* Seller Info */}
//         <div className="flex items-center mb-2">
//           <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden mr-2">
//             {seller?.avatar ? (
//               <img src={seller.avatar} alt={seller.name} className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-xs text-gray-700 dark:text-gray-300">
//                 {seller?.name?.[0]?.toUpperCase() || 'S'}
//               </div>
//             )}
//           </div>
//           <Link
//             to={`/seller/${seller?.id}`}
//             className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
//           >
//             {seller?.name || 'Unknown Seller'}
//           </Link>
//         </div>

//         {/* Title */}
//         <Link to={`/product/${id}`}>
//           <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary dark:hover:text-primary transition-colors">
//             {title}
//           </h3>
//         </Link>

//         {/* Rating */}
//         {(rating || reviewCount) && (
//           <div className="flex items-center mb-3">
//             <div className="flex items-center">
//               {[...Array(5)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className={`w-4 h-4 ${
//                     i < Math.floor(rating || 0)
//                       ? 'text-yellow-400'
//                       : 'text-gray-300 dark:text-gray-600'
//                   }`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
//               {rating?.toFixed(1)} ({reviewCount || 0})
//             </span>
//           </div>
//         )}

//         {/* Price & Stock */}
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="flex items-center gap-2">
//               <span className="text-xl font-bold text-gray-900 dark:text-white">
//                 ${price?.toFixed(2)}
//               </span>
//               {product.originalPrice && (
//                 <span className="text-sm text-gray-500 line-through">
//                   ${product.originalPrice.toFixed(2)}
//                 </span>
//               )}
//             </div>
//             {stock !== undefined && (
//               <div className={`text-xs mt-1 ${
//                 stock > 10 
//                   ? 'text-green-600 dark:text-green-400' 
//                   : stock > 0 
//                     ? 'text-amber-600 dark:text-amber-400' 
//                     : 'text-red-600 dark:text-red-400'
//               }`}>
//                 {stock > 10 ? `${stock} in stock` : stock > 0 ? `Only ${stock} left` : 'Out of stock'}
//               </div>
//             )}
//           </div>

//           {showActions && (
//             <Button
//               size="small"
//               variant="outline"
//               onClick={() => onAddToCart?.(product)}
//               disabled={stock === 0}
//             >
//               {stock === 0 ? 'Sold Out' : 'Add to Cart'}
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// ProductCard.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     title: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     images: PropTypes.arrayOf(PropTypes.string),
//     seller: PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//       name: PropTypes.string,
//       avatar: PropTypes.string,
//     }),
//     badge: PropTypes.oneOf(['official', 'fan_made']),
//     rating: PropTypes.number,
//     reviewCount: PropTypes.number,
//     stock: PropTypes.number,
//     isNew: PropTypes.bool,
//     discount: PropTypes.number,
//     originalPrice: PropTypes.number,
//   }).isRequired,
//   onAddToCart: PropTypes.func,
//   onAddToWishlist: PropTypes.func,
//   showActions: PropTypes.bool,
// };

// export default ProductCard;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import Button from '../common/Button';

const ProductCard = ({ product, onAddToCart, showActions = true }) => {
  const {
    id,
    title,
    price,
    images = [],
    seller,
    badge,
    rating,
    reviewCount,
    stock,
    isNew = false,
    discount,
    productType,
  } = product;

  // Normalize images: backend sends [{ url, ... }] while UI expects strings
  const imageUrls = images.map((img) =>
    typeof img === 'string' ? img : img?.url
  ).filter(Boolean)

  const mainImage = imageUrls[0] || '/images/placeholder/product-placeholder.jpg';

  const sellerName = seller?.businessName || seller?.name || 'Seller'

  // Ensure badge always reflects seller/product type:
  // - Prefer seller.sellerType so ALL products follow seller's current type
  // - Fall back to productType if needed
  const rawType = String(
    seller?.sellerType || productType || ''
  ).toUpperCase();
  const resolvedBadge =
    badge ||
    (rawType === 'OFFICIAL'
      ? 'official'
      : rawType === 'FAN_MADE'
        ? 'fan_made'
        : undefined);

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E5E5E7]">
        {/* Product Image */}
      <div className="relative h-56 overflow-hidden bg-[#F5F5F7]">
        <Link to={`/product/${id}`}>
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Badge & Discount */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {resolvedBadge && <Badge type={resolvedBadge} size="small" />}
          {isNew && (
            <span className="bg-[#34C759] text-white text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
        </div>
        
        {discount && (
          <div className="absolute top-3 right-3 bg-[#FF3B30] text-white text-sm font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        
        {/* Quick Actions */}
        {showActions && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onAddToCart?.(product)}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-[#F5F5F7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
              title="Add to cart"
            >
              <svg className="w-5 h-5 text-[#6E6E73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Seller Info */}
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-[#F5F5F7] overflow-hidden mr-2">
            {seller?.avatar ? (
              <img src={seller.avatar} alt={sellerName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-[#6E6E73]">
                {sellerName?.[0]?.toUpperCase() || 'S'}
              </div>
            )}
          </div>
          <Link
            to={`/seller/${seller?.id}`}
            className="text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors"
          >
            {sellerName}
          </Link>
        </div>
        {product.description && (
          <p className="text-sm text-[#6E6E73] line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price & Stock */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#1D1D1F]">
                ${price?.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#6E6E73] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {typeof stock === 'number' && (
              <div className={`text-xs mt-1 ${
                stock > 10 
                  ? 'text-[#34C759]' 
                  : stock > 0 
                    ? 'text-[#FF9500]' 
                    : 'text-[#FF3B30]'
              }`}>
                {stock > 10 ? `${stock} in stock` : stock > 0 ? `Only ${stock} left` : 'Out of stock'}
              </div>
            )}
          </div>

          {showActions && (
            <Button
              size="small"
              variant="outline"
              onClick={() => onAddToCart?.(product)}
              disabled={typeof stock === 'number' && stock === 0}
            >
              {(typeof stock === 'number' && stock === 0) ? 'Sold Out' : 'Add to Cart'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    seller: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    badge: PropTypes.oneOf(['official', 'fan_made']),
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    stock: PropTypes.number,
    isNew: PropTypes.bool,
    discount: PropTypes.number,
    originalPrice: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
  showActions: PropTypes.bool,
};

export default ProductCard;