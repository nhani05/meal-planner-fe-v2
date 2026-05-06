# Phase 5 Implementation Plan: Admin Dashboard

> Build the full admin area (Dashboard, Users, Dishes, Categories, Feedbacks) as a separate route section with its own layout, protected by `isAdmin` from `authStore`.  
> **Estimated time:** 3–4 hours.

---

## Decisions Made

| Topic | Decision | Rationale |
|---|---|---|
| **Admin routing** | `/admin/*` nested under a new `AdminRoute` guard | Reuse `isAdmin` from authStore; prevents regular users from accessing admin pages via URL. |
| **Admin layout** | Separate `AdminLayout.jsx` with its own left sidebar | Admin UX differs from user UX. Keeps admin nav isolated. |
| **AdminCategories** | GET list + disabled Add/Edit/Delete buttons (placeholder) | `POST /dish-categories`, `PUT`, `DELETE` are ⏳ BE pending. Show UI but disable destructive actions. |
| **Dish CRUD form** | Modal (not separate page) | Keeps AdminDishes table in view while editing; consistent with admin UX patterns. |
| **Admin sidebar in user app** | Show "Admin" link in user Sidebar when `isAdmin === true` | Avoids duplicating top-level nav; just one additional link pointing to `/admin`. |

---

## File Structure

```
src/
  api/
    adminApi.js              ← NEW
  pages/
    admin/
      AdminLayout.jsx        ← NEW
      AdminDashboard.jsx     ← NEW
      AdminUsers.jsx         ← NEW
      AdminDishes.jsx        ← NEW
      AdminCategories.jsx    ← NEW
      AdminFeedbacks.jsx     ← NEW
  components/
    common/
      AdminRoute.jsx         ← NEW
  App.jsx                    ← MODIFY (add /admin routes)
  components/layout/Sidebar.jsx  ← MODIFY (add admin link for isAdmin)
```

---

## 1. API Layer — `src/api/adminApi.js`

```js
// Statistics
export const getStatistics = (params) => axiosInstance.get('/admin/statistics', { params });

// Users
export const getUsers = (params) => axiosInstance.get('/admin/users', { params });
export const getUserById = (id) => axiosInstance.get(`/admin/users/${id}`);
export const lockUser = (id) => axiosInstance.patch(`/admin/users/${id}/lock`);
export const unlockUser = (id) => axiosInstance.patch(`/admin/users/${id}/unlock`);
export const deleteUser = (id) => axiosInstance.delete(`/admin/users/${id}`);

// Dishes
export const getAdminDishes = (params) => axiosInstance.get('/admin/dishes', { params });
export const createAdminDish = (data) => axiosInstance.post('/admin/dishes', data);
export const updateAdminDish = (id, data) => axiosInstance.put(`/admin/dishes/${id}`, data);
export const deleteAdminDish = (id) => axiosInstance.delete(`/admin/dishes/${id}`);

// Categories (GET only; add/edit/delete pending BE)
export const createCategory = (data) => axiosInstance.post('/dish-categories', data);
export const updateCategory = (id, data) => axiosInstance.put(`/dish-categories/${id}`, data);
export const deleteCategory = (id) => axiosInstance.delete(`/dish-categories/${id}`);

// Feedbacks
export const getAdminFeedbacks = (params) => axiosInstance.get('/admin/feedbacks', { params });
export const updateFeedbackStatus = (id, status) => axiosInstance.patch(`/admin/feedbacks/${id}/status`, { status });
```

---

## 2. Guard — `src/components/common/AdminRoute.jsx`

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
```

---

## 3. `AdminLayout.jsx`

- Fixed left sidebar with links: Dashboard, Users, Dishes, Categories, Feedbacks.
- Top bar with "← Back to App" button linking to `/`.
- Active link highlighting using `useLocation`.
- Fully responsive: collapsible on mobile.
- Sidebar uses same green brand palette (`#171d16`, `#4caf50`, `#eaf0e4`).

---

## 4. `AdminDashboard.jsx`

**Calls:** `GET /admin/statistics`

**UI:**
- 4 stat cards: Total Users, Total Dishes, Active Plans Today, New Feedbacks.
- Each card has an icon (Users, UtensilsCrossed, CalendarCheck, MessageSquare from Lucide).
- No charts needed (keep it fast).
- `Loading` skeleton state while fetching.

```
┌────────────────────────────────────────────────┐
│ 📊  Admin Dashboard               [← Back]     │
│                                                │
│  [150 Users]  [500 Dishes]  [45 Plans]  [5 FB]│
└────────────────────────────────────────────────┘
```

---

## 5. `AdminUsers.jsx`

**Calls:** `GET /admin/users?keyword=&status=&page=&size=10`

**UI:**
- Search input (keyword) + status filter dropdown (all / active / locked).
- Data table: ID, Username, Email, Role, Status badge, Actions.
- Actions per row:
  - 🔒 Lock / 🔓 Unlock (PATCH) — toggle based on current status.
  - 🗑️ Delete (DELETE) with confirmation dialog.
