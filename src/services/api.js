const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const STORAGE_KEYS = {
  authToken: 'authToken',
  authUser: 'authUser',
}

function getStoredToken() {
  try {
    return localStorage.getItem(STORAGE_KEYS.authToken) || ''
  } catch {
    return ''
  }
}

function buildUrl(path, query) {
  const base = API_BASE_URL.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  const url = new URL(`${base}${p}`)
  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') return
      url.searchParams.set(k, String(v))
    })
  }
  return url.toString()
}

async function parseJsonSafe(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export class ApiError extends Error {
  constructor(message, { status, data, url, method } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
    this.url = url
    this.method = method
  }
}

export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body,
    query,
    token = undefined,
    signal,
  } = options

  const url = buildUrl(path, query)
  const authToken = token === undefined ? getStoredToken() : token

  const finalHeaders = new Headers(headers)
  if (authToken) finalHeaders.set('Authorization', `Bearer ${authToken}`)

  const isFormData =
    typeof FormData !== 'undefined' && body instanceof FormData
  if (body && !isFormData && !finalHeaders.has('Content-Type')) {
    finalHeaders.set('Content-Type', 'application/json')
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    credentials: 'include',
    body: body
      ? isFormData
        ? body
        : finalHeaders.get('Content-Type')?.includes('application/json')
          ? JSON.stringify(body)
          : body
      : undefined,
    signal,
  })

  const data = await parseJsonSafe(res)
  if (!res.ok) {
    let message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${res.status}`
    
    // Better error messages for common status codes
    if (res.status === 429) {
      message = data?.message || 'Too many requests. Please try again later.'
    } else if (res.status === 401) {
      message = data?.message || 'Authentication failed. Please check your credentials.'
    } else if (res.status === 403) {
      message = data?.message || 'Access forbidden.'
    } else if (res.status === 404) {
      message = data?.message || 'Resource not found.'
    } else if (res.status >= 500) {
      message = data?.message || 'Server error. Please try again later.'
    }
    
    throw new ApiError(message, { status: res.status, data, url, method })
  }
  return data
}

export const api = {
  get: (path, opts) => apiRequest(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => apiRequest(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => apiRequest(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => apiRequest(path, { ...opts, method: 'DELETE' }),
}
