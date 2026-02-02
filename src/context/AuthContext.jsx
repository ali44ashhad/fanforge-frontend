import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEYS, normalizeRole, ROLES } from '../utils/constants'
import { authService } from '../services/authService'
import { setCookie, getCookie, removeCookie } from '../utils/cookies'

const AuthContext = createContext(null)

function safeJsonParse(str) {
  try {
    return JSON.parse(str)
  } catch {
    return null
  }
}

function readStored() {
  try {
    // Try cookies first, fallback to localStorage for migration
    let token = getCookie(STORAGE_KEYS.authToken) || localStorage.getItem(STORAGE_KEYS.authToken) || ''
    let userRaw = getCookie(STORAGE_KEYS.authUser) || localStorage.getItem(STORAGE_KEYS.authUser)
    const user = userRaw ? safeJsonParse(userRaw) : null
    // Migrate from localStorage to cookies if found
    if (token && !getCookie(STORAGE_KEYS.authToken)) {
      setCookie(STORAGE_KEYS.authToken, token)
      if (userRaw) setCookie(STORAGE_KEYS.authUser, userRaw)
    }
    return { token, user }
  } catch {
    return { token: '', user: null }
  }
}

function writeStored({ token, user }) {
  try {
    if (token) {
      setCookie(STORAGE_KEYS.authToken, token)
      localStorage.setItem(STORAGE_KEYS.authToken, token) // Keep for migration
    } else {
      removeCookie(STORAGE_KEYS.authToken)
      localStorage.removeItem(STORAGE_KEYS.authToken)
    }
    if (user) {
      const userStr = JSON.stringify(user)
      setCookie(STORAGE_KEYS.authUser, userStr)
      localStorage.setItem(STORAGE_KEYS.authUser, userStr) // Keep for migration
    } else {
      removeCookie(STORAGE_KEYS.authUser)
      localStorage.removeItem(STORAGE_KEYS.authUser)
    }
  } catch {
    // ignore
  }
}

function normalizeUser(u) {
  if (!u) return null
  const role = normalizeRole(u.role)
  return {
    ...u,
    role,
    name: u.fullName || u.name || u.email || 'User',
  }
}

export function AuthProvider({ children }) {
  const stored = readStored()
  const [token, setToken] = useState(stored.token)
  const [user, setUser] = useState(normalizeUser(stored.user))
  const [isLoading, setIsLoading] = useState(Boolean(stored.token))

  const logout = useCallback(() => {
    setToken('')
    setUser(null)
    writeStored({ token: '', user: null })
  }, [])

  const refreshMe = useCallback(async () => {
    if (!token) return null
    setIsLoading(true)
    try {
      const data = await authService.me()
      // backend might return { user } or { data: user } or user directly
      const nextUser = normalizeUser(data?.user || data?.data || data)
      setUser(nextUser)
      writeStored({ token, user: nextUser })
      return nextUser
    } catch (e) {
      // Only logout on explicit auth errors; tolerate transient failures
      const status = e?.status || e?.response?.status
      if (status === 401 || status === 403) {
        logout()
      }
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [token, logout])

  useEffect(() => {
    if (!token) return
    refreshMe().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback(async ({ email, password }) => {
    setIsLoading(true)
    try {
      const data = await authService.login({ email, password })
      // backend returns { success, message, data: { user, token } }
      const nextToken = data?.token || data?.accessToken || data?.data?.token || ''
      const nextUser = normalizeUser(data?.user || data?.data?.user)
      setToken(nextToken)
      setUser(nextUser)
      writeStored({ token: nextToken, user: nextUser })
      return { token: nextToken, user: nextUser }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (payload) => {
    setIsLoading(true)
    try {
      const data = await authService.register(payload)
      // Some backends also return token on register; support it if present.
      const nextToken = data?.token || ''
      const nextUser = normalizeUser(data?.user || data?.data?.user)
      if (nextToken) {
        setToken(nextToken)
        setUser(nextUser)
        writeStored({ token: nextToken, user: nextUser })
      }
      return data
    } finally {
      setIsLoading(false)
    }
  }, [])

  const role = user?.role || null
  const isAuthed = Boolean(token)

  const value = useMemo(
    () => ({
      token,
      user,
      role,
      isAuthed,
      isLoading,
      login,
      register,
      logout,
      refreshMe,
      // role helpers
      isBuyer: role === ROLES.BUYER,
      isSeller: role === ROLES.SELLER,
      isAdmin: role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN,
    }),
    [token, user, role, isAuthed, isLoading, login, register, logout, refreshMe]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
