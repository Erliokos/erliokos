import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { LoginData, RegisterData, User } from '../types';
import { authApi } from './auth';
import { useAuthStore } from 'store/authStore';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const {
    user,
    isAuthenticated,
    setUser,
    setLoading,
    setError,
    clearAuth
  } = useAuthStore();

  // Запрос для получения текущего пользователя
  const userQuery = useQuery<User>({
    queryKey: ['user'],
    queryFn: authApi.getMe,
    retry: false,
    enabled: false,
    meta: {
      onSuccess: (userData: User) => {
        setUser(userData);
        setLoading(false);
      },
      onError: (error: Error) => {
        setError(error.message);
        setLoading(false);
        clearAuth();
      },
    },
  });

  // Мутация для логина
  const loginMutation = useMutation<User, Error, LoginData>({
    mutationFn: async (loginData: LoginData) => {
      setLoading(true);
      const response = await authApi.login(loginData);
      return response.user;
    },
    onSuccess: (userData) => {
      console.log('ЗАРЕГИСТРИРОВАН', userData);
      setUser(userData);
      setLoading(false);
      queryClient.setQueryData(['user'], userData);
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);
      clearAuth();
    },
  });

  // Мутация для регистрации
  const registerMutation = useMutation<User, Error, RegisterData>({
    mutationFn: async (registerData: RegisterData) => {
      setLoading(true);
      const response = await authApi.register(registerData);
      return response.user;
    },
    onSuccess: (userData) => {
      setUser(userData);
      setLoading(false);
      queryClient.setQueryData(['user'], userData);
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);
      clearAuth();
    },
  });

  // Мутация для логаута
  const logoutMutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      await authApi.logout();
    },
    onSuccess: () => {
      clearAuth();
      setLoading(false);
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);
      clearAuth();
      queryClient.clear();
    },
  });

  return {
    // Состояние из store
    user,
    isAuthenticated,
    isLoading: useAuthStore.getState().isLoading,
    error: useAuthStore.getState().error,

    // Методы для запросов
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,

    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    // Методы для управления состоянием
    refetchUser: userQuery.refetch,
    clearError: () => setError(null),
  };
};
