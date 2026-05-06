# Phase 2 Implementation Plan: Core User Features (Profile, Goal, Dashboard)

> **Scope:** Replace all mock data with real API calls for user profile, health goal, and dashboard.  
> **Estimated Time:** 2–2.5 hours  
> **Prerequisites:** Phase 0 & Phase 1 completed (Axios, Zustand, Auth flows).

---

## 1. SessionStorage Token Persistence (Dev UX)

**File:** `src/stores/authStore.js`

- Add `persist` middleware from `zustand/middleware` **or** manually sync `token`/`user` to `sessionStorage`.
- On `login`, write `token` + `user` JSON to `sessionStorage`.
- On store init (page load), read from `sessionStorage` and hydrate state if present.
- On `logout`, clear `sessionStorage`.
- **Why:** Prevents dev/test logout on every browser refresh during Phase 2 testing.

---

## 2. API Layer — `src/api/userApi.js`

**New file.** Thin wrappers around `/health-profile` and `/health-goal`.

```js
export const getHealthProfile = (accountId) => axiosInstance.get(`/health-profile/${accountId}`);
export const saveHealthProfile = (accountId, data) => axiosInstance.post(`/health-profile/${accountId}`, data);
export const getHealthGoal = (accountId) => axiosInstance.get(`/health-goal/${accountId}`);
export const saveHealthGoal = (accountId, data) => axiosInstance.post(`/health-goal/${accountId}`, data);
```

**Error handling:** All functions throw on non-2xx. Callers (store/page) catch and show toast via `uiStore`.

---

## 3. State Management — `src/stores/userStore.js`

**New file.** Zustand store for profile + health goal.

```js
{
  profile: null,      // HealthProfileDTO
  healthGoal: null,   // HealthGoalDTO
  isLoading: false,

  fetchProfile(accountId)   // GET → set profile
  updateProfile(accountId, data) // POST → update profile + re-fetch
  fetchGoal(accountId)      // GET → set healthGoal
  updateGoal(accountId, data)    // POST → update goal + re-fetch
}
```

**Patterns:**
- Start action → `set({ isLoading: true })`.
- On success → `set({ profile: res.data, isLoading: false })`.
- On error → `set({ isLoading: false })`, then `useUiStore.getState().showToast(msg, 'error')`.

---

## 4. Validation Schemas — `src/utils/validators.js`

Add two Zod schemas:

**`healthProfileSchema`**
- `fullName`: string, min 1
- `age`: number, int, min 1, max 120
- `gender`: enum `['male', 'female', 'other']`
- `heightCm`: number, min 50, max 300
- `weightKg`: number, min 20, max 500
- `avatarUrl`: optional string (URL)

**`healthGoalSchema`**
- `goalType`: enum `['weight_loss', 'muscle_gain', 'maintenance', 'endurance']`
- `activityLevel`: enum `['sedentary', 'light', 'moderate', 'active', 'very_active']`
- `targetWeightKg`: number, optional
- `dailyCaloriesKcal`: number, min 500, max 10000
- `proteinGDay`: number, min 0
- `carbGDay`: number, min 0
- `fatGDay`: number, min 0

---

## 5. Page Refactor — `src/pages/Settings.jsx`

**Current state:** Static mock data, no API, no form library.

**Target state:** Three distinct forms managed by `react-hook-form` + `zodResolver`.

### 5.1 Profile Card
- **Fields:** Full Name, Age, Gender (select), Height (cm), Weight (kg), Avatar URL.
- **Load:** `useEffect` → `userStore.fetchProfile(authStore.user.id)`.
- **Save:** `handleSubmit` → `userStore.updateProfile(accountId, data)` → success toast.
- **Empty state:** If profile is `null`, show placeholder inputs or a "Create Profile" button.

### 5.2 Health Goal Card
- **Fields:** Goal Type (select), Activity Level (select), Target Weight, Daily Calories, Protein, Carbs, Fat.
- **Load:** `useEffect` → `userStore.fetchGoal(authStore.user.id)`.
- **Save:** `handleSubmit` → `userStore.updateGoal(accountId, data)` → success toast.

### 5.3 Change Password Card (new)
- **Fields:** Old Password, New Password, Confirm New Password.
- **Validation:** `changePasswordSchema` (already exists in `validators.js`).
- **Submit:** `authApi.changePassword(data)` → success toast → clear form.

### 5.4 Notification Toggles (keep UI-only)
- Retain the existing toggle list as **visual-only** (no BE endpoint yet).
- Add a small caption: "*Coming soon*" or leave unchanged.

