import axios from "axios";

const client = axios.create({
  // baseURL: `${window.location.protocol}/${window.location.host}/api`,
  baseURL: `http://localhost:3001/api`,
  withCredentials: true
});

// Интерцептор для добавления токена
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для обработки ошибок авторизации
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
