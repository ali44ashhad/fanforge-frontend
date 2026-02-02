// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function AuthLayout({ children }) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <Link to="/" className="inline-flex items-center">
            
//             <span className="text-3xl font-bold text-gray-900 dark:text-white">
//               FanForge
//             </span>
//           </Link>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
//           {children}
//         </div>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center">
            <div className="w-10 h-10 rounded-xl bg-[#007AFF] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-3xl font-bold text-[#1D1D1F] ml-3">
              FanForge
            </span>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-[#E5E5E7] p-8">
          {children}
        </div>
      </div>
    </div>
  )
}