import React, { useEffect, useState } from 'react'
import { adminService } from '../../../services/adminService'
import { useNotifications } from '../../../context/NotificationContext'
import Loader from '../../../components/common/Loader'
import Badge from '../../../components/common/Badge'
import SellerApplications from '../../../components/dashboard/admin/SellerApplications'
import Button from '../../../components/common/Button'

export default function Sellers() {
  const { notify } = useNotifications()
  const [activeTab, setActiveTab] = useState('pending')
  const [pendingSellers, setPendingSellers] = useState([])
  const [allSellers, setAllSellers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  const loadAll = async () => {
    setIsLoading(true)
    try {
      const [pendingRes, allRes] = await Promise.all([
        adminService.pendingSellers(),
        adminService.listSellers(),
      ])
      const pending = pendingRes?.data ?? pendingRes?.sellers ?? pendingRes ?? []
      const all = allRes?.data ?? allRes?.sellers ?? allRes ?? []
      setPendingSellers(Array.isArray(pending) ? pending : [])
      setAllSellers(Array.isArray(all) ? all : [])
    } catch (err) {
      notify(err?.data?.message || err?.message || 'Failed to load sellers', { type: 'error' })
      setPendingSellers([])
      setAllSellers([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApprove = async (sellerId, sellerType) => {
    setActionLoading(sellerId)
    try {
      await adminService.approveSeller(sellerId, { sellerType })
      notify(`Seller approved as ${sellerType === 'OFFICIAL' ? 'Official' : 'Fan-Made'}.`, {
        type: 'success',
      })
      loadAll()
    } catch (err) {
      notify(err?.data?.message || err?.message || 'Failed to approve seller', { type: 'error' })
    } finally {
      setActionLoading(null)
    }
  }

  const handleChangeType = async (sellerId, sellerType) => {
    setActionLoading(sellerId)
    try {
      await adminService.changeSellerType(sellerId, { sellerType })
      notify(`Seller type updated to ${sellerType === 'OFFICIAL' ? 'Official' : 'Fan-Made'}.`, {
        type: 'success',
      })
      loadAll()
    } catch (err) {
      notify(err?.data?.message || err?.message || 'Failed to update seller type', { type: 'error' })
    } finally {
      setActionLoading(null)
    }
  }

  const handleRemove = async (sellerId) => {
    if (!window.confirm('Remove this seller? Their products and active orders will be affected.')) return
    setActionLoading(sellerId)
    try {
      await adminService.removeSeller(sellerId)
      notify('Seller removed successfully.', { type: 'success' })
      loadAll()
    } catch (err) {
      notify(err?.data?.message || err?.message || 'Failed to remove seller', { type: 'error' })
    } finally {
      setActionLoading(null)
    }
  }

  if (isLoading) {
    return <Loader fullScreen text="Loading sellers..." />
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Sellers</h2>

      {/* Tabs */}
      <div className="border-b border-[#E5E5E7] mb-6">
        <nav className="flex gap-1" aria-label="Tabs">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
              activeTab === 'pending'
                ? 'border-[#007AFF] text-[#007AFF] bg-[#007AFF]/5'
                : 'border-transparent text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
            }`}
          >
            Pending Sellers
            {pendingSellers.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs bg-[#FF3B30] text-white">
                {pendingSellers.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-[#007AFF] text-[#007AFF] bg-[#007AFF]/5'
                : 'border-transparent text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
            }`}
          >
            All Sellers
          </button>
        </nav>
      </div>

      {/* Tab content: Pending Sellers */}
      {activeTab === 'pending' && (
        <div>
          <p className="text-[#6E6E73] mb-4">
            Review and approve pending seller applications. Approving as Official or Fan-Made will
            set their product type accordingly.
          </p>
          <SellerApplications sellers={pendingSellers} onApprove={handleApprove} />
        </div>
      )}

      {/* Tab content: All Sellers */}
      {activeTab === 'all' && (
        <div>
          <p className="text-[#6E6E73] mb-4">
            View all sellers. Change type or remove as needed.
          </p>
          {allSellers.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E5E5E7] p-8 text-center">
            <p className="text-[#6E6E73]">No sellers yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E5E5E7] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F5F7]">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                      Business
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                      Status / Type
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E7]">
                  {allSellers.map((seller) => (
                    <tr key={seller.id} className="hover:bg-[#F5F5F7] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-medium text-[#1D1D1F]">
                          {seller.businessName || 'Unnamed Seller'}
                        </div>
                        {seller.businessDescription && (
                          <div className="text-sm text-[#6E6E73] line-clamp-2 max-w-xs">
                            {seller.businessDescription}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-[#6E6E73]">
                        <div>{seller.user?.fullName}</div>
                        <div>{seller.user?.email}</div>
                        {seller.user?.phoneNumber && <div>{seller.user.phoneNumber}</div>}
                      </td>
                      <td className="py-4 px-6">
                        {seller.isApproved ? (
                          <Badge
                            type={seller.sellerType === 'OFFICIAL' ? 'official' : 'fan_made'}
                            size="small"
                          />
                        ) : (
                          <Badge type="pending" size="small" />
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-2">
                          {!seller.isApproved ? (
                            <>
                              <Button
                                size="small"
                                disabled={actionLoading === seller.id}
                                onClick={() => handleApprove(seller.id, 'OFFICIAL')}
                              >
                                Approve Official
                              </Button>
                              <Button
                                size="small"
                                variant="outline"
                                disabled={actionLoading === seller.id}
                                onClick={() => handleApprove(seller.id, 'FAN_MADE')}
                              >
                                Approve Fan-Made
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="small"
                                variant="outline"
                                disabled={actionLoading === seller.id}
                                onClick={() => handleChangeType(seller.id, seller.sellerType === 'OFFICIAL' ? 'FAN_MADE' : 'OFFICIAL')}
                              >
                                Change to {seller.sellerType === 'OFFICIAL' ? 'Fan-Made' : 'Official'}
                              </Button>
                              <button
                                type="button"
                                onClick={() => handleRemove(seller.id)}
                                disabled={actionLoading === seller.id}
                                className="px-3 py-1.5 text-sm text-[#FF3B30] hover:bg-[#FFEBE9] rounded-lg transition-colors disabled:opacity-50"
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
      )}
    </div>
  )
}

