// import React, { useState } from 'react'
// import { useNavigate, useLocation, Link } from 'react-router-dom'
// import { useAuth } from '../../hooks/useAuth'
// import { useNotifications } from '../../context/NotificationContext'
// import Button from '../../components/common/Button'
// import Input from '../../components/common/Input'

// export default function Login() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { login, isLoading } = useAuth()
//   const { notify } = useNotifications()
//   const [formData, setFormData] = useState({ email: '', password: '' })
//   const [error, setError] = useState(null)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError(null)
//     try {
//       await login(formData)
//       notify('Login successful!', { type: 'success' })
//       const from = location.state?.from || '/'
//       navigate(from, { replace: true })
//     } catch (err) {
//       let message = err?.message || 'Login failed. Please check your credentials.'
      
//       // Handle rate limiting (429)
//       if (err?.status === 429) {
//         message = 'Too many login attempts. Please wait a few minutes before trying again.'
//       }
      
//       setError(message)
//       notify(message, { type: 'error' })
//     }
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h2>
//       <p className="text-gray-600 dark:text-gray-400 mb-6">
//         Welcome back! Sign in to your account.
//       </p>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           label="Email"
//           type="email"
//           required
//           autoComplete="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           disabled={isLoading}
//         />
//         <Input
//           label="Password"
//           type="password"
//           required
//           autoComplete="current-password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           disabled={isLoading}
//         />

//         <div className="flex items-center justify-between">
//           <Link
//             to="/forgot-password"
//             className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light"
//           >
//             Forgot password?
//           </Link>
//         </div>

//         <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
//           Sign In
//         </Button>
//       </form>

//       <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
//         Don't have an account?{' '}
//         <Link
//           to="/register"
//           className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium"
//         >
//           Sign up
//         </Link>
//       </div>
//     </div>
//   )
// }

import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../context/NotificationContext'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading } = useAuth()
  const { notify } = useNotifications()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await login(formData)
      notify('Login successful!', { type: 'success' })
      const from = location.state?.from || '/'
      navigate(from, { replace: true })
    } catch (err) {
      let message = err?.message || 'Login failed. Please check your credentials.'
      
      // Handle rate limiting (429)
      if (err?.status === 429) {
        message = 'Too many login attempts. Please wait a few minutes before trying again.'
      }
      
      setError(message)
      notify(message, { type: 'error' })
    }
  }

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">Sign In</h2>
      <p className="text-[#6E6E73] mb-6">
        Welcome back! Sign in to your account.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isLoading}
        />
        <Input
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          disabled={isLoading}
        />

        <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[#6E6E73]">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-[#007AFF] hover:text-[#0056CC] font-medium transition-colors"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}