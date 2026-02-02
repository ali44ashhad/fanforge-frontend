export default function ShippingForm({ initialValues = {}, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData.entries())
    onSubmit?.({ ...initialValues, ...values })
  }

  return (
    <form className="ff-shipping-form" onSubmit={handleSubmit}>
      <label>
        <span>Full name</span>
        <input name="name" defaultValue={initialValues.name} required />
      </label>
      <label>
        <span>Address</span>
        <input name="address" defaultValue={initialValues.address} required />
      </label>
      <label>
        <span>City</span>
        <input name="city" defaultValue={initialValues.city} required />
      </label>
      <label>
        <span>Country</span>
        <input name="country" defaultValue={initialValues.country} required />
      </label>
      <button type="submit">Continue</button>
    </form>
  )
}

