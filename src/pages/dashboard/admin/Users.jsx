// import React, { useState, useEffect } from 'react'
// import { adminService } from '../../../services/adminService'
// import { useNotifications } from '../../../context/NotificationContext'
// import UserManagement from '../../../components/dashboard/admin/UserManagement'
// import Loader from '../../../components/common/Loader'

// export default function Users() {
//   const { notify } = useNotifications()
//   const [users, setUsers] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     loadUsers()
//   }, [])

//   const loadUsers = async () => {
//     setIsLoading(true)
//     try {
//       const data = await adminService.listUsers()
//       const usersData = data?.users || data?.data || data || []
//       setUsers(Array.isArray(usersData) ? usersData : [])
//     } catch (err) {
//       notify('Failed to load users', { type: 'error' })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleBan = async (userId) => {
//     if (!window.confirm('Are you sure you want to ban this user?')) return
//     try {
//       await adminService.banUser(userId)
//       notify('User banned successfully', { type: 'success' })
//       loadUsers()
//     } catch (err) {
//       notify(err?.message || 'Failed to ban user', { type: 'error' })
//     }
//   }

//   if (isLoading) {
//     return <Loader fullScreen text="Loading users..." />
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Management</h2>
//       <UserManagement users={users} onBan={handleBan} />
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { adminService } from '../../../services/adminService'
import { useNotifications } from '../../../context/NotificationContext'
import UserManagement from '../../../components/dashboard/admin/UserManagement'
import Loader from '../../../components/common/Loader'

export default function Users() {
  const { notify } = useNotifications()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      const data = await adminService.listUsers()
      const usersData = data?.users || data?.data || data || []
      const normalized = (Array.isArray(usersData) ? usersData : []).map((u) => ({
        // ensure we always have a boolean flag for UI
        isBanned: false,
        ...u,
      }))
      setUsers(normalized)
    } catch (err) {
      notify('Failed to load users', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBan = async (userId) => {
    if (!window.confirm('Are you sure you want to ban this user?')) return
    try {
      await adminService.banUser(userId)
      notify('User banned successfully', { type: 'success' })
      // keep the user visible in the table and mark as banned so we can unban
      setUsers((prev) =>
        prev.map((u) =>
          (u.id || u._id) === userId ? { ...u, isBanned: true } : u
        )
      )
    } catch (err) {
      notify(err?.message || 'Failed to ban user', { type: 'error' })
    }
  }

  const handleUnban = async (userId) => {
    if (!window.confirm('Are you sure you want to unban this user?')) return
    try {
      await adminService.unbanUser(userId)
      notify('User unbanned successfully', { type: 'success' })
      // update local flag so the button switches back to "Ban User"
      setUsers((prev) =>
        prev.map((u) =>
          (u.id || u._id) === userId ? { ...u, isBanned: false } : u
        )
      )
    } catch (err) {
      notify(err?.message || 'Failed to unban user', { type: 'error' })
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading users..." />
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">User Management</h2>
      <UserManagement users={users} onBan={handleBan} onUnban={handleUnban} />
    </div>
  )
}