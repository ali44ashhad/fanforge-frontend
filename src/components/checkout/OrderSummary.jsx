export default function OrderSummary({ items = [], totals = {} }) {
  const subtotal = totals.subtotal ?? 0
  const shipping = totals.shipping ?? 0
  const grandTotal = totals.total ?? subtotal + shipping

  return (
    <section className="ff-order-summary">
      <h3>Order summary</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id || item.title}>
            {item.title} × {item.qty ?? 1} — {item.price != null ? `$${item.price}` : '—'}
          </li>
        ))}
      </ul>
      <div>Subtotal: ${subtotal}</div>
      <div>Shipping: ${shipping}</div>
      <div><strong>Total: ${grandTotal}</strong></div>
    </section>
  )
}

