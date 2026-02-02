// Storage Keys
export const STORAGE_KEYS = {
  authToken: 'authToken',
  authUser: 'authUser',
  cart: 'cart',
  theme: 'theme',
}

// User Roles
export const ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
}

// Normalize role from API response
export function normalizeRole(role) {
  if (!role) return null
  const normalized = String(role).toUpperCase()
  return Object.values(ROLES).includes(normalized) ? normalized : null
}

// Order Statuses
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
}

// Product Types
export const PRODUCT_TYPE = {
  OFFICIAL: 'OFFICIAL',
  FANMADE: 'FANMADE',
}
