import React, { useState, useEffect } from 'react'
import { userService } from '../../../services/userService'
import { useAuth } from '../../../hooks/useAuth'
import { useNotifications } from '../../../context/NotificationContext'
import Button from '../../../components/common/Button'
import Input from '../../../components/common/Input'
import Loader from '../../../components/common/Loader'

function formatDate(value) {
  if (!value) return '—'
  const d = new Date(value)
  return isNaN(d.getTime()) ? '—' : d.toLocaleDateString(undefined, { dateStyle: 'medium' })
}

export default function Profile() {
  const { user, refreshMe } = useAuth()
  const { notify } = useNotifications()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    setIsLoading(true)
    try {
      const res = await userService.getProfile()
      const body = res?.data ?? res
      const data = body?.data ?? body?.user ?? body
      if (data && typeof data === 'object') {
        setProfile(data)
        setFormData({
          fullName: data.fullName ?? data.name ?? '',
          phoneNumber: data.phoneNumber ?? '',
          address: data.address ?? '',
        })
      }
    } catch (err) {
      notify(err?.data?.message || err?.message || 'Failed to load profile', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await userService.updateProfile(formData)
      await refreshMe()
      setProfile((prev) => (prev ? { ...prev, ...formData } : null))
      notify('Profile updated successfully', { type: 'success' })
    } catch (err) {
      notify(err?.data?.message || err?.message || 'Failed to update profile', { type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading profile..." />
  }

  const sellerProfile = profile?.sellerProfile

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-[#1D1D1F]">Profile Settings</h2>

      {/* Account info (read-only) */}
      <section className="bg-white rounded-2xl border border-[#E5E5E7] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#1D1D1F] mb-4">Account Info</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-[#6E6E73] font-medium">Email</dt>
            <dd className="text-[#1D1D1F] mt-0.5">{profile?.email ?? user?.email ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-[#6E6E73] font-medium">Role</dt>
            <dd className="text-[#1D1D1F] mt-0.5 capitalize">{profile?.role ?? user?.role ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-[#6E6E73] font-medium">Joined</dt>
            <dd className="text-[#1D1D1F] mt-0.5">{formatDate(profile?.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-[#6E6E73] font-medium">Last updated</dt>
            <dd className="text-[#1D1D1F] mt-0.5">{formatDate(profile?.updatedAt)}</dd>
          </div>
        </dl>
      </section>

      {/* Editable profile */}
      <section className="bg-white rounded-2xl border border-[#E5E5E7] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#1D1D1F] mb-4">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            disabled={isSaving}
            placeholder="Your full name"
          />
          <Input
            label="Email"
            type="email"
            value={profile?.email ?? user?.email ?? ''}
            disabled
            helperText="Email cannot be changed"
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            disabled={isSaving}
            placeholder="e.g. +91 98765 43210"
          />
          <div>
            <label className="block text-sm font-medium text-[#1D1D1F] mb-1">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={isSaving}
              rows={3}
              className="w-full px-4 py-2.5 border border-[#E5E5E7] rounded-lg bg-white text-[#1D1D1F] placeholder:text-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] disabled:opacity-60"
              placeholder="Street, city, state, PIN"
            />
          </div>
          <Button type="submit" isLoading={isSaving} disabled={isSaving}>
            Save Changes
          </Button>
        </form>
      </section>

      {/* Seller account (if exists) */}
      {sellerProfile && (
        <section className="bg-white rounded-2xl border border-[#E5E5E7] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-4">Seller Account</h3>
          <p className="text-sm text-[#6E6E73] mb-4">
            You also have a seller account. Edit it from the Seller Dashboard → Settings.
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-[#6E6E73] font-medium">Business Name</dt>
              <dd className="text-[#1D1D1F] mt-0.5">{sellerProfile.businessName ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-[#6E6E73] font-medium">Seller Type</dt>
              <dd className="text-[#1D1D1F] mt-0.5 capitalize">
                {(sellerProfile.sellerType ?? '').replace(/_/g, ' ')}
              </dd>
            </div>
            <div>
              <dt className="text-[#6E6E73] font-medium">Status</dt>
              <dd className="mt-0.5">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    sellerProfile.isApproved
                      ? 'bg-[#E8F5E9] text-[#2E7D32]'
                      : 'bg-[#FFF4E5] text-[#E65100]'
                  }`}
                >
                  {sellerProfile.isApproved ? 'Approved' : 'Pending'}
                </span>
              </dd>
            </div>
            {sellerProfile.businessDescription && (
              <div className="sm:col-span-2">
                <dt className="text-[#6E6E73] font-medium">Description</dt>
                <dd className="text-[#1D1D1F] mt-0.5 whitespace-pre-wrap">
                  {sellerProfile.businessDescription}
                </dd>
              </div>
            )}
          </dl>
        </section>
      )}
    </div>
  )
}
