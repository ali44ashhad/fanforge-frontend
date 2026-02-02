import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../common/Button'

export default function SellerApplications({ sellers = [], onApprove }) {
  if (!sellers.length) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6E6E73]">No pending seller applications.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-[#E5E5E7] overflow-hidden">
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
                Shipping
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#6E6E73] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E7]">
            {sellers.map((seller) => (
              <tr key={seller.id} className="hover:bg-[#F5F5F7] transition-colors">
                <td className="py-4 px-6">
                  <div className="font-medium text-[#1D1D1F]">
                    {seller.businessName || 'Unnamed Seller'}
                  </div>
                  {seller.businessDescription && (
                    <div className="text-sm text-[#6E6E73] line-clamp-2">
                      {seller.businessDescription}
                    </div>
                  )}
                </td>
                <td className="py-4 px-6 text-sm text-[#6E6E73]">
                  <div>{seller.user?.fullName}</div>
                  <div>{seller.user?.email}</div>
                  {seller.user?.phoneNumber && <div>{seller.user.phoneNumber}</div>}
                </td>
                <td className="py-4 px-6 text-sm text-[#6E6E73]">
                  <div>Avg. shipping: {seller.averageShippingCost || 'N/A'}</div>
                  <div>ETA: {seller.estimatedDeliveryDays || 'N/A'} days</div>
                  <div>Regions: {seller.shippingRegions || 'N/A'}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-2">
                    <Button
                      size="small"
                      onClick={() => onApprove?.(seller.id, 'OFFICIAL')}
                    >
                      Approve as Official
                    </Button>
                    <Button
                      size="small"
                      variant="outline"
                      onClick={() => onApprove?.(seller.id, 'FAN_MADE')}
                    >
                      Approve as Fan-Made
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

SellerApplications.propTypes = {
  sellers: PropTypes.array,
  onApprove: PropTypes.func,
}

