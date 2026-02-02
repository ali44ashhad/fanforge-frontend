import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  Truck,
  BarChart3,
  PlusCircle,
  User
} from 'lucide-react';

const SellerSidebar = () => {
  const location = useLocation();
  const navItems = [
    { path: '/seller/dashboard', icon: <Home size={20} />, label: 'Overview' },
    { path: '/seller/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/seller/products/add', icon: <PlusCircle size={20} />, label: 'Add Product' },
    { path: '/seller/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
    { path: '/seller/shipping', icon: <Truck size={20} />, label: 'Shipping' },
    { path: '/seller/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { path: '/seller/profile', icon: <User size={20} />, label: 'Profile' },
    { path: '/seller/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Seller Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your store</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <User size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-white">Store Status</p>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Active
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          12 products • 5 pending orders
        </p>
      </div>
    </aside>
  );
};

export default SellerSidebar;