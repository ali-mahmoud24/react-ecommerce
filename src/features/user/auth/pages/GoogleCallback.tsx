// src/features/user/auth/pages/GoogleCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { authAPI } from '../api/auth.api';
import toast from 'react-hot-toast';

export default function GoogleCallback() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // backend sets httpOnly cookie and should redirect here with query params
        const data = await authAPI.me();
        login(data);
        toast.success(`Welcome back, ${data.firstName}!`);
        navigate('/');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Google authentication failed');
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [login, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 3,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Completing Google Sign-In...
      </Typography>
    </Box>
  );
}
