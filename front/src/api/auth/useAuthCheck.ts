import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useAuthStore } from '../../store/authStore';


export const useAuthCheck = () => {
  const { refetchUser } = useAuth();
  const { user, isAuthenticated } = useAuthStore();

  

  useEffect(() => {
    // Автоматически проверяем аутентификацию при монтировании
    // если пользователь есть в store но нет в кеше React Query
    if (!user && !isAuthenticated) {
      refetchUser();
    }
  }, [user, isAuthenticated, refetchUser]);

  return { isAuthenticated, user };
};