- Pagination: Prev / Next.
- Status badge: `active` = green chip, `locked` = red chip.

**Behavior:**
- After lock/unlock/delete → re-fetch current page.
- Optimistic status toggle (rollback on error).

---

## 6. `AdminDishes.jsx`

**Calls:** `GET /admin/dishes?keyword=&categoryId=&page=&size=10`, `POST`, `PUT`, `DELETE /admin/dishes/{id}`

**UI:**
- Search + category filter.
- Data table: ID, Name, Category, Calories/100g, Difficulty, Source, Actions (Edit, Delete).
- **Create / Edit Modal:**
  - Fields: Name, Category (select), Image URL, Difficulty (select: easy/medium/hard), Total Time (min).
  - Nutrition section: Calories/100g, Protein/100g, Carb/100g, Fat/100g.
  - Ingredients section: dynamic list with Add/Remove rows (Name, Quantity g, Unit).
  - Submit calls POST or PUT.
- Delete with confirmation.

**Form structure maps to BE:**
```json
{
  "dish": { "name", "categoryId", "imageUrl", "difficulty", "totalTimeMin" },
  "nutrition": { "caloriesPer100g", "proteinPer100g", "carbPer100g", "fatPer100g" },
  "ingredients": [{ "name", "quantityG", "unit" }]
}
```

---

## 7. `AdminCategories.jsx`

**Calls:** `GET /dish-categories` (existing endpoint, no auth needed)

**UI:**
- Simple list table: ID, Name, Dish Count (if returned), Actions (Edit, Delete — **disabled** with tooltip "Coming soon").
- **Add Category** button → inline modal with Name input → calls `POST /dish-categories` (disabled, shows toast "BE pending").
- Will be enabled once BE implements the endpoint.

---

## 8. `AdminFeedbacks.jsx`

**Calls:** `GET /admin/feedbacks?status=&page=&size=10`, `PATCH /admin/feedbacks/{id}/status`

**UI:**
- Status filter: All / Pending / Resolved / Rejected.
- Data table: ID, Account ID, Content (truncated), Status badge, Submitted At, Actions.
- Actions: dropdown (or 3 buttons) to set status → `pending`, `resolved`, `rejected`.
- After update → re-fetch.

---

## 9. `App.jsx` Changes

Add admin routes nested under `AdminRoute` guard:

```jsx
import AdminRoute from './components/common/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDishes from './pages/admin/AdminDishes';
import AdminCategories from './pages/admin/AdminCategories';
import AdminFeedbacks from './pages/admin/AdminFeedbacks';

// Inside <Routes>:
<Route element={<AdminRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="dishes" element={<AdminDishes />} />
    <Route path="categories" element={<AdminCategories />} />
    <Route path="feedbacks" element={<AdminFeedbacks />} />
  </Route>
</Route>
```

---

## 10. `Sidebar.jsx` Change

Add admin link conditionally:

```jsx
const isAdmin = useAuthStore((state) => state.isAdmin);

// Inside nav links:
{isAdmin && (
  <NavLink to="/admin" icon={<ShieldCheck size={18} />} label="Admin" />
)}
```

---

## 11. Testing Checklist

| # | Step | Expected |
|---|------|----------|
| 1 | Login as regular user | No "Admin" link in sidebar. Direct `/admin` URL → redirect to `/`. |
| 2 | Login as admin | "Admin" link visible in sidebar. |
| 3 | `/admin` → Dashboard | Stats cards show real numbers from BE. |
| 4 | `/admin/users` | User list loads with pagination and search. |
| 5 | Lock user | Status badge flips to "locked". User login attempt fails. |
| 6 | Unlock user | Status badge flips back to "active". |
| 7 | Delete user | Row removed. Confirmation dialog shown first. |
| 8 | `/admin/dishes` | Dish list loads. Click Create → modal opens. |
| 9 | Create dish with nutrition + ingredients | POST fires, dish appears in list. |
| 10 | Edit dish | Pre-filled form, PUT fires on save. |
| 11 | Delete dish in use | BE returns 400 → toast error "Cannot delete dish: it is currently used in meal plans". |
| 12 | `/admin/categories` | Category list loads. Add/Edit/Delete buttons disabled (tooltip shown). |
| 13 | `/admin/feedbacks` | Feedback list loads. Change status → PATCH fires, badge updates. |

---

## 12. Risk Mitigation

| Risk | Mitigation |
|---|---|
| **Category CRUD BE pending** | Disable buttons client-side, show tooltip "Coming soon". API functions stubbed in adminApi.js for future use. |
| **Admin dish form complexity** | Use React state (useState) for ingredient rows; no need for react-hook-form. Keep form in a modal component. |
| **Large admin bundle** | Admin pages can be code-split with `lazy()` + `Suspense` if needed later. |
| **Accidental access by regular users** | `AdminRoute` guard redirects to `/` if `isAdmin === false`. |
