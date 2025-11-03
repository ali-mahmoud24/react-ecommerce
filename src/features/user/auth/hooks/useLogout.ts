import { useMutation } from '@tanstack/react-query';
import { logoutApi } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';

export const useLogout = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
    },
    onError: () => {
      logout();
    },
  });
};