import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { adminService } from '../../../services/adminService'
import { useAuth } from '../../../hooks/useAuth'
import { useNotifications } from '../../../context/NotificationContext'
import Loader from '../../../components/common/Loader'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import Input from '../../../components/common/Input'
import Badge from '../../../components/common/Badge'

const INIT_FORM = {
  email: '',
  password: '',
  fullName: '',
  phoneNumber: '',
  address: '',
}

export default function Admins() {
  const { user, isLoading: authLoading } = useAuth()
  const { notify } = useNotifications()
  const [admins, setAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [form, setForm] = useState(INIT_FORM)
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const isSuperAdmin = user?.isSuperAdmin === true

  useEffect(() => {
    if (isSuperAdmin) loadAdmins()
  }, [isSuperAdmin])

  // Sirf super-admin hi is page ko dekh sakta hai; direct URL se bhi protect (hooks ke baad)
  if (authLoading) {
    return <Loader fullScreen text="Loading..." />
  }
  if (!isSuperAdmin) {
    return <Navigate to="/dashboard/admin" replace />
  }

  const loadAdmins = async () => {
    setIsLoading(true)
    try {
      const res = await adminService.listUsers({ role: 'ADMIN' })
      const list = res?.data ?? res?.users ?? []
      setAdmins(Array.isArray(list) ? list : [])
    } catch (err) {
      notify(err?.message || 'Failed to load admins', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddAdmin = async (e) => {
    e.preventDefault()
    const errors = {}
    if (!form.email?.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email'
    if (!form.password || form.password.length < 6) errors.password = 'Password must be at least 6 characters'
    if (!form.fullName?.trim() || form.fullName.length < 2) errors.fullName = 'Full name is required (min 2 characters)'
    if (!form.phoneNumber?.trim() || form.phoneNumber.length < 10) errors.phoneNumber = 'Valid phone number is required'
    if (!form.address?.trim() || form.address.length < 5) errors.address = 'Address is required (min 5 characters)'
    setFormErrors(errors)
    if (Object.keys(errors).length) return

    setSubmitting(true)
    try {
      await adminService.addAdmin(form)
      notify('Admin added successfully', { type: 'success' })
      setForm(INIT_FORM)
      setFormErrors({})
      setShowAddModal(false)
      loadAdmins()
    } catch (err) {
      notify(err?.message || 'Failed to add admin', { type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleRemoveAdmin = async (id, fullName) => {
    if (!window.confirm(`Remove admin "${fullName || id}"? They will lose admin access.`)) return
    try {
      await adminService.removeAdmin(id)
      notify('Admin removed successfully', { type: 'success' })
      loadAdmins()
    } catch (err) {
      notify(err?.message || 'Failed to remove admin', { type: 'error' })
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading admins..." />
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-[#1D1D1F]">Admin Management</h2>
        {isSuperAdmin && (
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Admin
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-[#E5E5E7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F5F7]">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Type
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                  Created
                </th>
                {isSuperAdmin && (
                  <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E7]">
              {admins.map((admin) => {
                const id = admin.id || admin._id
                const isCurrentUser = id === (user?.id || user?._id)
                return (
                  <tr key={id} className="hover:bg-[#F5F5F7] transition-colors">
                    <td className="py-4 px-6 text-[#1D1D1F]">{admin.email}</td>
                    <td className="py-4 px-6 text-[#6E6E73]">
                      {admin.fullName || admin.name || '—'}
                    </td>
                    <td className="py-4 px-6">
                      {admin.isSuperAdmin ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#FFF4E5] text-[#663C00]">
                          Super Admin
                        </span>
                      ) : (
                        <Badge type="admin" size="small" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-[#6E6E73] text-sm">
                      {admin.createdAt
                        ? new Date(admin.createdAt).toLocaleDateString()
                        : '—'}
                    </td>
                    {isSuperAdmin && (
                      <td className="py-4 px-6">
                        {!admin.isSuperAdmin && !isCurrentUser && (
                          <Button
                            variant="danger"
                            size="small"
                            onClick={() =>
                              handleRemoveAdmin(id, admin.fullName || admin.name)
                            }
                          >
                            Remove Admin
                          </Button>
                        )}
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {admins.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6E6E73]">No admins found</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          setForm(INIT_FORM)
          setFormErrors({})
        }}
        title="Add Admin"
        size="medium"
        footer={
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddAdmin}
              disabled={submitting}
            >
              {submitting ? 'Adding...' : 'Add Admin'}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleAddAdmin} className="space-y-4 pt-2">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            error={formErrors.email}
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            error={formErrors.password}
            required
          />
          <Input
            label="Full name"
            type="text"
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            error={formErrors.fullName}
            required
          />
          <Input
            label="Phone number"
            type="tel"
            value={form.phoneNumber}
            onChange={(e) => setForm((f) => ({ ...f, phoneNumber: e.target.value }))}
            error={formErrors.phoneNumber}
            required
          />
          <Input
            label="Address"
            type="text"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            error={formErrors.address}
            required
          />
        </form>
      </Modal>
    </div>
  )
}
