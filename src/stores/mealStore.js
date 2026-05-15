import { create } from 'zustand';
import * as mealApi from '../api/mealApi';
import * as dishApi from '../api/dishApi';
import { useUiStore } from './uiStore';
import i18n from '../i18n';

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
const dishNameCache = new Map();

const emptyPortions = () => ({ breakfast: [], lunch: [], dinner: [], snack: [] });

const pickNumber = (...values) => {
  const value = values.find((v) => v !== undefined && v !== null);
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const getDishId = (portion) =>
  portion.dishId ?? portion.dish_id ?? portion.dish?.id ?? portion.dish?.dishId ?? null;

const getDishName = (portion) =>
  portion.dishName ??
  portion.dish_name ??
  portion.dish?.name ??
  portion.dish?.dishName ??
  portion.dish?.dish_name ??
  null;

const normalizePortion = (portion, dishName) => ({
  ...portion,
  id: portion.id ?? portion.portionId ?? portion.mealPortionId,
  dishId: getDishId(portion),
  dishName: dishName ?? getDishName(portion),
  quantityG: pickNumber(portion.quantityG, portion.quantity_g, portion.grams),
  caloriesKcal: pickNumber(portion.caloriesKcal, portion.calories_kcal, portion.calories),
  proteinG: pickNumber(portion.proteinG, portion.protein_g, portion.protein),
  carbG: pickNumber(portion.carbG, portion.carbsG, portion.carb_g, portion.carbs_g, portion.carbs),
  fatG: pickNumber(portion.fatG, portion.fat_g, portion.fat),
});

const enrichPortions = async (rawPortions = []) => {
  const portions = Array.isArray(rawPortions) ? rawPortions : [];
  const missingIds = [
    ...new Set(
      portions
        .filter((p) => !getDishName(p))
        .map(getDishId)
        .filter((id) => id !== null && id !== undefined && !dishNameCache.has(id))
    ),
  ];

  await Promise.allSettled(
    missingIds.map(async (id) => {
      const res = await dishApi.getDishById(id);
      dishNameCache.set(id, res.data?.name || null);
    })
  );

  return portions.map((p) => {
    const dishId = getDishId(p);
    return normalizePortion(p, getDishName(p) || dishNameCache.get(dishId));
  });
};

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

  // Week plans (UC11)
  weekPlans: {},
  weekPlanSummaries: {},
  isLoadingWeek: false,

  // Day detail (UC09)
  selectedDate: null,
  selectedPlan: null,
  dayPortions: emptyPortions(),
  dayTotals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  isLoadingDay: false,

  // Templates (UC12)
  templates: [],
  isLoadingTemplates: false,
  isSavingTemplate: false,

  // --- Helpers ---

  _dateFromOffset: (weekOffset) => {
    const now = new Date();
    now.setDate(now.getDate() + weekOffset * 7);
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() + 1);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
    }
    return dates;
  },

  // --- Fetching ---

  fetchWeekPlans: async (accountId, weekOffset) => {
    const dates = get()._dateFromOffset(weekOffset);
    set({ isLoadingWeek: true });
    try {
      const results = await Promise.allSettled(
        dates.map((date) => mealApi.getMealPlanByDate(accountId, date))
      );
      const weekPlans = {};
      results.forEach((r, i) => {
        if (r.status === 'fulfilled') {
          weekPlans[dates[i]] = r.value.data;
        } else {
          weekPlans[dates[i]] = null;
        }
      });

      // Fetch portions for each meal type per plan to calculate real totals
      const summaryPromises = dates
        .filter((d) => weekPlans[d])
        .map(async (date) => {
          try {
            const planId = weekPlans[date].id;
            const portionsRes = await Promise.all(
              mealTypes.map((type) => mealApi.getPortions(planId, type))
            );
            let calories = 0, protein = 0, carbs = 0, fat = 0;
            for (const res of portionsRes) {
              const normalized = await enrichPortions(res.data || []);
              for (const p of normalized) {
                calories += p.caloriesKcal || 0;
                protein += p.proteinG || 0;
                carbs += p.carbG || 0;
                fat += p.fatG || 0;
              }
            }
            return { date, totals: { calories, protein, carbs, fat } };
          } catch {
            return { date, totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } };
          }
        });

      const summaryResults = await Promise.allSettled(summaryPromises);
      const weekPlanSummaries = {};
      summaryResults.forEach((s) => {
        if (s.status === 'fulfilled') {
          weekPlanSummaries[s.value.date] = s.value.totals;
        }
      });

      set({ weekPlans, weekPlanSummaries, isLoadingWeek: false });
      return weekPlans;
    } catch (err) {
      set({ isLoadingWeek: false });
      const msg = err.response?.data?.message || err.message || 'Failed to load week plans';
      useUiStore.getState().showToast(msg, 'error');
      return {};
    }
  },

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
    return get()._createPlan(accountId, date, 'todayPlan');
  },

  ensurePlanForDate: async (accountId, date) => {
    const { weekPlans } = get();
    if (weekPlans[date]) return weekPlans[date];
    const plan = await get()._createPlan(accountId, date, 'weekPlans');
    if (plan) {
      set((state) => ({
        weekPlans: { ...state.weekPlans, [date]: plan },
      }));
    }
    return plan;
  },

  _createPlan: async (accountId, date, targetState) => {
    try {
      const res = await mealApi.createMealPlan(accountId, {
        planName: `Daily Plan ${date}`,
        planDate: date,
      });
      if (targetState === 'todayPlan') set({ todayPlan: res.data });
      useUiStore.getState().showToast(i18n.t('toast.planCreated'), 'success');
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to create plan. Please try again.';
      useUiStore.getState().showToast(msg, 'error');
      return null;
    }
  },

  deletePlan: async (planId, date) => {
    try {
      await mealApi.deleteMealPlan(planId);
      set((state) => {
        const next = { ...state.weekPlans };
        if (date) delete next[date];
        return { weekPlans: next, selectedPlan: null, selectedDate: null, dayPortions: emptyPortions(), dayTotals: calcTotals(emptyPortions()) };
      });
      useUiStore.getState().showToast(i18n.t('toast.planDeleted'), 'success');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete plan';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  fetchPortions: async (planId, mealType) => {
    try {
      const res = await mealApi.getPortions(planId, mealType);
      const portions = await enrichPortions(res.data || []);
      set((state) => ({
        portions: { ...state.portions, [mealType]: portions },
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

  loadDayDetail: async (accountId, date) => {
    set({ isLoadingDay: true, selectedDate: date, dayPortions: emptyPortions(), dayTotals: { calories: 0, protein: 0, carbs: 0, fat: 0 } });
    try {
      let plan = null;
      const { weekPlans } = get();
      if (weekPlans[date]) {
        plan = weekPlans[date];
      } else {
        const res = await mealApi.getMealPlanByDate(accountId, date);
        plan = res.data;
      }
      if (!plan) {
        set({ isLoadingDay: false, selectedPlan: null });
        return;
      }
      set({ selectedPlan: plan });
      await Promise.all(
        mealTypes.map((type) => get()._fetchDayPortions(plan.id, type))
      );
      set((state) => ({ dayTotals: calcTotals(state.dayPortions), isLoadingDay: false }));
    } catch (err) {
      set({ isLoadingDay: false, selectedPlan: null });
      if (err.response?.status !== 404) {
        const msg = err.response?.data?.message || err.message || 'Failed to load plan detail';
        useUiStore.getState().showToast(msg, 'error');
      }
    }
  },

  _fetchDayPortions: async (planId, mealType) => {
    try {
      const res = await mealApi.getPortions(planId, mealType);
      const portions = await enrichPortions(res.data || []);
      set((state) => ({
        dayPortions: { ...state.dayPortions, [mealType]: portions },
      }));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || `Failed to load ${mealType} portions`;
      useUiStore.getState().showToast(msg, 'error');
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
      useUiStore.getState().showToast(i18n.t('toast.portionAdded'), 'success');
    } catch (err) {
      set({ isAdding: false });
      const msg = err.response?.data?.message || err.message || 'Failed to add portion';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  addPortionsToDay: async (accountId, date, mealType, portionsList) => {
    // portionsList: [{ dishId, quantityG }]
    set({ isAdding: true });
    let plan = get().selectedPlan;
    if (!plan) {
      plan = await get().ensurePlanForDate(accountId, date);
    }
    if (!plan) {
      set({ isAdding: false });
      return;
    }
    try {
      for (const { dishId, quantityG } of portionsList) {
        await mealApi.addPortion(plan.id, mealType, { dishId, quantityG });
      }
      await get()._fetchDayPortions(plan.id, mealType);
      set((state) => ({
        dayTotals: calcTotals(state.dayPortions),
        isAdding: false,
      }));
      useUiStore.getState().showToast(i18n.t('toast.portionsAdded', { count: portionsList.length }), 'success');
    } catch (err) {
      set({ isAdding: false });
      const msg = err.response?.data?.message || err.message || 'Failed to add portions';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  updateDayPortionQuantity: async (planId, mealType, portionId, quantityG) => {
    try {
      await mealApi.updatePortion(planId, mealType, portionId, { quantityG });
      await get()._fetchDayPortions(planId, mealType);
      set((state) => ({ dayTotals: calcTotals(state.dayPortions) }));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update portion';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  removeDayPortion: async (planId, mealType, portionId) => {
    try {
      await mealApi.deletePortion(planId, mealType, portionId);
      await get()._fetchDayPortions(planId, mealType);
      set((state) => ({ dayTotals: calcTotals(state.dayPortions) }));
      useUiStore.getState().showToast(i18n.t('toast.portionRemoved'), 'success');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to remove portion';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  // --- Templates ---

  fetchTemplates: async (accountId) => {
    set({ isLoadingTemplates: true });
    try {
      const res = await mealApi.getTemplates(accountId);
      set({ templates: res.data || [], isLoadingTemplates: false });
    } catch (err) {
      set({ isLoadingTemplates: false });
      const msg = err.response?.data?.message || err.message || 'Failed to load templates';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  saveTemplate: async (templateName, sourcePlanId) => {
    if (!templateName.trim()) {
      useUiStore.getState().showToast(i18n.t('toast.templateNameRequired'), 'error');
      return false;
    }
    set({ isSavingTemplate: true });
    try {
      await mealApi.createTemplate({ templateName, sourcePlanId });
      set({ isSavingTemplate: false });
      useUiStore.getState().showToast(i18n.t('toast.templateSaved'), 'success');
      return true;
    } catch (err) {
      set({ isSavingTemplate: false });
      const msg = err.response?.data?.message || err.message || 'Failed to save template';
      useUiStore.getState().showToast(msg, 'error');
      return false;
    }
  },

  updateTemplateName: async (templateId, templateName) => {
    if (!templateName.trim()) {
      useUiStore.getState().showToast(i18n.t('toast.templateNameRequired'), 'error');
      return false;
    }
    try {
      await mealApi.updateTemplate(templateId, { templateName });
      useUiStore.getState().showToast(i18n.t('toast.templateUpdated'), 'success');
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update template';
      useUiStore.getState().showToast(msg, 'error');
      return false;
    }
  },

  removeTemplate: async (templateId) => {
    try {
      await mealApi.deleteTemplate(templateId);
      set((state) => ({
        templates: state.templates.filter((t) => (t.templateId || t.id) !== templateId),
      }));
      useUiStore.getState().showToast(i18n.t('toast.templateDeleted'), 'success');
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete template';
      useUiStore.getState().showToast(msg, 'error');
      return false;
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
      useUiStore.getState().showToast(i18n.t('toast.portionRemoved'), 'success');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to remove portion';
      useUiStore.getState().showToast(msg, 'error');
    }
  },
}));
