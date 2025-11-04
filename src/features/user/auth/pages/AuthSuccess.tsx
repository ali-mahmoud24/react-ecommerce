// src/features/user/auth/pages/AuthSuccess.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '@/lib/axios';
import { CircularProgress, Box, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

export default function AuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await http.get('/api/v2/auth/me');
        // backend returns { data: user } or user
        const user = data.data ?? data;
        login(user);
        toast.success(`Welcome, ${user.firstName}`);
        navigate('/');
      } catch {
        toast.error('Authentication failed');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate, login]);

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <CircularProgress />
      <Typography mt={2}>Logging you in...</Typography>
    </Box>
  );
}
