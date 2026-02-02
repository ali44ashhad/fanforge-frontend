// import React from 'react'
// import PropTypes from 'prop-types'
// import Button from '../../common/Button'

// export default function UserManagement({ users = [], onBan }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 dark:bg-gray-700/50">
//             <tr>
//               <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Role
//               </th>
//               <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//             {users.map((user) => {
//               const userId = user.id || user._id
//               return (
//                 <tr key={userId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
//                   <td className="py-4 px-6 text-gray-900 dark:text-white">{user.email}</td>
//                   <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
//                     {user.fullName || user.name || 'N/A'}
//                   </td>
//                   <td className="py-4 px-6">
//                     <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
//                       {user.role || 'BUYER'}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         user.isBanned
//                           ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                           : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                       }`}
//                     >
//                       {user.isBanned ? 'Banned' : 'Active'}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     {!user.isBanned && (
//                       <Button
//                         variant="danger"
//                         size="small"
//                         onClick={() => onBan?.(userId)}
//                       >
//                         Ban User
//                       </Button>
//                     )}
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>
//       {users.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 dark:text-gray-400">No users found</p>
//         </div>
//       )}
//     </div>
//   )
// }

// UserManagement.propTypes = {
//   users: PropTypes.array,
//   onBan: PropTypes.func,
// }

import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../common/Button'
import Badge from '../../common/Badge'

export default function UserManagement({ users = [], onBan, onUnban }) {
  return (
    <div className="bg-white rounded-lg border border-[#E5E5E7] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F5F7]">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                Role
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E7]">
            {users.map((user) => {
              const userId = user.id || user._id
              return (
                <tr key={userId} className="hover:bg-[#F5F5F7] transition-colors">
                  <td className="py-4 px-6 text-[#1D1D1F]">{user.email}</td>
                  <td className="py-4 px-6 text-[#6E6E73]">
                    {user.fullName || user.name || 'N/A'}
                  </td>
                  <td className="py-4 px-6">
                    <Badge type={String(user.role || 'BUYER').toLowerCase()} size="small" />
                  </td>
                  <td className="py-4 px-6">
                    <Badge type={user.isBanned ? 'banned' : 'active'} size="small" />
                  </td>
                  <td className="py-4 px-6">
                    {!user.isBanned ? (
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => onBan?.(userId)}
                      >
                        Ban User
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => onUnban?.(userId)}
                      >
                        Unban User
                      </Button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#6E6E73]">No users found</p>
        </div>
      )}
    </div>
  )
}

UserManagement.propTypes = {
  users: PropTypes.array,
  onBan: PropTypes.func,
  onUnban: PropTypes.func,
}