import apiInstance from '../services/api';

export const productTemplate = async () => {
  return await apiInstance.get('/products');
};
