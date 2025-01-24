import apiInstance from '../services/api';

export const productTemplate = async () => {
  return await apiInstance.get('/products');
};
export const getElemetById = async (id) => {
  try {
    return await apiInstance.get(`/products/${id}`)
  } catch (error) {
    console.log(error);
  }
  

}