import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback((message, opts = {}) => {
    const toast = {
      id: crypto?.randomUUID?.() || String(Date.now() + Math.random()),
      message: String(message ?? ''),
      type: opts.type || 'info', // info|success|error|warning
      timeoutMs: typeof opts.timeoutMs === 'number' ? opts.timeoutMs : 3500,
    }
    setToasts((prev) => [...prev, toast])
    if (toast.timeoutMs > 0) {
      window.setTimeout(() => remove(toast.id), toast.timeoutMs)
    }
    return toast.id
  }, [remove])

  const value = useMemo(() => ({ toasts, notify, remove }), [toasts, notify, remove])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[1000] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              'w-full min-w-0 rounded-lg border px-4 py-3 shadow-lg bg-white text-gray-900',
              t.type === 'success' && 'border-green-200',
              t.type === 'error' && 'border-red-200',
              t.type === 'warning' && 'border-yellow-200',
              t.type === 'info' && 'border-gray-200',
            ]
              .filter(Boolean)
              .join(' ')}
            role="status"
          >
            <div className="flex items-start justify-between gap-3 min-w-0">
              <p className="text-sm break-words min-w-0 flex-1">{t.message}</p>
              <button
                onClick={() => remove(t.id)}
                className="flex-shrink-0 p-1 text-[#6E6E73] hover:text-[#1D1D1F] rounded"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}
