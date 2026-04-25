import api from './api';

export const getMarketPrices = async () => {
  const response = await api.get('/market');
  return response.data;
};

export const updateMarketData = async () => {
  const response = await api.post('/market/update');
  return response.data;
};

export const getUniqueCrops = async () => {
  const response = await api.get('/market/crops');
  return response.data;
};
