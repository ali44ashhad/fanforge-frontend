import { api } from './api'

export const userService = {
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (payload) => api.put('/api/users/profile', payload),
}
