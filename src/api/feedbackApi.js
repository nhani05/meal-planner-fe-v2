import axiosInstance from './axiosInstance';

export const getMyFeedbacks = () => axiosInstance.get('/feedbacks');
export const sendFeedback = (content) => axiosInstance.post('/feedbacks', { content });
