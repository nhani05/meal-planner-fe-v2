import axiosInstance from './axiosInstance';

export const getStatistics = (params) => axiosInstance.get('/admin/statistics', { params });
export const getUsers = (params) => axiosInstance.get('/admin/users', { params });
export const getUserById = (id) => axiosInstance.get(`/admin/users/${id}`);
export const lockUser = (id) => axiosInstance.patch(`/admin/users/${id}/lock`);
export const unlockUser = (id) => axiosInstance.patch(`/admin/users/${id}/unlock`);
export const deleteUser = (id) => axiosInstance.delete(`/admin/users/${id}`);
export const getAdminDishes = (params) => axiosInstance.get('/admin/dishes', { params });
export const createAdminDish = (data) => axiosInstance.post('/admin/dishes', data);
export const updateAdminDish = (id, data) => axiosInstance.put(`/admin/dishes/${id}`, data);
export const deleteAdminDish = (id) => axiosInstance.delete(`/admin/dishes/${id}`);
export const getAdminFeedbacks = (params) => axiosInstance.get('/admin/feedbacks', { params });
export const updateFeedbackStatus = (id, status) => axiosInstance.patch(`/admin/feedbacks/${id}/status`, { status });

// Categories (BE pending — stubbed for future use)
export const createCategory = (data) => axiosInstance.post('/dish-categories', data);
export const updateCategory = (id, data) => axiosInstance.put(`/dish-categories/${id}`, data);
export const deleteCategory = (id) => axiosInstance.delete(`/dish-categories/${id}`);
