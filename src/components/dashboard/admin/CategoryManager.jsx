// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import Button from '../../common/Button'
// import Input from '../../common/Input'

// export default function CategoryManager({ categories = [], onCreate, onUpdate }) {
//   const [editingId, setEditingId] = useState(null)
//   const [formData, setFormData] = useState({ name: '', description: '' })
//   const [isCreating, setIsCreating] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (editingId) {
//       await onUpdate?.(editingId, formData)
//       setEditingId(null)
//     } else {
//       await onCreate?.(formData)
//     }
//     setFormData({ name: '', description: '' })
//     setIsCreating(false)
//   }

//   const handleEdit = (category) => {
//     setEditingId(category.id || category._id)
//     setFormData({
//       name: category.name || '',
//       description: category.description || '',
//     })
//     setIsCreating(true)
//   }

//   const handleCancel = () => {
//     setEditingId(null)
//     setFormData({ name: '', description: '' })
//     setIsCreating(false)
//   }

//   return (
//     <div className="space-y-6">
//       {/* Create/Edit Form */}
//       {isCreating && (
//         <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             {editingId ? 'Edit Category' : 'Create Category'}
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               label="Category Name"
//               required
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Description
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 rows={3}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//               />
//             </div>
//             <div className="flex gap-3">
//               <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
//               <Button type="button" variant="outline" onClick={handleCancel}>
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </div>
//       )}

//       {!isCreating && (
//         <Button onClick={() => setIsCreating(true)}>Create New Category</Button>
//       )}

//       {/* Categories List */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-700/50">
//               <tr>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Description
//                 </th>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Products
//                 </th>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//               {categories.map((category) => {
//                 const categoryId = category.id || category._id
//                 return (
//                   <tr key={categoryId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
//                     <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
//                       {category.name}
//                     </td>
//                     <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
//                       {category.description || 'N/A'}
//                     </td>
//                     <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
//                       {category.productCount || category.totalProducts || 0}
//                     </td>
//                     <td className="py-4 px-6">
//                       <Button
//                         variant="outline"
//                         size="small"
//                         onClick={() => handleEdit(category)}
//                       >
//                         Edit
//                       </Button>
//                     </td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         </div>
//         {categories.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 dark:text-gray-400">No categories found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// CategoryManager.propTypes = {
//   categories: PropTypes.array,
//   onCreate: PropTypes.func,
//   onUpdate: PropTypes.func,
// }

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../common/Button'
import Input from '../../common/Input'

export default function CategoryManager({ categories = [], onCreate, onUpdate }) {
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await onUpdate?.(editingId, formData)
      setEditingId(null)
    } else {
      await onCreate?.(formData)
    }
    setFormData({ name: '', description: '' })
    setIsCreating(false)
  }

  const handleEdit = (category) => {
    setEditingId(category.id || category._id)
    setFormData({
      name: category.name || '',
      description: category.description || '',
    })
    setIsCreating(true)
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: '', description: '' })
    setIsCreating(false)
  }

  return (
    <div className="space-y-6">
      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-white rounded-lg border border-[#E5E5E7] p-6">
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-4">
            {editingId ? 'Edit Category' : 'Create Category'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Category Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-[#E5E5E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] text-[#1D1D1F] placeholder:text-[#6E6E73] transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {!isCreating && (
        <Button onClick={() => setIsCreating(true)}>Create New Category</Button>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-lg border border-[#E5E5E7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F5F7]">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Description
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Products
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E7]">
              {categories.map((category) => {
                const categoryId = category.id || category._id
                return (
                  <tr key={categoryId} className="hover:bg-[#F5F5F7] transition-colors">
                    <td className="py-4 px-6 font-medium text-[#1D1D1F]">
                      {category.name}
                    </td>
                    <td className="py-4 px-6 text-[#6E6E73]">
                      {category.description || 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-[#6E6E73]">
                      {category.productCount || category.totalProducts || 0}
                    </td>
                    <td className="py-4 px-6">
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6E6E73]">No categories found</p>
          </div>
        )}
      </div>
    </div>
  )
}

CategoryManager.propTypes = {
  categories: PropTypes.array,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
}