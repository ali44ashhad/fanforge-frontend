// import React, { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { useAuth } from '../../hooks/useAuth'
// import { useNotifications } from '../../context/NotificationContext'
// import Button from '../../components/common/Button'
// import Input from '../../components/common/Input'

// export default function Register() {
//   const navigate = useNavigate()
//   const { register, isLoading } = useAuth()
//   const { notify } = useNotifications()
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullName: '',
//     phoneNumber: '',
//     address: '',
//   })
//   const [error, setError] = useState(null)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError(null)
//     try {
//       await register(formData)
//       notify('Account created successfully!', { type: 'success' })
//       navigate('/')
//     } catch (err) {
//       const message = err?.message || 'Registration failed. Please try again.'
//       setError(message)
//       notify(message, { type: 'error' })
//     }
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
//       <p className="text-gray-600 dark:text-gray-400 mb-6">
//         Join FanForge and start buying or selling today.
//       </p>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           label="Full Name"
//           required
//           autoComplete="name"
//           value={formData.fullName}
//           onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//           disabled={isLoading}
//         />
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
//           autoComplete="new-password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           disabled={isLoading}
//         />
//         <Input
//           label="Phone Number"
//           type="tel"
//           value={formData.phoneNumber}
//           onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//           disabled={isLoading}
//         />
//         <Input
//           label="Address"
//           value={formData.address}
//           onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//           disabled={isLoading}
//         />

//         <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
//           Create Account
//         </Button>
//       </form>

//       <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
//         Already have an account?{' '}
//         <Link
//           to="/login"
//           className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium"
//         >
//           Sign in
//         </Link>
//       </div>
//     </div>
//   )
// }

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../context/NotificationContext'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

export default function Register() {
  const navigate = useNavigate()
  const { register, login, isLoading } = useAuth()
  const { notify } = useNotifications()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    address: '',
  })
  const [error, setError] = useState(null)
  const [formErrors, setFormErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setFormErrors({})

    // Frontend validation — backend rules (no backend change)
    const errors = {}
    if (!formData.fullName?.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name is required'
    }
    if (!formData.email?.trim()) errors.email = 'Invalid email address'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email address'
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    if (!formData.phoneNumber?.trim() || formData.phoneNumber.trim().length < 10) {
      errors.phoneNumber = 'Valid phone number is required'
    }
    if (!formData.address?.trim() || formData.address.trim().length < 5) {
      errors.address = 'Address is required'
    }
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      notify('Please fix the errors below', { type: 'error' })
      return
    }

    try {
      await register({
        ...formData,
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        address: formData.address.trim(),
      })
      // Auto-login after signup — no need to sign in again
      await login({ email: formData.email.trim(), password: formData.password })
      notify('Account created successfully!', { type: 'success' })
      navigate('/dashboard/buyer/profile')
    } catch (err) {
      const message = err?.message || 'Registration failed. Please try again.'
      setError(message)
      notify(message, { type: 'error' })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">Create Account</h2>
      <p className="text-[#6E6E73] mb-6">
        Join FanForge and start buying or selling today.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          required
          autoComplete="name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={formErrors.fullName}
          disabled={isLoading}
        />
        <Input
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={formErrors.email}
          disabled={isLoading}
        />
        <Input
          label="Password"
          type="password"
          required
          autoComplete="new-password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={formErrors.password}
          disabled={isLoading}
        />
        <Input
          label="Phone Number"
          type="tel"
          required
          placeholder="At least 10 digits"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          error={formErrors.phoneNumber}
          disabled={isLoading}
        />
        <Input
          label="Address"
          required
          placeholder="At least 5 characters"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          error={formErrors.address}
          disabled={isLoading}
        />

        <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[#6E6E73]">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-[#007AFF] hover:text-[#0056CC] font-medium transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}