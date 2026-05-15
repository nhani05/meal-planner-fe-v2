import { create } from 'zustand';
import * as userApi from '../api/userApi';
import { useUiStore } from './uiStore';
import i18n from '../i18n';

export const useUserStore = create((set) => ({
  profile: null,
  healthGoal: null,
  isLoading: false,

  setLoading: (loading) => set({ isLoading: loading }),

  fetchProfile: async (accountId) => {
    set({ isLoading: true });
    try {
      const res = await userApi.getHealthProfile(accountId);
      set({ profile: res.data, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      if (err.response?.status === 404) {
        set({ profile: null });
        return;
      }
      const msg = err.response?.data?.message || err.message || 'Failed to load profile';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  updateProfile: async (accountId, data) => {
    set({ isLoading: true });
    try {
      const res = await userApi.saveHealthProfile(accountId, data);
      set({ profile: res.data, isLoading: false });
      useUiStore.getState().showToast(i18n.t('toast.profileUpdated'), 'success');
    } catch (err) {
      set({ isLoading: false });
      const msg = err.response?.data?.message || err.message || 'Failed to update profile';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  fetchGoal: async (accountId) => {
    set({ isLoading: true });
    try {
      const res = await userApi.getHealthGoal(accountId);
      set({ healthGoal: res.data, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      if (err.response?.status === 404) {
        set({ healthGoal: null });
        return;
      }
      const msg = err.response?.data?.message || err.message || 'Failed to load health goal';
      useUiStore.getState().showToast(msg, 'error');
    }
  },

  updateGoal: async (accountId, data) => {
    set({ isLoading: true });
    try {
      const res = await userApi.saveHealthGoal(accountId, data);
      set({ healthGoal: res.data, isLoading: false });
      useUiStore.getState().showToast(i18n.t('toast.healthGoalUpdated'), 'success');
    } catch (err) {
      set({ isLoading: false });
      const msg = err.response?.data?.message || err.message || 'Failed to update health goal';
      useUiStore.getState().showToast(msg, 'error');
    }
  },
}));
