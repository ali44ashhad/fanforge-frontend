// import React from 'react'
// import { Navigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../../hooks/useAuth'

// export default function RequireAuth({ children }) {
//   const { isAuthed, isLoading } = useAuth()
//   const location = useLocation()

//   if (isLoading) {
//     return (
//       <div className="p-6 text-gray-700 dark:text-gray-200">
//         Loading…
//       </div>
//     )
//   }

//   if (!isAuthed) {
//     return <Navigate to="/login" replace state={{ from: location.pathname }} />
//   }

//   return children
// }


import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function RequireAuth({ children }) {
  const { isAuthed, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="p-6 text-[#6E6E73]">
        Loading…
      </div>
    )
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}