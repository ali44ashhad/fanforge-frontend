import { api } from './api'

export const orderService = {
  // Buyer
  placeOrder: (payload) => api.post('/api/orders', payload),
  myOrdersBuyer: () => api.get('/api/orders/buyer/my-orders'),
  cancel: (id) => api.put(`/api/orders/${id}/cancel`, {}),

  // Seller
  myOrdersSeller: () => api.get('/api/orders/seller/my-orders'),
  updateStatus: (id, status) => api.put(`/api/orders/${id}/status`, { status }),
}
