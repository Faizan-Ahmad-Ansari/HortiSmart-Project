import api from './api';

export const subscribeUser = async (userData) => {
  const response = await api.post('/user/subscribe', userData);
  return response.data;
};
