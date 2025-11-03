import { useMutation } from '@tanstack/react-query';
import http from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';

export const useSecurity = () => {
  const { logout } = useAuth();

  const changePassword = useMutation({
    mutationFn: async (passwordData: { currentPassword: string; newPassword: string }) => {
      const { data } = await http.patch('/auth/change-password', passwordData);
      return data;
    },
  });

  const deactivateAccount = useMutation({
    mutationFn: async () => {
      const { data } = await http.patch('/auth/deactivate');
      return data;
    },
    onSuccess: () => {
      logout();
    },
  });

  return {
    changePassword,
    deactivateAccount,
  };
};
