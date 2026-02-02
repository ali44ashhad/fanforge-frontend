export default function RegisterForm({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData.entries())
    onSubmit?.(values)
  }

  return (
    <form className="ff-register-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input name="name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" required />
      </label>
      <label>
        <span>Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="new-password"
        />
      </label>
      <button type="submit">Create account</button>
    </form>
  )
}

