import { api } from './api'

export const productService = {
  listApproved: ({ search, categoryId, minPrice, maxPrice, productType, page, limit } = {}) =>
    api.get('/api/products', {
      query: { search, categoryId, minPrice, maxPrice, productType, page, limit },
    }),
  getById: (id) => api.get(`/api/products/${id}`),

  // Seller
  create: (formData) => api.post('/api/products', formData),
  myProducts: () => api.get('/api/products/seller/my-products'),
  update: (id, payload) => api.put(`/api/products/${id}`, payload),
  remove: (id) => api.del(`/api/products/${id}`),
}
