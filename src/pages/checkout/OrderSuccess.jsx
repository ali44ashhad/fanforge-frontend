import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Button from '../../components/common/Button'

export default function OrderSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const order = location.state?.order
  const productFromState = location.state?.product

  const product = order?.product ?? productFromState
  const seller = order?.seller
  const orderTotal = product
    ? (Number(product.price) || 0) * (Number(product.quantity) || 1)
    : 0
  const quantity = product?.quantity ?? 1

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#34C759]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-[#34C759]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-[#6E6E73]">
            Your order has been received. Contact the seller using the details below to arrange payment and shipping.
          </p>
        </div>

        {order && (
          <div className="space-y-6 mb-8">
            {/* Order Details */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 text-left">
              <h2 className="text-lg font-semibold text-[#1D1D1F] mb-4">
                Order Details
              </h2>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-[#6E6E73]">Product</dt>
                  <dd className="font-medium text-[#1D1D1F]">{product?.name ?? '—'}</dd>
                </div>
                <div>
                  <dt className="text-[#6E6E73]">Quantity</dt>
                  <dd className="font-medium text-[#1D1D1F]">{quantity}</dd>
                </div>
                <div>
                  <dt className="text-[#6E6E73]">Total</dt>
                  <dd className="font-semibold text-[#1D1D1F]">${orderTotal.toFixed(2)}</dd>
                </div>
                {order.id && (
                  <div>
                    <dt className="text-[#6E6E73]">Order ID</dt>
                    <dd className="font-mono text-xs text-[#1D1D1F]">{order.id}</dd>
                  </div>
                )}
              </dl>
            </section>

            {/* Seller Contact Information */}
            {seller && (
              <section className="bg-white rounded-2xl shadow-sm border border-[#E5E5E7] p-6 text-left">
                <h2 className="text-lg font-semibold text-[#1D1D1F] mb-1">
                  Seller Contact Information
                </h2>
                <p className="text-sm text-[#6E6E73] mb-4">
                  Use these details to complete payment and coordinate shipping.
                </p>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-[#6E6E73] font-medium">Store / Business Name</dt>
                    <dd className="text-[#1D1D1F]">{seller.businessName ?? '—'}</dd>
                  </div>
                  {seller.user?.fullName && (
                    <div>
                      <dt className="text-[#6E6E73] font-medium">Contact Name</dt>
                      <dd className="text-[#1D1D1F]">{seller.user.fullName}</dd>
                    </div>
                  )}
                  {seller.user?.email && (
                    <div>
                      <dt className="text-[#6E6E73] font-medium">Email</dt>
                      <dd className="text-[#1D1D1F]">
                        <a
                          href={`mailto:${seller.user.email}`}
                          className="text-[#007AFF] hover:text-[#0056CC] underline"
                        >
                          {seller.user.email}
                        </a>
                      </dd>
                    </div>
                  )}
                  {seller.user?.phoneNumber && (
                    <div>
                      <dt className="text-[#6E6E73] font-medium">Phone</dt>
                      <dd className="text-[#1D1D1F]">
                        <a
                          href={`tel:${seller.user.phoneNumber}`}
                          className="text-[#007AFF] hover:text-[#0056CC] underline"
                        >
                          {seller.user.phoneNumber}
                        </a>
                      </dd>
                    </div>
                  )}
                  {Array.isArray(seller.paymentMethods) && seller.paymentMethods.length > 0 && (
                    <div>
                      <dt className="text-[#6E6E73] font-medium">Payment methods</dt>
                      <dd className="text-[#1D1D1F]">
                        {seller.paymentMethods.join(', ')}
                      </dd>
                    </div>
                  )}
                  {seller.estimatedDeliveryDays != null && (
                    <div>
                      <dt className="text-[#6E6E73] font-medium">Estimated delivery</dt>
                      <dd className="text-[#1D1D1F]">
                        {seller.estimatedDeliveryDays} day(s)
                      </dd>
                    </div>
                  )}
                  {seller.shippingRegions && (
                    <div>
                      <dt className="text-[#6E6E73] font-medium">Shipping regions</dt>
                      <dd className="text-[#1D1D1F]">{seller.shippingRegions}</dd>
                    </div>
                  )}
                </dl>
              </section>
            )}

            {/* Note when seller details not available (e.g. page refreshed) */}
            {order && !seller && (
              <p className="text-sm text-[#6E6E73] text-center">
                Seller contact details will appear in &quot;My Orders&quot; or the seller will reach out to you.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard/buyer/orders">
            <Button>View My Orders</Button>
          </Link>
          <Button variant="outline" onClick={() => navigate('/marketplace')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}
