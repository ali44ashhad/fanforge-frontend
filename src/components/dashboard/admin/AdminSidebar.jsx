export default function AdminSidebar({ items = [], onSelect }) {
  return (
    <nav className="ff-admin-sidebar" aria-label="Admin navigation">
      <ul>
        {items.map((item) => (
          <li key={item.key || item.label}>
            <button type="button" onClick={() => onSelect?.(item.key)}>{item.label}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

