import api from './api';

export const getPrediction = async (crop) => {
  const response = await api.get(`/predict/${crop}`);
  return response.data;
};
