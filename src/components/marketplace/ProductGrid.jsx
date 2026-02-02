// import React from 'react';
// import PropTypes from 'prop-types';
// import ProductCard from './ProductCard';
// import EmptyState from '../common/EmptyState';

// const ProductGrid = ({ 
//   products, 
//   loading = false, 
//   error = null,
//   columns = 4,
//   onAddToCart,
//   onAddToWishlist,
//   emptyStateProps = {},
// }) => {
//   const gridCols = {
//     2: 'grid-cols-1 sm:grid-cols-2',
//     3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
//     4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
//     5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
//   };

//   if (loading) {
//     return (
//       <div className={`grid ${gridCols[columns]} gap-6`}>
//         {[...Array(8)].map((_, i) => (
//           <div key={i} className="animate-pulse">
//             <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-56"></div>
//             <div className="p-4 space-y-3">
//               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
//               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
//               <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-red-500 mb-4">
//           <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>
//         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//           Error Loading Products
//         </h3>
//         <p className="text-gray-600 dark:text-gray-400">
//           {error.message || 'Failed to load products. Please try again.'}
//         </p>
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <EmptyState
//         title={emptyStateProps.title || "No products found"}
//         description={emptyStateProps.description || "Try adjusting your filters or search terms"}
//         actionLabel={emptyStateProps.actionLabel}
//         onAction={emptyStateProps.onAction}
//         icon={emptyStateProps.icon}
//       />
//     );
//   }

//   return (
//     <div className={`grid ${gridCols[columns]} gap-6`}>
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//           onAddToCart={onAddToCart}
//           onAddToWishlist={onAddToWishlist}
//         />
//       ))}
//     </div>
//   );
// };

// ProductGrid.propTypes = {
//   products: PropTypes.array.isRequired,
//   loading: PropTypes.bool,
//   error: PropTypes.instanceOf(Error),
//   columns: PropTypes.oneOf([2, 3, 4, 5]),
//   onAddToCart: PropTypes.func,
//   onAddToWishlist: PropTypes.func,
//   emptyStateProps: PropTypes.shape({
//     title: PropTypes.string,
//     description: PropTypes.string,
//     actionLabel: PropTypes.string,
//     onAction: PropTypes.func,
//     icon: PropTypes.node,
//   }),
// };

// export default ProductGrid;
import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import EmptyState from '../common/EmptyState';

const ProductGrid = ({ 
  products, 
  loading = false, 
  error = null,
  columns = 4,
  onAddToCart,
  emptyStateProps = {},
}) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  };

  if (loading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-[#F5F5F7] rounded-xl h-56"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-[#F5F5F7] rounded"></div>
              <div className="h-4 bg-[#F5F5F7] rounded w-2/3"></div>
              <div className="h-6 bg-[#F5F5F7] rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-[#FF3B30] mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">
          Error Loading Products
        </h3>
        <p className="text-[#6E6E73]">
          {error.message || 'Failed to load products. Please try again.'}
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyStateProps.title || "No products found"}
        description={emptyStateProps.description || "Try adjusting your filters or search terms"}
        actionLabel={emptyStateProps.actionLabel}
        onAction={emptyStateProps.onAction}
        icon={emptyStateProps.icon}
      />
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  columns: PropTypes.oneOf([2, 3, 4, 5]),
  onAddToCart: PropTypes.func,
  emptyStateProps: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    actionLabel: PropTypes.string,
    onAction: PropTypes.func,
    icon: PropTypes.node,
  }),
};

export default ProductGrid;