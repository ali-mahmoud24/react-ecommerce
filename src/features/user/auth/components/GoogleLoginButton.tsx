// src/features/user/auth/components/GoogleLoginButton.tsx
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../api/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const { mutate: fetchProfile, isPending } = useMutation({
    mutationFn: authAPI.me,
    onSuccess: (data) => {
      login(data);
      toast.success(`Welcome back, ${data.firstName}!`);
      navigate('/');
    },
    onError: () => {
      toast.error('Google login failed. Please try again.');
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const googleSuccess = params.get('google_success');
    const googleError = params.get('google_error');

    if (googleSuccess === 'true') {
      toast.loading('Signing you in with Google...');
      fetchProfile();
    } else if (googleError === 'true') {
      toast.error('Google login was cancelled or failed.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleGoogleLogin = () => {
    // If you have proxy configured, you can use relative path: '/api/v2/auth/google'
    const url = '/api/v2/auth/google';
    window.location.href = url;
  };

  return (
    <Button
      variant="outlined"
      fullWidth
      startIcon={<Google />}
      onClick={handleGoogleLogin}
      disabled={isPending}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        py: 1.3,
        borderRadius: 2,
      }}
    >
      {isPending ? 'Signing in...' : 'Continue with Google'}
    </Button>
  );
}
