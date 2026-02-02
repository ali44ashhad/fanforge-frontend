export default function BadgeManager({ badges = [], onCreate, onDelete }) {
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    if (name) onCreate?.({ name })
    e.currentTarget.reset()
  }

  return (
    <section className="ff-badge-manager">
      <h3>Badges</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="New badge name" />
        <button type="submit">Create</button>
      </form>
      <ul>
        {badges.map((b) => (
          <li key={b.id || b.name}>
            {b.name}{' '}
            <button type="button" onClick={() => onDelete?.(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

