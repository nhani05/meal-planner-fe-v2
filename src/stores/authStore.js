import { create } from 'zustand';

const hydrate = () => {
  try {
    const token = sessionStorage.getItem('token');
    const userRaw = sessionStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;
    return { token, user, isAuthenticated: !!token, isAdmin: user?.role === 'admin' };
  } catch {
    return { token: null, user: null, isAuthenticated: false, isAdmin: false };
  }
};

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  ...hydrate(),

  login: (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    set({
      token,
      user,
      isAuthenticated: true,
      isAdmin: user?.role === 'admin',
    });
  },

  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  },
}));
