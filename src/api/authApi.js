import axiosInstance from './axiosInstance';

export const login = (data) => axiosInstance.post('/auth/login', data);
export const register = (data) => axiosInstance.post('/auth/register', data);
export const forgotPassword = (data) => axiosInstance.post('/auth/forgot-password', data);
export const verifyOtp = (data) => axiosInstance.post('/auth/verify-otp', data);
export const resetPassword = (data) => axiosInstance.post('/auth/reset-password', data);
export const changePassword = (data) => axiosInstance.put('/auth/change-password', data);
export const getUser = (id) => axiosInstance.get(`/auth/user/${id}`);
