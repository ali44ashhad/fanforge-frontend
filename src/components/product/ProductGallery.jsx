
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// const ProductGallery = ({
//   images = [],
//   productName = '',
//   className = '',
// }) => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [isZooming, setIsZooming] = useState(false);

//   if (!images || images.length === 0) {
//     return (
//       <div className={`relative bg-[#F5F5F7] rounded-xl overflow-hidden ${className}`}>
//         <div className="h-full flex items-center justify-center">
//           <svg className="w-20 h-20 text-[#E5E5E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//           </svg>
//         </div>
//       </div>
//     );
//   }

//   const handleMouseMove = (e) => {
//     if (!isZooming) return;
    
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   };

//   return (
//     <div className={`space-y-4 ${className}`}>
//       {/* Main Image */}
//       <div
//         className="relative bg-white rounded-xl overflow-hidden border border-[#E5E5E7]"
//         onMouseEnter={() => setIsZooming(true)}
//         onMouseLeave={() => setIsZooming(false)}
//         onMouseMove={handleMouseMove}
//       >
//         <img
//           src={images[selectedImage]}
//           alt={`${productName} - Image ${selectedImage + 1}`}
//           className="w-full h-auto max-h-[500px] object-contain"
//         />
        
//         {/* Zoom Preview */}
//         {isZooming && images[selectedImage] && (
//           <div className="absolute top-0 right-0 w-64 h-64 border border-[#E5E5E7] bg-white overflow-hidden rounded-lg shadow-xl hidden lg:block">
//             <div
//               className="absolute inset-0 bg-cover bg-no-repeat"
//               style={{
//                 backgroundImage: `url(${images[selectedImage]})`,
//                 backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                 backgroundSize: '200%',
//               }}
//             />
//           </div>
//         )}
        
//         {/* Navigation Arrows */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : images.length - 1))}
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
//             >
//               <svg className="w-5 h-5 text-[#1D1D1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button
//               onClick={() => setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : 0))}
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
//             >
//               <svg className="w-5 h-5 text-[#1D1D1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </>
//         )}
        
//         {/* Image Counter */}
//         <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
//           {selectedImage + 1} / {images.length}
//         </div>
//       </div>

//       {/* Thumbnail Gallery */}
//       {images.length > 1 && (
//         <div className="flex space-x-2 overflow-x-auto pb-2">
//           {images.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedImage(index)}
//               className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#007AFF] ${
//                 selectedImage === index
//                   ? 'border-[#007AFF] ring-2 ring-[#007AFF] ring-opacity-30'
//                   : 'border-[#E5E5E7] hover:border-[#C2C2C7]'
//               }`}
//             >
//               <img
//                 src={image}
//                 alt={`${productName} thumbnail ${index + 1}`}
//                 className="w-full h-full object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// ProductGallery.propTypes = {
//   images: PropTypes.arrayOf(PropTypes.string),
//   productName: PropTypes.string,
//   className: PropTypes.string,
// };

// export default ProductGallery;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProductGallery = ({
  images = [],
  productName = '',
  className = '',
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden ${className}`}>
        <div className="aspect-square h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  const handleMouseMove = (e) => {
    if (!isZooming) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image Container */}
      <div
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 group"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="aspect-square relative overflow-hidden">
          <img
            src={images[selectedImage]}
            alt={`${productName} - Image ${selectedImage + 1}`}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Zoom Overlay */}
          {isZooming && images[selectedImage] && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          )}
          
          {/* Zoom Preview */}
          {isZooming && images[selectedImage] && (
            <div className="absolute top-4 right-4 w-48 h-48 rounded-xl overflow-hidden shadow-2xl border border-white/20 hidden lg:block">
              <div
                className="absolute inset-0 bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${images[selectedImage]})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: '300%',
                }}
              />
            </div>
          )}
        </div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selectedImage === index
                  ? 'ring-2 ring-blue-500 ring-offset-2 scale-105'
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
            >
              <div className="relative w-full h-full">
                <img
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-blue-500/20" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  productName: PropTypes.string,
  className: PropTypes.string,
};

export default ProductGallery;