import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isAdmin: false,

  login: (token, user) =>
    set({
      token,
      user,
      isAuthenticated: true,
      isAdmin: user?.role === 'admin',
    }),

  logout: () =>
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    }),
}));
