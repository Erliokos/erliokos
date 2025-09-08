import client from '../client';
import type { AuthResponse, LoginData, RegisterData, User } from '../types';

export const authApi = {
  // Регистрация
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/auth/register', data);
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  // Логин
  login: async (data: LoginData): Promise<AuthResponse> => {
    console.log(data, 'HELLO');
    const response = await client.post<AuthResponse>('/auth/login', data);
    
    
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  // Логаут
  logout: async (): Promise<void> => {
    await client.post('/auth/logout');
    localStorage.removeItem('accessToken');
  },

  // Получение текущего пользователя
  getMe: async (): Promise<User> => {
    const response = await client.get<User>('/auth/me');
    return response.data;
  },
};
