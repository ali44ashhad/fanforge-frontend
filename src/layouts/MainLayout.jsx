// import React, { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import Navbar from '../components/common/Navbar'
// import Footer from '../components/common/Footer'
// import { useAuth } from '../hooks/useAuth'
// import { useCart } from '../hooks/useCart'
// import { useNotifications } from '../context/NotificationContext'

// export default function MainLayout({ children }) {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { user, logout, isAuthed } = useAuth()
//   const { count: cartCount } = useCart()
//   const { notify } = useNotifications()
//   const [isSellerMode, setIsSellerMode] = useState(false)

//   const handleSearch = (query) => {
//     if (query?.trim()) {
//       navigate(`/search?q=${encodeURIComponent(query.trim())}`)
//     }
//   }

//   const handleLogin = () => {
//     navigate('/login', { state: { from: location.pathname } })
//   }

//   const handleLogout = () => {
//     logout()
//     notify('Logged out successfully', { type: 'success' })
//     navigate('/')
//   }

//   const handleToggleSellerMode = () => {
//     if (user?.role === 'SELLER' || user?.role === 'seller') {
//       setIsSellerMode(!isSellerMode)
//       if (!isSellerMode) {
//         navigate('/dashboard/seller')
//       } else {
//         navigate('/dashboard')
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col  bg-gray-50">
//       <Navbar
//         user={user}
//         onLogin={handleLogin}
//         onLogout={handleLogout}
//         onSearch={handleSearch}
//         cartCount={cartCount}
//         onToggleSellerMode={handleToggleSellerMode}
//         isSellerMode={isSellerMode}
//       />
//       <main className="flex-1">{children}</main>
//       <Footer />
//     </div>
//   )
// }

import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import BackToTop from '../components/common/BackToTop'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { useNotifications } from '../context/NotificationContext'

export default function MainLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, isAuthed } = useAuth()
  const { count: cartCount } = useCart()
  const { notify } = useNotifications()
  const [isSellerMode, setIsSellerMode] = useState(false)

  const handleSearch = (query) => {
    if (query?.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleLogin = () => {
    navigate('/login', { state: { from: location.pathname } })
  }

  const handleLogout = () => {
    logout()
    notify('Logged out successfully', { type: 'success' })
    navigate('/')
  }

  const handleToggleSellerMode = () => {
    if (user?.role === 'SELLER' || user?.role === 'seller') {
      setIsSellerMode(!isSellerMode)
      if (!isSellerMode) {
        navigate('/dashboard/seller')
      } else {
        navigate('/dashboard')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSearch={handleSearch}
        cartCount={cartCount}
        onToggleSellerMode={handleToggleSellerMode}
        isSellerMode={isSellerMode}
      />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  )
}