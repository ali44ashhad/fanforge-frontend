# Fan Forge — Frontend

React frontend for Fan Forge, a marketplace for official and fan-made merchandise.

## Tech Stack

- **React 19** + **Vite 7**
- **React Router** — routing
- **Tailwind CSS** — styling
- **Lucide React** — icons

## Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173` (or the port Vite prints in the terminal).

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start dev server (HMR)   |
| `npm run build` | Production build       |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint              |

## Project Structure

- `src/components/` — Reusable UI (auth, checkout, dashboard, marketplace, etc.)
- `src/context/` — Auth, cart, notifications, theme
- `src/hooks/` — Custom hooks (auth, cart, orders, products)
- `src/layouts/` — Page layouts (main, auth, dashboard, admin)
- `src/pages/` — Route-level pages
- `src/services/` — API and backend service calls
- `src/utils/` — Constants, helpers, cookies

## Full Workflow

### App bootstrap

1. **Entry** — `main.jsx` mounts `App` inside `StrictMode`.
2. **Providers** (outer → inner): `AuthProvider` → `CartProvider` → `NotificationProvider` → `BrowserRouter`.
3. **Routes** — Public pages use `MainLayout`; auth pages use `AuthLayout`; dashboard pages use `DashboardLayout` or `AdminLayout` and are wrapped with `RequireAuth` (and `RequireRole` for admin).

### Authentication

- **Login** — `POST` login → token + user stored in cookies (and localStorage for migration). `AuthContext` exposes `user`, `role`, `token`, `isAuthed`, `login`, `logout`, `register`, `refreshMe`.
- **Register** — User signs up (optionally with role). Backend may return token; if so, user is logged in. Role is normalized to `BUYER` | `SELLER` | `ADMIN` | `SUPER_ADMIN`.
- **Session** — On load, if token exists, `refreshMe()` runs to sync user from backend. On 401/403, user is logged out.
- **Guards** — `RequireAuth` redirects unauthenticated users to `/login`. `RequireRole` (used in `AdminLayout`) restricts to `ADMIN` / `SUPER_ADMIN`.

### User roles and routes

| Role   | Dashboard entry     | Key routes |
|--------|---------------------|------------|
| Buyer  | `/dashboard/buyer`  | My orders, profile, order tracking |
| Seller | `/dashboard/seller` | Products, orders, shipping, settings, profile |
| Admin  | `/dashboard/admin`  | Users, sellers, products, categories, analytics, profile |

- `/dashboard` redirects to `/dashboard/buyer`.
- Sidebar in `DashboardLayout` switches links by `userRole` (buyer / seller / admin).

### Public (no login)

- **Browse** — Home (`/`), Marketplace (`/marketplace`), Product detail (`/product/:id`), Categories (`/categories`, `/category/:slug`), Search (`/search`), Seller store (`/seller/:id`).
- **Info** — About, Seller guidelines, Top sellers, Help, Contact, FAQs.
- **Legal** — Terms, Privacy, Returns.
- **Sell** — `/sell` explains selling; form submits seller application (user must be logged in; if already seller, redirects to seller dashboard).

### Buyer flow

1. Browse marketplace or search → open product → add to cart (or buy now).
2. **Cart** (`/cart`) — Review items, change quantity, remove; cart persisted in `localStorage` via `CartContext`.
3. **Checkout** (`/checkout`) — Wrapped in `RequireAuth`. Shipping form + order summary; submit places order via `orderService.placeOrder`, then cart cleared and redirect to **Order success** (`/order-success`).
4. **My orders** — `/dashboard/buyer/orders` lists orders; `/dashboard/buyer/orders/:orderId` shows tracking.

### Seller flow

1. **Apply** — Logged-in user (as buyer) goes to `/sell`, fills application (business name, description, payment methods, shipping, etc.), submits via `sellerService.apply`. Backend may require approval.
2. **After approval** — User’s role becomes (or includes) seller; they use **Seller dashboard**: products (list/add/edit), orders, shipping settings, settings, profile.
3. **Product management** — List at `/dashboard/seller/products`, edit at `/dashboard/seller/products/:id`.
4. **Orders** — `/dashboard/seller/orders` to view and manage orders.

### Admin flow

- **Admin layout** — All routes under `/dashboard/admin` require `RequireAuth` + `RequireRole` (ADMIN or SUPER_ADMIN).
- **Screens** — Dashboard, Users, Sellers (applications/approvals), Products (approval/management), Product preview (`/dashboard/admin/products/:id/preview`), Categories, Analytics, Profile.

### Data and API

- **Base URL** — `VITE_API_BASE_URL` (default `http://localhost:5000`). Used in `src/services/api.js` for `apiRequest`.
- **Auth on requests** — Token from cookies/localStorage is sent (e.g. `Authorization: Bearer <token>`).
- **Contexts** — `AuthContext` (auth state), `CartContext` (cart in localStorage), `NotificationContext` (toasts).
- **Services** — `authService`, `orderService`, `productService`, `sellerService`, `categoryService`, `userService`, `adminService` call the shared API layer.

### Checkout flow (summary)

```
Marketplace / Product → Add to cart (or Buy now)
  → Cart (/cart) → Checkout (/checkout, requires login)
  → Place order (API) → Clear cart → Order success (/order-success)
  → My orders (/dashboard/buyer/orders)
```

### Seller application flow (summary)

```
/sell (info + form) → Submit application (must be logged in)
  → Backend stores application (e.g. PENDING)
  → Admin approves in /dashboard/admin/sellers
  → User gains seller role → Seller dashboard (/dashboard/seller)
```

---

## Backend

This app expects a running Fan Forge backend API. Set `VITE_API_BASE_URL` (e.g. in `.env`) or the app defaults to `http://localhost:5000`. Auth token and user are sent on API requests via the shared client in `src/services/api.js`.
