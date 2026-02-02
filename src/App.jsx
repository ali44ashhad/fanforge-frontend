import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import MainLayout from './layouts/MainLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'

import Home from './pages/Home.jsx'
import Marketplace from './pages/Marketplace.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Category from './pages/Category.jsx'
import Categories from './pages/Categories.jsx' 
import SearchResults from './pages/SearchResults.jsx'

import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'

import SellerDashboard from './pages/dashboard/seller/SellerDashboard.jsx'
import Products from './pages/dashboard/seller/Products.jsx'
import ProductEdit from './pages/dashboard/seller/ProductEdit.jsx'
import SellerOrders from './pages/dashboard/seller/Orders.jsx'
import Shipping from './pages/dashboard/seller/Shipping.jsx'
import SellerSettings from './pages/dashboard/seller/Settings.jsx'

import BuyerDashboard from './pages/dashboard/buyer/BuyerDashboard.jsx'
import MyOrders from './pages/dashboard/buyer/MyOrders.jsx'
import Profile from './pages/dashboard/buyer/Profile.jsx'
import OrderTracking from './components/dashboard/buyer/OrderTracking.jsx'

import AdminDashboard from './pages/dashboard/admin/AdminDashboard.jsx'
import Users from './pages/dashboard/admin/Users.jsx'
import ProductsManagement from './pages/dashboard/admin/ProductsManagement.jsx'
import AdminProductPreview from './pages/dashboard/admin/ProductPreview.jsx'
import AdminCategories from './pages/dashboard/admin/Categories.jsx'
import Analytics from './pages/dashboard/admin/Analytics.jsx'
import Sellers from './pages/dashboard/admin/Sellers.jsx'
import Admins from './pages/dashboard/admin/Admins.jsx'
import Sell from './pages/Sell.jsx'
import SellerStore from './pages/SellerStore.jsx'

import AboutUs from './pages/AboutUs.jsx'
import SellerGuidelines from './pages/SellerGuidelines.jsx'
import TopSellers from './pages/TopSellers.jsx'
import Help from './pages/Help.jsx'
import Contact from './pages/Contact.jsx'
import Faqs from './pages/Faqs.jsx'

import Cart from './pages/checkout/Cart.jsx'
import Checkout from './pages/checkout/Checkout.jsx'
import OrderSuccess from './pages/checkout/OrderSuccess.jsx'

import Terms from './pages/legal/Terms.jsx'
import Privacy from './pages/legal/Privacy.jsx'
import Returns from './pages/legal/Returns.jsx'

import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx' 
import { NotificationProvider } from './context/NotificationContext.jsx'

