import { api } from './api'

export const adminService = {
  // Users
  listUsers: (params) => api.get('/api/admin/users', params ? { query: params } : undefined),
  getUser: (id) => api.get(`/api/admin/users/${id}`),
  banUser: (id) => api.del(`/api/admin/users/${id}/ban`),
  unbanUser: (id) => api.put(`/api/admin/users/${id}/unban`, {}),
  addAdmin: (payload) => api.post('/api/admin/users/admins', payload),
  removeAdmin: (id) => api.del(`/api/admin/users/admins/${id}`),

  // Sellers
  pendingSellers: () => api.get('/api/admin/sellers/pending'),
  listSellers: () => api.get('/api/admin/sellers'),
  approveSeller: (id, payload) => api.put(`/api/admin/sellers/${id}/approve`, payload),
  changeSellerType: (id, payload) => api.put(`/api/admin/sellers/${id}/type`, payload),
  removeSeller: (id) => api.del(`/api/admin/sellers/${id}`),

  // Products
  pendingProducts: () => api.get('/api/admin/products/pending'),
  listAllProducts: () => api.get('/api/admin/products'),
  approveProduct: (id) => api.put(`/api/admin/products/${id}/approve`, {}),
  changeProductType: (id, productType) => api.put(`/api/admin/products/${id}`, { productType }),
  removeProduct: (id) => api.del(`/api/admin/products/${id}`),

  // Categories (admin)
  listCategories: () => api.get('/api/admin/categories'),
  createCategory: (payload) => api.post('/api/admin/categories', payload),
  updateCategory: (id, payload) => api.put(`/api/admin/categories/${id}`, payload),

  // Analytics
  stats: () => api.get('/api/admin/analytics/stats'),
}

