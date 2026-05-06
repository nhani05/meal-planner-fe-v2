import axiosInstance from './axiosInstance';

export const getHealthProfile = (accountId) => axiosInstance.get(`/health-profile/${accountId}`);
export const saveHealthProfile = (accountId, data) => axiosInstance.post(`/health-profile/${accountId}`, data);
export const getHealthGoal = (accountId) => axiosInstance.get(`/health-goal/${accountId}`);
export const saveHealthGoal = (accountId, data) => axiosInstance.post(`/health-goal/${accountId}`, data);