function App() {
  return ( 
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                {/* Public main site */}
                <Route path="/dashboard" element={<Navigate to="/dashboard/buyer" replace />} />
                <Route
                  path="/"
                  element={
                    <MainLayout>
                      <Home />
                    </MainLayout>
                  }
                />
                <Route
                  path="/marketplace"
                  element={
                    <MainLayout>
                      <Marketplace />
                    </MainLayout>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <MainLayout>
                      <ProductDetail />
                    </MainLayout>
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <MainLayout>
                      <Categories />
                    </MainLayout>
                  }
                />
                <Route
                  path="/category/:slug"
                  element={
                    <MainLayout>
                      <Category />
                    </MainLayout>
                  }
                />
                <Route
                  path="/sell"
                  element={
                    <MainLayout>
                      <Sell />
                    </MainLayout>
                  }
                />
                <Route
                  path="/about-us"
                  element={
                    <MainLayout>
                      <AboutUs />
                    </MainLayout>
                  }
                />
                <Route
                  path="/seller-guidelines"
                  element={
                    <MainLayout>
                      <SellerGuidelines />
                    </MainLayout>
                  }
                />
                <Route
                  path="/top-sellers"
                  element={
                    <MainLayout>
                      <TopSellers />
                    </MainLayout>
                  }
                />
                <Route
                  path="/help"
                  element={
                    <MainLayout>
                      <Help />
                    </MainLayout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <MainLayout>
                      <Contact />
                    </MainLayout>
                  }
                />
                <Route
                  path="/faqs"
                  element={
                    <MainLayout>
                      <Faqs />
                    </MainLayout>
                  }
                />
                <Route
                  path="/seller/:id"
                  element={
                    <MainLayout>
                      <SellerStore />
                    </MainLayout>
                  }
                />
              
                <Route
                  path="/search"
                  element={
                    <MainLayout>
                      <SearchResults />
                    </MainLayout>
                  }
                />

                {/* Auth */}
                <Route
                  path="/login"
                  element={
                    <AuthLayout>
                      <Login />
                    </AuthLayout>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthLayout>
                      <Register />
                    </AuthLayout>
                  }
                />
                {/* Seller dashboard */}
                <Route
                  path="/dashboard/seller"
                  element={
                    <DashboardLayout>
                      <SellerDashboard />
                    </DashboardLayout>
                  }
                />
                <Route
                  path="/dashboard/seller/products"
                  element={
                    <DashboardLayout>
                      <Products />
                    </DashboardLayout>
                  }
                />
                <Route
                  path="/dashboard/seller/products/:id"
                  element={
                    <DashboardLayout>
                      <ProductEdit />
                    </DashboardLayout>
                  }
                />
                <Route
                  path="/dashboard/seller/orders"
                  element={
                    <DashboardLayout>
                      <SellerOrders />
                    </DashboardLayout>
                  }
                />
                <Route
                  path="/dashboard/seller/shipping"
                  element={
                    <DashboardLayout>
                      <Shipping />
                    </DashboardLayout>
                  }
                />
                <Route
                  path="/dashboard/seller/settings"
                  element={
                    <DashboardLayout>
                      <SellerSettings />
                    </DashboardLayout>
                  }
                />
                <Route
                  path="/dashboard/seller/profile"
                  element={
                    <DashboardLayout>
                      <Profile />
                    </DashboardLayout>
                  }
                />

                {/* Buyer dashboard */}
                <Route
                  path="/dashboard/buyer"
                  element={
                    <DashboardLayout>
                      <BuyerDashboard />
                    </DashboardLayout>
                  }
                />
                <Route
                  path="/dashboard/buyer/orders"
                  element={
                    <DashboardLayout>
                      <MyOrders />
                    </DashboardLayout>
                  }
                />
                <Route
                  path="/dashboard/buyer/orders/:orderId"
                  element={
                    <DashboardLayout>
                      <OrderTracking />
                    </DashboardLayout>
                  }
                />
                <Route
                  path="/dashboard/buyer/profile"
                  element={
                    <DashboardLayout>
                      <Profile />
                    </DashboardLayout>
                  }
                />

                {/* Admin dashboard */}
                <Route
                  path="/dashboard/admin"
                  element={
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/dashboard/admin/users"
                  element={
                    <AdminLayout>
                      <Users />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/dashboard/admin/admins"
                  element={
                    <AdminLayout>
                      <Admins />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/dashboard/admin/sellers"
                  element={
                    <AdminLayout>
                      <Sellers />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/dashboard/admin/products"
                  element={
                    <AdminLayout>
                      <ProductsManagement />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/dashboard/admin/products/:id/preview"
                  element={
                    <AdminLayout>
                      <AdminProductPreview />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/dashboard/admin/categories"
                  element={
                    <AdminLayout>
                      <AdminCategories />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/dashboard/admin/analytics"
                  element={
                    <AdminLayout>
                      <Analytics />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/dashboard/admin/profile"
                  element={
                    <AdminLayout>
                      <Profile />
                    </AdminLayout>
                  }
                />

                {/* Checkout */}
                <Route
                  path="/cart"
                  element={
                    <MainLayout>
                      <Cart />
                    </MainLayout>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <MainLayout>
                      <Checkout />
                    </MainLayout>
                  }
                />
                <Route
                  path="/order-success"
                  element={
                    <MainLayout>
                      <OrderSuccess />
                    </MainLayout>
                  }
                />

                {/* Legal */}
                <Route
                  path="/terms"
                  element={
                    <MainLayout>
                      <Terms />
                    </MainLayout>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <MainLayout>
                      <Privacy />
                    </MainLayout>
                  }
                />
                <Route
                  path="/returns"
                  element={
                    <MainLayout>
                      <Returns />
                    </MainLayout>
                  }
                />
              </Routes>
            </BrowserRouter>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider> 
  )
}

export default App
