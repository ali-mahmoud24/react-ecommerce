// src/features/user/auth/hooks/useLogout.ts
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Added toast for better UX

export function useLogout() {
  const { logout } = useAuth(); // Get the logout function from AuthContext
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => authAPI.logout(), // Call the backend logout API
    onSuccess: async () => {
      // Clear client state (AuthContext)
      await logout();
      toast.success('Logged out successfully!'); // Provide feedback
      navigate('/login'); // Redirect to login page
    },
    onError: (err: unknown) => {
      // Even if backend logout fails, clear client state for security
      logout();
      const message = err instanceof Error ? err.message : 'Logout failed, but session cleared locally.';
      toast.error(message);
      navigate('/login'); // Still navigate to login
    },
  });

  return {
    logout: () => mutation.mutate(), // Function to trigger logout
    isLoading: mutation.isPending, // Loading state for UI
  };
}