import client from '../client';
import type { User } from '../types';

export const userApi = {
  // обновление аватарки
  updateAvatar: async (file: File): Promise<User> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await client.post<User>('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // например обновление имени
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await client.patch<User>('/user/profile', data);
    return response.data;
  },

  // получить пользователя по имени
  getUserByName: async (username: string): Promise<User | null> => {
    const response = await client.get<User | null>(`/user/by-name/${encodeURIComponent(username)}`);
    return response.data;
  },

  // получить пользователя по email
  getUserByEmail: async (email: string): Promise<User | null> => {
    const response = await client.get<User | null>(`/user/by-email/${encodeURIComponent(email)}`);
    return response.data;
  },
};
