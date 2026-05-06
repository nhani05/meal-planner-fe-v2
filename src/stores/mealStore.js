import { create } from 'zustand';
import * as mealApi from '../api/mealApi';
import { useUiStore } from './uiStore';

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

const emptyPortions = () => ({ breakfast: [], lunch: [], dinner: [], snack: [] });

const calcTotals = (portions) => {
  let calories = 0, protein = 0, carbs = 0, fat = 0;
  mealTypes.forEach((type) => {
    (portions[type] || []).forEach((p) => {
      calories += p.caloriesKcal || 0;
      protein += p.proteinG || 0;
      carbs += p.carbG || 0;
      fat += p.fatG || 0;
    });
  });
  return { calories, protein, carbs, fat };
};

export const useMealStore = create((set, get) => ({
  todayPlan: null,
  portions: emptyPortions(),
  dailyTotals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  isLoading: false,
  isAdding: false,

  // --- Fetching ---

  fetchTodayPlan: async (accountId, date) => {
    try {
      const res = await mealApi.getMealPlanByDate(accountId, date);
      set({ todayPlan: res.data });
      return res.data;
    } catch (err) {
      if (err.response?.status === 404) {
        set({ todayPlan: null });
        return null;
      }
      const msg = err.response?.data?.message || err.message || 'Failed to load meal plan';
      useUiStore.getState().showToast(msg, 'error');
      return null;
    }
  },

  ensureTodayPlan: async (accountId, date) => {
    const { todayPlan } = get();
    if (todayPlan) return todayPlan;
    try {
      const res = await mealApi.createMealPlan(accountId, {
        planName: `Daily Plan ${date}`,
        planDate: date,
      });
      set({ todayPlan: res.data });
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to create meal plan';
      useUiStore.getState().showToast(msg, 'error');
      return null;
    }
  },

  fetchPortions: async (planId, mealType) => {
    try {
      const res = await mealApi.getPortions(planId, mealType);
      set((state) => ({
        portions: { ...state.portions, [mealType]: res.data || [] },
      }));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || `Failed to load ${mealType} portions`;
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  loadTodayData: async (accountId, date) => {
    set({ isLoading: true, portions: emptyPortions(), dailyTotals: { calories: 0, protein: 0, carbs: 0, fat: 0 } });
    const plan = await get().fetchTodayPlan(accountId, date);
    if (plan) {
      await Promise.all(
        mealTypes.map((type) => get().fetchPortions(plan.id, type))
      );
      set((state) => ({ dailyTotals: calcTotals(state.portions), isLoading: false }));
    } else {
      set({ isLoading: false });
    }
  },

  // --- Mutations ---

  addPortion: async (accountId, date, mealType, dishId, quantityG) => {
    set({ isAdding: true });
    let plan = get().todayPlan;
    if (!plan) {
      plan = await get().ensureTodayPlan(accountId, date);
    }
    if (!plan) {
      set({ isAdding: false });
      return;
    }
    try {
      await mealApi.addPortion(plan.id, mealType, { dishId, quantityG });
      await get().fetchPortions(plan.id, mealType);
      set((state) => ({
        dailyTotals: calcTotals(state.portions),
        isAdding: false,
      }));
      useUiStore.getState().showToast('Portion added', 'success');
    } catch (err) {
      set({ isAdding: false });
      const msg = err.response?.data?.message || err.message || 'Failed to add portion';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  updatePortionQuantity: async (planId, mealType, portionId, quantityG) => {
    try {
      await mealApi.updatePortion(planId, mealType, portionId, { quantityG });
      await get().fetchPortions(planId, mealType);
      set((state) => ({ dailyTotals: calcTotals(state.portions) }));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update portion';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  removePortion: async (planId, mealType, portionId) => {
    try {
      await mealApi.deletePortion(planId, mealType, portionId);
      await get().fetchPortions(planId, mealType);
      set((state) => ({ dailyTotals: calcTotals(state.portions) }));
      useUiStore.getState().showToast('Portion removed', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to remove portion';
      useUiStore.getState().showToast(msg, 'error');
    }
  },
}));
