import { create } from 'zustand';
import * as dishApi from '../api/dishApi';
import { useUiStore } from './uiStore';

export const useDishStore = create((set, get) => ({
  dishes: [],
  systemDishes: [],
  categories: [],
  favorites: [],
  totalPages: 0,
  currentPage: 0,
  totalElements: 0,
  filters: { keyword: '', categoryId: '', minCal: '', maxCal: '' },
  isLoading: false,

  setFilters: (next) => set((state) => ({ filters: { ...state.filters, ...next } })),

  fetchDishes: async (params = {}) => {
    set({ isLoading: true });
    try {
      const res = await dishApi.getDishes(params);
      set({
        dishes: res.data.content || [],
        totalPages: res.data.totalPages || 0,
        currentPage: res.data.number || 0,
        totalElements: res.data.totalElements || 0,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
      const msg = err.response?.data?.message || err.message || 'Failed to load dishes';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  fetchCategories: async () => {
    try {
      const res = await dishApi.getCategories();
      set({ categories: res.data || [] });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load categories';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  fetchFavorites: async (accountId) => {
    try {
      const res = await dishApi.getFavorites(accountId);
      set({ favorites: res.data || [] });
    } catch (err) {
      if (err.response?.status === 404) {
        set({ favorites: [] });
        return;
      }
      const msg = err.response?.data?.message || err.message || 'Failed to load favorites';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  toggleFavorite: async (accountId, dishId) => {
    const { favorites } = get();
    const isFav = favorites.some((f) => f.id === dishId);

    // Optimistic update
    if (isFav) {
      set({ favorites: favorites.filter((f) => f.id !== dishId) });
    } else {
      const dish = get().dishes.find((d) => d.id === dishId);
      set({ favorites: [...favorites, dish || { id: dishId }] });
    }

    try {
      if (isFav) {
        await dishApi.removeFavorite(accountId, dishId);
      } else {
        await dishApi.addFavorite(accountId, dishId);
      }
    } catch (err) {
      // Rollback on error
      set({ favorites });
      const msg = err.response?.data?.message || err.message || 'Failed to update favorite';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  fetchSystemDishes: async () => {
    set({ isLoading: true });
    try {
      const res = await dishApi.getSystemDishes();
      set({ systemDishes: res.data || [], isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      const msg = err.response?.data?.message || err.message || 'Failed to load system dishes';
      useUiStore.getState().showToast(msg, 'error');
    }
  },
}));
