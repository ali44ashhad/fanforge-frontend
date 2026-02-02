 
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import Button from '../common/Button';

// const ProductActions = ({
//   product,
//   onAddToCart,
//   onAddToWishlist,
//   onBuyNow,
//   onShare,
//   className = '',
// }) => {
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     stock,
//     price,
//     title,
//     id,
//   } = product;

//   // Only treat as out of stock when stock is explicitly 0 (backend may omit stock)
//   const isOutOfStock = typeof stock === 'number' && stock === 0;

//   const handleAddToCart = async () => {
//     if (isOutOfStock) return;
    
//     setIsLoading(true);
//     try {
//       await onAddToCart?.(product);
//       setIsInCart(true);
//       // Show success message or animation
//     } catch (error) {
//       console.error('Failed to add to cart:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddToWishlist = async () => {
//     setIsLoading(true);
//     try {
//       await onAddToWishlist?.(product);
//       setIsInWishlist(!isInWishlist);
//     } catch (error) {
//       console.error('Failed to update wishlist:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBuyNow = async () => {
//     if (isOutOfStock) return;
    
//     setIsLoading(true);
//     try {
//       await onAddToCart?.(product);
//       onBuyNow?.(product);
//     } catch (error) {
//       console.error('Failed to buy now:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleShare = () => {
//     const shareUrl = window.location.href;
//     const shareText = `Check out "${title}" on FanForge!`;

//     if (navigator.share) {
//       navigator.share({
//         title: title,
//         text: shareText,
//         url: shareUrl,
//       });
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(shareUrl);
//       // Show copied notification
//     }
//     onShare?.(product);
//   };

//   return (
//     <div className={`space-y-4 ${className}`}>
//       {/* Price Summary */}
//       <div className="bg-[#F5F5F7] rounded-xl p-4">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-[#6E6E73]">Subtotal</span>
//           <span className="text-2xl font-bold text-[#1D1D1F]">
//             ${price.toFixed(2)}
//           </span>
//         </div>
//         <div className="text-sm text-[#6E6E73]">
//           Platform fee: <span className="text-[#34C759] font-medium">FREE</span>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="space-y-3">
//         <Button
//           onClick={handleBuyNow}
//           disabled={isOutOfStock || isLoading}
//           isLoading={isLoading}
//           fullWidth
//           size="large"
//         >
//           {isOutOfStock ? 'Out of Stock' : 'Place Order'}
//         </Button>

//         <div className="grid grid-cols-2 gap-3">
//           <Button
//             variant={isInCart ? "primary" : "outline"}
//             onClick={handleAddToCart}
//             disabled={isOutOfStock || isLoading}
//             fullWidth
//           >
//             {isInCart ? (
//               <>
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 Added to Cart
//               </>
//             ) : (
//               <>
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Add to Cart
//               </>
//             )}
//           </Button>

//           <Button
//             variant={isInWishlist ? "primary" : "outline"}
//             onClick={handleAddToWishlist}
//             disabled={isLoading}
//             fullWidth
//           >
//             {isInWishlist ? (
//               <>
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                 </svg>
//                 In Wishlist
//               </>
//             ) : (
//               <>
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//                 Wishlist
//               </>
//             )}
//           </Button>
//         </div>
//       </div>

//       {/* Additional Actions */}
//       <div className="pt-4 border-t border-[#E5E5E7]">
//         <div className="flex justify-between">
//           <button
//             onClick={handleShare}
//             className="flex items-center text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//             </svg>
//             Share
//           </button>

//           <button className="flex items-center text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded">
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//             </svg>
//             Save
//           </button>

//           <button className="flex items-center text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded">
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             Report
//           </button>
//         </div>
//       </div>

//       {/* Important Notes */}
//       <div className="bg-[#FFF4E5] border border-[#FFE5B4] rounded-xl p-4">
//         <div className="flex">
//           <svg className="w-5 h-5 text-[#FF9500] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <div className="text-sm text-[#663C00]">
//             <strong>Important:</strong> This platform does not process payments. After placing your order, 
//             you'll receive the seller's contact information to arrange payment and shipping directly.
//           </div>
//         </div>
//       </div>

//       {/* Shipping Info */}
//       <div className="bg-[#EBF5FF] border border-[#C2E0FF] rounded-xl p-4">
//         <div className="flex items-start">
//           <svg className="w-5 h-5 text-[#007AFF] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
//           </svg>
//           <div className="text-sm text-[#004C99]">
//             <strong>Shipping:</strong> Handled directly by the seller. Shipping costs and delivery times 
//             will be arranged after order placement.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// ProductActions.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     title: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     stock: PropTypes.number,
//   }).isRequired,
//   onAddToCart: PropTypes.func,
//   onAddToWishlist: PropTypes.func,
//   onBuyNow: PropTypes.func,
//   onShare: PropTypes.func,
//   className: PropTypes.string,
// };

// export default ProductActions;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProductActions = ({
  product,
  onAddToCart,
  onBuyNow,
  className = '',
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    stock,
    price,
    title,
  } = product;

  const isOutOfStock = typeof stock === 'number' && stock === 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    
    setIsLoading(true);
    try {
      await onAddToCart?.(product);
      setIsInCart(true);
      // Reset after 3 seconds
      setTimeout(() => setIsInCart(false), 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (isOutOfStock) return;
    
    setIsLoading(true);
    try {
      // Add to cart first, then redirect
      await onAddToCart?.(product);
      onBuyNow?.(product);
    } catch (error) {
      console.error('Failed to buy now:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    const shareText = `Check out "${title}" on FanForge!`;

    if (navigator.share) {
      navigator.share({
        title: title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      // Show notification
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Price Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">Subtotal</span>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</div>
            <div className="text-sm text-green-600 font-medium mt-1">
              ✓ Platform fee: FREE
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-4">
        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock || isLoading}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-3 focus:ring-offset-2 ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/25 focus:ring-blue-500'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            'Place Order'
          )}
        </button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isLoading}
            className={`flex items-center justify-center py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
              isInCart
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-2 border-green-500'
                : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:shadow-sm border border-gray-200'
            } ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isInCart ? (
              <>
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Actions - Share only */}
      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button
          onClick={handleShare}
          className="flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors group"
        >
          <svg className="w-5 h-5 mr-2 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>

      {/* Important Notes */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-bold text-amber-900">Important Notice</h4>
              <p className="text-sm text-amber-800 mt-1">
                This platform connects buyers with sellers directly. After placing your order, 
                you'll receive the seller's contact info to arrange payment and shipping.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-bold text-blue-900">Shipping Info</h4>
              <p className="text-sm text-blue-800 mt-1">
                Shipping is handled directly by the seller. Costs and delivery times will 
                be arranged after order placement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductActions.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
  onBuyNow: PropTypes.func,
  className: PropTypes.string,
};

export default ProductActions;