### 5.5 UX Details
- **Loading spinner** on each card while `userStore.isLoading`.
- **Disabled Save button** during submission.
- **Global Toast** from `uiStore` for all success / error messages.

---

## 6. Page Refactor — `src/pages/Dashboard.jsx`

**Current state:** Hard-coded `user`, `nutrition`, and `weeklyCalories`.

**Target state:** Display authenticated user data + real nutrition targets.

### 6.1 Greeting Banner
- Replace `user.name` → `authStore.user?.username || 'Guest'`.
- Replace `user.goal` → `userStore.healthGoal?.goalType || '—'`.
- Keep `streak` as `0` (real streak calculation requires meal history → Phase 4).

### 6.2 Stat Cards
- **Calories:** `current` = `0` (no meal data yet); `target` = `userStore.healthGoal?.dailyCaloriesKcal || 2000`.
- **Protein:** `current` = `0`; `target` = `userStore.healthGoal?.proteinGDay || 130`.
- **Water:** Keep `current = 0`, `target = 8` (no BE water endpoint yet).
- **Streak:** Keep `0 days` with subtitle "Start your journey" until Phase 4.

### 6.3 CalorieRing + NutritionBar
- Pass `current = 0`, `target` from `healthGoal` (fallback defaults).
- Bars: Protein, Carbohydrates, Fat targets from `healthGoal`.

### 6.4 Weekly Progress Chart
- **Keep mock data** for now (`weeklyCalories` array).  
- Reason: Real daily calorie totals require `/meal-plans` API (Phase 4).  
- Add a subtle overlay or caption if desired: "*Weekly data will sync with your meal plans in Phase 4.*"

### 6.5 Data Fetching
- `useEffect` on mount:
  ```js
  if (authStore.user?.id) {
    userStore.fetchProfile(authStore.user.id);
    userStore.fetchGoal(authStore.user.id);
  }
  ```
- Guard rendering with loading state (skeleton or spinner) while `userStore.isLoading`.

---

## 7. Routing / Auth Guards

No changes required. `ProtectedRoute` already blocks unauthenticated users.

---

## 8. Testing Checklist

| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Login → Dashboard | Greeting shows logged-in username. Stat targets match default or previously saved goal. |
| 2 | Refresh page while logged in | Still authenticated (token persisted in `sessionStorage`). |
| 3 | Navigate to Settings → Profile | Form auto-fills with backend profile data (or empty if new user). |
| 4 | Update Profile → Save | Success toast. Re-fetch shows new values. Network tab shows `POST /health-profile/{id}`. |
| 5 | Update Health Goal → Save | Success toast. Dashboard stat targets update on next navigation. |
| 6 | Change Password | Old password wrong → error toast. Correct → success toast, form clears. |
| 7 | Logout | Token removed from `sessionStorage`. Redirect to `/login`. |
| 8 | Access `/dashboard` while logged out | `ProtectedRoute` redirects to `/login`. |

---

## 9. File Change Summary

| File | Action | Lines (est.) |
|------|--------|--------------|
| `src/stores/authStore.js` | **Modify** — add sessionStorage sync | +8 |
| `src/api/userApi.js` | **Create** — 4 API wrappers | ~10 |
| `src/stores/userStore.js` | **Create** — Zustand store | ~45 |
| `src/utils/validators.js` | **Modify** — add `healthProfileSchema`, `healthGoalSchema` | +25 |
| `src/pages/Settings.jsx` | **Rewrite** — RHF forms + API integration | ~180 |
| `src/pages/Dashboard.jsx` | **Modify** — swap mock for store data | ~40 |

---

## 10. Risk Mitigation

- **Profile/Goal 404 for new users:** Backend may return `404` if profile never created. Store should catch 404, set `profile = null`, and let Settings page show a "Create" button instead of crashing.
- **Missing `healthGoal` on Dashboard:** Always provide sensible fallbacks (e.g., `target = 2000`) so UI never shows `undefined`.
- **Circular import authStore ↔ axiosInstance:** Already solved in Phase 0 (read `token` via `getState()`). No change needed.

---

## 11. Post-Phase 2 Cleanup (Phase 6)

- Remove `weeklyCalories` mock array from `Dashboard.jsx` once Phase 4 meal-plan API is integrated.
- Remove notification toggle placeholders if BE endpoints are never added.

---

**Ready to implement?** Confirm and I will proceed file-by-file, starting with `authStore.js` sessionStorage and ending with Dashboard integration.
