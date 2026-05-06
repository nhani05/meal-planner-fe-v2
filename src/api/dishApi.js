import axiosInstance from './axiosInstance';

export const getDishes = (params) => axiosInstance.get('/dishes', { params });
export const getDishById = (id) => axiosInstance.get(`/dishes/${id}`);
export const getSystemDishes = () => axiosInstance.get('/dishes/system');
export const getCustomDishes = (accountId) => axiosInstance.get(`/dishes/account/${accountId}`);
export const createDish = (data) => axiosInstance.post('/dishes', data);
export const updateDish = (id, data) => axiosInstance.put(`/dishes/${id}`, data);
export const deleteDish = (id) => axiosInstance.delete(`/dishes/${id}`);
export const getCategories = () => axiosInstance.get('/dish-categories');
export const createCategory = (name) => axiosInstance.post('/dish-categories', { name });
export const updateCategory = (id, name) => axiosInstance.put(`/dish-categories/${id}`, { name });
export const deleteCategory = (id) => axiosInstance.delete(`/dish-categories/${id}`);
export const getRatings = (dishId) => axiosInstance.get(`/dishes/${dishId}/ratings`);
export const addRating = (dishId, data) => axiosInstance.post(`/dishes/${dishId}/ratings`, data);
export const getFavorites = (accountId) => axiosInstance.get(`/favorites/account/${accountId}`);
export const addFavorite = (accountId, dishId) => axiosInstance.post(`/favorites/account/${accountId}/${dishId}`);
export const removeFavorite = (accountId, dishId) => axiosInstance.delete(`/favorites/account/${accountId}/${dishId}`);
