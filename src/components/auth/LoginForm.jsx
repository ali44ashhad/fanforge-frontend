export default function LoginForm({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData.entries())
    onSubmit?.(values)
  }

  return (
    <form className="ff-login-form" onSubmit={handleSubmit}>
      <label>
        <span>Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        <span>Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </label>
      <button type="submit">Log in</button>
    </form>
  )
}

