import { api } from './api'

export const sellerService = {
  apply: (payload) => api.post('/api/seller/apply', payload),
  getProfile: () => api.get('/api/seller/profile'),
  updateProfile: (payload) => api.put('/api/seller/profile', payload),
}

