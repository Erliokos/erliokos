import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from './user';
import { useAuthStore } from 'store/authStore';
import { useToast } from 'components/Notifications/useToast';
import type { User } from '../types';

export const useUser = () => {
  const queryClient = useQueryClient();
  const { setUser, setError } = useAuthStore();
  const toast = useToast();

  const updateAvatarMutation = useMutation<User, Error, File>({
    mutationFn: userApi.updateAvatar,
    onSuccess: (userData) => {
      setUser(userData);
      queryClient.setQueryData(['user'], userData);
      toast.success('Аватар обновлён!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setError(error.message);
    },
  });

  const updateProfileMutation = useMutation<User, Error, Partial<User>>({
    mutationFn: userApi.updateProfile,
    onSuccess: (userData) => {
      setUser(userData);
      queryClient.setQueryData(['user'], userData);
      toast.success('Профиль обновлён!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setError(error.message);
    },
  });

  return {
    updateAvatar: updateAvatarMutation.mutate,
    updateAvatarAsync: updateAvatarMutation.mutateAsync,
    isUpdatingAvatar: updateAvatarMutation.isPending,
    updateProfile: updateProfileMutation.mutate,
    updateProfileAsync: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
  };
};

export const useUserByName = (username: string, enabled = false) =>
  useQuery<User | null, Error>({
    queryKey: ['user', 'byName', username],
    queryFn: () => userApi.getUserByName(username),
    enabled,
    retry: false,
  });

export const useUserByEmail = (email: string, enabled = false) =>
  useQuery<User | null, Error>({
    queryKey: ['user', 'byEmail', email],
    queryFn: () => userApi.getUserByEmail(email),
    enabled,
    retry: false,
  });
