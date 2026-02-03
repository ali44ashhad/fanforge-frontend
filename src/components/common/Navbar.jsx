// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Button from './Button';
// import SearchBar from './SearchBar';

// const Navbar = ({
//   user = null,
//   onLogin,
//   onLogout,
//   onSearch,
//   cartCount = 0,
//   onToggleSellerMode,
//   isSellerMode = false,
// }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//   const navLinks = [
//     { label: 'Home', path: '/' },
//     { label: 'Marketplace', path: '/marketplace' },
//     { label: 'Categories', path: '/categories' }, 
//   ];

//   return (
//     <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 w-full">
//       <div className="w-full px-2">
//         <div className="flex items-center justify-between h-14 sm:h-16">
//           {/* Logo */}
//           <div className="flex items-center flex-shrink-0">
//             <Link to="/" className="flex items-center gap-1 sm:gap-2">
//               <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary flex items-center justify-center">
//                 <span className="text-white font-bold text-base sm:text-xl">F</span>
//               </div>
//               <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white ">
//                 FanForge
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Search Bar - Responsive */}
//           <div className="hidden md:flex flex-1 max-w-xs lg:max-w-xl mx-3 lg:mx-6">
//             <SearchBar onSearch={onSearch} placeholder="Search..." />
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-2 sm:gap-4">
//             {/* Cart */}
//             <Link to="/cart" className="relative p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
//               <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* User Menu */}
//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                   className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 >
//                   <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
//                     {user.avatar ? (
//                       <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
//                     ) : (
//                       <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
//                         {user.name?.[0]?.toUpperCase() || 'U'}
//                       </span>
//                     )}
//                   </div>
//                   <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
//                     {user.name}
//                   </span>
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isMenuOpen && (
//                   <>
//                     <div
//                       className="fixed inset-0 z-30"
//                       onClick={() => setIsMenuOpen(false)}
//                     />
//                     <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-40 border border-gray-200 dark:border-gray-700">
//                       <Link
//                         to={user.role === 'admin' ? '/dashboard/admin' : user.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer'}
//                         className="block px-3 sm:px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         Dashboard
//                       </Link>
                      
//                       {user.role === 'seller' && (
//                         <button
//                           onClick={() => {
//                             onToggleSellerMode?.();
//                             setIsMenuOpen(false);
//                           }}
//                           className="block w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                         >
//                           {isSellerMode ? 'Switch to Buyer' : 'Switch to Seller'}
//                         </button>
//                       )} 
                      
//                       <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                      
//                       <button
//                         onClick={() => {
//                           onLogout?.();
//                           setIsMenuOpen(false);
//                         }}
//                         className="block w-full text-left px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                       >
//                         Sign Out
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <div className="hidden sm:flex items-center gap-2">
//                 <Button variant="ghost" size="small" onClick={onLogin}>
//                   Sign In
//                 </Button>
//                 <Button size="small" onClick={() => window.location.href = '/register'}>
//                   Sign Up
//                 </Button>
//               </div>
//             )}

//             {/* Mobile/Tablet Menu Button */}
//             <button
//               className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {isMenuOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search & Menu */}
//         <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-3 sm:py-4 border-t border-gray-200 dark:border-gray-800 space-y-3`}>
//           <div className="mb-4">
//             <SearchBar onSearch={onSearch} />
//           </div>
//           <div className="space-y-2">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {link.label}
//               </Link>
//             ))}
            
//             {user && (
//               <>
//                 <Link
//                   to={user.role === 'admin' ? '/dashboard/admin' : user.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer'}
//                   className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/profile"
//                   className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Profile
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import SearchBar from './SearchBar';  
import logo from '../../assets/logo.png';

const Navbar = ({
  user = null,
  onLogin,
  onLogout,
  onSearch,
  cartCount = 0,
  onToggleSellerMode,
  isSellerMode = false,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Categories', path: '/categories' },
  ];
  const roleUpper = user ? String(user.role || '').toUpperCase() : '';
  const isSeller = roleUpper === 'SELLER';
  const isAdmin = roleUpper === 'ADMIN' || roleUpper === 'SUPER_ADMIN';
  const showCart = !isSeller && !isAdmin;
  const dashboardPath = isAdmin ? '/dashboard/admin' : isSeller ? '/dashboard/seller' : '/dashboard/buyer';

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-[#E5E5E7] w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-1 sm:gap-2">
              <img src={logo} alt="FanForge" className="w-full h-7 sm:h-8" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar - Responsive */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-xl mx-3 lg:mx-6">
            <SearchBar onSearch={onSearch} placeholder="Search..." />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart — sellers ko cart nahi dikhata */}
            {showCart && (
              <Link to="/cart" className="relative p-1.5 sm:p-2 hover:bg-[#F5F5F7] rounded-lg transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#6E6E73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu - profile icon: desktop/tablet only; on mobile all tabs are in sidebar */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => {
                    setIsUserMenuOpen((prev) => !prev);
                    setIsMobileNavOpen(false);
                  }}
                  className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-[#F5F5F7] transition-colors"
                  aria-label="Account menu"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E5E5E7] flex items-center justify-center flex-shrink-0">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-xs sm:text-sm text-[#1D1D1F] font-medium">
                        {user.name?.[0]?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm text-[#1D1D1F] max-w-xs truncate">
                    {user.name}
                  </span>
                </button>

                {/* Profile dropdown - Dashboard, Profile, Sign Out (desktop only) */}
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsUserMenuOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg py-2 z-40 border border-[#E5E5E7]">
                      <Link
                        to={dashboardPath}
                        className="block px-3 sm:px-4 py-2 text-sm text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {/* {isSeller && (
                        <button
                          onClick={() => {
                            onToggleSellerMode?.();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-3 sm:px-4 py-2 text-sm text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                        >
                          {isSellerMode ? 'Switch to Buyer' : 'Switch to Seller'}
                        </button>
                      )} */}
                      <div className="border-t border-[#E5E5E7] my-2" />
                      <button
                        onClick={() => {
                          onLogout?.();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 sm:px-4 py-2 text-sm text-[#FF3B30] hover:bg-[#FFEBE9] transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="small" onClick={onLogin}>
                  Sign In
                </Button>
                <Button size="small" onClick={() => window.location.href = '/register'}>
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile hamburger - opens sidebar / mobile nav only */}
            <button
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-[#F5F5F7] transition-colors"
              onClick={() => {
                setIsMobileNavOpen((prev) => !prev);
                setIsUserMenuOpen(false);
              }}
              aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D1D1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileNavOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav panel - only controlled by hamburger */}
        <div className={`md:hidden ${isMobileNavOpen ? 'block' : 'hidden'} py-3 sm:py-4 border-t border-[#E5E5E7] space-y-3`}>
          <div className="mb-4">
            <SearchBar onSearch={onSearch} />
          </div>
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-[#1D1D1F] hover:text-[#007AFF] transition-colors"
                onClick={() => setIsMobileNavOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="border-t border-[#E5E5E7] pt-2 mt-2" />
                <Link
                  to={dashboardPath}
                  className="block py-2 text-[#1D1D1F] hover:text-[#007AFF] transition-colors"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    onLogout?.();
                    setIsMobileNavOpen(false);
                  }}
                  className="block w-full text-left py-2 text-[#FF3B30] hover:text-[#D70015] transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-[#E5E5E7] pt-4 mt-2" />
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      onLogin?.();
                      setIsMobileNavOpen(false);
                    }}
                    className="!py-3 !rounded-xl border-2"
                  >
                    Sign In
                  </Button>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="block w-full rounded-xl py-3 px-4 text-center font-medium bg-[#007AFF] text-white hover:bg-[#0056CC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;