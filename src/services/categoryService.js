import { api } from './api'

export const categoryService = {
  listPublic: () => api.get('/api/categories'),
  getById: (id) => api.get(`/api/categories/${id}`),

  // Admin
  listAdmin: () => api.get('/api/admin/categories'),
  createAdmin: (payload) => api.post('/api/admin/categories', payload),
  updateAdmin: (id, payload) => api.put(`/api/admin/categories/${id}`, payload),
}

