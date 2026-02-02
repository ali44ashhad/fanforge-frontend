// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const Sidebar = ({ userRole = 'buyer', isCollapsed = false, onToggle }) => {
//   const location = useLocation();
  
//   const getNavItems = () => {
//     const baseItems = [
//       { label: 'Dashboard', path: '/dashboard/buyer', icon: 'dashboard' },
//       { label: 'My Orders', path: '/dashboard/buyer/orders', icon: 'shopping-bag' },
//       { label: 'Wishlist', path: '/dashboard/buyer/wishlist', icon: 'heart' },
//       { label: 'Profile', path: '/dashboard/buyer/profile', icon: 'user' },
//     ];
    
//     if (userRole === 'seller') {
//       return [
//         { label: 'Seller Dashboard', path: '/dashboard/seller', icon: 'store' },
//         { label: 'My Products', path: '/dashboard/seller/products', icon: 'package' },
//         { label: 'Orders', path: '/dashboard/seller/orders', icon: 'truck' },
//         { label: 'Shipping', path: '/dashboard/seller/shipping', icon: 'shipping' },
//         // Analytics page not yet implemented; reuse seller dashboard route
//         { label: 'Analytics', path: '/dashboard/seller', icon: 'bar-chart' },
//       ];
//     }
    
//     if (userRole === 'admin') {
//       return [
//         { label: 'Admin Dashboard', path: '/dashboard/admin', icon: 'shield' },
//         { label: 'Users', path: '/dashboard/admin/users', icon: 'users' },
//         { label: 'Products', path: '/dashboard/admin/products', icon: 'package' },
//         { label: 'Categories', path: '/dashboard/admin/categories', icon: 'grid' },
//         { label: 'Analytics', path: '/dashboard/admin/analytics', icon: 'bar-chart' },
//       ];
//     }
    
//     return baseItems;
//   };
  
//   const navItems = getNavItems();
  
//   const getIcon = (iconName) => {
//     const icons = {
//       dashboard: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//         </svg>
//       ),
//       'shopping-bag': (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//         </svg>
//       ),
//       heart: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       user: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//         </svg>
//       ),
//       store: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       package: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//         </svg>
//       ),
//       truck: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 004 0m-4 0a2 2 0 114 0m6 0a2 2 0 004 0m-4 0a2 2 0 114 0" />
//         </svg>
//       ),
//       shipping: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
//         </svg>
//       ),
//       'bar-chart': (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//         </svg>
//       ),
//       shield: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       users: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0h-15" />
//         </svg>
//       ),
//       grid: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//         </svg>
//       ),
//     };
    
//     return icons[iconName] || icons.dashboard;
//   };
  
//   return (
//     <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
//       {/* Toggle Button */}
//       <button
//         onClick={onToggle}
//         className="absolute -right-3 top-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 hover:shadow-md transition-shadow"
//       >
//         <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
//         </svg>
//       </button>
      
//       {/* Sidebar Header */}
//       <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center">
//           <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
//             <span className="text-white font-bold text-lg">
//               {userRole === 'admin' ? 'A' : userRole === 'seller' ? 'S' : 'B'}
//             </span>
//           </div>
//           {!isCollapsed && (
//             <div className="ml-3">
//               <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
//                 {userRole} Dashboard
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Manage your account
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Navigation */}
//       <nav className="p-4">
//         <ul className="space-y-1">
//           {navItems.map((item) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <li key={`${item.path}-${item.label}`}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center rounded-lg px-3 py-2.5 transition-colors ${
//                     isActive
//                       ? 'bg-primary text-white'
//                       : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//                   }`}
//                   title={isCollapsed ? item.label : ''}
//                 >
//                   <span className={`${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
//                     {getIcon(item.icon)}
//                   </span>
//                   {!isCollapsed && (
//                     <span className="ml-3 font-medium">{item.label}</span>
//                   )}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
      
