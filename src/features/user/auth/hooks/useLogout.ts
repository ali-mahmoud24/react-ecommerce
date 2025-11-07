import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { authAPI } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router';

export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      logout();
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Logout failed';
      toast.error(message);

      logout();
      navigate('/login', { replace: true });
    },
  });

  return mutation;
}
