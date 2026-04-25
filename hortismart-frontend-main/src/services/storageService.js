import api from './api';

export const getStorageData = async () => {
  const response = await api.get('/storage');
  return response.data;
};
