export default function OrderConfirmation({ order }) {
  const o = order || {}
  return (
    <section className="ff-order-confirmation">
      <h2>Thank you for your order!</h2>
      <p>Order ID: {o.id || '—'}</p>
      <p>We&apos;ve sent a confirmation email to {o.email || 'your inbox'}.</p>
    </section>
  )
}

