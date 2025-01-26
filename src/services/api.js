import axios from 'axios';
const apiInstance = axios.create({
  baseURL: 'https://dummyjson.com',
});  //запит на сервер, який повертає дані у форматі JSON.

export default apiInstance;
