import apiInstance from '../services/api';

// Отримати всіх користувачів.Це асинхронна функція, яка надсилає запит до сервера для отримання списку всіх користувачів.
export const fetchAllUsers = async () => {
  return await apiInstance.get('/users');
};

// Отримати користувача за ім’ям
export const fetchUsersByName = async (name) => {
  try {
    return await apiInstance.get(`/users/search?q=${name}`);
  } catch (error) {
    console.log(error.message);
  }
};

// Додати нового користувача
export const addUser = async (userData) => {
  try {
    return await apiInstance.post('/users/add', userData);
  } catch (error) {
    console.log(error.message);
  }
};
