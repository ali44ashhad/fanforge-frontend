export default function RoleSelector({ value = 'buyer', onChange }) {
  return (
    <label className="ff-role-selector">
      <span>Role</span>
      <select value={value} onChange={(e) => onChange?.(e.target.value)}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        <option value="admin">Admin</option>
      </select>
    </label>
  )
}

