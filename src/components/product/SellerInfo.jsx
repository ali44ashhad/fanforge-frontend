import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge'

const SellerInfo = ({
  seller,
  badge,
  className = '',
}) => {
  const id = seller?.id
  const displayName = seller?.businessName || seller?.name || 'Seller'
  const avatar = seller?.avatar
  const rating = seller?.rating
  const totalSales = seller?.totalSales
  const responseRate = seller?.responseRate
  const responseTime = seller?.responseTime
  const joinDate = seller?.joinDate
  const location = seller?.location
  const policies = seller?.policies || {}
  const isVerified = seller?.isVerified || false

  const description = seller?.businessDescription || seller?.description
  const paymentMethods = Array.isArray(seller?.paymentMethods)
    ? seller.paymentMethods
    : typeof seller?.paymentMethods === 'string'
      ? seller.paymentMethods.split(',').map((s) => s.trim()).filter(Boolean)
      : []

  // Delivery / shipping: where seller delivers (coerce numbers so API string/number both work)
  const shippingRegions = seller?.shippingRegions
  const estimatedDeliveryDaysRaw = seller?.estimatedDeliveryDays
  const averageShippingCostRaw = seller?.averageShippingCost
  const estimatedDeliveryDays = typeof estimatedDeliveryDaysRaw === 'number'
    ? estimatedDeliveryDaysRaw
    : (typeof estimatedDeliveryDaysRaw === 'string' ? parseInt(estimatedDeliveryDaysRaw, 10) : NaN)
  const averageShippingCost = typeof averageShippingCostRaw === 'number'
    ? averageShippingCostRaw
    : (typeof averageShippingCostRaw === 'string' ? parseFloat(averageShippingCostRaw) : Number(averageShippingCostRaw))
  const hasShippingInfo = shippingRegions ||
    (Number.isFinite(estimatedDeliveryDays) && estimatedDeliveryDays >= 0) ||
    (Number.isFinite(averageShippingCost) && averageShippingCost >= 0)

  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6 border border-[#E5E5E7] ${className}`}>
      {/* Seller Header */}
      <div className="flex items-start space-x-4 mb-6">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-lg">
            {avatar ? (
              <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#007AFF] flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {displayName?.[0]?.toUpperCase() || 'S'}
                </span>
              </div>
            )}
          </div>
          {isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-[#007AFF] text-white p-1 rounded-full shadow-lg">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Seller Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-[#1D1D1F]">{displayName}</h3>
                {badge && <Badge type={badge} size="small" />}
              </div>
              <p className="text-[#6E6E73] text-sm">Seller • FanForge Creator</p>
            </div>
            <Link 
              to={`/seller/${id}`}
              className="mt-2 sm:mt-0 px-4 py-2 bg-[#F5F5F7] text-[#1D1D1F] font-medium rounded-lg hover:bg-[#E5E5E7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2"
            >
              View Store
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Number.isFinite(rating) && (
              <div className="text-center">
<div className="text-2xl font-bold text-[#1D1D1F]">
                {Number(rating).toFixed(1)}
                </div>
                <div className="text-xs text-[#6E6E73] mt-1">Rating</div>
              </div>
            )}
            {typeof totalSales === 'number' && (
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {totalSales.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">Sales</div>
              </div>
            )}
            {typeof responseRate === 'number' && (
              <div className="text-center">
<div className="text-2xl font-bold text-[#1D1D1F]">
                {responseRate}%
                </div>
                <div className="text-xs text-[#6E6E73] mt-1">Response Rate</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="mb-6">
          <h4 className="font-semibold text-[#1D1D1F] mb-3">About the Seller</h4>
          <p className="text-[#6E6E73] text-sm leading-relaxed">{description}</p>
        </div>
      )}
  

      {/* Seller Details */}
      <div className="space-y-3 mb-6">
        {location && (
          <div className="flex items-center text-[#6E6E73]">
            <svg className="w-4 h-4 mr-3 text-[#6E6E73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">Based in {location}</span>
          </div>
        )}
        {joinDate && (
          <div className="flex items-center text-[#6E6E73]">
            <svg className="w-4 h-4 mr-3 text-[#6E6E73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Member since {joinDate}</span>
          </div>
        )}
        {responseTime && (
          <div className="flex items-center text-[#6E6E73]">
            <svg className="w-4 h-4 mr-3 text-[#6E6E73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Typically responds within {responseTime}</span>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      {paymentMethods.length > 0 && (
        <div className="pt-6 border-t border-[#E5E5E7] mb-6">
          <h4 className="font-semibold text-[#1D1D1F] mb-3">Payment Methods</h4>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
              >
                {typeof method === 'string' ? method : method.method || method}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#6E6E73] mt-3">
            Buyers will pay directly to the seller using these methods.
          </p>
        </div>
      )}

      {/* Policies */}
      {Object.keys(policies).length > 0 && (
        <div className="pt-6 border-t border-[#E5E5E7] mb-6">
          <h4 className="font-semibold text-[#1D1D1F] mb-3">Seller Policies</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(policies).map(([policy, value]) => (
              <div key={policy} className="flex items-center justify-between py-2">
                <span className="text-sm text-[#6E6E73] capitalize">
                  {policy.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <span className={`text-sm font-semibold ${
                  value === true || value === 'Yes'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {typeof value === 'boolean' ? (value ? '✓ Yes' : '✗ No') : value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

       
    </div>
  );
};

SellerInfo.propTypes = {
  seller: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    businessName: PropTypes.string,
    avatar: PropTypes.string,
    rating: PropTypes.number,
    totalSales: PropTypes.number,
    joinDate: PropTypes.string,
    description: PropTypes.string,
    businessDescription: PropTypes.string,
    responseRate: PropTypes.number,
    responseTime: PropTypes.string,
    location: PropTypes.string,
    policies: PropTypes.object,
    isVerified: PropTypes.bool,
    paymentMethods: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    shippingRegions: PropTypes.string,
    estimatedDeliveryDays: PropTypes.number,
    averageShippingCost: PropTypes.number,
  }).isRequired,
  badge: PropTypes.oneOf(['official', 'fan_made']),
  className: PropTypes.string,
};

export default SellerInfo;