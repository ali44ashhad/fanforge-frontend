import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { STORAGE_KEYS } from '../utils/constants'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAuthContext } from './AuthContext'

const CartContext = createContext(null)

const CART_USER_PREFIX = 'cart_user_'

function normalizeItem(item) {
  if (!item) return null
  const id = item.id || item._id
  if (!id) return null

  // Normalize image: backend often sends images as [{ url, ... }]
  let image = item.image || item.thumbnail || ''
  if (!image && Array.isArray(item.images) && item.images.length > 0) {
    const first = item.images[0]
    image = typeof first === 'string' ? first : first?.url || ''
  }

  return {
    id: String(id),
    name: item.name || item.title || 'Product',
    price: Number(item.price || 0),
    image,
    quantity: Number(item.quantity || 1),
    raw: item,
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.cart, [])
  const { user } = useAuthContext()
  const hadUserRef = useRef(!!user)
  const lastUserIdRef = useRef(null)

  // Logout: user ka cart save karke clear — naya user purana cart na dekhe
  // Login: is user ka saved cart restore karo
  useEffect(() => {
    const hasUser = !!user
    const userId = user?.id || user?._id
    if (hasUser) lastUserIdRef.current = userId

    if (hadUserRef.current && !hasUser) {
      // Logout — current cart isi user ka hai, save karke clear karo
      const prevUserId = lastUserIdRef.current
      if (prevUserId && items.length > 0) {
        try {
          localStorage.setItem(
            `${CART_USER_PREFIX}${prevUserId}`,
            JSON.stringify(items)
          )
        } catch (_) {}
      }
      setItems([])
    } else if (!hadUserRef.current && hasUser && userId) {
      // Login — abhi login hua, is user ka saved cart restore karo
      try {
        const key = `${CART_USER_PREFIX}${userId}`
        const saved = localStorage.getItem(key)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed)
            localStorage.removeItem(key)
          }
        }
      } catch (_) {}
    }

    hadUserRef.current = hasUser
  }, [user, setItems])

  const addItem = useCallback(
    (product, qty = 1) => {
      const normalized = normalizeItem({ ...product, quantity: qty })
      if (!normalized) return
      setItems((prev) => {
        const existing = prev.find((p) => String(p.id) === String(normalized.id))
        if (!existing) return [...prev, normalized]
        return prev.map((p) =>
          String(p.id) === String(normalized.id)
            ? { ...p, quantity: p.quantity + normalized.quantity }
            : p
        )
      })
    },
    [setItems]
  )

  const removeItem = useCallback(
    (id) => setItems((prev) => prev.filter((p) => String(p.id) !== String(id))),
    [setItems]
  )

  const setQuantity = useCallback(
    (id, quantity) => {
      const q = Math.max(1, Number(quantity || 1))
      setItems((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? { ...p, quantity: q } : p))
      )
    },
    [setItems]
  )

  const clear = useCallback(() => setItems([]), [setItems])

  const totals = useMemo(() => {
    const count = items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0)
    const subtotal = items.reduce(
      (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 0),
      0
    )
    return { count, subtotal }
  }, [items])

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      setQuantity,
      clear,
      ...totals,
    }),
    [items, addItem, removeItem, setQuantity, clear, totals]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be used within CartProvider')
  return ctx
}
