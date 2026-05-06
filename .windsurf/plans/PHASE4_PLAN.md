# Phase 4 Implementation Plan: Meal Plans & Portions

> Wire Today’s Meals page to real Meal Plan and Portion APIs. Replace all mock nutrition data with live daily totals from backend calculations.  
> **Estimated time:** 2–2.5 hours.

---

## Decisions Made

| Topic | Decision | Rationale |
|---|---|---|
| **Scope focus** | Today’s Meals only | Core daily tracking is higher priority than weekly planner or analytics. MealPlanner.jsx weekly grid stays local-only for now. |
| **Nutrition calculation** | Use BE-calculated portion nutrition | Each portion API returns `caloriesKcal`, `proteinG`, `carbG`, `fatG`. FE sums these for daily totals instead of calculating from dish × quantity. |
| **Auto-create meal plan** | If no plan for today, auto-create on first add | BE requires `planId` to add portions. FE will create a default plan named "Daily Plan {date}" automatically when user first adds a dish. |
| **Portion quantity editing** | Inline stepper (±50g) or input | Simple UX for adjusting portion size without full edit modal. |

---

## 1. API Layer — `src/api/mealApi.js`

**New file.** Thin wrappers around meal plans, meals, and portions.

```js
// Meal Plans
export const getMealPlans = (accountId) => axiosInstance.get(`/meal-plans/account/${accountId}`);
export const getMealPlanByDate = (accountId, date) => axiosInstance.get(`/meal-plans/account/${accountId}/date/${date}`);
export const getMealPlanById = (id) => axiosInstance.get(`/meal-plans/${id}`);
export const createMealPlan = (accountId, data) => axiosInstance.post(`/meal-plans?accountId=${accountId}`, data);
export const updateMealPlan = (id, data) => axiosInstance.put(`/meal-plans/${id}`, data);
export const deleteMealPlan = (id) => axiosInstance.delete(`/meal-plans/${id}`);

// Meals (list within a plan)
export const getMeals = (planId) => axiosInstance.get(`/meal-plans/${planId}/meals`);

// Portions (CRUD within a meal)
export const getPortions = (planId, mealType) => axiosInstance.get(`/meal-plans/${planId}/meals/${mealType}/portions`);
export const addPortion = (planId, mealType, data) => axiosInstance.post(`/meal-plans/${planId}/meals/${mealType}/portions`, data);
export const updatePortion = (planId, mealType, portionId, data) => axiosInstance.put(`/meal-plans/${planId}/meals/${mealType}/portions/${portionId}`, data);
export const deletePortion = (planId, mealType, portionId) => axiosInstance.delete(`/meal-plans/${planId}/meals/${mealType}/portions/${portionId}`);

// Templates (GET/DELETE ready, POST pending)
export const getTemplates = (accountId) => axiosInstance.get(`/meal-plan-templates?accountId=${accountId}`);
export const deleteTemplate = (id) => axiosInstance.delete(`/meal-plan-templates/${id}`);
```

---

## 2. State Management — `src/stores/mealStore.js`

**New file.** Zustand store for today's meal plan and portions.

```js
{
  todayPlan: null,       // MealPlanDTO or null
  portions: {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  },
  dailyTotals: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  isLoading: false,
  isAdding: false,       // Separate loading for add actions

  fetchTodayPlan(accountId, date) // GET by date → set todayPlan or null
  ensureTodayPlan(accountId, date) // If null, POST create plan then set
  fetchPortions(planId, mealType) // GET portions for one meal type
  loadTodayData(accountId) // Orchestrate: fetch plan + all 4 meal portions

  addPortion(accountId, date, mealType, dishId, quantityG) // Auto-create plan if needed
  updatePortionQuantity(planId, mealType, portionId, quantityG) // PUT quantity
  removePortion(planId, mealType, portionId) // DELETE

  // Derived: recalc dailyTotals from all portions
  recalcDailyTotals()
}
```

**Patterns:**
- `loadTodayData` called on mount with `accountId` and today's ISO date (`yyyy-MM-dd`).
- `fetchTodayPlan` handles 404 by setting `todayPlan = null` (don’t toast — empty day is normal).
- `addPortion` flow:
  1. If `todayPlan === null`, call `ensureTodayPlan` first.
  2. POST portion with `{ dishId, quantityG }`.
  3. On success, re-fetch portions for that meal type and recalc totals.
- All actions show toast via `useUiStore` on error.

---

## 3. Component Refactor — `src/pages/TodaysMeals.jsx`

**Current state:** Hard-coded `meals` object with nulls, hard-coded `nutrition` targets, mock water tracker.

**Target state:** Live daily meal plan with real portions and nutrition totals.

### 3.1 Data loading
- `useEffect` on mount:
  ```js
  if (accountId) {
    const today = format(new Date(), 'yyyy-MM-dd');
    mealStore.loadTodayData(accountId, today);
  }
  ```
- `accountId` from `authStore.user.id`.

### 3.2 Nutrition targets
- Pull targets from `userStore.healthGoal` (fallback defaults: 2000 cal, 130g protein, 220g carbs, 65g fat).
- `current` values from `mealStore.dailyTotals` (sums of all portions).

