import apiInstance from '../services/api';


export const getElemetById = async (id) => {
  try {
    return await apiInstance.get(`/products/${id}`)
  } catch (error) {
    console.log(error.message);
  }
  

}
import apiInstance from '../services/api';

// Отримати всі продукти
export const productTemplate = async () => {
  return await apiInstance.get('/products');
}; //Це функція, яка робить HTTP-запит на сервер і повертає список продуктів

// Отримати продукт за ID
export const getElementById = async (id) => {
  try {
    return await apiInstance.get(`/products/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

// Додати новий продукт
export const addProduct = async (productData) => {
  try {
    return await apiInstance.post('/products/add', productData);
  } catch (error) {
    console.log(error.message);
  }
};

// Видалити продукт
export const deleteProduct = async (id) => {
  try {
    return await apiInstance.delete(`/products/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};