//       {/* Logout */}
//       {!isCollapsed && (
//         <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
//           <button className="flex items-center w-full text-left text-red-600 hover:text-red-700 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             <span className="ml-3 font-medium">Sign Out</span>
//           </button>
//         </div>
//       )}
//     </aside>
//   );
// };

// Sidebar.propTypes = {
//   userRole: PropTypes.oneOf(['buyer', 'seller', 'admin']),
//   isCollapsed: PropTypes.bool,
//   onToggle: PropTypes.func,
// };

// export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({ userRole = 'buyer' }) => {
  const location = useLocation();
  
  const getNavItems = () => {
    const baseItems = [
      { label: 'Dashboard', path: '/dashboard/buyer', icon: 'dashboard' },
      { label: 'My Orders', path: '/dashboard/buyer/orders', icon: 'shopping-bag' },
      { label: 'Profile', path: '/dashboard/buyer/profile', icon: 'user' },
      { label: 'Become a Seller', path: '/sell', icon: 'store' },
    ];
    
    if (userRole === 'seller') {
      return [
        { label: 'Seller Dashboard', path: '/dashboard/seller', icon: 'store' },
        { label: 'My Products', path: '/dashboard/seller/products', icon: 'package' },
        { label: 'Orders', path: '/dashboard/seller/orders', icon: 'truck' },
        { label: 'Shipping', path: '/dashboard/seller/shipping', icon: 'shipping' },
        { label: 'Profile', path: '/dashboard/seller/profile', icon: 'user' },
      ];
    }
    
    if (userRole === 'admin') {
      return [
        { label: 'Admin Dashboard', path: '/dashboard/admin', icon: 'shield' },
        { label: 'Users', path: '/dashboard/admin/users', icon: 'users' },
        { label: 'Sellers', path: '/dashboard/admin/sellers', icon: 'store' },
        { label: 'Products', path: '/dashboard/admin/products', icon: 'package' },
        { label: 'Categories', path: '/dashboard/admin/categories', icon: 'grid' },
        { label: 'Analytics', path: '/dashboard/admin/analytics', icon: 'bar-chart' },
        { label: 'Profile', path: '/dashboard/admin/profile', icon: 'user' },
      ];
    }
    
    return baseItems;
  };
  
  const navItems = getNavItems();
  
  const getIcon = (iconName) => {
    const icons = {
      dashboard: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      'shopping-bag': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      user: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      store: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      package: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      truck: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 004 0m-4 0a2 2 0 114 0m6 0a2 2 0 004 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      shipping: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      'bar-chart': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      shield: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      users: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0h-15" />
        </svg>
      ),
      grid: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    };
    
    return icons[iconName] || icons.dashboard;
  };
  
  return (
    <aside className="relative bg-white border border-[#E5E5E7] rounded-xl shadow-sm w-full lg:w-64">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-[#E5E5E7]">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-[#007AFF] flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {userRole === 'admin' ? 'A' : userRole === 'seller' ? 'S' : 'B'}
            </span>
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-[#1D1D1F] capitalize">
              {userRole} Dashboard
            </h3>
            <p className="text-sm text-[#6E6E73]">
              Manage your account
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={`${item.path}-${item.label}`}>
                <Link
                  to={item.path}
                  className={`flex items-center rounded-lg px-3 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] ${
                    isActive
                      ? 'bg-[#007AFF] text-white'
                      : 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <span className={`${isActive ? 'text-white' : 'text-[#6E6E73]'}`}>
                    {getIcon(item.icon)}
                  </span>
                  <span className="ml-3 font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Logout */}
      <div className="p-4 border-t border-[#E5E5E7] mt-auto">
        <button className="flex items-center w-full text-left text-[#FF3B30] hover:text-[#D70015] px-3 py-2.5 rounded-lg hover:bg-[#FFEBE9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF3B30]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="ml-3 font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  userRole: PropTypes.oneOf(['buyer', 'seller', 'admin']),
};

export default Sidebar;