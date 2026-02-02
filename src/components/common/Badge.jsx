// import React from 'react';
// import PropTypes from 'prop-types';

// const Badge = ({ type = 'official', size = 'medium', className = '' }) => {
//   const config = {
//     official: {
//       text: 'Official',
//       color: 'bg-amber-500 text-white',
//       icon: (
//         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
//         </svg>
//       ),
//     },
//     fan_made: {
//       text: 'Fan Made',
//       color: 'bg-blue-500 text-white',
//       icon: (
//         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//           <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
//         </svg>
//       ),
//     },
//   };
  
//   const sizeClasses = {
//     small: 'px-2 py-1 text-xs',
//     medium: 'px-3 py-1.5 text-sm',
//     large: 'px-4 py-2 text-base',
//   };
  
//   const { text, color, icon } = config[type];
  
//   return (
//     <div className={`inline-flex items-center rounded-full ${color} ${sizeClasses[size]} font-medium ${className}`}>
//       {icon && <span className="mr-1.5">{icon}</span>}
//       {text}
//     </div>
//   );
// };

// Badge.propTypes = {
//   type: PropTypes.oneOf(['official', 'fan_made']),
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
//   className: PropTypes.string,
// };

// export default Badge;
import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ type = 'official', size = 'medium', className = '' }) => {
  const t = String(type || 'official').toLowerCase()
  const config = {
    official: {
      text: 'Official',
      color: 'bg-[#FF9500] text-white', // Using warning color from Palette 1
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
      ),
    },
    fan_made: {
      text: 'Fan Made',
      color: 'bg-[#007AFF] text-white', // Using accent color from Palette 1
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
        </svg>
      ),
    },

    // Status badges
    pending: {
      text: 'Pending',
      color: 'bg-[#FFF4E5] text-[#663C00]',
    },
    approved: {
      text: 'Approved',
      color: 'bg-[#E8F5E9] text-[#2E7D32]',
    },
    active: {
      text: 'Active',
      color: 'bg-[#E8F5E9] text-[#2E7D32]',
    },
    delivered: {
      text: 'Delivered',
      color: 'bg-[#E8F5E9] text-[#2E7D32]',
    },
    cancelled: {
      text: 'Cancelled',
      color: 'bg-[#FFEBEE] text-[#C62828]',
    },
    shipped: {
      text: 'Shipped',
      color: 'bg-[#F3E8FF] text-[#5A189A]',
    },
    out_for_delivery: {
      text: 'Out for Delivery',
      color: 'bg-[#F3E8FF] text-[#5A189A]',
    },
    processing: {
      text: 'Processing',
      color: 'bg-[#EBF5FF] text-[#004C99]',
    },
    accepted: {
      text: 'Accepted',
      color: 'bg-[#EBF5FF] text-[#004C99]',
    },

    // Role badges
    admin: {
      text: 'ADMIN',
      color: 'bg-[#EBF5FF] text-[#004C99]',
    },
    seller: {
      text: 'SELLER',
      color: 'bg-[#F3E8FF] text-[#5A189A]',
    },
    buyer: {
      text: 'BUYER',
      color: 'bg-[#E8F5E9] text-[#2E7D32]',
    },
    banned: {
      text: 'Banned',
      color: 'bg-[#FFEBE9] text-[#D70015]',
    },

    // Stock badges
    in_stock: {
      text: 'In Stock',
      color: 'bg-[#E8F5E9] text-[#2E7D32]',
    },
    out_of_stock: {
      text: 'Out of Stock',
      color: 'bg-[#FFEBEE] text-[#C62828]',
    },
  };
  
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base',
  };
  
  const { text, color, icon } = config[t] || config.fan_made;
  
  return (
    <div className={`inline-flex items-center rounded-full ${color} ${sizeClasses[size]} font-medium ${className}`}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {text}
    </div>
  );
};

Badge.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default Badge;