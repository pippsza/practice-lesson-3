import apiInstance from '../services/api';

// Отримати всі пости
export const fetchAllPosts = async () => {
  return await apiInstance.get('/posts');
};

// Отримати пости за ID користувача
export const fetchPostsByUserId = async (userId) => {
  try {
    return await apiInstance.get(`/users/${userId}/posts`);
  } catch (error) {
    console.log(error.message);
  }
};

// Знайти пости за ключовим словом
export const fetchPostsByKeyword = async (keyword) => {
  try {
    return await apiInstance.get(`/posts/search?q=${keyword}`);
  } catch (error) {
    console.log(error.message);
  }
};