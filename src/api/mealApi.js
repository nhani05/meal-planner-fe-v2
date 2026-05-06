import axiosInstance from './axiosInstance';

export const getMealPlans = (accountId) => axiosInstance.get(`/meal-plans/account/${accountId}`);
export const getMealPlanByDate = (accountId, date) => axiosInstance.get(`/meal-plans/account/${accountId}/date/${date}`);
export const getMealPlanById = (id) => axiosInstance.get(`/meal-plans/${id}`);
export const createMealPlan = (accountId, data) => axiosInstance.post(`/meal-plans?accountId=${accountId}`, data);
export const updateMealPlan = (id, data) => axiosInstance.put(`/meal-plans/${id}`, data);
export const deleteMealPlan = (id) => axiosInstance.delete(`/meal-plans/${id}`);
export const getMeals = (planId) => axiosInstance.get(`/meal-plans/${planId}/meals`);
export const getPortions = (planId, mealType) => axiosInstance.get(`/meal-plans/${planId}/meals/${mealType}/portions`);
export const addPortion = (planId, mealType, data) => axiosInstance.post(`/meal-plans/${planId}/meals/${mealType}/portions`, data);
export const updatePortion = (planId, mealType, portionId, data) => axiosInstance.put(`/meal-plans/${planId}/meals/${mealType}/portions/${portionId}`, data);
export const deletePortion = (planId, mealType, portionId) => axiosInstance.delete(`/meal-plans/${planId}/meals/${mealType}/portions/${portionId}`);
export const getTemplates = (accountId) => axiosInstance.get(`/meal-plan-templates?accountId=${accountId}`);
export const createTemplate = (data) => axiosInstance.post('/meal-plan-templates', data);
export const deleteTemplate = (id) => axiosInstance.delete(`/meal-plan-templates/${id}`);