### 3.3 Meal cards (Breakfast/Lunch/Dinner/Snack)
- Change from `meals` object to iterating over `['breakfast', 'lunch', 'dinner', 'snack']`.
- For each meal type:
  - Display list of portions from `mealStore.portions[mealType]`.
  - Each portion shows: dish name, quantity (g), computed calories (from portion DTO), delete button.
  - Add inline quantity adjuster (e.g., `- 150g +` stepper).
- **Add Portion button:** Opens `LogMealModal` (reuse existing) with dish selector.
  - Modal should receive `mealType` prop so FE knows which meal to add to.
  - On dish select + quantity confirm, call `mealStore.addPortion(...)`.

### 3.4 Portion item component (new inline)
Create small inline UI per portion (inside meal card):
```
[🍗 Grilled Chicken]  [150g]  [330 kcal]  [🗑️]
```
- Click quantity to edit (±50g buttons or number input).
- Trash icon calls `removePortion`.

### 3.5 Water tracker
- Keep local state (no BE endpoint yet), but persist to `localStorage` if desired (optional).

### 3.6 Loading states
- `mealStore.isLoading` → show skeleton or spinner overlay on summary header.
- `mealStore.isAdding` → disable Add buttons while adding portion.

---

## 4. Component Update — `LogMealModal.jsx`

**Current state:** Lists `recipes` prop, selects one, calls `handleLog` placeholder.

**Changes:**
- Replace `recipes` prop with `dishes` from `dishStore` (system dishes).
- Add `mealType` prop so modal knows which meal (Breakfast/Lunch/Dinner/Snack) it’s adding to.
- Add `quantityG` input (default 100g) before confirm.
- `onConfirm(dishId, quantityG)` callback instead of `onClose`.

**Usage in TodaysMeals:**
```jsx
<LogMealModal
  isOpen={isLogModalOpen}
  onClose={() => setIsLogModalOpen(false)}
  mealType={activeMealType} // 'breakfast' | 'lunch' | 'dinner' | 'snack'
  onConfirm={(dishId, quantityG) => {
    addPortion(accountId, today, activeMealType, dishId, quantityG);
    setIsLogModalOpen(false);
  }}
/>
```

---

## 5. Dashboard Weekly Chart (optional update)

Keep mock weekly chart as is, but if time permits:
- Add `useEffect` to fetch last 7 days meal plans and sum daily calories.
- Replace `weeklyCalories` mock array with real sums.
- **Note:** This requires 7 API calls (one per day) or backend adding a summary endpoint. Skip if complex.

---

## 6. File Change Summary

| File | Action | Notes |
|------|--------|-------|
| `src/api/mealApi.js` | **Create** | All meal plan, meal, and portion endpoints |
| `src/stores/mealStore.js` | **Create** | Zustand store for today’s plan, portions, daily totals |
| `src/pages/TodaysMeals.jsx` | **Rewrite** | Load real plan/portions, display portion lists, live nutrition totals |
| `src/components/ui/LogMealModal.jsx` | **Modify** | Add quantity input, use dishStore dishes, call onConfirm with (dishId, quantityG) |
| `src/components/ui/MealCard.jsx` | **Modify** | Accept portions[] instead of single meal, render portion list with quantity editor |

---

## 7. Testing Checklist

| # | Step | Expected |
|---|------|----------|
| 1 | Open `/meals` | Header shows correct date. Nutrition bars show 0 / target (if no plan yet). |
| 2 | Click "Log a Meal" → Breakfast | `LogMealModal` opens with list of system dishes. |
| 3 | Select dish, set quantity 150g, confirm | POST `/meal-plans?accountId={id}` auto-creates plan (if first time), then POST portion. Card shows new portion with quantity. |
| 4 | Daily nutrition updates | Header calories/protein/carbs/fat bars increase by dish nutrition × quantity. |
| 5 | Adjust portion quantity | Click + / - or type. PUT `/portions/{id}` fires. Bars update. |
| 6 | Delete portion | Trash icon → DELETE `/portions/{id}`. Bars decrease. |
| 7 | Add to Lunch/Dinner/Snack | Same flow, totals aggregate across all 4 meals. |
| 8 | Refresh page | Reloads same plan and portions for today. |

---

## 8. Risk Mitigation

| Risk | Mitigation |
|---|---|
| **BE returns 404 for no plan** | Normal — FE treats as empty day and auto-creates on first add. |
| **Portion nutrition fields missing** | Fallback to 0 if `caloriesKcal`, `proteinG`, etc. not present. |
| **Concurrent edits** | If user rapidly clicks add, disable button (`isAdding` state) until request completes. |
| **Date timezone mismatch** | Use `yyyy-MM-dd` in local time; if issues arise, switch to ISO with timezone. |

---

## 9. Post-Phase 4 (Phase 5 Preview)

- **Analytics real data:** Aggregate daily totals from meal plans over date range.
- **Weekly MealPlanner grid:** Load real plans for each day of week; allow drag-drop portions between days.
- **Templates UI:** List + delete templates (POST pending BE).
