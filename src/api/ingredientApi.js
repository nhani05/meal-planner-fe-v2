import axiosInstance from './axiosInstance';

export const getIngredients = (params) => axiosInstance.get('/ingredients', { params });
export const getIngredientById = (id) => axiosInstance.get(`/ingredients/${id}`);
export const createIngredient = (data) => axiosInstance.post('/ingredients', data);
export const updateIngredient = (id, data) => axiosInstance.put(`/ingredients/${id}`, data);
export const deleteIngredient = (id) => axiosInstance.delete(`/ingredients/${id}`);
