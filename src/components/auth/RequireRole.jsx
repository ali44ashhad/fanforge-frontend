// import React from 'react'
// import { Navigate } from 'react-router-dom'
// import { useAuth } from '../../hooks/useAuth'
// import { ROLES } from '../../utils/constants'

// function hasRole(userRole, allowed) {
//   if (!userRole) return false
//   const role = String(userRole).toUpperCase()
//   const allowedSet = new Set((allowed || []).map((r) => String(r).toUpperCase()))
//   if (allowedSet.has(role)) return true
//   // Allow SUPER_ADMIN where ADMIN is required
//   if (role === ROLES.SUPER_ADMIN && allowedSet.has(ROLES.ADMIN)) return true
//   return false
// }

// export default function RequireRole({ allowed = [], children }) {
//   const { role, isLoading } = useAuth()

//   if (isLoading) {
//     return (
//       <div className="p-6 text-gray-700 dark:text-gray-200">
//         Loading…
//       </div>
//     )
//   }

//   if (!hasRole(role, allowed)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROLES } from '../../utils/constants'

function hasRole(userRole, allowed) {
  if (!userRole) return false
  const role = String(userRole).toUpperCase()
  const allowedSet = new Set((allowed || []).map((r) => String(r).toUpperCase()))
  if (allowedSet.has(role)) return true
  // Allow SUPER_ADMIN where ADMIN is required
  if (role === ROLES.SUPER_ADMIN && allowedSet.has(ROLES.ADMIN)) return true
  return false
}

export default function RequireRole({ allowed = [], children }) {
  const { role, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="p-6 text-[#6E6E73]">
        Loading…
      </div>
    )
  }

  if (!hasRole(role, allowed)) {
    return <Navigate to="/" replace />
  }

  return children
}