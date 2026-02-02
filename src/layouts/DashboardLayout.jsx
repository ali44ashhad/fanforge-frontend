// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth'
// import { useNotifications } from '../context/NotificationContext'
// import Sidebar from '../components/common/Sidebar'
// import RequireAuth from '../components/auth/RequireAuth'

// export default function DashboardLayout({ children }) {
//   const { user, logout, role } = useAuth()
//   const { notify } = useNotifications()
//   const navigate = useNavigate()
//   const [isCollapsed, setIsCollapsed] = useState(false)

//   const handleLogout = () => {
//     logout()
//     notify('Logged out successfully', { type: 'success' })
//     navigate('/')
//   }

//   const userRole = role?.toLowerCase() || 'buyer'

//   return (
//     <RequireAuth>
//       <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
//         <Sidebar
//           userRole={userRole}
//           isCollapsed={isCollapsed}
//           onToggle={() => setIsCollapsed(!isCollapsed)}
//         />
//         <div className="flex-1 flex flex-col">
//           <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {user?.name || 'Dashboard'}
//                 </h1>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Welcome back, {user?.email}
//                 </p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//               >
//                 Sign Out
//               </button>
//             </div>
//           </header>
//           <main className="flex-1 p-6">{children}</main>
//         </div>
//       </div>
//     </RequireAuth>
//   )
// }

import React from 'react'
import { useAuth } from '../hooks/useAuth'
import MainLayout from './MainLayout'
import Sidebar from '../components/common/Sidebar'
import RequireAuth from '../components/auth/RequireAuth'

export default function DashboardLayout({ children }) {
  const { role } = useAuth()
  const userRole = role?.toLowerCase() || 'buyer'

  return (
    <RequireAuth>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="relative flex-shrink-0 w-full lg:w-auto">
              <Sidebar userRole={userRole} />
            </div>
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </MainLayout>
    </RequireAuth>
  )
}